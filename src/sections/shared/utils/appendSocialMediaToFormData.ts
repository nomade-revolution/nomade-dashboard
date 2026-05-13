export type SocialMediaFormInput = {
  social_media_id: number | string;
  account_name: string;
};

/**
 * Appends social media rows to FormData using bracket notation (same pattern as contacts).
 * Note: multipart values are always strings on the wire; Laravel still validates `integer` rules.
 */
export function appendSocialMediaToFormData(
  fd: FormData,
  items: SocialMediaFormInput[] | undefined | null,
): void {
  if (!Array.isArray(items) || items.length === 0) return;

  items.filter(Boolean).forEach((row, index) => {
    fd.append(
      `socialMedia[${index}][social_media_id]`,
      String(row.social_media_id ?? ""),
    );
    fd.append(`socialMedia[${index}][account_name]`, row.account_name ?? "");
  });
}
