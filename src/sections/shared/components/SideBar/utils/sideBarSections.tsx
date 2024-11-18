import { IoIosSettings, IoIosStats } from "react-icons/io";
import { FaUserTie, FaUserGroup, FaPeopleArrows } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { appPaths } from "../../../utils/appPaths/appPaths";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidOffer } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";

export const getSideBarUpperSections = (
  usersQuantity: number,
  influencersQuantity: number,
  companiesQuantity: number,
  offer_id?: number,
) => {
  const sideBarUpperSections = [
    {
      id: 1,
      icon: <FaUserGroup />,
      name: "Usuarios",
      pathname: "usuarios",
      quantity: usersQuantity,
      path: `/usuarios/page/1`,
      subSection: "usuario",
    },
    {
      id: 2,
      icon: <PiUsersThreeFill />,
      name: "Usuarios (App)",
      pathname: "influencers",
      quantity: influencersQuantity,
      path: `/influencers/page/1`,
      subSection: "influencer",
    },
    {
      id: 3,
      icon: <FaUserTie />,
      name: "Clientes",
      pathname: "clientes",
      quantity: companiesQuantity,
      path: `/clientes/page/1`,
      subSection: "cliente",
    },
    {
      id: 4,
      icon: <BiSolidOffer />,
      name: "Ofertas",
      pathname: "ofertas",
      quantity: 0,
      path: "/ofertas/page/1",
      subSection: "oferta",
    },
    {
      id: 5,
      icon: <FaPeopleArrows />,
      name: "Collabs",
      pathname: "collabs",
      quantity: 0,
      path: "/collabs/page/1",
      subSection: "collab",
    },
    // {
    //   id: 6,
    //   icon: <BiSolidCategory />,
    //   name: "Categorías",
    //   pathname: "categorias",
    //   quantity: 0,
    //   path: appPaths.categories,
    // },
    {
      id: 7,
      icon: <AiFillFileAdd />,
      name: "Leads",
      pathname: "leads",
      quantity: 0,
      path: "/leads/page/1",
    },
    {
      id: 8,
      icon: <AiFillFileAdd />,
      name: "Oferta",
      pathname: "oferta",
      quantity: 0,
      path: `/oferta/${offer_id}`,
    },
    {
      id: 9,
      icon: <IoIosStats />,
      name: "Uso planes",
      pathname: "planes",
      quantity: 0,
      path: `/planes/page/1`,
    },
  ];

  return sideBarUpperSections;
};

export const sideBarDownSections = [
  {
    id: 11,
    icon: <IoIosSettings />,
    name: "Mi cuenta",
    path: appPaths.account,
  },
  {
    id: 12,
    icon: <CiLogout />,
    name: "Log out",
    path: appPaths.login,
    isLogout: true,
  },
];
