import { IoIosSettings } from "react-icons/io";
import { FaUserTie, FaUserGroup, FaPeopleArrows } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { appPaths } from "../../../utils/appPaths/appPaths";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidOffer, BiSolidCategory } from "react-icons/bi";
import { AiFillFileAdd } from "react-icons/ai";

export const getSideBarUpperSections = (
  ordersQuantity: number,
  pendingCustomers: number,
) => {
  const sideBarUpperSections = [
    {
      id: 1,
      icon: <FaUserGroup />,
      name: "Usuarios",
      pathname: "usuarios",
      quantity: ordersQuantity,
      path: `/usuarios/page/1`,
    },
    {
      id: 2,
      icon: <PiUsersThreeFill />,
      name: "Usuarios (App)",
      pathname: "influencers",
      quantity: pendingCustomers,
      path: `/influencers/page/1`,
    },
    {
      id: 4,
      icon: <FaUserTie />,
      name: "Clientes",
      pathname: "clientes",
      quantity: pendingCustomers,
      path: `/clientes/page/1`,
    },
    {
      id: 5,
      icon: <BiSolidOffer />,
      name: "Ofertas",
      pathname: "ofertas",
      quantity: 0,
      path: "/ofertas/page/1",
    },
    {
      id: 6,
      icon: <FaPeopleArrows />,
      name: "Collabs",
      pathname: "collabs",
      quantity: 0,
      path: "/collabs/page/1",
    },
    {
      id: 7,
      icon: <BiSolidCategory />,
      name: "Categorías",
      pathname: "categorias",
      quantity: 0,
      path: appPaths.settings,
    },
    {
      id: 8,
      icon: <AiFillFileAdd />,
      name: "Leads",
      pathname: "leads",
      quantity: 0,
      path: appPaths.settings,
    },
  ];

  return sideBarUpperSections;
};

export const sideBarDownSections = [
  { id: 5, icon: <IoIosSettings />, name: "Mi cuenta", path: appPaths.account },
  { id: 6, icon: <CiLogout />, name: "Log out", path: appPaths.login },
];
