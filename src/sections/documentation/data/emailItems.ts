/**
 * Catálogo explícito de emails (source of truth por Mailable).
 * Índice 1–54 del documento "Texto emails NOMADE".
 * send_when: descripción exacta de cuándo se envía ESTE email (a su destinatario). No inferir desde preview/subject/title.
 * mailableClass: clase Mailable para preview (GET /api/mailables/{ClassName}). null si no hay preview.
 */
export type TriggerType = "auto" | "influencer" | "company" | "nomade";

export interface EmailItem {
  n: number | string;
  title: string;
  subject: string;
  trigger: TriggerType;
  /** Descripción explícita: cuándo se envía este email y a quién. Source of truth, no derivada. */
  send_when: string;
  mailableClass: string | null;
}

export const EMAIL_ITEMS: readonly EmailItem[] = [
  {
    n: 1,
    title: "Solicitud de alta (por influencer)",
    subject: "Nuevo registro – {fullName}{instagramHandle}",
    trigger: "auto",
    send_when:
      "Se envía a Nomade cuando un influencer solicita el alta desde la app.",
    mailableClass: "RegistrationInfluencerAdminEmail",
  },
  {
    n: 2,
    title: "Email verificación de correo electrónico",
    subject: "✅ Verificación de correo electrónico",
    trigger: "auto",
    send_when:
      "Se envía al usuario (influencer o cliente) al registrarse para verificar su correo.",
    mailableClass: "VerifyEmail",
  },
  {
    n: 3,
    title: "Email bienvenida al influencer (registro aprobado)",
    subject: "¡Tu cuenta ha sido aprobada! Bienvenid@ a Nomade ✨",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade aprueba su solicitud de registro.",
    mailableClass: "ValidationInfluencerEmail",
  },
  {
    n: 4,
    title: "Solicitud de registro de influ no aprobado",
    subject: "Hemos revisado tu solicitud de acceso a Nomade",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade rechaza su solicitud de registro.",
    mailableClass: "RejectedRegistationInfluencerEmail",
  },
  {
    n: 5,
    title: "Solicitud de info lead (por web o app)",
    subject: "Hemos recibido tu solicitud de información",
    trigger: "auto",
    send_when:
      "Se envía al cliente (usuario de la company) cuando completa el registro de company (POST /api/companies/register).",
    mailableClass: "CompanyRegistrationReceivedEmail",
  },
  {
    n: 6,
    title: "Lead no interesa",
    subject: "—",
    trigger: "auto",
    send_when: "Nota interna; no hay email asociado.",
    mailableClass: null,
  },
  {
    n: 7,
    title:
      'Email "completar registro" ficha cliente – tras "Envío link" desde CMS',
    subject: "Completa tu registro en Nomade",
    trigger: "nomade",
    send_when:
      "Se envía al lead cuando desde el CMS se envía el link para completar el registro.",
    mailableClass: "LeadRegistrationLinkEmail",
  },
  {
    n: 8,
    title: "Email de bienvenida al cliente (registro completado)",
    subject: "¡Bienvenidos a Nomade Revolution!",
    trigger: "auto",
    send_when:
      "Se envía al cliente cuando desde el CMS se le asigna plan (pending → activo).",
    mailableClass: "ValidationCompanyEmail",
  },
  {
    n: "8.1",
    title: "Company Registration Onboarding Email",
    subject:
      "✅ Hemos recibido tu ficha – Nos pondremos en contacto para el onboarding",
    trigger: "company",
    send_when:
      "Se envía al cliente cuando completa el registro de company (POST /api/companies/register).",
    mailableClass: "CompanyRegistrationOnboardingEmail",
  },
  {
    n: 9,
    title: "Restablecer contraseña",
    subject: "Recuperación de contraseña",
    trigger: "auto",
    send_when: "Se envía al usuario cuando solicita restablecer contraseña.",
    mailableClass: "ResetCodePasswordEmail",
  },
  {
    n: 10,
    title: "Solicitud de collab (por influencer)",
    subject: "Solicitud de colaboración enviada – {clientName}",
    trigger: "influencer",
    send_when:
      "Se envía al influencer cuando solicita una colaboración desde la app (confirmación).",
    mailableClass: "NewColabInfluencerEmail",
  },
  {
    n: 11,
    title: "Solicitud aceptada (Por Nomade)",
    subject: "Nueva solicitud de colaboración en Nomade",
    trigger: "nomade",
    send_when:
      "Se envía al cliente cuando Nomade acepta la solicitud de collab.",
    mailableClass: "AcceptedColabCompanyEmail",
  },
  {
    n: 12,
    title: "Solicitud pdt aceptar (Por cliente) - 1er recordatorio",
    subject: "Recordatorio: Tienes una colaboración pendiente de aceptación",
    trigger: "auto",
    send_when:
      "PENDING_COMPANY: si faltan ≥9h para el evento se envía 6h antes del evento; si faltan <9h se envía a mitad del tiempo restante (solo este recordatorio).",
    mailableClass: "PendingColabReminder1CompanyEmail",
  },
  {
    n: 13,
    title: "Solicitud pdt aceptar (Por cliente) – 2o recordatorio",
    subject:
      "⏳ Último recordatorio: Tienes una solicitud de colaboración pendiente",
    trigger: "auto",
    send_when:
      "PENDING_COMPANY: solo si faltan ≥9h para el evento. Se envía 4h antes del evento (nunca antes que el 1er recordatorio).",
    mailableClass: "PendingColabReminder2CompanyEmail",
  },
  {
    n: 14,
    title: "Solicitud pdt aceptar (Por cliente) – cancelación automática",
    subject:
      "Solicitud cancelada automáticamente – {companyName} y {influencerFullName} ({instagramUser})",
    trigger: "auto",
    send_when:
      "Cancelación automática PENDING_COMPANY: company recibe email + push; influencer recibe email + push. El email al influencer se envía correctamente al correo del influencer.",
    mailableClass: "AutoCanceledColabCompanyEmail",
  },
  {
    n: 15,
    title: "Solicitud aceptada (Por cliente) – noti/email al influ",
    subject: "✅ ¡Colaboración confirmada con {offerName}!",
    trigger: "company",
    send_when: "Se envía al influencer cuando el cliente acepta la collab.",
    mailableClass: "AcceptedColabInfluencerEmail",
  },
  {
    n: 16,
    title: "Solicitud aceptada (Por cliente) – noti/email al cliente",
    subject:
      "Has aceptado una colaboración con {influencerFullName} (@{instagramUser})",
    trigger: "company",
    send_when: "Se envía al cliente cuando acepta la collab (confirmación).",
    mailableClass: "ClientAcceptedColabCompanyEmail",
  },
  {
    n: 17,
    title: "Alerta en pantalla: Colaboración aceptada",
    subject: "—",
    trigger: "auto",
    send_when: "Notificación en pantalla; no hay email.",
    mailableClass: null,
  },
  {
    n: 18,
    title: "Alerta en pantalla: Colaboración rechazada",
    subject: "—",
    trigger: "auto",
    send_when: "Notificación en pantalla; no hay email.",
    mailableClass: null,
  },
  {
    n: 19,
    title: "Solicitud rechazada (por Nomade)",
    subject: "Solicitud no aceptada – {offerName}",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade rechaza la solicitud de collab.",
    mailableClass: "RejectedColabInfluencerEmail",
  },
  {
    n: 20,
    title: "Solicitud rechazada (Por cliente)",
    subject: "Solicitud de reserva no aceptada",
    trigger: "company",
    send_when: "Se envía al influencer cuando el cliente rechaza la collab.",
    mailableClass: "RejectedColabNomadeEmail",
  },
  {
    n: 21,
    title: "Apertura de chat (por influencer)",
    subject: "Nuevo mensaje de {displayHandle}",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer solicita modificación a través chat de la collab.",
    mailableClass: "NewChatCompanyEmail",
  },
  {
    n: 22,
    title: "Apertura de chat (por cliente)",
    subject: "Nuevo mensaje de {company}",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente envía un mensaje en el chat de la collab.",
    mailableClass: "NewChatInfluencerEmail",
  },
  {
    n: 23,
    title: "Nuevo mensaje de chat",
    subject: "Nuevo mensaje de {company}",
    trigger: "auto",
    send_when:
      "Se envía al influencer cuando el cliente (company) provoca la transición de la colaboración a estado Modificación en curso.",
    mailableClass: "NewChatInfluencerEmail",
  },
  {
    n: 24,
    title: "Contenido publicado",
    subject:
      "🧾 {instagramUsername} ha publicado el contenido de tu colaboración",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer marca el contenido como publicado.",
    mailableClass: "PublishedContentCompanyEmail",
  },
  {
    n: 25,
    title: "Producto enviado",
    subject: "Producto enviado a {instagramUsername}",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente registra el envío del producto.",
    mailableClass: "ProductSentInfluencerEmail",
  },
  {
    n: 26,
    title: "Recordatorio 1: Producto enviado",
    subject: "Recordatorio: confirmar envío de producto",
    trigger: "auto",
    send_when:
      "Se envía automáticamente 4 días después de que la colaboración (tipo Delivery) pase a estado “Aceptada”, siempre que el cliente aún no haya marcado el producto como enviado y la colaboración siga en estado ACCEPTED.",
    mailableClass: "ProductSentReminder1CompanyEmail",
  },
  {
    n: 27,
    title: "Recordatorio 2: Producto enviado",
    subject: "Segundo recordatorio: confirmar envío de producto",
    trigger: "auto",
    send_when:
      "Se envía automáticamente 11 días después de que la colaboración (tipo Delivery) pase a estado “Aceptada”, siempre que el cliente aún no haya marcado el producto como enviado y la colaboración siga en estado ACCEPTED.",
    mailableClass: "ProductSentReminder2CompanyEmail",
  },
  {
    n: 28,
    title: "Incidencia de talla",
    subject: "⚠️ Incidencia de talla reportada por {displayHandle}",
    trigger: "company",
    send_when:
      "Se envía a Nomade (y/o cliente según flujo) cuando se registra una incidencia de talla.",
    mailableClass: "IncidentSizeCompanyEmail",
  },
  {
    n: 29,
    title: "Incidencia de producto equivocado",
    subject: "⚠️ Incidencia: producto erróneo enviado a {displayHandle}",
    trigger: "company",
    send_when:
      "Se envía cuando se registra una incidencia de producto equivocado.",
    mailableClass: "IncidentWrongProductCompanyEmail",
  },
  {
    n: 30,
    title: "Incidencia general (Otras razones)",
    subject: "⚠️ Incidencia reportada por {displayHandle}",
    trigger: "company",
    send_when: "Se envía cuando se registra una incidencia de otro tipo.",
    mailableClass: "IncidentOtherCompanyEmail",
  },
  {
    n: 31,
    title: "Producto recibido",
    subject: "¡Paquete entregado a {influencerName} – {instagramUsername}!",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer confirma que ha recibido el producto.",
    mailableClass: "ProductReceivedCompanyEmail",
  },
  {
    n: 32,
    title: "Recordatorio 1: Producto recibido",
    subject: "📦 ¿Has recibido ya tu paquete de {company}?",
    trigger: "auto",
    send_when:
      "Se envía automáticamente 7 días después de que el cliente marque el producto como enviado (estado SENT), siempre que el influencer aún no haya confirmado la recepción y la colaboración siga en estado SENT.",
    mailableClass: "Reminder1ProductReceivedInfluencerEmail",
  },
  {
    n: 33,
    title: "Alerta en pantalla: Oferta favorita modificada",
    subject: "Modificación oferta",
    trigger: "auto",
    send_when:
      "Actualmente no se envía. El envío está deshabilitado en backend (método con return).",
    mailableClass: "FavouriteOfferUpdateInfluencerEmail",
  },
  {
    n: 34,
    title: "Recordatorio 1 para publicación de contenido",
    subject: "📸 ¿Ya has subido tu contenido de {clientName}?",
    trigger: "auto",
    send_when: "Se envía al influencer: 10 días después de Producto recibido.",
    mailableClass: "Reminder1PublishContentNoCalendarEmail",
  },
  {
    n: "34.1",
    title: "Recordatorio 1 para publicación de contenido",
    subject: "📸 ¿Ya has subido tu contenido de {clientName}?",
    trigger: "auto",
    send_when: "5 días después del evento (Collabs con calendario)",
    mailableClass: "Reminder1PublishContentCalendarEmail",
  },
  {
    n: 35,
    title: "Recordatorio 2 para publicación de contenido",
    subject: "🔔 Recuerda subir tu contenido de {clientName}",
    trigger: "auto",
    send_when: "Se envía al influencer: 20 días después de Producto recibido.",
    mailableClass: "Reminder2PublishContentNoCalendarEmail",
  },
  {
    n: "35.1",
    title: "Recordatorio 2 para publicación de contenido",
    subject: "🔔 Recuerda subir tu contenido de la collab con {clientName}",
    trigger: "auto",
    send_when: "11 días después del evento (Collabs con calendario)",
    mailableClass: "Reminder2PublishContentCalendarEmail",
  },
  {
    n: 36,
    title: "Recordatorio 3 para publicación de contenido",
    subject: "📣 Quedan pocos días para subir tu contenido de {clientName}",
    trigger: "auto",
    send_when: "Se envía al influencer: 27 días después de Producto recibido.",
    mailableClass: "Reminder3PublishContentNoCalendarEmail",
  },
  {
    n: "36.1",
    title: "Recordatorio 3 para publicación de contenido",
    subject: "⏰ Último día para subir tu contenido de {clientName}",
    trigger: "auto",
    send_when: "14 días después del evento (Collabs con calendario)",
    mailableClass: "Reminder3PublishContentCalendarEmail",
  },
  {
    n: 37,
    title: "Recordatorio 4 para publicación de contenido",
    subject: "Último día para subir tu contenido de {clientName}",
    trigger: "auto",
    send_when: "Se envía al influencer: 29 días después de Producto recibido.",
    mailableClass: "Reminder4PublishContentNoCalendarEmail",
  },
  {
    n: 38,
    title: "Recordatorio collab calendario 24h (Influencer)",
    subject: "⏰ Recordatorio: collab confirmada para mañana con {clientName}",
    trigger: "auto",
    send_when:
      "Se envía al influencer 24 h antes del día de la collab en calendario.",
    mailableClass: "Reminder24HoursCalendarInfluencerEmail",
  },
  {
    n: 39,
    title: "Recordatorio collab calendario 2h (Influencer)",
    subject: "⏰ Tu colaboración con {clientName} es en 2 horas",
    trigger: "auto",
    send_when: "Se envía al influencer 2 h antes del evento en calendario.",
    mailableClass: "Reminder2HoursCalendarInfluencerEmail",
  },
  {
    n: 40,
    title: "Recordatorio collab calendario 1h (Cliente)",
    subject:
      "Recordatorio: Colaboración en 1h con {influencerFullName} ({instagramUsername})",
    trigger: "auto",
    send_when: "Se envía al cliente 1 h antes del evento en calendario.",
    mailableClass: "Reminder1HourCalendarCompanyEmail",
  },
  {
    n: 41,
    title: "Solicitud modificacion collab pdt aceptar Cliente (por influencer)",
    subject: "Has modificado tu solicitud de colaboración con {company}",
    trigger: "influencer",
    send_when: "Se envía al influencer cuando modifica la collab.",
    mailableClass: "InfluencerModificationRequestInfluencerEmail",
  },
  {
    n: 42,
    title: "Solicitud modificacion collab aceptada (por influencer)",
    subject: "Has solicitado un cambio en tu colaboración con {clientName}",
    trigger: "influencer",
    send_when:
      "Se envía al influencer informando de su solicitud de modificación.",
    mailableClass: "ConfirmedModificationRequestInfluencerEmail",
  },
  {
    n: 42.1,
    title: "Solicitud modificacion collab aceptada (por influencer)",
    subject:
      "{influencerName} ({instagramUsername}) ha solicitado un cambio en la colaboración confirmada",
    trigger: "influencer",
    send_when:
      "Se envía al cliente informando de una solicitud de modificación del influencer",
    mailableClass: "ConfirmedModificationRequestCompanyEmail",
  },
  {
    n: 43,
    title: "Alerta en pantalla: Reserva modificada",
    subject: "Nueva fecha para tu {collabType} con {companyName}",
    trigger: "auto",
    send_when:
      "Actualmente no se envía, mail antiguo previo al sistema de solicitu de mofificación actual",
    mailableClass: "DateChangedColabEmail",
  },
  {
    n: 44,
    title: "Solicitud modificacion collab (por influencer) 2: 1er recordatorio",
    subject:
      "⏰ Recordatorio: solicitud de modificación pendiente de gestionar",
    trigger: "auto",
    send_when:
      "Se programa para enviarse 24h antes del evento, pero solo si en el momento de la solicitud faltan más de 24h",
    mailableClass: "InfluencerModificationReminderCompanyEmail",
  },
  {
    n: 45,
    title: "Solicitud modificacion collab (por influencer) 3: 2º recordatorio",
    subject: "⚠️ Último aviso: solicitud de modificación pendiente de revisión",
    trigger: "auto",
    send_when:
      "Se programa para enviarse 48h antes del evento, pero solo si en el momento de la solicitud faltan más de 48h.",
    mailableClass: "InfluencerModificationReminder2CompanyEmail",
  },
  {
    n: 46,
    title:
      "Solicitud modificacion collab (por influencer) 4: cancelación automática",
    subject:
      "❌ Collab cancelada automáticamente – {clientName} y {influencerFullName} ({instagramUsername})",
    trigger: "auto",
    send_when:
      "Se envía al cliente cuando una collab en ‘Modificación en curso’ se cancela automáticamente al entrar en la ventana de expiración: cuando faltan 2 horas o menos para la fecha/hora del evento (o ya ha pasado). La cancelación la ejecuta el comando nomade:cancel-expired-collaborations (cada minuto de 08:00 a 22:00). Si el cliente acepta la modificación y la collab vuelve a ACCEPTED, se cancelan automáticamente estos recordatorios.",
    mailableClass: "AutoCanceledModificationCompanyEmail",
  },
  {
    n: 47,
    title: "Cliente confirma modificación",
    subject:
      "✅ Has confirmado la modificación en tu colaboración con {influencerFullName}",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente confirma la modificación de la collab.",
    mailableClass: "ConfirmedModificationCompanyEmail",
  },
  {
    n: 48,
    title: "Cliente cancela collab en modificacion",
    subject:
      "❌ Collab cancelada – {clientName} y {influencerFullName} ({instagramUsername})",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente cancela la collab durante una modificación pendiente.",
    mailableClass: "ClientCanceledModificationCompanyEmail",
  },
  {
    n: 49,
    title: "Cliente cancela collab aceptada",
    subject:
      "Has cancelado la colaboración con {influencerFullName} ({instagramUsername})",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente cancela una collab ya aceptada.",
    mailableClass: "ClientCanceledAcceptedCompanyEmail",
  },
  {
    n: 50,
    title: "Cliente cancela collab pendiente de aceptar",
    subject:
      "Has cancelado la solicitud de colaboración con {influencerFullName} ({instagramUsername})",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente rechaza o cancela la collab pendiente de aceptar.",
    mailableClass: "ClientCanceledPendingCompanyEmail",
  },
  {
    n: 51,
    title: "Influencer cancela collab pdt aceptar por Nomade",
    subject: "Has cancelado tu solicitud de collab con {clientName}",
    trigger: "influencer",
    send_when:
      "Se envía a Nomade cuando el influencer cancela la solicitud antes de que Nomade la acepte.",
    mailableClass: "InfluencerCanceledPendingNomadeEmail",
  },
  {
    n: 52,
    title: "Influencer cancela collab pdt aceptar por cliente",
    subject:
      "Cancelación de solicitud de colaboración de {influencerFullName} ({instagramUsername})",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer cancela la collab pendiente de aceptar.",
    mailableClass: "InfluencerCanceledPendingCustomerEmail",
  },
  {
    n: 53,
    title: "Nomade cancela collab pdt aceptar por Nomade",
    subject: "Collab cancelada con {clientName}",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade cancela la collab pendiente de aceptar.",
    mailableClass: "NomadeCanceledPendingInfluencerEmail",
  },
  {
    n: 54,
    title: "Nomade cancela collab pdt aceptar por el cliente",
    subject:
      "Colaboración cancelada con {influencerFullName} ({instagramUsername})",
    trigger: "nomade",
    send_when:
      "Se envía al cliente cuando Nomade cancela la collab pendiente de aceptar.",
    mailableClass: "NomadeCanceledPendingClientCompanyEmail",
  },
  {
    n: 55,
    title: "NomadeCanceledPendingInfluencerEmail",
    subject: "Collab cancelada con [Nombre del cliente]",
    trigger: "nomade",
    send_when:
      "Email enviado al influencer cuando Nomade cancela una colaboración que ya había sido aceptada.",
    mailableClass: "NomadeCanceledPendingInfluencerEmail",
  },
  {
    n: 56,
    title: "NomadeCanceledPendingClientCompanyEmail",
    subject:
      "Colaboración cancelada con [Nombre y apellido del influencer] (@usuarioInstagram)",
    trigger: "nomade",
    send_when:
      "Email enviado al cliente cuando Nomade cancela una colaboración que ya había sido aceptada.",
    mailableClass: "NomadeCanceledPendingClientCompanyEmail",
  },
  {
    n: 57,
    title: "PendingBrandCollabReminder1CompanyEmail",
    subject: "Recordatorio: Tienes una solicitud de colaboración pendiente",
    trigger: "company",
    send_when:
      "48 horas después de que Nomade valida la colaboración Brand (t0 + 48h). Se envía si la colaboración sigue en estado PENDING_COMPANY.",
    mailableClass: "PendingBrandCollabReminder1CompanyEmail",
  },
  {
    n: 58,
    title: "PendingBrandCollabReminder2CompanyEmail",
    subject: "Recordatorio: Tienes una colaboración pendiente de revisar",
    trigger: "company",
    send_when:
      "96 horas después de la validación de Nomade (t0 + 96h). Se envía si la colaboración sigue en estado PENDING_COMPANY.",
    mailableClass: "PendingBrandCollabReminder2CompanyEmail",
  },
  {
    n: 59,
    title: "PendingBrandCollabReminder3CompanyEmail",
    subject: "⏳ Último recordatorio: solicitud de colaboración pendiente",
    trigger: "company",
    send_when:
      "144 horas después de la validación de Nomade (t0 + 144h). Último recordatorio antes de la cancelación automática.",
    mailableClass: "PendingBrandCollabReminder3CompanyEmail",
  },
  {
    n: 60,
    title: "Recordatorio diario fuera de plazo (publicación de contenido)",
    subject: "⏰ Contenido fuera de plazo – {clientName}",
    trigger: "auto",
    send_when:
      "Se envía al influencer diariamente desde el día posterior al último día de publicación (datable: día 15+, brand: día 30+) mientras la collab siga sin publicarse.",
    mailableClass: "PublishContentOverdueDailyInfluencerEmail",
  },
] as const;
