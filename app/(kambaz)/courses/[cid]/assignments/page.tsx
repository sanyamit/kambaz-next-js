"use client";

import Link from "next/link";
import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { MdAssignment } from "react-icons/md";
import { useParams } from "next/navigation";
import * as db from "../../../database";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();

  const assignmentsForCourse = db.assignments.filter(
    (a) => a.course === cid
  );

  return (
    <div id="wd-assignments">
      {/* Top controls row */}
      <div className="d-flex align-items-center mb-4">
        <div className="flex-fill me-3" style={{ maxWidth: 350 }}>
          <InputGroup>
            <InputGroup.Text>
              <FaSearch />
            </InputGroup.Text>
            <FormControl placeholder="Search..." id="wd-search-assignment" />
          </InputGroup>
        </div>

        <div className="ms-auto text-nowrap">
          <Button variant="light" className="me-2" id="wd-add-assignment-group">
            <FaPlus className="me-1" />
            Group
          </Button>

          <Button variant="danger" id="wd-add-assignment">
            <FaPlus className="me-1" />
            Assignment
          </Button>
        </div>
      </div>

      {/* Assignments header row */}
      <ListGroup className="rounded-0 mb-3">
        <ListGroupItem className="d-flex align-items-center bg-light">
          <BsGripVertical className="me-2 fs-4" />
          <span className="fw-bold">ASSIGNMENTS</span>

          <span className="ms-auto me-2 text-secondary small border rounded px-2 py-1">
            40% of Total
          </span>

          <FaPlus className="me-2" />
          <IoEllipsisVertical className="fs-4" />
        </ListGroupItem>
      </ListGroup>

      {/* Assignment list */}
      <ListGroup className="rounded-0" id="wd-assignment-list">
        {assignmentsForCourse.map((a) => (
          <ListGroupItem
            key={a._id}
            className="wd-assignment-list-item d-flex align-items-start"
          >
            <BsGripVertical className="me-2 fs-4 mt-1" />
            <MdAssignment className="me-3 fs-3 text-success mt-1" />

            <div className="flex-fill">
              <Link
                href={`/courses/${cid}/assignments/${a._id}`}
                className="wd-assignment-link fw-bold text-decoration-none text-dark"
              >
                {a.title}
              </Link>

              <div className="text-danger small">Multiple Modules</div>

              <div className="text-secondary small">
                {/* optional fields if you add them later */}
                <b>Not available until</b> May 6 at 12:00am | <b>Due</b> May 13 at
                11:59pm | 100 pts
              </div>
            </div>

            <FaCheckCircle className="text-success fs-4 mt-1 me-3" />
            <IoEllipsisVertical className="fs-4 mt-1" />
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}