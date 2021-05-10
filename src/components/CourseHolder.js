import React, { useState, useEffect } from 'react'
import { _arrayBufferToBase64 } from '../utils/imageUtils'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCourseId,
  setPrevSelCourseId,
  setSaveCurPage
} from '../store/modules/main/actions'
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from 'reactstrap'

function courseholder({ courseId, title, subtitle, desc, image, currentPage }) {
  const [courseImage, setCourseImage] = useState([])
  const { prevSelCourse, saveCurPage, CourseId } = useSelector(
    (state) => state.main
  )

  const dispatch = useDispatch()

  function handleViewClick() {
    dispatch(setCourseId(courseId))
    if (currentPage === saveCurPage) {
      if (prevSelCourse !== 0 && prevSelCourse !== courseId) {
        const card = document.getElementById(prevSelCourse)
        card.style.boxShadow =
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }
    }
    const card = document.getElementById(courseId)
    card.style.boxShadow =
      '0 4px 8px 6px rgba(2, 117, 216, 0.8), 0 6px 20px 0 rgba(2, 117, 216, 0.8)'
    dispatch(setSaveCurPage(currentPage))
    dispatch(setPrevSelCourseId(courseId))
  }

  useEffect(() => {
    setCourseImage(_arrayBufferToBase64(image))
  }, [courseId])

  useEffect(() => {
    if (currentPage === saveCurPage) {
      console.log(CourseId)
      const card = document.getElementById(CourseId)
      card.style.boxShadow =
        '0 4px 8px 6px rgba(2, 117, 216, 0.8), 0 6px 20px 0 rgba(2, 117, 216, 0.8)'
    }
  }, [currentPage])
  return (
    <div className="App">
      <Card
        id={courseId}
        style={{
          boxShadow:
            '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          width: '300px',
          height: '400px',
          borderRadius: '30px',
          textAlign: 'center'
        }}
      >
        <CardImg
          style={{
            width: '100%',
            height: '50%',
            borderTopLeftRadius: '30px',
            borderTopRightRadius: '30px'
          }}
          src={`data:image/jpg;base64,${courseImage}`}
          alt="Card image cap"
        />
        <CardBody>
          <CardTitle tag="h5">{title}</CardTitle>
          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {subtitle}
          </CardSubtitle>
          <CardText style={{ height: '48px' }}>{desc}</CardText>
          <Button
            outline
            color="primary"
            style={{ borderRadius: '30px', marginBottom: '10px' }}
            onClick={() => handleViewClick()}
          >
            View Attendance
          </Button>
        </CardBody>
      </Card>
    </div>
  )
}

export default courseholder
