import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const COURSES_API = `${HTTP_SERVER}/api/courses`;

export const fetchEnrollmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/enrollments`,
  );
  return response.data;
};

export const enroll = async (courseId: string) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/enrollments`,
  );
  return response.data;
};

export const unenroll = async (courseId: string) => {
  const response = await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}/enrollments`,
  );
  return response.data;
};

