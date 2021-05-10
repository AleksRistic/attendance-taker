import apiAttach from './apiAttach'
import api from './api'

export async function createCourse(
  courseName,
  instructorName,
  courseDesc,
  courseImage
) {
  let formData = new FormData()
  formData.append(`file`, courseImage[0])
  formData.append(`courseName`, courseName)
  formData.append(`instructorName`, instructorName)
  formData.append(`imageName`, courseImage[0]['name'])
  formData.append(`courseDesc`, courseDesc)

  for (var data of formData) {
    console.log(data)
  }

  await apiAttach.post('/createcourse', formData)
}

export async function addNewStudents(studentFolder, courseId) {
  console.log(studentFolder)
  for (let student of studentFolder) {
    console.log(student)
    let formData = new FormData()
    formData.append('file', student)
    formData.append('courseId', courseId)
    await apiAttach.post('/addnewstudents', formData)
  }
}

export async function addStudentsToCourse(selectedStudents, courseId) {
  console.log('((((((((((((())))))))))))))))')
  console.log(selectedStudents)
  for (let student of selectedStudents) {
    console.log(student)
    await api.post('/addstudentstocourse', {
      studentId: student.student_id,
      courseId
    })
  }
}
