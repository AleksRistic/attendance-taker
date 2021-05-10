import { React, useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  getCourses,
  getStudentsForCourse,
  getAttendanceData,
  getCourseName
} from '../services/getData'
import { useSelector } from 'react-redux'
import { setCourseId } from '../store/modules/main/actions'
import DisplayTable from '../components/content/DisplayTable'
import DisplayCourses from '../components/content/DisplayCourses'
import NavBar from '../components/content/NavBar'
import PropTypes from 'prop-types'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../App.css'

function main() {
  const [students, setStudents] = useState([])
  const [courses, setCourses] = useState([])
  const [toggle, setToggle] = useState(true)
  const { CourseId } = useSelector((state) => state.main)
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [courseName, setCourseName] = useState()

  useEffect(() => {
    setCourseId(0)
  }, [])

  useEffect(() => {
    async function init() {
      const courses = await getCourses()
      const students = await getStudentsForCourse(CourseId)
      const attendance = await getAttendanceData(CourseId)
      const name = await getCourseName(CourseId)
      console.log(attendance)
      if (attendance) {
        for (let student of students.data) {
          for (let result of attendance.data) {
            if (student.student_id === result.studentId) {
              student['present'] = result.present
              student['timeTaken'] = result.timeTaken
              student['dateTaken'] = result.dateTaken
            }
          }
        }
      }
      // get the attendance info for today and combined it with the student info.
      // Call the mainToggle in attendance taker modal to trigger this after attendance is taken.
      setCourses(courses.data)
      setStudents(students.data)
      setCourseName(name.data['courseName'])
      setCoursesLoading(false)
    }
    init()
  }, [toggle, CourseId])

  const mainToggle = () => {
    setToggle(!toggle)
  }

  return (
    <div className="App">
      <Container fluid>
        <Row>
          <Col>
            <NavBar mainToggle={mainToggle} />
            <DisplayCourses
              data={courses}
              courseId={CourseId}
              mainToggle={mainToggle}
              isLoading={coursesLoading}
            />
            <DisplayTable
              data={students}
              courseName={courseName}
              isLoading={coursesLoading}
              mainToggle={mainToggle}
            />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

main.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageClick: PropTypes.func.isRequired,
  handlePreviousClick: PropTypes.func.isRequired,
  handleNextClick: PropTypes.func.isRequired
}

export default main
