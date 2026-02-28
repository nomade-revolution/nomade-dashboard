/**
 * Listado 1–41 de notificaciones push (documentación).
 * Fuente: docs/PushNotifications.md / NotificationService (nomade-back).
 */
export type PushNotificationStatus = "active" | "inactive" | "not_exists";

export interface PushNotificationItem {
  id: number;
  name: string;
  context: string;
  title: string;
  body: string;
  method: string;
  status: PushNotificationStatus;
}

export const pushNotifications: readonly PushNotificationItem[] = [
  {
    id: 1,
    name: "Email bienvenida al influencer (registro aprobado)",
    context: "Influencer activado tras verify",
    title: "Bienvenido a Nomade.",
    body: "Ya puedes acceder a tu cuenta con el email y contraseña que nos has facilitado.",
    method: "UserController: MessagingService::sendNotificationToUser",
    status: "active",
  },
  {
    id: 2,
    name: "Solicitud de collab (por influencer)",
    context: "Colab creada (PENDING_NOMADE), push al influencer",
    title: "Solicitud de colaboración / Solicitud de reserva",
    body: "Hemos recibido tu solicitud de reserva para $day $time en $offerName (u otras variantes según tipo)",
    method: "sendNewColabInfluencerNotification",
    status: "active",
  },
  {
    id: 3,
    name: "Solicitud aceptada (Por Nomade)",
    context: "PENDING_NOMADE → PENDING_COMPANY, push al cliente",
    title: "✨ Nueva solicitud de colaboración.",
    body: "$influencerFullName (@$influencerName) ha solicitado colaborar con $offerName. (u otra con fecha/hora si datable)",
    method: "sendNewColabCompanyNotification",
    status: "active",
  },
  {
    id: 4,
    name: "Solicitud pdt aceptar (Por cliente) - 1er recordatorio",
    context: "PENDING_COMPANY: si ≥9h → 6h antes; si <9h → mitad del tiempo",
    title: "🔔 Solicitud pendiente de respuesta",
    body: "¡Ojo! Tienes una solicitud de colaboración pendiente. Revísala a tiempo para no perderla.",
    method: "sendPendingColabReminder1CompanyNotification",
    status: "active",
  },
  {
    id: 5,
    name: "Solicitud pdt aceptar (Por cliente) - 2º recordatorio",
    context: "PENDING_COMPANY: solo si ≥9h; 4h antes del evento",
    title: "⚠️ Solicitud a punto de cancelarse",
    body: "Recuerda revisar la solicitud de colaboración pendiente antes de que se cancele automáticamente.",
    method: "sendPendingColabReminder2CompanyNotification",
    status: "active",
  },
  {
    id: 6,
    name: "Solicitud pdt aceptar (Por cliente) - cancelación automática",
    context:
      "Cancelación automática PENDING_COMPANY; company e influencer reciben email + push",
    title:
      "🔴 Solicitud cancelada (company) / 🔴 Solicitud cancelada (influencer)",
    body: "La solicitud de colaboración con $influencerFullName (@$influencerAcco) se ha cancelado automáticamente por falta de respuesta. / La solicitud de collab con $offer ha sido cancelada.",
    method:
      "sendAutoCanceledColabCompanyNotification, sendAutoCanceledColabInfluencerNotification",
    status: "active",
  },
  {
    id: 7,
    name: "Solicitud aceptada (Por cliente) - noti/email al influ",
    context: "PENDING_COMPANY → ACCEPTED, push al influencer",
    title: "✅  ¡Colaboración confirmada!",
    body: "Variantes: Tu collab con $offerName ha sido confirmada para el $dayShort a las $time. / Tu solicitud de reserva para $day en $offerName ha sido aceptada. / Tu solicitud de colaboración con $offerName ha sido aceptada. / Tu collab con $offerName ha sido confirmada.",
    method: "sendAcceptedColabInfluencerNotification",
    status: "active",
  },
  {
    id: 8,
    name: "Solicitud aceptada (Por cliente) - noti/email al cliente",
    context: "PENDING_COMPANY → ACCEPTED, push al cliente",
    title: "✅ ¡Colaboración aceptada!",
    body: "Has aceptado la colaboración con {$influencerFullName}. Te avisaremos si hay novedades.",
    method: "sendClientAcceptedColabCompanyNotification",
    status: "active",
  },
  {
    id: 9,
    name: "Solicitud rechazada (por Nomade)",
    context: "Rechazo por Nomade/Company, push al influencer",
    title: "Solicitud no aceptada",
    body: "Tu solicitud de collab con $offerName no ha sido aceptada. Puedes seguir explorando nuevas ofertas en la app ✨ (y variantes por tipo/datable)",
    method: "sendRejectedColabInfluencerNotification",
    status: "active",
  },
  {
    id: 10,
    name: "Solicitud rechazada (Por cliente)",
    context: "Rechazo por cliente",
    title: "(igual que 9)",
    body: "(igual que 9)",
    method: "sendRejectedColabInfluencerNotification",
    status: "active",
  },
  {
    id: 11,
    name: "Nuevo mensaje en chat (inicio de conversación)",
    context:
      "MODIFICATION: primer mensaje / apertura chat (Company o Influencer)",
    title: "📩 Nuevo mensaje recibido",
    body: "Has recibido un mensaje de $username. (company) / Has recibido un mensaje de $companyName. (influencer)",
    method: "sendNewChatCompanyNotification, sendNewChatInfluencerNotification",
    status: "active",
  },
  {
    id: 12,
    name: "Nuevo mensaje de chat",
    context: "Cualquier mensaje en chat existente",
    title: "Nuevo mensaje de $name",
    body: "$message (body = texto del mensaje)",
    method: "sendChatMessageSentNotification",
    status: "active",
  },
  {
    id: 13,
    name: "Contenido publicado",
    context: "Colab FINISHED",
    title:
      "Contenido publicado (company) / ¡Gracias por compartir tu contenido! (influencer)",
    body: "Tu collab con $username ya ha sido publicada. ¡Échale un vistazo! (company) / Esperamos que disfrutes de nuevas collabs muy pronto (influencer)",
    method:
      "sendPublishedContentCompanyNotification, sendPublishedContentInfluencerNotification",
    status: "active",
  },
  {
    id: 14,
    name: "Producto enviado",
    context: "ACCEPTED → SENT",
    title:
      "📦 ¡Tu paquete está en camino! (influencer) / 📦 Envío confirmado (company)",
    body: "El producto de tu collab con $companyName ha sido enviado. Recuerda marcarlo como recibido cuando lo tengas. / Te avisaremos cuando $username reciba el paquete correctamente.",
    method:
      "sendProductSentInfluencerNotification, sendProductSentCompanyNotification",
    status: "active",
  },
  {
    id: 15,
    name: "Recordatorio 1: Producto enviado",
    context: "4 días después de SENT, company",
    title: "📦 ¿Has enviado el producto?",
    body: "Si ya lo has hecho, no olvides marcarlo como enviado para seguir con la colaboración.",
    method: "sendProductSentReminder1CompanyNotification",
    status: "active",
  },
  {
    id: 16,
    name: "Recordatorio 2: Producto enviado",
    context: "11 días después de SENT, company",
    title: "📦 ¿Aún no has enviado el producto?",
    body: "Si ya lo hiciste, márcalo como enviado desde tu cuenta para seguir con la collab.",
    method: "sendProductSentReminder2CompanyNotification",
    status: "active",
  },
  {
    id: 17,
    name: "Incidencia de talla",
    context: "Incidencia talla",
    title: "⚠️ Incidencia de talla reportada",
    body: "$username ha informado de un problema con la talla del producto... (company) / La marca ha sido informada. Escríbeles desde el chat... (influencer)",
    method:
      "sendIncidentSizeCompanyNotification, sendIncidentSizeInfluencerNotification",
    status: "active",
  },
  {
    id: 18,
    name: "Incidencia de producto equivocado",
    context: "Incidencia producto equivocado",
    title: "⚠️ Incidencia reportada",
    body: "$username ha recibido un producto erróneo... (company) / $companyName ya ha sido informado... (influencer)",
    method:
      "sendIncidentWrongProductCompanyNotification, sendIncidentWrongProductInfluencerNotification",
    status: "active",
  },
  {
    id: 19,
    name: "Incidencia general (Otras razones)",
    context: "Incidencia otras",
    title: "⚠️ Incidencia reportada",
    body: "$instagramUsername ha reportado una incidencia... (company) / $clientName ya ha sido informado... (influencer)",
    method:
      "sendIncidentOtherCompanyNotification, sendIncidentOtherInfluencerNotification",
    status: "active",
  },
  {
    id: 20,
    name: "Producto recibido",
    context: "SENT → RECEIVED",
    title:
      "📦 Paquete recibido (company) / 📦 ¡Producto recibido correctamente! (influencer)",
    body: "$instagramUsername ha confirmado que ha recibido correctamente el producto... / Ahora dispones de 4 semanas para publicar el contenido...",
    method:
      "sendProductReceivedCompanyNotification, sendProductReceivedInfluencerNotification",
    status: "active",
  },
  {
    id: 21,
    name: "Recordatorio 1: Producto recibido",
    context: "7 días después RECEIVED, influencer",
    title: "📦 ¿Has recibido el producto?",
    body: "Si ya lo has hecho, no olvides marcarlo como recibido para seguir con la colaboración.",
    method: "sendReminder1ProductReceivedInfluencerNotification",
    status: "active",
  },
  {
    id: 22,
    name: "Alerta en pantalla: Oferta favorita modificada",
    context: "Oferta favorita modificada",
    title: "Modificación oferta",
    body: "$offerName ha modificado una de tus ofertas favoritas.",
    method: "sendFavouriteOfferUpdateInfluencerNotification",
    status: "active",
  },
  {
    id: 23,
    name: "Recordatorio 1 para publicación de contenido",
    context: "Día 5/10, comando reminders:publish-content",
    title: "📸 ¿Ya has subido el contenido?",
    body: "Si aún no lo has hecho, recuerda subir tu contenido de {$clientName}.",
    method: "sendReminder1PublishContentNotification",
    status: "active",
  },
  {
    id: 24,
    name: "Recordatorio 2 para publicación de contenido",
    context: "Día 11/20",
    title: "⏳ Recuerda subir tu contenido",
    body: "El contenido de {$clientName} sigue pendiente de publicación.",
    method: "sendReminder2PublishContentNotification",
    status: "active",
  },
  {
    id: 25,
    name: "Recordatorio 3 para publicación de contenido",
    context: "Día 14/27",
    title:
      "⏰ Último día para publicar (calendar) / ⏳ ¡Últimos días para publicarlo! (no calendar)",
    body: "Hoy es el último día para subir tu contenido de {$clientName}. / El plazo para subir tu contenido de {$clientName} está a punto de terminar.",
    method:
      "sendReminder3PublishContentCalendarNotification, sendReminder3PublishContentNoCalendarNotification",
    status: "active",
  },
  {
    id: 26,
    name: "Recordatorio 4 para publicación de contenido",
    context: "Día 29 (no calendar)",
    title: "⏰ Último día para publicar",
    body: "Hoy es el último día para subir tu contenido de {$clientName}.",
    method: "sendReminder4PublishContentNoCalendarNotification",
    status: "active",
  },
  {
    id: 27,
    name: "Recordatorio collab calendario 24h (Influencer)",
    context: "24h antes, datable, influencer",
    title: "⏰ Recordatorio de colaboración",
    body: "Recuerda que mañana tienes una colaboración confirmada con {$clientName} a las {$timeText}.",
    method: "send24HoursCalendarReminderNotification",
    status: "active",
  },
  {
    id: 28,
    name: "Recordatorio collab calendario 2h (Influencer)",
    context: "2h antes, influencer",
    title: "⏰ ¡Tu collab es en 2 horas!",
    body: "Recuerda que tienes una colaboración confirmada con {$clientName} a las {$timeText}.",
    method: "send2HoursCalendarReminderNotification",
    status: "active",
  },
  {
    id: 29,
    name: "Recordatorio collab calendario 1h (Cliente)",
    context: "1h antes, cliente",
    title: "⏰ Recordatorio de colaboración",
    body: "En 1h tienes una colaboración confirmada con {$influencerFullName} (@{$instagramUsername}).",
    method: "send1HourCalendarReminderCompanyNotification",
    status: "active",
  },
  {
    id: 30,
    name: "Solicitud modificacion collab aceptada (por influencer)",
    context: "MODIFICATION → ACCEPTED (cliente acepta)",
    title:
      "✅ Colaboración actualizada (company) / ✅ Cambio confirmado (influencer)",
    body: "La colaboración con $influencerFullName ($username) ha sido modificada correctamente. / Tu solicitud de modificación en la colaboración con $companyName ha sido aceptada.",
    method:
      "sendConfirmedModificationCompanyNotification, sendConfirmedModificationInfluencerNotification",
    status: "active",
  },
  {
    id: 31,
    name: "Solicitud modificacion collab (por influencer) 1er recordatorio",
    context: "24 min, company",
    title: "🔔 Modificación pendiente",
    body: "¡Ojo! Tienes una solicitud de modificación pendiente. Revísala a tiempo para no perderla.",
    method: "sendInfluencerModificationReminderCompanyNotification",
    status: "active",
  },
  {
    id: 32,
    name: "Solicitud modificacion collab (por influencer) 2º recordatorio",
    context: "48 min, company",
    title: "⚠️ A punto de cancelarse",
    body: "Último aviso: revisa la solicitud de modificación pendiente antes de que se cancele automáticamente.",
    method: "sendInfluencerModificationReminder2CompanyNotification",
    status: "active",
  },
  {
    id: 33,
    name: "Solicitud modificacion collab (por influencer) cancelación automática",
    context: "Cancelación automática en MODIFICATION",
    title:
      "🔴 Collab cancelada automáticamente (company) / ⏳ Collab no confirmada (influencer)",
    body: "La modificación con ' . $influencerFullName . ' (' . $instagramUsername . ') no se ha confirmado y ha sido cancelada. / Tu solicitud de cambio con ' . $clientName . ' no ha sido confirmada y se ha cancelado.",
    method:
      "sendAutoCanceledModificationCompanyNotification, sendAutoCanceledModificationInfluencerNotification",
    status: "active",
  },
  {
    id: 34,
    name: "Cliente confirma modificación",
    context: "(igual que 30)",
    title: "(igual que 30)",
    body: "(igual que 30)",
    method:
      "sendConfirmedModificationCompanyNotification, sendConfirmedModificationInfluencerNotification",
    status: "active",
  },
  {
    id: 35,
    name: "Cliente cancela collab en modificacion",
    context: "Cliente cancela en MODIFICATION",
    title: "🔴 Colaboración cancelada",
    body: "Has cancelado la colaboración con {$influencer->name} {$influencer->surnames} ($username), que estaba pendiente de modificación. (company) / Lamentamos informarte que la colaboración con $companyName ha sido cancelada. (influencer)",
    method:
      "sendClientCanceledModificationCompanyNotification, sendClientCanceledModificationInfluencerNotification",
    status: "active",
  },
  {
    id: 36,
    name: "Cliente cancela collab aceptada",
    context: "Cliente cancela desde ACCEPTED",
    title:
      "Colaboración cancelada (company) / 🔴 Colaboración cancelada (influencer)",
    body: 'Has cancelado la colaboración con {$influencer->name} {$influencer->surnames} ($username) / $companyName ha cancelado la colaboración prevista para el $formattedDate a las $formattedTime. (o "ha cancelado la colaboración")',
    method:
      "sendClientCanceledAcceptedCompanyNotification, sendClientCanceledAcceptedInfluencerNotification",
    status: "active",
  },
  {
    id: 37,
    name: "Cliente cancela collab pendiente de aceptar",
    context: "Cliente cancela desde PENDING_COMPANY",
    title: "🔴 Solicitud cancelada",
    body: 'Has cancelado la solicitud de colaboración con " . $influencer->user->name . " ($username) / $companyName ha cancelado la solicitud de collab prevista para el $formattedDate a las $formattedTime. (o "ha cancelado la solicitud de collab.")',
    method:
      "sendClientCanceledPendingCompanyNotification, sendClientCanceledPendingInfluencerNotification",
    status: "active",
  },
  {
    id: 38,
    name: "Influencer cancela collab pdt aceptar por Nomade",
    context: "Influencer cancela PENDING_NOMADE",
    title: "🔴 Colaboración cancelada",
    body: "Has cancelado la colaboración con $companyName",
    method: "sendInfluencerCanceledPendingNomadeNotification",
    status: "active",
  },
  {
    id: 39,
    name: "Influencer cancela collab pdt aceptar por cliente",
    context: "Influencer cancela (PENDING_COMPANY = rama auto)",
    title: "(mismo que 6 influencer)",
    body: "(mismo que 6 influencer)",
    method: "sendAutoCanceledColabInfluencerNotification (rama auto)",
    status: "active",
  },
  {
    id: 40,
    name: "Nomade cancela collab pdt aceptar por Nomade",
    context: "Nomade cancela PENDING_NOMADE",
    title: "🔴 Colaboración cancelada",
    body: "La colaboración con $clientName ha sido cancelada",
    method: "sendNomadeCanceledPendingInfluencerNotification",
    status: "active",
  },
  {
    id: 41,
    name: "Nomade cancela collab pdt aceptar por el cliente",
    context: "Nomade cancela PENDING_COMPANY",
    title: "🔴 Colaboración cancelada",
    body: "La colaboración con $clientName ha sido cancelada (influencer) / La colaboración con $influencerFullName (@$instagramUsername) ha sido cancelada (company)",
    method:
      "sendNomadeCanceledPendingClientInfluencerNotification, sendNomadeCanceledPendingClientCompanyNotification",
    status: "active",
  },
];
