import { React, useState } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Alert
} from 'reactstrap'

import { createCourse } from '../../services/postData'
import { useSelector } from 'react-redux'
import LoadingSymbol from '../loading'
import '../../../src/App.css'

function CreateCourseModal({ buttonText, width, height, mainToggle }) {
  const [modal, setModal] = useState(false)
  const [courseName, setCourseName] = useState('')
  const [instructorName, setInstructorName] = useState()
  const [courseDesc, setCourseDesc] = useState()
  const [courseImage, setCourseImage] = useState()
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { instructorId } = useSelector((state) => state.instructor)

  const onDismiss = () => setVisible(false)

  const toggle = () => setModal(!modal)

  async function handleCreateClick() {
    if (!courseName || !instructorName || !courseDesc || !courseImage) {
      setVisible(true)
      return
    }
    setIsLoading(true)
    await createCourse(
      courseName,
      instructorName,
      courseDesc,
      courseImage,
      instructorId
    )
    setIsLoading(false)
    mainToggle()
    toggle()
  }

  return (
    <div onKeyDown={(e) => e.stopPropagation()}>
      <Button
        outline
        color="primary"
        onClick={toggle}
        style={{ width, height, padding: '0', borderRadius: '30px' }}
      >
        {buttonText}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Create A New Course</ModalHeader>
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
          All fields must be filled to create a new course!
        </Alert>
        <ModalBody>
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
                placeholder="Machine Learning 101: Mon-Fri 5:30-7:30"
                onChange={(e) => setCourseDesc(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Course Image</Label>
              <Input
                type="file"
                name="Course File"
                id="coursefile"
                onChange={(e) => setCourseImage(e.target.files)}
              />
              <FormText color="muted">
                This is some placeholder block-level help text for the above
                input. Its a bit lighter and easily wraps to a new line.
              </FormText>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleCreateClick()}
            style={{ borderRadius: '30px' }}
          >
            {!isLoading ? (
              'Create Course'
            ) : (
              <LoadingSymbol size={'sm'} less={true} />
            )}
          </Button>{' '}
          <Button
            color="secondary"
            onClick={toggle}
            style={{ borderRadius: '30px' }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default CreateCourseModal
