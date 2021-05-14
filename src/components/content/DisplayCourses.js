import { React, useState } from 'react'
import { PaginationItem, PaginationLink } from 'reactstrap'
import { useSelector } from 'react-redux'
import LoadingSymbol from '../loading'
import CourseHolder from '../CourseHolder'
import CreateCourseModal from '../CreateContent/CreateCourseModal'

function DisplayCourses({
  data,
  mainToggle,
  isLoading,
  lessonPercentage,
  tableLoading
}) {
  const [currentPage, setCurrentPage] = useState(0)
  const { prevSelCourse, saveCurPage } = useSelector((state) => state.main)
  const pages = Math.ceil(data.length / 5)

  function changeCourseCardHighlight() {
    if (currentPage === saveCurPage) {
      if (prevSelCourse !== 0) {
        const card = document.getElementById(prevSelCourse)
        card.style.boxShadow =
          '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }
    }
  }

  const handlePageClick = (e, index) => {
    e.preventDefault()
    changeCourseCardHighlight()
    setCurrentPage(index)
  }

  const handleFirstPageClick = (e) => {
    e.preventDefault()
    changeCourseCardHighlight()
    setCurrentPage(0)
  }

  const handleLastPageClick = (e) => {
    e.preventDefault()
    changeCourseCardHighlight()
    setCurrentPage(pages - 1)
  }
  const handleNextClick = (e) => {
    e.preventDefault()
    changeCourseCardHighlight()
    if (currentPage < pages - 1) setCurrentPage(currentPage + 1)
  }
  const handlePrevClick = (e) => {
    e.preventDefault()
    changeCourseCardHighlight()
    if (currentPage > 0) setCurrentPage(currentPage - 1)
  }

  const pagenationItems = (
    <div
      style={{
        listStyleType: 'none',
        display: 'flex',
        paddingTop: '20px',
        marginLeft: '80%'
      }}
    >
      {data.length > 0 && (
        <>
          <PaginationItem>
            <PaginationLink
              style={{ borderRadius: '30px' }}
              first
              onClick={(e) => handleFirstPageClick(e)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              style={{ borderRadius: '30px' }}
              previous
              onClick={(e) => handlePrevClick(e)}
            />
          </PaginationItem>
          {[...Array(pages)].map((page, index) => (
            <PaginationItem active={index === currentPage} key={index}>
              <PaginationLink
                style={{ borderRadius: '30px' }}
                onClick={(e) => handlePageClick(e, index)}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationLink
              style={{ borderRadius: '30px' }}
              next
              onClick={(e) => handleNextClick(e)}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink
              style={{ borderRadius: '30px' }}
              last
              onClick={(e) => handleLastPageClick(e)}
            />
          </PaginationItem>
        </>
      )}
    </div>
  )

  return (
    <>
      <div
        style={{
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
          justifyContent: 'center',
          width: '100%'
        }}
      >
        {!isLoading ? (
          <>
            {data.length > 0 ? (
              data
                .slice(currentPage * 5, (currentPage + 1) * 5)
                .map((item, index) => (
                  <div key={index} style={{ paddingLeft: '12px' }}>
                    <CourseHolder
                      courseId={item.courseId}
                      title={item.courseName}
                      subtitle={item.instructorName}
                      desc={item.courseDesc}
                      image={item.courseImage.data}
                      currentPage={currentPage}
                      lessonPercentage={lessonPercentage}
                      tableLoading={tableLoading}
                      mainToggle={mainToggle}
                    />
                  </div>
                ))
            ) : (
              <div style={{ textAlign: 'center' }}>
                <h2>
                  Looks like you need to register a new course ... Create a
                  course by selecting the + in the top right or by selecting the
                  button below!
                </h2>
                <CreateCourseModal
                  width="200px"
                  height="50px"
                  buttonText={'Create New Course +'}
                  mainToggle={mainToggle}
                />
              </div>
            )}
          </>
        ) : (
          <LoadingSymbol />
        )}
      </div>
      <div style={{ display: 'flex' }}>{pagenationItems}</div>
    </>
  )
}

export default DisplayCourses
