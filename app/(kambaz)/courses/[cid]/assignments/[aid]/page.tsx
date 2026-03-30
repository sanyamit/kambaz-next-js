"use client";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {Form, FormLabel, FormControl, FormSelect, FormCheck, Button, Row, Col } from "react-bootstrap";

import * as client from "../client";
import { setAssignments } from "../reducer";
import { RootState } from "../../../../store";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid?: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer,
  );
  const canEdit = currentUser?.role === "FACULTY";

  const baseAssignment = {
    title: "New Assignment",
    description: "",
    points: 100,
    dueDate: "",
    availableFromDate: "",
    availableUntilDate: "",
    course: cid,
  };

  const [assignment, setAssignment] = useState<any>(baseAssignment);

  useEffect(() => {
    if (!cid) return;

    // New assignment screen: keep defaults.
    if (!aid) {
      setAssignment({ ...baseAssignment, course: cid });
      return;
    }

    client
      .fetchAssignmentById(aid)
      .then((existing) => {
        setAssignment({
          ...baseAssignment,
          ...existing,
          course: cid,
          points:
            typeof existing?.points === "number"
              ? existing.points
              : baseAssignment.points,
          dueDate: existing?.dueDate ?? "",
          availableFromDate: existing?.availableFromDate ?? "",
          availableUntilDate: existing?.availableUntilDate ?? "",
          description: existing?.description ?? "",
          title: existing?.title ?? baseAssignment.title,
        });
      })
      .catch((e) => console.error(e));
  }, [aid, cid]);

  const handleSave = async () => {
    try {
      if (!canEdit) return;
      if (aid) {
        await client.updateAssignment(aid, assignment);
      } else {
        await client.createAssignmentForCourse(cid, assignment);
      }

      // Update redux for the list screen, and then navigate.
      const fresh = await client.fetchAssignmentsForCourse(cid);
      dispatch(setAssignments(fresh));
      router.push(`/courses/${cid}/assignments`);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4">
      <Form>
        <div className="mb-3">
          <FormLabel htmlFor="wd-name">Assignment Name</FormLabel>
          <FormControl
            id="wd-name"
            type="text"
            value={assignment.title}
            disabled={!canEdit}
            onChange={(e) =>
              setAssignment({ ...assignment, title: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <FormControl
            as="textarea"
            id="wd-description"
            rows={10}
            value={assignment.description}
            disabled={!canEdit}
            onChange={(e) =>
              setAssignment({ ...assignment, description: e.target.value })
            }
          />
        </div>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Points
          </FormLabel>
          <Col sm={9}>
            <FormControl
              id="wd-points"
              type="number"
              value={assignment.points}
              disabled={!canEdit}
              onChange={(e) =>
                setAssignment({
                  ...assignment,
                  points: parseInt(e.target.value),
                })
              }
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assignment Group
          </FormLabel>
          <Col sm={9}>
            <FormSelect id="wd-group" disabled={!canEdit}>
              <option>ASSIGNMENTS</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Display Grade as
          </FormLabel>
          <Col sm={9}>
            <FormSelect id="wd-grade" disabled={!canEdit}>
              <option>Percentage</option>
            </FormSelect>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Submission Type
          </FormLabel>
          <Col sm={9}>
            <div className="border p-3">
              <FormSelect id="wd-type" className="mb-3" disabled={!canEdit}>
                <option>Online</option>
              </FormSelect>
              <FormLabel className="fw-bold mb-2">
                Online Entry Options
              </FormLabel>
              <FormCheck
                type="checkbox"
                id="wd-text-entry"
                label="Text Entry"
                className="mb-2"
                disabled={!canEdit}
              />
              <FormCheck
                type="checkbox"
                id="wd-website-url"
                label="Website URL"
                className="mb-2"
                defaultChecked
                disabled={!canEdit}
              />
              <FormCheck
                type="checkbox"
                id="wd-media"
                label="Media Recordings"
                className="mb-2"
                disabled={!canEdit}
              />
              <FormCheck
                type="checkbox"
                id="wd-annotation"
                label="Student Annotation"
                className="mb-2"
                disabled={!canEdit}
              />
              <FormCheck
                type="checkbox"
                id="wd-file-uploads"
                label="File Uploads"
                disabled={!canEdit}
              />
            </div>
          </Col>
        </Row>
        <Row className="mb-3">
          <FormLabel column sm={3} className="text-end">
            Assign
          </FormLabel>
          <Col sm={9}>
            <div className="border p-3">
              <div className="mb-3">
                <FormLabel htmlFor="wd-assign-to">Assign to</FormLabel>
                <FormControl
                  id="wd-assign-to"
                  type="text"
                  defaultValue="Everyone"
                  disabled={!canEdit}
                />
              </div>
              <div className="mb-3">
                <FormLabel htmlFor="wd-due-date">Due</FormLabel>
                <FormControl
                  id="wd-due-date"
                  type="date"
                  value={assignment.dueDate}
                  disabled={!canEdit}
                  onChange={(e) =>
                    setAssignment({ ...assignment, dueDate: e.target.value })
                  }
                />
              </div>
              <Row>
                <Col md={6}>
                  <FormLabel htmlFor="wd-available-from">
                    Available from
                  </FormLabel>
                  <FormControl
                    id="wd-available-from"
                    type="date"
                    value={assignment.availableFromDate}
                    disabled={!canEdit}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableFromDate: e.target.value,
                      })
                    }
                  />
                </Col>
                <Col md={6}>
                  <FormLabel htmlFor="wd-until">Until</FormLabel>
                  <FormControl
                    id="wd-until"
                    type="date"
                    value={assignment.availableUntilDate}
                    disabled={!canEdit}
                    onChange={(e) =>
                      setAssignment({
                        ...assignment,
                        availableUntilDate: e.target.value,
                      })
                    }
                  />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
        <hr />
        <div className="d-flex justify-content-end gap-2">
          <Button
            variant="secondary"
            onClick={handleCancel}
            id="wd-cancel-assignment-btn"
          >
            Cancel
          </Button>
          {canEdit && (
            <Button
              variant="danger"
              onClick={handleSave}
              id="wd-save-assignment-btn"
            >
              Save
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
}