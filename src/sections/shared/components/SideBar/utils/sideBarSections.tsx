import { IoIosListBox, IoIosSettings } from "react-icons/io";
import { FaUserTie, FaUserGroup } from "react-icons/fa6";
import { TbClockHour12 } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa6";
import { appPaths } from "../../../utils/appPaths/appPaths";

export const getSideBarUpperSections = (
  ordersQuantity: number,
  pendingCustomers: number,
) => {
  const sideBarUpperSections = [
    {
      id: 1,
      icon: <IoIosListBox />,
      name: "Pedidos",
      quantity: ordersQuantity,
      path: `/pedidos/page/1`,
    },
    {
      id: 2,
      icon: <FaUserTie />,
      name: "Clientes",
      quantity: pendingCustomers,
      path: `/clientes/page/1`,
    },
    {
      id: 3,
      icon: <FaUserGroup />,
      name: "Usuarios",
      quantity: 0,
      path: "/usuarios/page/1",
    },
    {
      id: 4,
      icon: <FaCartPlus />,
      name: "Realizar pedido",
      quantity: 0,
      path: appPaths.place_order,
    },
    {
      id: 5,
      icon: <TbClockHour12 />,
      name: "Configuración de avisos",
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
