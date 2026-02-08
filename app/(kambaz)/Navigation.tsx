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

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");
  
  return (
    <ListGroup
      className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      style={{ width: 110 }}
      id="wd-kambaz-navigation"
    >
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

      {/* Account (icon must be white) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/account") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/account"
          id="wd-account-link"
          className={`${isActive("/account") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <FaRegCircleUser
            className={`fs-1 ${isActive("/account") ? "text-danger" : "text-white"}`}
          />
          <br />
          Account
        </Link>
      </ListGroupItem>
      <br />

      {/* Dashboard (icon red) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/dashboard") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className={`${isActive("/dashboard") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
      </ListGroupItem>
      <br />

      {/* Courses (icon red) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/dashboard") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/dashboard"
          id="wd-course-link"
          className={`${isActive("/dashboard") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
      </ListGroupItem>
      <br />

      {/* Calendar (icon red) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/calendar") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className={`${isActive("/calendar") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
      </ListGroupItem>
      <br />

      {/* Inbox (icon red) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/inbox") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className={`${isActive("/inbox") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
      </ListGroupItem>
      <br />

      {/* Labs (icon red) */}
      <ListGroupItem
        className={`border-0 text-center ${isActive("/labs") ? "bg-white" : "bg-black"}`}
      >
        <Link
          href="/labs"
          id="wd-labs-link"
          className={`${isActive("/labs") ? "text-danger" : "text-white"} text-decoration-none`}
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </ListGroupItem>
      <br />
    </ListGroup>
  );}
