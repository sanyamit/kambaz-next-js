import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

const COURSES_ASSIGNMENTS_API = (courseId: string) =>
  `${HTTP_SERVER}/api/courses/${courseId}/assignments`;

export const fetchAssignmentsForCourse = async (courseId: string) => {
  const response = await axios.get(COURSES_ASSIGNMENTS_API(courseId));
  return response.data;
};

export const fetchAssignmentById = async (assignmentId: string) => {
  const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any,
) => {
  const response = await axios.post(
    COURSES_ASSIGNMENTS_API(courseId),
    assignment,
  );
  return response.data;
};

export const updateAssignment = async (assignmentId: string, updates: any) => {
  const response = await axios.put(
    `${ASSIGNMENTS_API}/${assignmentId}`,
    updates,
  );
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axios.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

