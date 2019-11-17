const keyMap = {
  m_speed: 7,
  m_suspensionPos: {
    BL: 17,
    BR: 18,
    FL: 19,
    FR: 20
  },
  m_input: {
    Throttle: 29,
    Steer: 30,
    Break: 31,
    Clutch: 32
  },
  m_gear: 33,
  m_engineRate: 37,
  m_sectorTime: 49,
  m_sectorTime2: 50,
  m_brakeTemp: {
    BL: 51,
    BR: 52,
    FL: 53,
    FR: 54
  },
  m_tyrePressure: {
    BL: 55,
    BR: 56,
    FL: 57,
    FR: 58
  },
  m_trackLength: 61,
  m_stageTime: 62,
  m_maxEngineRate: 63
}

const initialState = {
  m_speed: 0,
  m_suspensionPos: {
    BL: 0,
    BR: 0,
    FL: 0,
    FR: 0
  },
  m_input: {
    Throttle: 0,
    Steer: 0,
    Break: 0,
    Clutch: 0
  },
  m_gear: 0,
  m_engineRate: 0,
  m_sectorTime: 0,
  m_sectorTime2: 0,
  m_brakeTemp: {
    BL: 0,
    BR: 0,
    FL: 0,
    FR: 0
  },
  m_tyrePressure: {
    BL: 0,
    BR: 0,
    FL: 0,
    FR: 0
  },
  m_trackLength: 0,
  m_stageTime: 0,
  m_maxEngineRate: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
      let payload = action.payload
      state = {
        ...state,
        m_speed: payload[keyMap.m_speed] * 3.6,
        m_suspensionPos: {
          BL: payload[keyMap.m_suspensionPos.BL],
          BR: payload[keyMap.m_suspensionPos.BR],
          FL: payload[keyMap.m_suspensionPos.FL],
          FR: payload[keyMap.m_suspensionPos.FR]
        },
        m_input: {
          Throttle: payload[keyMap.m_input.Throttle],
          Steer: payload[keyMap.m_input.Steer],
          Break: payload[keyMap.m_input.Break],
          Clutch: payload[keyMap.m_input.Clutch]
        },
        m_gear: payload[keyMap.m_gear],
        m_engineRate: payload[keyMap.m_engineRate] * 10,
        m_sectorTime: payload[keyMap.m_sectorTime],
        m_sectorTime2: payload[keyMap.m_sectorTime2],
        m_brakeTemp: {
          BL: payload[keyMap.m_brakeTemp.BL],
          BR: payload[keyMap.m_brakeTemp.BR],
          FL: payload[keyMap.m_brakeTemp.FL],
          FR: payload[keyMap.m_brakeTemp.FR]
        },
        m_tyrePressure: {
          BL: payload[keyMap.m_tyrePressure.BL],
          BR: payload[keyMap.m_tyrePressure.BR],
          FL: payload[keyMap.m_tyrePressure.FL],
          FR: payload[keyMap.m_tyrePressure.FR]
        },
        m_trackLength: payload[keyMap.m_trackLength],
        m_stageTime: payload[keyMap.m_stageTime],
        m_maxEngineRate: payload[keyMap.m_maxEngineRate]
      }
      state = {
        ...state,
        m_suspensionPos: {
          BL: Number(state.m_suspensionPos.BL).toFixed(2),
          BR: Number(state.m_suspensionPos.BR).toFixed(2),
          FL: Number(state.m_suspensionPos.FL).toFixed(2),
          FR: Number(state.m_suspensionPos.FR).toFixed(2)
        },
        m_speed: Number(state.m_speed).toFixed(0),
        m_engineRate: Number(state.m_engineRate).toFixed(0),
        m_brakeTemp: {
          BL: Number(state.m_brakeTemp.BL).toFixed(2),
          BR: Number(state.m_brakeTemp.BR).toFixed(2),
          FL: Number(state.m_brakeTemp.FL).toFixed(2),
          FR: Number(state.m_brakeTemp.FR).toFixed(2)
        },
        m_tyrePressure: {
          BL: Number(state.m_tyrePressure.BL).toFixed(2),
          BR: Number(state.m_tyrePressure.BR).toFixed(2),
          FL: Number(state.m_tyrePressure.FL).toFixed(2),
          FR: Number(state.m_tyrePressure.FR).toFixed(2)
        }
      }
      break
    default:
      break
  }
  return state
}

export default reducer
