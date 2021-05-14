import React, { useState } from 'react'
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown
} from 'reactstrap'
import { removeStudentFromClass } from '../../services/deleteData'
import { updateStudentStatus } from '../../services/putData'
import Dots from '../../3DotsSmall.png'

const DropdownLeft = ({
  buttonDropdownName,
  data,
  courseId,
  mainToggle,
  dir,
  color
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

  let status = ''
  if (data) {
    status = data.present === 1 ? 'Absent' : 'Present'
  }

  const handleStatusClick = (studentId) => {
    let newStatus = 1
    if (status === 'Absent') {
      newStatus = 0
    }
    updateStudentStatus(studentId, courseId, newStatus)
    mainToggle()
  }

  const handleRemoveClick = (studentId) => {
    removeStudentFromClass(courseId, studentId)
    mainToggle()
  }

  return (
    <Dropdown direction={dir} isOpen={isOpen} toggle={toggle}>
      {dir === 'right' ? (
        <DropdownToggle
          style={{ backgroundColor: color, borderRadius: '30px' }}
          caret
        >
          {buttonDropdownName}
        </DropdownToggle>
      ) : (
        <DropdownToggle
          style={{ backgroundColor: color, borderRadius: '30px' }}
          caret
        >
          <img src={Dots}></img>
        </DropdownToggle>
      )}
      <DropdownMenu>
        {data.present !== undefined && (
          <DropdownItem onClick={() => handleStatusClick(data.student_id)}>
            Mark As {status}
          </DropdownItem>
        )}
        <DropdownItem onClick={() => handleRemoveClick(data.student_id)}>
          Remove Student
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}

export default DropdownLeft
