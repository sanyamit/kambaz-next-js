"use client";

import { Button, Col, Form, Row } from "react-bootstrap";
import { useParams } from "next/navigation";
import * as db from "../../../../database";
import Link from "next/link";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignment = db.assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );
  const backToAssignments = `/courses/${cid}/assignments`;

  return (
    <div id="wd-assignments-editor" className="p-3">
      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3" controlId="wd-name">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control defaultValue={assignment?.title ?? "A1"} />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-4" controlId="wd-description">
          <Form.Control
            as="textarea"
            rows={8}
            defaultValue={`The assignment is available online

Submit a link to the landing page of your Web application running on Netlify.

The landing page should include the following:
• Your full name and section
• Links to each of the lab assignments
• Link to the Kanbas application
• Links to all relevant source code repositories

The Kanbas application should include a link to navigate back to the landing page.`}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group as={Row} className="mb-3" controlId="wd-points">
          <Form.Label column sm={2} className="text-end">
            Points
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="number" defaultValue={100} style={{ maxWidth: 300 }} />
          </Col>
        </Form.Group>

        {/* Assignment Group */}
        <Form.Group as={Row} className="mb-3" controlId="wd-group">
          <Form.Label column sm={2} className="text-end">
            Assignment Group
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="ASSIGNMENTS" style={{ maxWidth: 300 }}>
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Display Grade As */}
        <Form.Group as={Row} className="mb-3" controlId="wd-display-grade-as">
          <Form.Label column sm={2} className="text-end">
            Display Grade as
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="PERCENTAGE" style={{ maxWidth: 300 }}>
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Points</option>
              <option value="LETTER">Letter</option>
            </Form.Select>
          </Col>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group as={Row} className="mb-3" controlId="wd-submission-type">
          <Form.Label column sm={2} className="text-end">
            Submission Type
          </Form.Label>
          <Col sm={10}>
            <Form.Select defaultValue="ONLINE" style={{ maxWidth: 300 }}>
              <option value="ONLINE">Online</option>
              <option value="ON_PAPER">On Paper</option>
            </Form.Select>

            {/* Online Entry Options box */}
            <div className="border rounded p-3 mt-3" style={{ maxWidth: 300 }}>
              <div className="fw-bold mb-2">Online Entry Options</div>

              <Form.Check
                id="wd-text-entry"
                type="checkbox"
                label="Text Entry"
                className="mb-2"
              />
              <Form.Check
                id="wd-website-url"
                type="checkbox"
                label="Website URL"
                className="mb-2"
                defaultChecked
              />
              <Form.Check
                id="wd-media-recordings"
                type="checkbox"
                label="Media Recordings"
                className="mb-2"
              />
              <Form.Check
                id="wd-student-annotation"
                type="checkbox"
                label="Student Annotation"
                className="mb-2"
              />
              <Form.Check id="wd-file-uploads" type="checkbox" label="File Uploads" />
            </div>
          </Col>
        </Form.Group>

        {/* Assign box */}
        <Form.Group as={Row} className="mb-4" controlId="wd-assign-to">
          <Form.Label column sm={2} className="text-end">
            Assign
          </Form.Label>
          <Col sm={10}>
            <div className="border rounded p-3" style={{ maxWidth: 380 }}>
              <Form.Group className="mb-3" controlId="wd-assign-to">
                <Form.Label className="fw-bold">Assign to</Form.Label>
                <Form.Control defaultValue="Everyone" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="wd-due-date">
                <Form.Label className="fw-bold">Due</Form.Label>
                <Form.Control type="date" defaultValue="2024-05-13" />
              </Form.Group>

              <Row>
                <Col>
                  <Form.Group className="mb-0" controlId="wd-available-from">
                    <Form.Label className="fw-bold">Available from</Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-06" />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-0" controlId="wd-available-until">
                    <Form.Label className="fw-bold">Until</Form.Label>
                    <Form.Control type="date" defaultValue="2024-05-20" />
                  </Form.Group>
                </Col>
              </Row>
            </div>
          </Col>
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Link href={backToAssignments} className="text-decoration-none">
            <Button variant="secondary">
              Cancel
            </Button>
          </Link>
          <Link href={backToAssignments} className="text-decoration-none">
            <Button variant="danger">
              Save
            </Button>
          </Link>
        </div>
      </Form>
    </div>
  );
}