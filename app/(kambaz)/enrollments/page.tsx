"use client";

import { useEffect, useState } from "react";
import { Button, ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import * as coursesClient from "../courses/client";
import * as enrollmentsClient from "./client";

export default function EnrollmentsScreen() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolledByCourseId, setEnrolledByCourseId] = useState<Record<string, boolean>>({});

  const userId = currentUser?._id;

  useEffect(() => {
    if (!userId) {
      setCourses([]);
      setEnrolledByCourseId({});
      setLoading(false);
      return;
    }

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const allCourses = await coursesClient.fetchAllCourses();
        if (cancelled) return;
        setCourses(allCourses);

        const enrollmentLists = await Promise.all(
          allCourses.map((c: any) => enrollmentsClient.fetchEnrollmentsForCourse(c._id)),
        );

        const map: Record<string, boolean> = {};
        allCourses.forEach((c: any, idx: number) => {
          const list = enrollmentLists[idx] ?? [];
          map[c._id] = list.some((e: any) => e.user === userId && e.course === c._id);
        });
        if (!cancelled) setEnrolledByCourseId(map);
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const refreshCourseEnrollmentState = async (courseId: string) => {
    const list = await enrollmentsClient.fetchEnrollmentsForCourse(courseId);
    setEnrolledByCourseId((prev) => ({
      ...prev,
      [courseId]: list.some((e: any) => e.user === userId && e.course === courseId),
    }));
  };

  const handleEnroll = async (courseId: string) => {
    await enrollmentsClient.enroll(courseId);
    await refreshCourseEnrollmentState(courseId);
  };

  const handleUnenroll = async (courseId: string) => {
    await enrollmentsClient.unenroll(courseId);
    await refreshCourseEnrollmentState(courseId);
  };

  if (!currentUser) {
    return <div className="p-4">Please sign in.</div>;
  }

  if (loading) {
    return (
      <div className="p-4 d-flex align-items-center gap-2">
        <Spinner animation="border" size="sm" />
        Loading enrollments...
      </div>
    );
  }

  return (
    <div className="p-4" id="wd-enrollments-screen">
      <h3>Enrollments</h3>
      <hr />

      <ListGroup className="wd-enrollments-list">
        {courses.map((course: any) => {
          const isEnrolled = !!enrolledByCourseId[course._id];
          return (
            <ListGroupItem key={course._id} className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-bold">{course.name}</div>
                <div className="text-muted small">{course.number}</div>
              </div>
              <div className="d-flex gap-2">
                {isEnrolled ? (
                  <Button
                    variant="danger"
                    onClick={() => handleUnenroll(course._id)}
                    id={`wd-unenroll-${course._id}`}
                  >
                    Unenroll
                  </Button>
                ) : (
                  <Button
                    variant="success"
                    onClick={() => handleEnroll(course._id)}
                    id={`wd-enroll-${course._id}`}
                  >
                    Enroll
                  </Button>
                )}
              </div>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    </div>
  );
}

