"use server";

import { cookies, headers } from "next/headers";
import {
  HS_SUBMIT_URL,
  parseInvite,
  toHubSpotFields,
  type FieldErrors,
} from "@/lib/growthforia/invite";

export type InviteResult =
  | { ok: true }
  | { ok: false; error: string; fields?: FieldErrors };

async function postHubSpot(body: string) {
  return fetch(HS_SUBMIT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
    cache: "no-store",
  });
}

export async function submitInvite(raw: unknown): Promise<InviteResult> {
  const parsed = parseInvite(raw);
  if (!parsed.ok) return parsed;

  const hutk = (await cookies()).get("hubspotutk")?.value;
  const pageUri =
    parsed.data.pageUri || (await headers()).get("referer") || "";

  const body = JSON.stringify({
    fields: toHubSpotFields(parsed.data),
    context: {
      ...(hutk ? { hutk } : {}),
      pageUri,
      pageName: "Miami Roundtable",
    },
  });

  let res = await postHubSpot(body);
  if (res.status === 429) {
    const wait = Math.min(Number(res.headers.get("retry-after") || "1"), 5);
    await new Promise((r) => setTimeout(r, wait * 1000));
    res = await postHubSpot(body);
  }

  if (!res.ok) {
    return {
      ok: false,
      error: "We couldn't send your request. Please try again.",
    };
  }
  return { ok: true };
}
