export function setCourseId(data) {
  return {
    type: '@main/SET_COURSEID',
    payload: {
      CourseId: data
    }
  }
}

export function setPrevSelCourseId(data) {
  return {
    type: '@main/SET_PREV_SEL_COURSEID',
    payload: {
      CourseId: data
    }
  }
}

export function setSaveCurPage(data) {
  return {
    type: '@main/SET_SAVE_CURPAGE',
    payload: {
      currentPage: data
    }
  }
}
