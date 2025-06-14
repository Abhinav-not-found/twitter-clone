import { House, Bell, Bookmark, User } from "lucide-react";

export const links = [
  {
    label: "home",
    route: "/home",
    icon: House,
  },
  {
    label: "notification",
    route: "/notification",
    icon: Bell,
    badge:true
  },
  {
    label: "bookmarks",
    route: "/bookmarks",
    icon: Bookmark,
  },
  {
    label: "profile",
    route: "/profile",
    icon: User,
  },
];
