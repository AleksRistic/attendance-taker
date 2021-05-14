import { produce, enableES5 } from 'immer'

enableES5()

const INITIAL_STATE = {
  isSignedIn: false,
  isSignedUp: true,
  instructorId: 0
}

export default function instructor(state = INITIAL_STATE, action) {
  if (action.type === '@instructor/RESET') {
    return INITIAL_STATE
  }

  return produce(state, (draft) => {
    switch (action.type) {
      case '@instructor/SET_IS_SIGNED_IN':
        draft.isSignedIn = action.payload.isSignedIn
        // state.current = action.payload.isSignedIn
        break
      case '@instructor/SET_IS_SIGNED_UP':
        draft.isSignedUp = action.payload.isSignedUp
        // state.current = action.payload.isSignedIn
        break
      case '@instructor/SET_INSTRUCTOR_ID':
        draft.instructorId = action.payload.instructorId
        // state.current = action.payload.instructorId
        break
      default:
    }
  })
}
