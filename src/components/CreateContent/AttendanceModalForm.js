import React from 'react'
import { Progress, ListGroup, ListGroupItem } from 'reactstrap'
import LoadingSymbol from '../loading'

/**
 * Form section of the modal, holds inputs, buttons and their handlers.
 */

function AttendanceModalForm({ numStudents, present, isLoading, mainToggle }) {
  return (
    <div>
      {isLoading ? (
        <>
          <h1>Taking Attendance...</h1>
          <LoadingSymbol />
        </>
      ) : (
        <>
          <h1>Attendance Complete</h1>
          <Progress multi>
            <Progress
              animated
              bar
              color="success"
              value={(present / numStudents) * 100}
            />
            <Progress
              animated
              bar
              color="danger"
              value={((numStudents - present) / numStudents) * 100}
            />
          </Progress>
          <br />
          <ListGroup>
            <ListGroupItem color="success">
              Students Present: {present}
            </ListGroupItem>
            <ListGroupItem color="danger">
              Students Absent: {numStudents - present}
            </ListGroupItem>
          </ListGroup>
        </>
      )}
    </div>
  )
}

export default AttendanceModalForm
