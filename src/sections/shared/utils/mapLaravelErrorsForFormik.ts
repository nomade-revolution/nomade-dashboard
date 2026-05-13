export type LaravelValidationBag = Record<
  string,
  string[] | string | undefined
>;

/** Formik `status` payload for API / validation summary (see CompanyForm). */
export type FormikServerAlertStatus = {
  serverTitle: string;
  serverLines: string[];
};

export function isFormikServerAlertStatus(
  status: unknown,
): status is FormikServerAlertStatus {
  if (typeof status !== "object" || status === null) return false;
  const s = status as FormikServerAlertStatus;
  return (
    typeof s.serverTitle === "string" &&
    s.serverTitle.length > 0 &&
    Array.isArray(s.serverLines)
  );
}

/** First message per Laravel validation key. */
export function firstMessagesFromLaravelErrors(
  errors: LaravelValidationBag | undefined,
): Record<string, string> {
  const out: Record<string, string> = {};
  if (!errors || typeof errors !== "object") return out;
  for (const [key, raw] of Object.entries(errors)) {
    const msg = Array.isArray(raw) ? raw[0] : raw;
    if (typeof msg === "string" && msg.length > 0) out[key] = msg;
  }
  return out;
}

const FORM_FIELD_ROOTS = new Set([
  "email",
  "nif",
  "company",
  "company_name",
  "name",
  "surname",
  "mobile",
  "password",
  "phone",
  "web",
  "description",
  "company_comments",
  "instagram",
  "terms",
  "contacts",
]);

/**
 * Maps Laravel `errors` keys to top-level Formik fields when possible; everything else is listed for a summary alert.
 */
export function splitLaravelErrorsForFormik(
  errors: LaravelValidationBag | undefined,
): { fieldErrors: Record<string, string>; otherLabels: string[] } {
  const flat = firstMessagesFromLaravelErrors(errors);
  const fieldErrors: Record<string, string> = {};
  const otherLabels: string[] = [];

  for (const [key, msg] of Object.entries(flat)) {
    const root = key.split(".")[0];
    if (FORM_FIELD_ROOTS.has(root)) {
      fieldErrors[root] = fieldErrors[root]
        ? `${fieldErrors[root]} · ${msg}`
        : msg;
    } else {
      otherLabels.push(`${key}: ${msg}`);
    }
  }
  return { fieldErrors, otherLabels };
}
