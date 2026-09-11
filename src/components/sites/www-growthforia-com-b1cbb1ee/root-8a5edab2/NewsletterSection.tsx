"use client";

import { useId, useRef, useState } from "react";
import { submitInvite } from "@/app/actions/invite";
import {
  EVENINGS,
  OUTCOMES,
  PRIORITIES,
  READINESS,
  type FieldErrors,
} from "@/lib/growthforia/invite";
import { CheckIcon, ChevronDownIcon } from "../shared/icons";

type Step = 1 | 2 | 3;

const STEPS = [
  { n: 1 as const, label: "Evening" },
  { n: 2 as const, label: "Contact" },
  { n: 3 as const, label: "Fit" },
];

const fieldClass =
  "h-11 min-h-11 w-full rounded-xl border border-white/12 bg-[#0b0c0e] px-4 text-[16px] text-[#f6f3f0] placeholder:text-white/35 outline-none transition-colors duration-200 focus-visible:border-white/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8c48a]";

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[13px] leading-5 text-white/70">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="text-[12px] text-[#ffb3c2]" role="alert">
          {error}
        </p>
      ) : (
        <p className="sr-only" id={`${id}-hint`}>
          {label}
        </p>
      )}
    </div>
  );
}

function Choice({
  name,
  type,
  checked,
  onChange,
  children,
}: {
  name: string;
  type: "radio" | "checkbox";
  checked: boolean;
  onChange: () => void;
  children: string;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border border-white/12 bg-[#0b0c0e] px-4 py-2.5 transition-colors duration-200 hover:border-white/25 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#e8c48a]">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="peer sr-only"
      />
      <span
        aria-hidden
        className={`grid size-4 shrink-0 place-items-center border border-white/35 ${
          type === "radio" ? "rounded-full" : "rounded-[3px]"
        } ${checked ? "border-[#e8c48a] bg-[#e8c48a]" : ""}`}
      >
        {checked ? (
          <span
            className={
              type === "radio"
                ? "size-1.5 rounded-full bg-[#0b0c0e]"
                : "block size-2 border-b-2 border-l-2 border-[#0b0c0e] translate-y-[-1px] rotate-[-45deg]"
            }
          />
        ) : null}
      </span>
      <span className="text-[14px] leading-snug text-[#f6f3f0]">{children}</span>
    </label>
  );
}

export function NewsletterSection() {
  const uid = useId();
  const headingRef = useRef<HTMLParagraphElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState("");
  const [evening, setEvening] = useState<string>(EVENINGS[0]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [company, setCompany] = useState("");
  const [workEmail, setWorkEmail] = useState("");
  const [jobtitle, setJobtitle] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [dietary, setDietary] = useState("");
  const [readiness, setReadiness] = useState("");
  const [priorities, setPriorities] = useState<string[]>([]);
  const [outcome, setOutcome] = useState("");

  function go(next: Step) {
    setErrors({});
    setFormError("");
    setStep(next);
    queueMicrotask(() => headingRef.current?.focus());
  }

  function validateStep(n: Step): boolean {
    const next: FieldErrors = {};
    if (n === 1 && !EVENINGS.includes(evening as (typeof EVENINGS)[number])) {
      next.evening = "Choose an evening.";
    }
    if (n === 2) {
      if (!firstname.trim()) next.firstname = "First name is required.";
      if (!lastname.trim()) next.lastname = "Last name is required.";
      if (!company.trim()) next.company = "Company is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
        next.workEmail = "Enter a valid work email.";
      }
      if (!jobtitle.trim()) next.jobtitle = "Job title is required.";
      if (!city.trim()) next.city = "City / metro area is required.";
      if (linkedinUrl.trim()) {
        try {
          const u = new URL(linkedinUrl.trim());
          if (u.protocol !== "http:" && u.protocol !== "https:") {
            next.linkedinUrl = "Enter a full LinkedIn URL.";
          }
        } catch {
          next.linkedinUrl = "Enter a full LinkedIn URL.";
        }
      }
    }
    if (n === 3) {
      if (!readiness) next.readiness = "Select your Data & AI readiness.";
      if (priorities.length < 1 || priorities.length > 2) {
        next.priorities = "Select up to two priorities.";
      }
      if (!outcome) next.outcome = "Select a primary business outcome.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function togglePriority(value: string) {
    setPriorities((cur) => {
      if (cur.includes(value)) return cur.filter((v) => v !== value);
      if (cur.length >= 2) return cur;
      return [...cur, value];
    });
  }

  async function onSubmit() {
    if (!validateStep(3)) return;
    setPending(true);
    setFormError("");
    const result = await submitInvite({
      evening,
      firstname,
      lastname,
      company,
      workEmail,
      jobtitle,
      city,
      phone,
      linkedinUrl,
      dietary,
      readiness,
      priorities,
      outcome,
      pageUri: window.location.href,
    });
    setPending(false);
    if (!result.ok) {
      setErrors(result.fields ?? {});
      setFormError(result.error);
      return;
    }
    setSent(true);
  }

  return (
    <section
      id="cta"
      className="relative scroll-mt-24 overflow-hidden bg-gf-lime py-16 md:py-[88px]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 h-0 w-0 border-t-[84px] border-r-[84px] border-t-[#0b0c0e] border-r-transparent"
      />
      <div className="gf-container grid items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <p className="text-[12px] font-medium tracking-[0.16em] text-[#0b0c0e]/55 uppercase">
            Twelve seats · COTE Miami
          </p>
          <h2 className="font-display mt-4 max-w-[14ch] text-[40px] leading-[1.05] tracking-[-0.03em] text-[#0b0c0e] md:text-[56px]">
            What happens <span className="italic">next?</span>
          </h2>
        </div>

        <div
          data-invite-card
          className="rounded-[22px] border border-white/8 bg-[#121316] p-5 shadow-[0_24px_60px_-28px_rgba(11,12,14,0.55)] md:p-8"
        >
          {sent ? (
            <div className="grid min-h-[560px] place-items-center text-center md:min-h-[640px]">
              <div>
                <span className="mx-auto grid size-11 place-items-center rounded-full bg-[#e8c48a] text-[#0b0c0e]">
                  <CheckIcon />
                </span>
                <p className="font-display mt-5 text-[28px] leading-tight text-[#f6f3f0]">
                  Request received
                </p>
                <p className="mx-auto mt-3 max-w-[42ch] text-[14px] leading-relaxed text-white/60">
                  Reviewed within 48 hours for company fit, seniority and current
                  Data/AI priorities. You&apos;ll hear from Jorge&apos;s team
                  personally either way.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-2">
                {STEPS.map((s, i) => (
                  <div key={s.n} className="flex flex-1 items-center gap-2">
                    <span
                      className={`grid size-7 place-items-center rounded-full text-[11px] font-medium ${
                        step === s.n
                          ? "bg-[#e8c48a] text-[#0b0c0e]"
                          : step > s.n
                            ? "bg-white/12 text-[#f6f3f0]"
                            : "bg-white/6 text-white/40"
                      }`}
                    >
                      {s.n}
                    </span>
                    <span className="hidden text-[12px] text-white/55 sm:inline">
                      {s.label}
                    </span>
                    {i < STEPS.length - 1 ? (
                      <span className="h-px flex-1 bg-white/10" />
                    ) : null}
                  </div>
                ))}
              </div>

              <p ref={headingRef} tabIndex={-1} className="sr-only">
                Step {step} of 3
              </p>
              <p className="sr-only" aria-live="polite">
                Step {step} of 3
              </p>

              <div className="grid h-[34rem] overflow-y-auto overscroll-contain md:h-[36rem]">
                <fieldset
                  className={`col-start-1 row-start-1 min-h-[34rem] border-0 p-0 transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:min-h-[36rem] ${
                    step === 1
                      ? "relative z-10 opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                  disabled={step !== 1}
                >
                  <legend className="mb-4 text-[15px] text-white/75">
                    Which evening are you requesting?
                  </legend>
                  <div className="relative">
                    <select
                      id={`${uid}-evening`}
                      value={evening}
                      onChange={(e) => setEvening(e.target.value)}
                      aria-invalid={Boolean(errors.evening)}
                      aria-describedby={errors.evening ? `${uid}-evening-error` : undefined}
                      className={`${fieldClass} cursor-pointer appearance-none pr-12`}
                    >
                      {EVENINGS.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                    <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-white/55">
                      <ChevronDownIcon />
                    </span>
                  </div>
                  {errors.evening ? (
                    <p id={`${uid}-evening-error`} className="mt-2 text-[12px] text-[#ffb3c2]" role="alert">
                      {errors.evening}
                    </p>
                  ) : null}
                  <p className="mt-4 text-[15px] leading-relaxed text-[#e8c48a]">
                    Requesting a seat for {evening} · COTE Miami
                  </p>
                </fieldset>

                <fieldset
                  className={`col-start-1 row-start-1 min-h-[34rem] border-0 p-0 transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:min-h-[36rem] ${
                    step === 2
                      ? "relative z-10 opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                  disabled={step !== 2}
                >
                  <legend className="mb-4 text-[15px] text-white/75">Contact information</legend>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <Field id={`${uid}-first`} label="First name" error={errors.firstname}>
                      <input
                        id={`${uid}-first`}
                        autoComplete="given-name"
                        required
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        placeholder="First name"
                        aria-invalid={Boolean(errors.firstname)}
                        className={fieldClass}
                      />
                    </Field>
                    <Field id={`${uid}-last`} label="Last name" error={errors.lastname}>
                      <input
                        id={`${uid}-last`}
                        autoComplete="family-name"
                        required
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        placeholder="Last name"
                        aria-invalid={Boolean(errors.lastname)}
                        className={fieldClass}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id={`${uid}-company`} label="Company" error={errors.company}>
                        <input
                          id={`${uid}-company`}
                          autoComplete="organization"
                          required
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          placeholder="Company"
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <Field id={`${uid}-email`} label="Work email" error={errors.workEmail}>
                      <input
                        id={`${uid}-email`}
                        type="email"
                        autoComplete="email"
                        required
                        value={workEmail}
                        onChange={(e) => setWorkEmail(e.target.value)}
                        placeholder="Work email"
                        className={fieldClass}
                      />
                    </Field>
                    <Field id={`${uid}-title`} label="Job title" error={errors.jobtitle}>
                      <input
                        id={`${uid}-title`}
                        autoComplete="organization-title"
                        required
                        value={jobtitle}
                        onChange={(e) => setJobtitle(e.target.value)}
                        placeholder="Job title"
                        className={fieldClass}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id={`${uid}-city`} label="City / metro area" error={errors.city}>
                        <input
                          id={`${uid}-city`}
                          autoComplete="address-level2"
                          required
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City / metro area"
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                    <Field id={`${uid}-phone`} label="Phone (optional)" error={errors.phone}>
                      <input
                        id={`${uid}-phone`}
                        type="tel"
                        autoComplete="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Phone (optional)"
                        className={fieldClass}
                      />
                    </Field>
                    <Field
                      id={`${uid}-li`}
                      label="LinkedIn URL (optional)"
                      error={errors.linkedinUrl}
                    >
                      <input
                        id={`${uid}-li`}
                        type="url"
                        autoComplete="url"
                        value={linkedinUrl}
                        onChange={(e) => setLinkedinUrl(e.target.value)}
                        placeholder="LinkedIn URL (optional)"
                        className={fieldClass}
                      />
                    </Field>
                    <div className="sm:col-span-2">
                      <Field id={`${uid}-diet`} label="Dietary restrictions (optional)">
                        <input
                          id={`${uid}-diet`}
                          value={dietary}
                          onChange={(e) => setDietary(e.target.value)}
                          placeholder="Dietary restrictions (optional)"
                          className={fieldClass}
                        />
                      </Field>
                    </div>
                  </div>
                </fieldset>

                <fieldset
                  className={`col-start-1 row-start-1 min-h-[34rem] border-0 p-0 transition duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none md:min-h-[36rem] ${
                    step === 3
                      ? "relative z-10 opacity-100"
                      : "pointer-events-none invisible opacity-0"
                  }`}
                  disabled={step !== 3}
                >
                  <legend className="sr-only">Qualification</legend>
                  <div className="flex flex-col gap-5">
                    <div>
                      <p id={`${uid}-r`} className="mb-2 text-[14px] text-white/75">
                        1. Your organization&apos;s current Data & AI readiness
                      </p>
                      <div role="radiogroup" aria-labelledby={`${uid}-r`} className="grid gap-2">
                        {READINESS.map((opt) => (
                          <Choice
                            key={opt}
                            name="readiness"
                            type="radio"
                            checked={readiness === opt}
                            onChange={() => setReadiness(opt)}
                          >
                            {opt}
                          </Choice>
                        ))}
                      </div>
                      {errors.readiness ? (
                        <p className="mt-2 text-[12px] text-[#ffb3c2]" role="alert">
                          {errors.readiness}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <p id={`${uid}-p`} className="mb-2 text-[14px] text-white/75">
                        2. Top strategic priority right now (select up to 2)
                      </p>
                      <div role="group" aria-labelledby={`${uid}-p`} className="grid gap-2">
                        {PRIORITIES.map((opt) => (
                          <Choice
                            key={opt}
                            name="priority"
                            type="checkbox"
                            checked={priorities.includes(opt)}
                            onChange={() => togglePriority(opt)}
                          >
                            {opt}
                          </Choice>
                        ))}
                      </div>
                      {errors.priorities ? (
                        <p className="mt-2 text-[12px] text-[#ffb3c2]" role="alert">
                          {errors.priorities}
                        </p>
                      ) : null}
                    </div>
                    <div>
                      <p id={`${uid}-o`} className="mb-2 text-[14px] text-white/75">
                        3. Primary business outcome you&apos;re advancing with AI
                      </p>
                      <div role="radiogroup" aria-labelledby={`${uid}-o`} className="grid gap-2">
                        {OUTCOMES.map((opt) => (
                          <Choice
                            key={opt}
                            name="outcome"
                            type="radio"
                            checked={outcome === opt}
                            onChange={() => setOutcome(opt)}
                          >
                            {opt}
                          </Choice>
                        ))}
                      </div>
                      {errors.outcome ? (
                        <p className="mt-2 text-[12px] text-[#ffb3c2]" role="alert">
                          {errors.outcome}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </fieldset>
              </div>

              {formError ? (
                <p className="mt-4 text-[13px] text-[#ffb3c2]" role="alert">
                  {formError}
                </p>
              ) : null}

              <div className="mt-6 flex flex-col gap-3">
                {step === 3 ? (
                  <button
                    type="button"
                    onClick={onSubmit}
                    disabled={pending}
                    className="flex h-11 min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#e8c48a] text-[15px] font-medium text-[#0b0c0e] transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {pending ? "Sending…" : "Request an Invitation"}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      if (validateStep(step)) go((step + 1) as Step);
                    }}
                    className="flex h-11 min-h-11 cursor-pointer items-center justify-center rounded-full bg-[#f6f3f0] text-[15px] font-medium text-[#0b0c0e] transition duration-200 hover:brightness-95 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white active:scale-[0.98]"
                  >
                    Continue
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => go((step - 1) as Step)}
                  disabled={step === 1}
                  className={`flex h-11 min-h-11 items-center justify-center text-[14px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e8c48a] ${
                    step === 1
                      ? "invisible"
                      : "cursor-pointer text-white/60 hover:text-white"
                  }`}
                >
                  Back
                </button>
                <p className="text-center text-[12px] leading-relaxed text-white/45">
                  Reviewed within 48 hours for company fit, seniority and current
                  Data/AI priorities. You&apos;ll hear from Jorge&apos;s team
                  personally either way.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
