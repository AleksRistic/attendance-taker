import apiAttach from './apiAttach'
import api from './api'

export async function createCourse(
  courseName,
  instructorName,
  courseDesc,
  courseImage,
  instructorId
) {
  let formData = new FormData()
  formData.append('file', courseImage[0])
  formData.append('courseName', courseName)
  formData.append('instructorName', instructorName)
  formData.append('imageName', courseImage[0]['name'])
  formData.append('courseDesc', courseDesc)
  formData.append('instructorId', instructorId)

  await apiAttach.post('/createcourse', formData)
}

export async function addNewStudents(studentFolder, courseId) {
  for (let student of studentFolder) {
    let formData = new FormData()
    formData.append('file', student)
    formData.append('courseId', courseId)
    await apiAttach.post('/addnewstudents', formData)
  }
}

export async function addStudentsToCourse(selectedStudents, courseId) {
  for (let student of selectedStudents) {
    await api.post('/addstudentstocourse', {
      studentId: student.student_id,
      courseId
    })
  }
}
