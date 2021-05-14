import { React, useState, useEffect } from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormText,
  Input,
  Alert,
  Table,
  PaginationItem,
  PaginationLink
} from 'reactstrap'
import LoadingSymbol from '../loading'
import { getStudentsPool } from '../../services/getData'
import { addStudentsToCourse, addNewStudents } from '../../services/postData'
import { _arrayBufferToBase64 } from '../../utils/imageUtils'
import { useSelector } from 'react-redux'
import '../../../src/App.css'

function CreateStudentsModal({
  buttonText,
  width,
  height,
  mainToggle,
  buttonColor,
  outline,
  disabled
}) {
  const [modal, setModal] = useState(false)
  const [visible, setVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [students, setStudents] = useState([])
  const [studentFile, setStudentFile] = useState([])
  const [currentPage, setCurrentPage] = useState(0)
  const [pagnationItems, setPagnationItems] = useState()
  const { CourseId } = useSelector((state) => state.main)
  let [selectedStudents, setSelectedStudents] = useState([])

  const onDismiss = () => setVisible(false)

  const toggle = () => setModal(!modal)

  async function init() {
    setIsLoading(true)
    setSelectedStudents([])
    let studentsList = []
    if (modal) {
      studentsList = await getStudentsPool(CourseId)
      console.log(studentsList)
    }
    setStudents(studentsList)
    console.log(studentsList)

    setIsLoading(false)
  }

  useEffect(() => {
    init()
  }, [modal])

  useEffect(() => {
    initPages()
  }, [modal])

  async function handleAddClick() {
    setIsLoading(true)
    if (studentFile.length > 0) await addNewStudents(studentFile, CourseId)
    await addStudentsToCourse(selectedStudents, CourseId)
    init()
    mainToggle()
    setIsLoading(false)
    toggle()
  }

  // Think about not disabling the button to allow for a use to unclick a student. array.filter(function(value, index, arr){return value>5})
  async function handleAddStudentClick(student) {
    var button = document.getElementById(student.student_id)
    if (button.style.backgroundColor !== 'green') {
      button.style.backgroundColor = 'green'
      // button.disabled = true
      button.innerText = 'Selected'
      selectedStudents.push(student)
    } else {
      button.style.backgroundColor = '#0275d8'
      // button.disabled = true
      for (let [index, selStudent] of selectedStudents.entries()) {
        if (selStudent.student_id === student.student_id) {
          selectedStudents.splice(index, 1)
        }
      }
      button.innerText = 'Add'
    }
    setSelectedStudents([...selectedStudents])
  }

  const pages = students.data ? Math.ceil(students.data.length / 8) : 0

  const handlePageClick = (e, index) => {
    e.preventDefault()
    setCurrentPage(index)
  }

  const handleFirstPageClick = (e) => {
    e.preventDefault()
    setCurrentPage(0)
  }

  const handleLastPageClick = (e) => {
    e.preventDefault()
    setCurrentPage(pages - 1)
  }
  const handleNextClick = (e) => {
    e.preventDefault()
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1)
  }
  const handlePrevClick = (e) => {
    e.preventDefault()
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  function initPages() {
    const pagnationItemsVar = (
      <div
        style={{
          listStyleType: 'none',
          display: 'flex',
          paddingTop: '20px'
        }}
      >
        {students.length > 0 && (
          <>
            <PaginationItem>
              <PaginationLink first onClick={(e) => handleFirstPageClick(e)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={(e) => handlePrevClick(e)} />
            </PaginationItem>
            {[...Array(pages)].map((page, index) => (
              <PaginationItem active={index === currentPage} key={index}>
                <PaginationLink onClick={(e) => handlePageClick(e, index)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationLink next onClick={(e) => handleNextClick(e)} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last onClick={(e) => handleLastPageClick(e)} />
            </PaginationItem>
          </>
        )}
      </div>
    )
    setPagnationItems(pagnationItemsVar)
  }

  // console.log(pagenationItems)
  return (
    <div>
      <Button
        outline={outline}
        color={buttonColor}
        onClick={toggle}
        style={{ width, height, padding: '0', borderRadius: '30px' }}
        disabled={disabled}
      >
        {buttonText}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Select Existing Students and/or Add Students
        </ModalHeader>
        <Alert color="info" isOpen={visible} toggle={onDismiss}>
          All fields must be filled to create a new course!
        </Alert>
        <ModalBody>
          <Form>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Student ID #</th>
                  <th>Student Name</th>
                </tr>
              </thead>
              {students.data && students.data[0] ? (
                <tbody>
                  {students.data
                    .slice(currentPage * 8, (currentPage + 1) * 8)
                    .map((student, index) => (
                      <>
                        <tr scope="row" key={index}>
                          <td>
                            <Button
                              id={student.student_id}
                              style={{
                                borderRadius: '30px'
                              }}
                              color="primary"
                              onClick={() => handleAddStudentClick(student)}
                            >
                              Add
                            </Button>
                          </td>
                          <td>{student.student_id}</td>
                          <td>
                            <img
                              style={{
                                width: '40px',
                                height: '40px',
                                borderRadius: '50%'
                              }}
                              src={`data:image/jpg;base64,${_arrayBufferToBase64(
                                student.student_image.data
                              )}`}
                            ></img>{' '}
                            {student.student_full_name}
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              ) : (
                <tr>There are no saved students</tr>
              )}
            </Table>
          </Form>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {pagnationItems}
          </div>
          <br />
          <Input
            type="file"
            name="studentfile"
            multiple
            directory=""
            webkitdirectory=""
            mozdirectory=""
            onChange={(e) => {
              setStudentFile(e.target.files)
            }}
          />
          <FormText color="muted">
            Please Upload a folder of new students with the file name following:
            studentID_studentFirstName_studentLastName. Ex: 1234_Bob_Smith
          </FormText>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            onClick={() => handleAddClick()}
            style={{ borderRadius: '30px' }}
          >
            {!isLoading ? (
              'Add Student(s)'
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

export default CreateStudentsModal
