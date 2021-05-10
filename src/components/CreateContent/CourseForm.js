// most likey not using this file anymore

import { React, useState } from 'react'
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { createCourse } from '../../services/postData'

function CourseForm() {
  const [courseName, setCourseName] = useState()
  const [instructorName, setInstructorName] = useState()
  const [courseDesc, setCourseDesc] = useState()
  const [courseImage, setCourseImage] = useState()

  return (
    <Form>
      <FormGroup>
        <Label for="CourseName">Course Name</Label>
        <Input
          type="text"
          name="Course Name"
          id="CourseName"
          placeholder="Ex. CMPT 101"
          onChange={(e) => setCourseName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Instructor Name">Instructor Name</Label>
        <Input
          type="text"
          name="Instructor Name"
          id="instructorname"
          placeholder="Ex. Will Smith"
          onChange={(e) => setInstructorName(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="Course Description">Course Description</Label>
        <Input
          type="textarea"
          name="Course Description"
          id="coursedescription"
          onChange={(e) => setCourseDesc(e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Course Image</Label>
        <Input
          type="file"
          name="Course File"
          id="coursefile"
          onChange={(e) => setCourseImage(e.target.value)}
        />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          Its a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
      <FormGroup>
        <Label for="exampleFile">Students Folder</Label>
        <Input
          type="file"
          name="Course File"
          id="coursefile"
          multiple
          directory=""
          webkitdirectory=""
          mozdirectory=""
        />
        <FormText color="muted">
          This is some placeholder block-level help text for the above input.
          Its a bit lighter and easily wraps to a new line.
        </FormText>
      </FormGroup>
    </Form>
  )
}

export default CourseForm
