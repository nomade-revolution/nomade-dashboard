import { FullOffer } from "../modules/offers/domain/Offer";

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
        address_id: 1,
        address:
          "Calle de la Sazón 123, Ciudad del Sabor, 12345, País de los Sabores",
        week: [
          [
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["19:00-21:00"],
              min_guests: 1,
              max_guests: 4,
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
        address_id: 2,
        address:
          "Avenida de la Pizza 456, Ciudad del Sabor, 67890, País de las Pizzas",
        week: [
          [
            {
              day_of_week: 5,
              day_name: "Friday",
              time_slots: ["18:00-20:00"],
              min_guests: 1,
              max_guests: 4,
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
        address_id: 3,
        address:
          "Plaza del Café 789, Ciudad del Sabor, 11223, País de los Cafés",
        week: [
          [
            {
              day_of_week: 1,
              day_name: "Monday",
              time_slots: ["08:00-11:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 2,
              day_name: "Tuesday",
              time_slots: ["08:00-11:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 3,
              day_name: "Wednesday",
              time_slots: ["08:00-11:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["08:00-11:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 5,
              day_name: "Friday",
              time_slots: ["08:00-11:00"],
              min_guests: 1,
              max_guests: 4,
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
  },
  {
    id: 4,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 4,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOi8AjP0QEUigls2hxJYoEmF3Gz4s7tg-K2w&s",
        alt: "Taco Loco",
      },
    ],
    company: "Taco Loco",
    company_id: 104,
    description: "Los tacos más deliciosos.",
    offer_category_id: 4,
    type: "Restaurant",
    in_exchange: "Compra de tacos",
    conditions: "¡Lunes de tacos! Toda la carta de tacos al 50% de descuento",
    advance_notice_time: null,
    favorite: true,
    calendar: [
      {
        address_id: 4,
        address:
          "Calle del Taco 321, Ciudad del Sabor, 44556, País de los Tacos",
        week: [
          [
            {
              day_of_week: 1,
              day_name: "Monday",
              time_slots: ["12:00-15:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 4,
        address:
          "Calle del Taco 321, Ciudad del Sabor, 44556, País de los Tacos",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-12-30",
  },
  {
    id: 5,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 5,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhu9SOA3FTv-zenEh6vQp7sO0xtwEbwcj5_Q&s",
        alt: "Sushi Delight",
      },
    ],
    company: "Sushi Delight",
    company_id: 105,
    description: "El mejor sushi en la ciudad.",
    offer_category_id: 5,
    type: "Restaurant",
    in_exchange: "Compra de sushi",
    conditions: "Oferta de lanzamiento: 2x1 en todos los rollos de sushi",
    advance_notice_time: null,
    favorite: false,
    calendar: [
      {
        address_id: 5,
        address:
          "Avenida del Sushi 654, Ciudad del Sabor, 77889, País del Sushi",
        week: [
          [
            {
              day_of_week: 2,
              day_name: "Tuesday",
              time_slots: ["17:00-20:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 5,
        address:
          "Avenida del Sushi 654, Ciudad del Sabor, 77889, País del Sushi",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-09-30",
  },
  {
    id: 6,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 6,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOhu8heFLZyCKygiY1qWy__vBB37dls3VNA&s",
        alt: "Burger Shack",
      },
    ],
    company: "Burger Shack",
    company_id: 106,
    description: "Las mejores hamburguesas en la ciudad.",
    offer_category_id: 6,
    type: "Restaurant",
    in_exchange: "Compra de hamburguesas",
    conditions: "Todos los miércoles: hamburguesas dobles al precio de una",
    advance_notice_time: null,
    favorite: true,
    calendar: [
      {
        address_id: 6,
        address:
          "Calle de la Hamburguesa 987, Ciudad del Sabor, 99887, País de las Hamburguesas",
        week: [
          [
            {
              day_of_week: 3,
              day_name: "Wednesday",
              time_slots: ["12:00-14:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 6,
        address:
          "Calle de la Hamburguesa 987, Ciudad del Sabor, 99887, País de las Hamburguesas",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-12-31",
  },
  {
    id: 7,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 7,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5h8rtBeJw-DhYB9WU5khKDeAAtkf5j8IPjA&s",
        alt: "Parrilla del Sur",
      },
    ],
    company: "Parrilla del Sur",
    company_id: 107,
    description: "La mejor carne a la parrilla.",
    offer_category_id: 7,
    type: "Restaurant",
    in_exchange: "Compra de cortes de carne",
    conditions:
      "¡Jueves de parrillada! 30% de descuento en todos los cortes de carne",
    advance_notice_time: null,
    favorite: false,
    calendar: [
      {
        address_id: 7,
        address:
          "Calle de la Parrilla 741, Ciudad del Sabor, 22334, País de las Parrillas",
        week: [
          [
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["19:00-22:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 7,
        address:
          "Calle de la Parrilla 741, Ciudad del Sabor, 22334, País de las Parrillas",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-12-31",
  },
  {
    id: 8,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 8,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOCzXaMdw_D5qbGW7SNoinYmYTN42LrYBSBQ&s",
        alt: "Gelatería Dolce Vita",
      },
    ],
    company: "Gelatería Dolce Vita",
    company_id: 108,
    description: "El mejor helado artesanal.",
    offer_category_id: 8,
    type: "Restaurant",
    in_exchange: "Compra de helados",
    conditions: "2 bolas de helado al precio de 1 en todos los sabores",
    advance_notice_time: null,
    favorite: true,
    calendar: [
      {
        address_id: 8,
        address:
          "Paseo del Helado 852, Ciudad del Sabor, 88990, País de los Helados",
        week: [
          [
            {
              day_of_week: 1,
              day_name: "Monday",
              time_slots: ["14:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 2,
              day_name: "Tuesday",
              time_slots: ["14:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 3,
              day_name: "Wednesday",
              time_slots: ["14:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["14:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 5,
              day_name: "Friday",
              time_slots: ["14:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 8,
        address:
          "Paseo del Helado 852, Ciudad del Sabor, 88990, País de los Helados",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-08-31",
  },
  {
    id: 9,
    active: true,
    offerable_type: "",
    images: [
      {
        id: 9,
        url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWdn0rAHbRgX69Yu58W_Pg1yXNQpimlx23KA&s",
        alt: "Panadería La Gran Familia",
      },
    ],
    company: "Panadería La Gran Familia",
    company_id: 109,
    description: "El mejor pan recién horneado.",
    offer_category_id: 9,
    type: "Restaurant",
    in_exchange: "Compras de pan recién horneado",
    conditions:
      "¡Happy hour de pan recién horneado! 20% de descuento de 4pm a 6pm",
    advance_notice_time: null,
    favorite: false,
    calendar: [
      {
        address_id: 9,
        address:
          "Calle del Pan 333, Ciudad del Sabor, 66778, País de los Panes",
        week: [
          [
            {
              day_of_week: 1,
              day_name: "Monday",
              time_slots: ["16:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 2,
              day_name: "Tuesday",
              time_slots: ["16:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 3,
              day_name: "Wednesday",
              time_slots: ["16:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 4,
              day_name: "Thursday",
              time_slots: ["16:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
            {
              day_of_week: 5,
              day_name: "Friday",
              time_slots: ["16:00-18:00"],
              min_guests: 1,
              max_guests: 4,
            },
          ],
        ],
      },
    ],
    addresses: [
      {
        address_id: 9,
        address:
          "Calle del Pan 333, Ciudad del Sabor, 66778, País de los Panes",
        min_guests: 1,
        max_guests: 4,
      },
    ],
    limitDate: "2024-12-31",
  },
];
