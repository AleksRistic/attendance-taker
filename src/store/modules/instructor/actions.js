export function setIsSignedIn(data) {
  return {
    type: '@instructor/SET_IS_SIGNED_IN',
    payload: {
      isSignedIn: data
    }
  }
}

export function setIsSignedUp(data) {
  return {
    type: '@instructor/SET_IS_SIGNED_UP',
    payload: {
      isSignedUp: data
    }
  }
}

export function setInstructorId(data) {
  return {
    type: '@instructor/SET_INSTRUCTOR_ID',
    payload: {
      instructorId: data
    }
  }
}
