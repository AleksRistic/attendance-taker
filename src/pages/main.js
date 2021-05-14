import { React, useState, useEffect } from 'react'
import { Container, Row, Col } from 'reactstrap'
import {
  getCourses,
  getStudentsForCourse,
  getAttendanceData,
  getCourseName,
  getLessonData
} from '../services/getData'
import {
  setCourseId,
  setPrevSelCourseId,
  setSaveCurPage
} from '../store/modules/main/actions'
import { useSelector, useDispatch } from 'react-redux'
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
  const { instructorId } = useSelector((state) => state.instructor)
  const [coursesLoading, setCoursesLoading] = useState(true)
  const [tableLoading, setTableLoading] = useState(true)
  const [courseName, setCourseName] = useState()
  const [lessonPercentage, setLessonPercentage] = useState()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setCourseId(0))
    dispatch(setPrevSelCourseId(0))
    dispatch(setSaveCurPage(0))
  }, [])

  useEffect(() => {
    async function init() {
      setTableLoading(true)

      const courses = await getCourses(instructorId)
      const students = await getStudentsForCourse(CourseId)
      const attendance = await getAttendanceData(CourseId)
      const name = await getCourseName(CourseId)
      const lessonData = await getLessonData(CourseId)

      let lessons = {}
      let data = lessonData.data
      for (let i = lessonData.data.length - 1; i >= 0; i--) {
        if (
          data[i]['percentagePresent'] !== null &&
          lessons[data[i]['courseId']] === undefined
        ) {
          lessons[data[i]['courseId']] = data[i]['percentagePresent']
        }
      }

      setLessonPercentage(lessons)

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
      setTableLoading(false)
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
              tableLoading={tableLoading}
              lessonPercentage={lessonPercentage}
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

// Student pool is getting all students, not just students from prev classes of an instructor
