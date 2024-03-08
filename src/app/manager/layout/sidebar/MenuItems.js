import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconPencilCheck,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
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
    title: "Handle...",
    icon: IconCopy,
    href: "/",
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
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/authentication/login",
  },
  {
    id: uniqueId(),
    title: "Register",
    icon: IconUserPlus,
    href: "/authentication/register",
  },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "Icons",
    icon: IconMoodHappy,
    href: "/icons",
  },

];

export default Menuitems;
