import api from './api'

export async function removeStudentFromClass(courseId, studentId) {
  const result = await api.delete('/removestudentfromclass', {
    data: {
      courseId,
      studentId
    }
  })
}
