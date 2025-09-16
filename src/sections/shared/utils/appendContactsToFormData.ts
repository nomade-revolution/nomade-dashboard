import { Contact } from "modules/contact/domain/Contact";

export type ContactInput = {
  name: string;
  surname: string;
  email: string;
  phone?: string | null;
  type_id: number | string;
};

/**
 * Appends contacts to FormData using bracket notation format
 * This matches the admin cms-register flow exactly
 *
 * @param fd - FormData instance to append to
 * @param contacts - Array of contacts to serialize
 */
export function appendContactsToFormData(
  fd: FormData,
  contacts: ContactInput[] | Contact[] | undefined | null,
): void {
  if (!Array.isArray(contacts)) return;

  contacts.filter(Boolean).forEach((contact, index) => {
    // Ensure all values are strings for FormData
    const safe = {
      name: contact?.name ?? "",
      surname: contact?.surname ?? "",
      email: contact?.email ?? "",
      phone: contact?.phone ?? "",
      type_id: String(contact?.type_id ?? ""),
    };

    fd.append(`contacts[${index}][name]`, safe.name);
    fd.append(`contacts[${index}][surname]`, safe.surname);
    fd.append(`contacts[${index}][email]`, safe.email);
    fd.append(`contacts[${index}][phone]`, safe.phone);
    fd.append(`contacts[${index}][type_id]`, safe.type_id);
  });
}
