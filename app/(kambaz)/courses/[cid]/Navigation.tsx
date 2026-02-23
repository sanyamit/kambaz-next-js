"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams<{ cid: string }>();

  const links = [
    { label: "Home", path: "home" },
    { label: "Modules", path: "modules" },
    { label: "Piazza", path: "piazza" },
    { label: "Zoom", path: "zoom" },
    { label: "Assignments", path: "assignments" },
    { label: "Quizzes", path: "quizzes" },
    { label: "Grades", path: "grades" },
    { label: "People", path: "people/table" },
  ];

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const href = `/courses/${cid}/${link.path}`;
        const active = isActive(href);

        return (
          <Link
            key={link.label}
            href={href}
            id={`wd-course-${link.label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              active ? "active" : "text-danger"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}