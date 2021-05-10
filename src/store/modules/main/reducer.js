import { produce, enableES5 } from 'immer'

enableES5()

const INITIAL_STATE = {
  CourseId: 0,
  prevSelCourse: 0,
  saveCurPage: 0
}

export default function main(state = INITIAL_STATE, action) {
  if (action.type === '@main/RESET') {
    return INITIAL_STATE
  }

  return produce(state, (draft) => {
    switch (action.type) {
      case `@main/SET_COURSEID`:
        draft.CourseId = action.payload.CourseId
        state.current = action.payload.CourseId
        break
      case `@main/SET_PREV_SEL_COURSEID`:
        draft.prevSelCourse = action.payload.CourseId
        state.current = action.payload.CourseId
        break
      case `@main/SET_SAVE_CURPAGE`:
        draft.saveCurPage = action.payload.currentPage
        state.current = action.payload.currentPage
        break
      default:
    }
  })
}
