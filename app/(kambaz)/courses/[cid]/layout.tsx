
"use client";
import { ReactNode, useEffect, useState } from "react";

import CourseNavigation from "./Navigation";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import { RootState } from "../../store";
import { FaAlignJustify } from "react-icons/fa6";
import * as enrollmentsClient from "../../enrollments/client";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const { cid } = useParams();
  const router = useRouter();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [showNavigation, setShowNavigation] = useState(true);
  const [isEnrolled, setIsEnrolled] = useState<boolean | null>(null);

  const course = courses.find((c: any) => c._id === cid);

  // protect route — redirect if not enrolled (based on server state)
  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      if (!currentUser?._id || !cid) {
        setIsEnrolled(false);
        router.push("/dashboard");
        return;
      }

      setIsEnrolled(null);
      try {
        const enrollments = await enrollmentsClient.fetchEnrollmentsForCourse(
          cid as string,
        );
        if (cancelled) return;
        const enrolled = enrollments.some(
          (e: any) => e.user === currentUser._id && e.course === cid,
        );
        setIsEnrolled(enrolled);
        if (!enrolled) router.push("/dashboard");
      } catch (e) {
        if (cancelled) return;
        setIsEnrolled(false);
        router.push("/dashboard");
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [cid, currentUser?._id, router]);

  if (isEnrolled === null || !isEnrolled) return null;

  return (
    <div id="wd-courses">
      <h2>
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowNavigation(!showNavigation)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
      </h2>
      <hr />
      <div className="d-flex">
        <div>{showNavigation && <CourseNavigation />}</div>
        <div className="flex-fill">{children}</div>
      </div>
    </div>
  );
}