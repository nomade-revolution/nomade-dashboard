# socialMedia FormData Bug – Analysis & Fix

## Bug

Backend received `socialMedia` as:

```json
[{ "social_media_id": "1" }, { "account_name": "@test" }]
```

Backend expects each element to have both `social_media_id` and `account_name`, so it raised: `Undefined array key "social_media_id"`.

---

## Step 1 – FormData inspection

In **CompanyForm.tsx** a temporary log was added before submit:

```ts
console.log("[CompanyForm] formData entries", [...formData.entries()]);
```

Use it to confirm:

- Whether `socialMedia` appears both as a full array and as indexed fields.
- Whether any key is `socialMedia` vs `social_media` (snake_case).

---

## Step 2 – Generic append loop

**CompanyForm.tsx** (lines 180–186):

- `Object.keys(values).forEach((key) => { ... })`
- `EXCLUDED_FIELDS` includes `"socialMedia"` (line 35) → key is excluded.
- Objects/arrays are skipped: `if (value != null && typeof value === "object") return;`
- So `socialMedia` is never appended by this loop.

**AddCompanyForm.tsx** (lines 103–108):

- Same pattern; `EXCLUDED_FIELDS` includes `"socialMedia"`.
- This form does **not** skip objects; it does `formData.append(key, value || "")`. So if `socialMedia` were not excluded, it would be appended as a string (e.g. `"[object Object]"`). Because it is excluded, it is not appended here.

Conclusion: the generic loop is not the source of the wrong payload in either form.

---

## Step 3 – Project-wide “socialMedia” usage

Relevant usages:

| Location                               | Usage                                                                                              |
| -------------------------------------- | -------------------------------------------------------------------------------------------------- |
| **CompanyForm.tsx**                    | EXCLUDED_FIELDS; cleanup of `socialMedia` / `socialMedia[*]`; then **single** append (see Step 4). |
| **AddCompanyForm.tsx**                 | Same; either `JSON.stringify(newSocialMedias)` or single JSON array.                               |
| **CreateInfluencerPage.tsx**           | `formData.append("socialMedia", JSON.stringify(newSocials))` – influencer flow, not company.       |
| **CompanyContext / CompanyDetailPage** | Only call `editCompanyCms(companyFormData, companyId)`; they do not build FormData.                |

No other file in the company flow appends `socialMedia` to the company FormData.

---

## Step 4 – Root cause

The wrong array can appear in two ways:

1. **Two FormData parts with the same name `"socialMedia"`**  
   If one part is `'[{"social_media_id":"1"}]'` and another is `'[{"account_name":"@test"}]'`, some stacks can end up with an array of two decoded objects, i.e. `[{ social_media_id: "1" }, { account_name: "@test" }]`.

2. **Mixed representation**  
   Sending both:
   - indexed keys: `socialMedia[0][social_media_id]=1`, `socialMedia[0][account_name]=@test`, and
   - a raw key `socialMedia` (e.g. JSON string)  
     can lead to parsing/merge behaviour where the backend sees the wrong structure.

So the issue is either duplicate appends of `socialMedia` or mixing indexed and JSON representation.

---

## Fixes applied (frontend only)

1. **Single representation for company socialMedia**

   - **CompanyForm.tsx**: No longer sends indexed keys `socialMedia[0][social_media_id]` and `socialMedia[0][account_name]`.
   - Sends one key only: `socialMedia` = `JSON.stringify([{ social_media_id: "1", account_name: values.instagram.trim() }])`.
   - Backend already supports `socialMedia` as a JSON string in `UpdateCompanyRequest` (`json_decode` when `is_string($this->socialMedia)`).

2. **Cleanup before append**

   - Both forms clear any existing `socialMedia` / `social_media` and `socialMedia[*]` / `social_media[*]` entries from FormData before appending the single correct value.
   - Ensures no leftover or duplicate key from the generic loop or from API/snake_case.

3. **AddCompanyForm**

   - “No existing socialMedia” branch now sends the same single JSON array format instead of indexed keys.
   - When there is existing `client.socialMedia`, we still build `newSocialMedias` with both `social_media_id` and `account_name` per item, and filter out any item without a valid `social_media_id` (to tolerate wrong API shape).
   - Defensive use of `social_media_id`: `socialMedia.id ?? (socialMedia as { social_media_id?: number }).social_media_id`.

4. **Debug log**
   - `console.log("[CompanyForm] formData entries", [...formData.entries()]);` kept temporarily so you can verify in the browser that FormData contains exactly one `socialMedia` entry with the correct JSON.

---

## What to verify

1. Reproduce the edit-company flow with Instagram set; in the console, check the logged FormData entries and confirm there is only one `socialMedia` key with the expected JSON.
2. Confirm the backend no longer returns `Undefined array key "social_media_id"` and that company social links save correctly.

No backend changes were made; only the dashboard forms were updated.
