"use client";

import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function KambazNavigation() {
  const pathname = usePathname();

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/inbox", icon: FaInbox },
    { label: "Labs", path: "/labs", icon: LiaCogSolid },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
      {/* NEU Logo */}
      <ListGroupItem
        className="bg-black border-0 text-center"
        as="a"
        target="_blank"
        href="https://www.northeastern.edu/"
        id="wd-neu-link"
      >
        <img src="/images/NEU.svg" width="75px" alt="Northeastern University" />
      </ListGroupItem>

      <br />

      {/* Account */}
      <ListGroupItem
        as={Link}
        href="/account"
        className={`text-center border-0 ${
          isActive("/account") ? "bg-white" : "bg-black"
        }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            isActive("/account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        <span
          className={`${
            isActive("/account") ? "text-danger" : "text-white"
          }`}
        >
          Account
        </span>
      </ListGroupItem>

      <br />

      {/* Other Links (icons always red) */}
      {links.map((link) => {
        const active = isActive(link.path);
        const Icon = link.icon;

        return (
          <div key={link.label}>
            <ListGroupItem
              as={Link}
              href={link.path}
              className={`border-0 text-center ${
                active ? "bg-white" : "bg-black"
              }`}
            >
              {/* Icons always red */}
              <Icon className="fs-1 text-danger" />
              <br />
              <span
                className={`${
                  active ? "text-danger" : "text-white"
                }`}
              >
                {link.label}
              </span>
            </ListGroupItem>
            <br />
          </div>
        );
      })}
    </ListGroup>
  );
}