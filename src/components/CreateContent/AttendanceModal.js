import { React, useState, useEffect } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import { getFacialRecognitionData } from '../../services/getData'
import { useSelector } from 'react-redux'
import AttendanceModalForm from './AttendanceModalForm'
import '../../../src/App.css'

function AttendanceModal({ buttonText, width, height, mainToggle, disabled }) {
  const [modal, setModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [attendanceResults, setAttendanceResults] = useState([])
  const [presentNum, setPresentNum] = useState(0)
  const { CourseId } = useSelector((state) => state.main)

  const toggle = () => setModal(!modal)

  async function takeAttendance() {
    if (modal) {
      setIsLoading(true)
      const result = await getFacialRecognitionData(CourseId)

      let present = 0
      for (let status of result.data) {
        if (status.present) present++
      }
      setPresentNum(present)
      setAttendanceResults(result.data)
      setIsLoading(false)
      mainToggle()
    }
  }

  useEffect(() => {
    takeAttendance()
  }, [modal])

  return (
    <div>
      <Button
        color="primary"
        onClick={toggle}
        style={{ width, height, padding: '0', borderRadius: '30px' }}
        disabled={disabled}
      >
        {buttonText}
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          <AttendanceModalForm
            present={presentNum}
            numStudents={attendanceResults.length}
            isLoading={isLoading}
            attendanceResults={attendanceResults}
            mainToggle={mainToggle}
          />
        </ModalBody>
        {!isLoading && (
          <ModalFooter>
            <Button
              color="primary"
              onClick={toggle}
              style={{ borderRadius: '30px' }}
            >
              Finish
            </Button>{' '}
            <Button
              color="secondary"
              onClick={() => takeAttendance()}
              style={{ borderRadius: '30px' }}
            >
              Retake
            </Button>
          </ModalFooter>
        )}
      </Modal>
    </div>
  )
}

export default AttendanceModal
