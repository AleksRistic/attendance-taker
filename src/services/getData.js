import api from './api'

export async function getNextId() {
  const result = await api.get('./getnextid')
  return result
}

export async function getCourses(instructorId) {
  const courses = await api.get('./getcourses', {
    params: {
      instructorId
    }
  })
  return courses
}

export async function getCourseName(courseId) {
  const courseName = await api.get('./getcoursename', { params: { courseId } })

  return courseName
}

export async function getStudents(studentId) {
  try {
    const studentList = await api.get('/getstudents', { studentId })
    return studentList
  } catch (err) {
    console.log(err)
  }
}

export async function getStudentsForCourse(courseId) {
  try {
    const studentList = await api.get('/getstudentsforcourse', {
      params: { courseId }
    })
    return studentList
  } catch (err) {
    console.log(err)
  }
}

export async function getStudentsPool(courseId) {
  try {
    const studentList = await api.get('/getstudentspool', {
      params: { courseId }
    })
    return studentList
  } catch (err) {
    console.log(err)
  }
}

export async function getFacialRecognitionData(courseId) {
  try {
    const studentList = await api.get('/getfacialrecogdata', {
      params: { courseId }
    })
    return studentList
  } catch (err) {
    console.log(err)
  }
}

export async function getAttendanceData(courseId) {
  try {
    if (courseId === 0) return
    const attendance = await api.get('/getattendacedata', {
      params: { courseId }
    })
    return attendance
  } catch (err) {
    console.log(err)
  }
}

export async function getLessonData(courseId) {
  try {
    const lessonData = await api.get('/getlessondata', {
      params: { courseId }
    })
    return lessonData
  } catch (err) {
    console.log(err)
  }
}
