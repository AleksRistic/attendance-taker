import api from './api'

export async function updateStudentStatus(studentId, courseId, status) {
  await api.put('/updatestudentstatus', {
    studentId,
    courseId,
    status
  })
}
