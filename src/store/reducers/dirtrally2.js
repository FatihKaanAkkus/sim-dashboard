const keyMap = {
  m_speed: 28,
  m_gear: 33,
  m_engineRate: 37
}

const initialState = {
  m_speed: 0,
  m_gear: 0,
  m_engineRate: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
      state = {
        ...state,
        m_speed: action.payload[keyMap.m_speed] * 3.6,
        m_gear: action.payload[keyMap.m_gear],
        m_engineRate: action.payload[keyMap.m_engineRate] * 10
      }
      break
    default:
      break
  }
  return state
}

export default reducer
