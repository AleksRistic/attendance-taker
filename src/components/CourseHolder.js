import React, { useState, useEffect } from 'react'
import { _arrayBufferToBase64 } from '../utils/imageUtils'
import { useDispatch, useSelector } from 'react-redux'
import IsLoading from './loading'

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
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import Dropdown from './dropdown'

function courseholder({
  courseId,
  title,
  subtitle,
  desc,
  image,
  currentPage,
  lessonPercentage,
  tableLoading,
  mainToggle
}) {
  const [courseImage, setCourseImage] = useState([])
  const { prevSelCourse, saveCurPage, CourseId } = useSelector(
    (state) => state.main
  )

  let pathColor
  let text = `${lessonPercentage[courseId]}%`
  let value = lessonPercentage[courseId]
  if (lessonPercentage[courseId] === undefined) {
    pathColor = 'grey'
    text = 'N/A'
    value = 0
  } else if (lessonPercentage[courseId] <= 49) pathColor = '#dc3545'
  else if (lessonPercentage[courseId] <= 74) pathColor = '#ffc107'
  else if (lessonPercentage[courseId] >= 75) pathColor = '#28a745'

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
    if (currentPage === saveCurPage && CourseId !== 0) {
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
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              id={`${courseId}button`}
              outline
              color="primary"
              style={{ borderRadius: '30px', marginBottom: '10px' }}
              onClick={() => handleViewClick()}
            >
              View Attendance
            </Button>

            <div style={{ width: '60px', height: '60px', paddingLeft: '10px' }}>
              <CircularProgressbar
                styles={buildStyles({ pathColor: pathColor })}
                strokeWidth={10}
                value={value}
                text={`${text}`}
              />
            </div>
            {/* <Dropdown
              buttonDropdownName={''}
              data={''}
              courseId={CourseId}
              mainToggle={mainToggle}
              dir={'down'}
              color={'white'}
            /> */}
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

export default courseholder
