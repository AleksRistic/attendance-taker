import { React, useState, useEffect } from 'react'
import AttendanceModal from '../CreateContent/AttendanceModal'
import CreateStudentsModal from '../CreateContent/CreateStudentsModal'
import { Table, Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import { _arrayBufferToBase64 } from '../../utils/imageUtils'
import IsLoading from '../loading'
import Dropdown from '../dropdown'

function DisplayTable({ data, isLoading, courseName, mainToggle }) {
  const [tableData, setTableData] = useState([])
  const [tableLoading, setTableLoading] = useState(false)
  const { CourseId } = useSelector((state) => state.main)

  useEffect(() => {
    setTableLoading(true)
    let studentTableData = []
    if (data && data[0]) {
      data.map((student, index) => {
        let date = ''
        if (student.dateTaken) {
          date = new Date(student.dateTaken).toLocaleDateString()
        }
        studentTableData.push(
          <>
            <tr scope="row" key={index}>
              <td>{student.student_id}</td>
              <td>
                <img
                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                  src={`data:image/jpg;base64,${_arrayBufferToBase64(
                    student.student_image.data
                  )}`}
                ></img>{' '}
                {student.student_full_name}
              </td>
              <td>{date}</td>
              <td>{student.timeTaken}</td>
              <td>
                {student.present === 1 ? (
                  <img
                    style={{ width: '30px', height: '30px' }}
                    src="https://play-lh.googleusercontent.com/goORQ9hreUwcJmbJsf8ivT6qknvrjyxTWmk1QZoOVxoRvmCjeSzXxH8omiJ6DXz5YMU=s1200"
                  ></img>
                ) : (
                  <>
                    {student.present === 0 && (
                      <img
                        style={{ width: '25px', height: '25px' }}
                        src="https://www.pngfind.com/pngs/m/3-31254_red-cross-mark-clipart-black-background-red-x.png"
                      ></img>
                    )}
                  </>
                )}
              </td>
              <td>
                <Dropdown
                  buttonDropdownName={'Edit'}
                  data={student}
                  courseId={CourseId}
                  mainToggle={mainToggle}
                  dir={'right'}
                  color={'#007bff'}
                />
              </td>
            </tr>
          </>
        )
      })
    }

    setTableLoading(false)
    setTableData(studentTableData)
  }, [data])

  return (
    <Table>
      <Table
        hover
        style={{
          backgroundColor: '#FBFBFD',
          width: '90%',
          marginTop: '30px',
          marginBottom: '30px',
          marginLeft: 'auto',
          marginRight: 'auto',
          borderRadius: '30px',
          boxShadow:
            'rgb(0 0 0 / 20%) 0px 4px 8px 0px, rgb(0 0 0 / 19%) 0px 6px 20px'
        }}
      >
        <thead>
          <td style={{ fontWeight: 'bold' }}>
            {' '}
            Attendance Sheet: {courseName}
          </td>
          <td>
            <div>
              <AttendanceModal
                width={'150px'}
                height={'30px'}
                buttonText={'Take Attendance'}
                mainToggle={mainToggle}
                disabled={CourseId === 0}
              />
            </div>
          </td>
          <td>
            <div>
              <CreateStudentsModal
                width={'150px'}
                height={'30px'}
                buttonText={'Add Students'}
                mainToggle={mainToggle}
                buttonColor={'primary'}
                outline={true}
                disabled={CourseId === 0}
              />
            </div>
          </td>
          <td>
            <div>
              <CreateStudentsModal
                width={'150px'}
                height={'30px'}
                buttonText={'Delete Course'}
                buttonColor={'danger'}
                outline={false}
                disabled={true}
              />
            </div>
          </td>
        </thead>
        <thead>
          <tr>
            <th>Student ID #</th>
            <th>Student Name</th>
            <th>Date Logged</th>
            <th>Time Logged</th>
            <th>Status</th>
            <th>Details</th>
          </tr>
        </thead>
        {isLoading || tableLoading ? (
          <>
            <td></td>
            <td></td>
            <td style={{ paddingLeft: '170px' }}>
              <IsLoading />
            </td>
          </>
        ) : (
          <>
            {CourseId !== 0 ? (
              <>
                {tableData.length > 0 ? (
                  <tbody>{tableData}</tbody>
                ) : (
                  <td>There is no data for this course</td>
                )}
              </>
            ) : (
              <td>Select A Course To View Attendance</td>
            )}
          </>
        )}
      </Table>
      {/* <tr>
        {isLoading || tableLoading ? (
          <div style={{ textAlign: 'center' }}>
            <IsLoading />
          </div>
        ) : (
          ''
        )}
      </tr> */}
    </Table>
  )
}

export default DisplayTable
