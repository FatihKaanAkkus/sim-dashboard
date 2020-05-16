const initialState = {
  isSplash: false,
  sidebarVisible: true
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_SPLASH':
      state = { ...state, isSplash: true }
      break
    case 'HIDE_SPLASH':
      state = { ...state, isSplash: false }
      break
    case 'TOGGLE_SIDEBAR':
      state = { ...state, sidebarVisible: !state.sidebarVisible }
      break
    default:
      break
  }
  return state
}

export default reducer
