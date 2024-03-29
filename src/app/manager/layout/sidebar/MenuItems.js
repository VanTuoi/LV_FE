import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconPencilCheck,
  IconSettings
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Trang tổng quan",
    icon: IconLayoutDashboard,
    href: "/manager",
  },
  {
    navlabel: true,
    subheader: "Lịch",
  },
  {
    id: uniqueId(),
    title: "Lịch nghỉ",
    icon: IconTypography,
    href: "/manager/schedule",
  },
  {
    id: uniqueId(),
    title: "Quản lý cửa hàng",
    icon: IconSettings,
    href: "/manager/manager-store",
  },
  {
    navlabel: true,
    subheader: "Check In",
  },
  {
    id: uniqueId(),
    title: "Check In",
    icon: IconPencilCheck,
    href: "/manager/check-in",
  },
  {
    navlabel: true,
    subheader: "Handle...",
  },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  {
    navlabel: true,
    subheader: "Handle...",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },

];

export default Menuitems;
