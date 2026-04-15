import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;

const COURSES_ASSIGNMENTS_API = (courseId: string) =>
  `${HTTP_SERVER}/api/courses/${courseId}/assignments`;

export const fetchAssignmentsForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    COURSES_ASSIGNMENTS_API(courseId),
  );
  return data;
};

export const fetchAssignmentById = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${ASSIGNMENTS_API}/${assignmentId}`,
  );
  return data;
};

export const createAssignmentForCourse = async (
  courseId: string,
  assignment: any,
) => {
  const { data } = await axiosWithCredentials.post(
    COURSES_ASSIGNMENTS_API(courseId),
    assignment,
  );
  return data;
};

export const updateAssignment = async (assignmentId: string, updates: any) => {
  const { _id, ...body } = updates ?? {};
  const { data } = await axiosWithCredentials.put(
    `${ASSIGNMENTS_API}/${assignmentId}`,
    body,
  );
  return data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${ASSIGNMENTS_API}/${assignmentId}`,
  );
  return data;
};

