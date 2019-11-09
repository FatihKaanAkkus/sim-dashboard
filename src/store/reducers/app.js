const initialState = {
  isSplash: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SPLASH':
      state = { ...state, isSplash: true }
      break
    case 'HIDE_SPLASH':
      state = { ...state, isSplash: false }
      break
    default:
      break
  }
  return state
}

export default reducer
