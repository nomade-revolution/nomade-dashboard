import { FullOffer } from "modules/offers/domain/Offer";

export const mockOffers: FullOffer[] = [
  {
    id: 1,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 1,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkjmEcbjaTq5eoDH4xm33HyNfrY8tKCj031g&s",
        alt: "Restaurante El Sabor Auténtico",
      },
    ],
    company: "Restaurante El Sabor Auténtico",
    company_id: 101,
    description: "Disfruta de la auténtica sazón en cada bocado.",
    offer_category_id: 1,
    type: "Restaurant",
    in_exchange: "Compra de platos principales",
    conditions: "¡2x1 en platos principales todos los jueves!",
    advance_notice_time: null,
    favorite: false,
    calendar: [
      {
        min_guests: 1,
        max_guests: 4,
        address_id: 1,
        address:
          "Calle de la Sazón 123, Ciudad del Sabor, 12345, País de los Sabores",
        week: [
          [
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["19:00-21:00"],
              time_slot: [{ from_time: "19:00", to_time: "21:00" }],
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 1,
        address:
          "Calle de la Sazón 123, Ciudad del Sabor, 12345, País de los Sabores",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-08-30",
    user_id: 2,
    location_type: "",
    location_id: 0,
  },
  {
    id: 2,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 2,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmd009YsQfc27VWoZv7L_7WtpEVN3n8Ua6RA&s",
        alt: "Pizzería Bella Napoli",
      },
    ],
    company: "Pizzería Bella Napoli",
    company_id: 102,
    description: "Las mejores pizzas de la ciudad.",
    offer_category_id: 2,
    type: "Restaurant",
    in_exchange: "Compra de pizzas grandes",
    conditions:
      "Obtén un 20% de descuento en cualquier pizza grande los viernes",
    advance_notice_time: null,
    favorite: true,
    calendar: [
      {
        min_guests: 1,
        max_guests: 4,
        address_id: 2,
        address:
          "Avenida de la Pizza 456, Ciudad del Sabor, 67890, País de las Pizzas",
        week: [
          [
            {
              day_of_week: 5,
              day_name: "Friday",
              time_slots: ["18:00-20:00"],
              time_slot: [{ from_time: "18:00", to_time: "20:00" }],
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 2,
        address:
          "Avenida de la Pizza 456, Ciudad del Sabor, 67890, País de las Pizzas",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-12-31",
    user_id: 2,
    location_type: "",
    location_id: 0,
  },
  {
    id: 3,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 3,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQju3G5-WWdRmEzlBLAFnutejWNrwNiNP5BQA&s",
        alt: "Cafetería Aroma de la Mañana",
      },
    ],
    company: "Cafetería Aroma de la Mañana",
    company_id: 103,
    description: "El mejor café para empezar tu día.",
    offer_category_id: 3,
    type: "Restaurant",
    in_exchange: "Compra de desayunos completos",
    conditions: "Café gratis con la compra de cualquier desayuno completo",
    advance_notice_time: null,
    favorite: false,
    calendar: [
      {
        min_guests: 1,
        max_guests: 4,
        address_id: 3,
        address:
          "Plaza del Café 789, Ciudad del Sabor, 11223, País de los Cafés",
        week: [
          [
            {
              day_of_week: 1,
              day_name: "Monday",
              time_slots: ["08:00-11:00"],
              time_slot: [{ from_time: "08:00", to_time: "11:00" }],
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 3,
        address:
          "Plaza del Café 789, Ciudad del Sabor, 11223, País de los Cafés",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-08-31",
    user_id: 2,
    location_type: "",
    location_id: 0,
  },
];
