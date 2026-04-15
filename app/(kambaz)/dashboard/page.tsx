"use client"
import * as client from "../courses/client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Row, Col, Card, CardImg, CardBody, CardTitle, CardText, Button, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, setCourses } from "../courses/reducer";
import { RootState } from "../store";
import * as enrollmentsClient from "../enrollments/client";

export default function Dashboard() {
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const [showAllCourses, setShowAllCourses] = useState(
    currentUser?.role === "FACULTY",
  );
  const dispatch = useDispatch();
  const [enrolledByCourseId, setEnrolledByCourseId] = useState<Record<string, boolean>>({});
  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const fetchCourses = async () => {
    try {
      const courses = await client.findMyCourses();
      dispatch(setCourses(courses));

      // Load enrollment state for the current user so the UI reflects server truth.
      if (currentUser?._id) {
        const enrollmentLists = await Promise.all(
          courses.map((c: any) => enrollmentsClient.fetchEnrollmentsForCourse(c._id)),
        );
        const map: Record<string, boolean> = {};
        courses.forEach((c: any, idx: number) => {
          const list = enrollmentLists[idx] ?? [];
          map[c._id] = list.some(
            (e: any) => e.user === currentUser._id && e.course === c._id,
          );
        });
        setEnrolledByCourseId(map);
      } else {
        setEnrolledByCourseId({});
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onAddNewCourse = async () => {
    try {
      await client.createCourse(course);
      await fetchCourses();
    } catch (e) {
      console.error(e);
      alert("Failed to create course. Check backend session/CORS and server logs.");
    }
  };

  const onDeleteCourse = async (courseId: string) => {
    const status = await client.deleteCourse(courseId);
    dispatch(setCourses(courses.filter((course) => course._id !== courseId)));
  };

  const onUpdateCourse = async () => {
    try {
      await client.updateCourse(course);
      await fetchCourses();
    } catch (e) {
      console.error(e);
      alert("Failed to update course. Check backend session/CORS and server logs.");
    }
  };


  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const refreshCourseEnrollmentState = async (courseId: string) => {
    if (!currentUser?._id) return;
    const list = await enrollmentsClient.fetchEnrollmentsForCourse(courseId);
    setEnrolledByCourseId((prev) => ({
      ...prev,
      [courseId]: list.some(
        (e: any) => e.user === currentUser._id && e.course === courseId,
      ),
    }));
  };

  const handleEnrollToggle = async (courseId: string) => {
    if (!currentUser?._id) return;
    try {
      const isEnrolled = !!enrolledByCourseId[courseId];
      if (isEnrolled) {
        await enrollmentsClient.unenroll(courseId);
      } else {
        await enrollmentsClient.enroll(courseId);
      }
      await refreshCourseEnrollmentState(courseId);
    } catch (e) {
      console.error(e);
      alert("Failed to update enrollment. Please sign in again and try.");
    }
  };

  const displayedCourses = showAllCourses ? courses : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={onAddNewCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={onUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <FormControl
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <hr />
        </>
      )}
      <h2 id="wd-dashboard-published">
        Published Courses ({displayedCourses.length})
        <Link
          href="/enrollments"
          className="btn btn-primary float-end"
          id="wd-enrollments-btn"
        >
          Enrollments
        </Link>
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {displayedCourses.map((course) => (
            <Col
              key={course._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  href={`/courses/${course._id}/home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg
                    src="/images/reactjs.jpg"
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <CardBody className="card-body">
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}
                    </CardText>
                    <Button variant="primary">Go</Button>
                    {currentUser?.role === "FACULTY" && (
                      <>
                        <button className="btn btn-danger"
                            onClick={(event) => {
                            event.preventDefault();
                            onDeleteCourse(course._id);
                          }} >
                          Delete
                        </button>

                        <button
                          id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 float-end"
                        >
                          Edit
                        </button>
                      </>
                    )}
                    {currentUser && (
                      <>
                        {enrolledByCourseId[course._id] ? (
                          <button
                            className="btn btn-danger justify-content-end mt-2 d-flex"
                            id={`wd-unenroll-click-${course._id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnrollToggle(course._id);
                            }}
                          >
                            Unenroll
                          </button>
                        ) : (
                          <button
                            className="btn btn-success justify-content-end mt-2 d-flex"
                            id={`wd-enroll-click-${course._id}`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleEnrollToggle(course._id);
                            }}
                          >
                            Enroll
                          </button>
                        )}
                      </>
                    )}
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}