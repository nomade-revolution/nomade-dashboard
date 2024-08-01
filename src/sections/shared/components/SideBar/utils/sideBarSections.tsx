import { IoIosSettings } from "react-icons/io";
import { FaUserTie, FaUserGroup, FaPeopleArrows } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { appPaths } from "../../../utils/appPaths/appPaths";
import { PiUsersThreeFill } from "react-icons/pi";
import { BiSolidOffer, BiSolidCategory } from "react-icons/bi";

export const getSideBarUpperSections = (
  ordersQuantity: number,
  pendingCustomers: number,
) => {
  const sideBarUpperSections = [
    {
      id: 1,
      icon: <FaUserGroup />,
      name: "Usuarios",
      quantity: ordersQuantity,
      path: `/usuarios`,
    },
    {
      id: 2,
      icon: <PiUsersThreeFill />,
      name: "Usuarios (App)",
      quantity: pendingCustomers,
      path: appPaths.influencers,
    },
    {
      id: 4,
      icon: <FaUserTie />,
      name: "Clientes",
      quantity: pendingCustomers,
      path: `/clientes`,
    },
    {
      id: 5,
      icon: <BiSolidOffer />,
      name: "Ofertas",
      quantity: 0,
      path: "/ofertas",
    },
    {
      id: 6,
      icon: <FaPeopleArrows />,
      name: "Collabs",
      quantity: 0,
      path: appPaths.collabs,
    },
    {
      id: 7,
      icon: <BiSolidCategory />,
      name: "Categorías",
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
