/**
 * Catálogo explícito de emails (source of truth por Mailable).
 * Índice 1–54 del documento "Texto emails NOMADE".
 * send_when: descripción exacta de cuándo se envía ESTE email (a su destinatario). No inferir desde preview/subject/title.
 * mailableClass: clase Mailable para preview (GET /api/mailables/{ClassName}). null si no hay preview.
 */
export type TriggerType = "auto" | "influencer" | "company" | "nomade";

export interface EmailItem {
  n: number;
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
    subject: "Nuevo registro – {influencerFullName} (@{instagramHandle})",
    trigger: "auto",
    send_when:
      "Se envía a Nomade cuando un influencer solicita el alta desde la app.",
    mailableClass: "RegistrationInfluencerAdminEmail",
  },
  {
    n: 2,
    title: "Email verificación de correo electrónico",
    subject: "Verifica tu correo electrónico",
    trigger: "auto",
    send_when:
      "Se envía al usuario (influencer o cliente) al registrarse para verificar su correo.",
    mailableClass: "VerifyEmail",
  },
  {
    n: 3,
    title: "Email bienvenida al influencer (registro aprobado)",
    subject: "Bienvenido a Nomade",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade aprueba su solicitud de registro.",
    mailableClass: "ValidationInfluencerEmail",
  },
  {
    n: 4,
    title: "Solicitud de registro de influ no aprobado",
    subject: "Solicitud de registro no aprobada",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade rechaza su solicitud de registro.",
    mailableClass: "RejectedRegistationInfluencerEmail",
  },
  {
    n: 5,
    title: "Solicitud de info lead (por web o app)",
    subject: "Hemos recibido tu solicitud de registro",
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
    subject: "Bienvenido a Nomade",
    trigger: "auto",
    send_when:
      "Se envía al cliente cuando desde el CMS se le asigna plan (pending → activo).",
    mailableClass: "ValidationCompanyEmail",
  },
  {
    n: 9,
    title: "Restablecer contraseña",
    subject: "Restablece tu contraseña",
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
    subject: "Solicitud aceptada por Nomade – {clientName}",
    trigger: "nomade",
    send_when:
      "Se envía al cliente cuando Nomade acepta la solicitud de collab.",
    mailableClass: "AcceptedColabCompanyEmail",
  },
  {
    n: 12,
    title: "Solicitud pdt aceptar (Por cliente) - 1er recordatorio",
    subject: "Recordatorio: tienes una solicitud de colaboración pendiente",
    trigger: "auto",
    send_when:
      "Se programa al validar Nomade y se envía 6 h después, salvo que la colaboración esté a menos de 9 h, en cuyo caso se envía a mitad de tiempo entre validación y fecha del evento..",
    mailableClass: "PendingColabReminder1CompanyEmail",
  },
  {
    n: 13,
    title: "Solicitud pdt aceptar (Por cliente) – 2o recordatorio",
    subject: "Segundo recordatorio: solicitud de colaboración pendiente",
    trigger: "auto",
    send_when:
      "Se envía tras la validación de Nomade (cuando la collab pasa a Pendiente de aceptación) como último recordatorio fijo a 4 h antes del evento, siempre que en el momento de validar todavía quede tiempo para ese envío (es decir, que ‘4 h antes’ siga quedando en el futuro).",
    mailableClass: "PendingColabReminder2CompanyEmail",
  },
  {
    n: 14,
    title: "Solicitud pdt aceptar (Por cliente) – cancelación automática",
    subject: "Solicitud de colaboración cancelada por falta de respuesta",
    trigger: "auto",
    send_when:
      "Se envía automáticamente cuando una colaboración pendiente no ha sido aceptada y la fecha del evento ya ha pasado o faltan 2 horas o menos para que ocurra, momento en el que el sistema la cancela automáticamente.",
    mailableClass: "AutoCanceledColabCompanyEmail",
  },
  {
    n: 15,
    title: "Solicitud aceptada (Por cliente) – noti/email al influ",
    subject: "Tu colaboración ha sido aceptada por el cliente",
    trigger: "company",
    send_when: "Se envía al influencer cuando el cliente acepta la collab.",
    mailableClass: "AcceptedColabInfluencerEmail",
  },
  {
    n: 16,
    title: "Solicitud aceptada (Por cliente) – noti/email al cliente",
    subject: "Has aceptado la colaboración con {influencerFullName}",
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
    subject: "Solicitud de colaboración no aceptada",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade rechaza la solicitud de collab.",
    mailableClass: "RejectedColabInfluencerEmail",
  },
  {
    n: 20,
    title: "Solicitud rechazada (Por cliente)",
    subject: "El cliente ha rechazado la colaboración",
    trigger: "company",
    send_when: "Se envía al influencer cuando el cliente rechaza la collab.",
    mailableClass: "RejectedColabNomadeEmail",
  },
  {
    n: 21,
    title: "Apertura de chat (por influencer)",
    subject: "Nuevo mensaje en la colaboración – {clientName}",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer solicita modificación a través chat de la collab.",
    mailableClass: "NewChatCompanyEmail",
  },
  {
    n: 22,
    title: "Apertura de chat (por cliente)",
    subject: "Nuevo mensaje en la colaboración – {influencerFullName}",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente envía un mensaje en el chat de la collab.",
    mailableClass: "NewChatInfluencerEmail",
  },
  {
    n: 23,
    title: "Nuevo mensaje de chat",
    subject: "Tienes un nuevo mensaje",
    trigger: "auto",
    send_when:
      "Se envía al influencer cuando el cliente (company) provoca la transición de la colaboración a estado Modificación en curso.",
    mailableClass: "NewChatInfluencerEmail",
  },
  {
    n: 24,
    title: "Contenido publicado",
    subject: "Contenido publicado – {influencerFullName}",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer marca el contenido como publicado.",
    mailableClass: "PublishedContentCompanyEmail",
  },
  {
    n: 25,
    title: "Producto enviado",
    subject: "Producto enviado – {clientName}",
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
    subject: "Incidencia en la colaboración – talla",
    trigger: "company",
    send_when:
      "Se envía a Nomade (y/o cliente según flujo) cuando se registra una incidencia de talla.",
    mailableClass: "IncidentSizeCompanyEmail",
  },
  {
    n: 29,
    title: "Incidencia de producto equivocado",
    subject: "Incidencia en la colaboración – producto equivocado",
    trigger: "company",
    send_when:
      "Se envía cuando se registra una incidencia de producto equivocado.",
    mailableClass: "IncidentWrongProductCompanyEmail",
  },
  {
    n: 30,
    title: "Incidencia general (Otras razones)",
    subject: "Incidencia en la colaboración",
    trigger: "company",
    send_when: "Se envía cuando se registra una incidencia de otro tipo.",
    mailableClass: "IncidentOtherCompanyEmail",
  },
  {
    n: 31,
    title: "Producto recibido",
    subject: "Producto recibido – {influencerFullName}",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer confirma que ha recibido el producto.",
    mailableClass: "ProductReceivedCompanyEmail",
  },
  {
    n: 32,
    title: "Recordatorio 1: Producto recibido",
    subject: "Recordatorio: confirmar recepción del producto",
    trigger: "auto",
    send_when:
      "Se envía automáticamente 7 días después de que el cliente marque el producto como enviado (estado SENT), siempre que el influencer aún no haya confirmado la recepción y la colaboración siga en estado SENT.",
    mailableClass: "Reminder1ProductReceivedInfluencerEmail",
  },
  {
    n: 33,
    title: "Alerta en pantalla: Oferta favorita modificada",
    subject: "Oferta favorita modificada – {clientName}",
    trigger: "auto",
    send_when:
      "Actualmente no se envía. El envío está deshabilitado en backend (método con return).",
    mailableClass: "FavouriteOfferUpdateInfluencerEmail",
  },
  {
    n: 34,
    title: "Recordatorio 1 para publicación de contenido",
    subject: "Recordatorio: publicar contenido – {clientName}",
    trigger: "auto",
    send_when: "Se envía al influencer: 10 días después de Producto recibido.",
    mailableClass: "Reminder1PublishContentNoCalendarEmail",
  },
  {
    n: 35,
    title: "Recordatorio 2 para publicación de contenido",
    subject: "Segundo recordatorio: publicar contenido",
    trigger: "auto",
    send_when: "Se envía al influencer: 20 días después de Producto recibido.",
    mailableClass: "Reminder2PublishContentNoCalendarEmail",
  },
  {
    n: 36,
    title: "Recordatorio 3 para publicación de contenido",
    subject: "Tercer recordatorio: publicar contenido",
    trigger: "auto",
    send_when: "Se envía al influencer: 27 días después de Producto recibido.",
    mailableClass: "Reminder3PublishContentNoCalendarEmail",
  },
  {
    n: 37,
    title: "Recordatorio 4 para publicación de contenido",
    subject: "Cuarto recordatorio: publicar contenido",
    trigger: "auto",
    send_when: "Se envía al influencer: 29 días después de Producto recibido.",
    mailableClass: "Reminder4PublishContentNoCalendarEmail",
  },
  {
    n: 38,
    title: "Recordatorio collab calendario 24h (Influencer)",
    subject: "Tu colaboración es mañana – {clientName}",
    trigger: "auto",
    send_when:
      "Se envía al influencer 24 h antes del día de la collab en calendario.",
    mailableClass: "Reminder24HoursCalendarInfluencerEmail",
  },
  {
    n: 39,
    title: "Recordatorio collab calendario 2h (Influencer)",
    subject: "Tu colaboración es en 2 horas – {clientName}",
    trigger: "auto",
    send_when: "Se envía al influencer 2 h antes del evento en calendario.",
    mailableClass: "Reminder2HoursCalendarInfluencerEmail",
  },
  {
    n: 40,
    title: "Recordatorio collab calendario 1h (Cliente)",
    subject: "Colaboración en 1 hora – {influencerFullName}",
    trigger: "auto",
    send_when: "Se envía al cliente 1 h antes del evento en calendario.",
    mailableClass: "Reminder1HourCalendarCompanyEmail",
  },
  {
    n: 41,
    title: "Solicitud modificacion collab pdt aceptar Cliente (por influencer)",
    subject: "Solicitud de modificación de colaboración – {clientName}",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer solicita modificar la collab.",
    mailableClass: "ModificationRequestInfluencerEmail",
  },
  {
    n: 42,
    title: "Solicitud modificacion collab aceptada (por influencer)",
    subject: "Modificación aceptada – {influencerFullName}",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente acepta su solicitud de modificación.",
    mailableClass: "ConfirmedModificationRequestInfluencerEmail",
  },
  {
    n: 43,
    title: "Alerta en pantalla: Reserva modificada",
    subject: "Reserva modificada – {clientName}",
    trigger: "auto",
    send_when:
      "Se envía al destinatario correspondiente cuando se modifica la fecha/reserva de la collab.",
    mailableClass: "DateChangedColabEmail",
  },
  {
    n: 44,
    title: "Solicitud modificacion collab (por influencer) 2: 1er recordatorio",
    subject: "Recordatorio: solicitud de modificación pendiente",
    trigger: "auto",
    send_when:
      "Se envía al cliente: primer recordatorio sobre modificación pendiente.",
    mailableClass: "InfluencerModificationReminderCompanyEmail",
  },
  {
    n: 45,
    title: "Solicitud modificacion collab (por influencer) 3: 2º recordatorio",
    subject: "Segundo recordatorio: modificación pendiente",
    trigger: "auto",
    send_when:
      "Se envía al cliente: segundo recordatorio sobre modificación pendiente.",
    mailableClass: "InfluencerModificationReminder2CompanyEmail",
  },
  {
    n: 46,
    title:
      "Solicitud modificacion collab (por influencer) 4: cancelación automática",
    subject: "Solicitud de modificación cancelada por falta de respuesta",
    trigger: "auto",
    send_when:
      "Se envía al cliente cuando la modificación se cancela por no responder.",
    mailableClass: "AutoCanceledModificationCompanyEmail",
  },
  {
    n: 47,
    title: "Cliente confirma modificación",
    subject: "El cliente ha confirmado la modificación",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente confirma la modificación de la collab.",
    mailableClass: "ConfirmedModificationCompanyEmail",
  },
  {
    n: 48,
    title: "Cliente cancela collab en modificacion",
    subject: "El cliente ha cancelado durante la modificación",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente cancela la collab durante una modificación pendiente.",
    mailableClass: "ClientCanceledModificationCompanyEmail",
  },
  {
    n: 49,
    title: "Cliente cancela collab aceptada",
    subject: "Colaboración cancelada por el cliente",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente cancela una collab ya aceptada.",
    mailableClass: "ClientCanceledAcceptedCompanyEmail",
  },
  {
    n: 50,
    title: "Cliente cancela collab pendiente de aceptar",
    subject: "El cliente ha rechazado la colaboración",
    trigger: "company",
    send_when:
      "Se envía al influencer cuando el cliente rechaza o cancela la collab pendiente de aceptar.",
    mailableClass: "ClientCanceledPendingCompanyEmail",
  },
  {
    n: 51,
    title: "Influencer cancela collab pdt aceptar por Nomade",
    subject: "El influencer ha cancelado la solicitud",
    trigger: "influencer",
    send_when:
      "Se envía a Nomade cuando el influencer cancela la solicitud antes de que Nomade la acepte.",
    mailableClass: "InfluencerCanceledPendingNomadeEmail",
  },
  {
    n: 52,
    title: "Influencer cancela collab pdt aceptar por cliente",
    subject: "El influencer ha cancelado la colaboración",
    trigger: "influencer",
    send_when:
      "Se envía al cliente cuando el influencer cancela la collab pendiente de aceptar.",
    mailableClass: "InfluencerCanceledPendingCustomerEmail",
  },
  {
    n: 53,
    title: "Nomade cancela collab pdt aceptar por Nomade",
    subject: "Nomade ha cancelado la solicitud de colaboración",
    trigger: "nomade",
    send_when:
      "Se envía al influencer cuando Nomade cancela la collab pendiente de aceptar.",
    mailableClass: "NomadeCanceledPendingInfluencerEmail",
  },
  {
    n: 54,
    title: "Nomade cancela collab pdt aceptar por el cliente",
    subject: "Nomade ha cancelado la colaboración",
    trigger: "nomade",
    send_when:
      "Se envía al cliente cuando Nomade cancela la collab pendiente de aceptar.",
    mailableClass: "NomadeCanceledPendingClientCompanyEmail",
  },
] as const;
