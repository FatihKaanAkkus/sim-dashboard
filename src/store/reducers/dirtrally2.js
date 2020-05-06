const keyMap = {
  m_totalPlayTime: 0,
  m_stageTime: 1,
  m_stageDistance: 2,
  m_stageDistancePct: 3,
  m_position: {
    x: 4,
    y: 5,
    z: 6
  },
  m_speed: {
    Magnitude: 7,
    x: 8,
    y: 9,
    z: 10
  },
  m_world: {
    roll: {
      x: 11,
      y: 12,
      z: 13
    },
    pitch: {
      x: 14,
      y: 15,
      z: 16
    }
  },
  m_suspensionPos: {
    RL: 17,
    RR: 18,
    FL: 19,
    FR: 20
  },
  m_suspensionVel: {
    RL: 21,
    RR: 22,
    FL: 23,
    FR: 24
  },
  m_wheelSpeed: {
    RL: 25,
    RR: 26,
    FL: 27,
    FR: 28
  },
  m_input: {
    Throttle: 29,
    Steer: 30,
    Break: 31,
    Clutch: 32
  },
  m_gear: 33,
  m_gForceLateral: 34,
  m_gForceLongitudinal: 35,
  m_currentLap: 36,
  m_engineRate: 37,
  m_splitComplete: 48,
  m_sectorTime: 49,
  m_sectorTime2: 50,
  m_brakeTemp: {
    RL: 51,
    RR: 52,
    FL: 53,
    FR: 54
  },
  m_trackLength: 61,
  m_stageTime2: 62,
  m_maxEngineRate: 63
}

const initialState = {
  m_totalPlayTime: 0,
  m_stageTime: 0,
  m_stageDistance: 0,
  m_stageDistancePct: 0,
  m_position: {
    x: 0,
    y: 0,
    z: 0
  },
  m_speed: {
    Magnitude: 0,
    x: 0,
    y: 0,
    z: 0
  },
  m_world: {
    roll: {
      x: 0,
      y: 0,
      z: 0
    },
    pitch: {
      x: 0,
      y: 0,
      z: 0
    }
  },
  m_suspensionPos: {
    RL: 0,
    RR: 0,
    FL: 0,
    FR: 0
  },
  m_suspensionVel: {
    RL: 0,
    RR: 0,
    FL: 0,
    FR: 0
  },
  m_wheelSpeed: {
    RL: 0,
    RR: 0,
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
  m_gForceLateral: 0,
  m_gForceLongitudinal: 0,
  m_currentLap: 0,
  m_engineRate: 0,
  m_splitComplete: 0,
  m_sectorTime: 0,
  m_sectorTime2: 0,
  m_brakeTemp: {
    RL: 0,
    RR: 0,
    FL: 0,
    FR: 0
  },
  m_trackLength: 0,
  m_stageTime2: 0,
  m_maxEngineRate: 0
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MESSAGE_RECEIVED':
      let payload = action.payload
      state = {
        ...state,
        m_speed: {
          Magnitude: Number(payload[keyMap.m_speed.Magnitude] * 3.6 * 1.61).toFixed(0)
        },

        m_suspensionPos: {
          RL: Number(payload[keyMap.m_suspensionPos.RL]).toFixed(2),
          RR: Number(payload[keyMap.m_suspensionPos.RR]).toFixed(2),
          FL: Number(payload[keyMap.m_suspensionPos.FL]).toFixed(2),
          FR: Number(payload[keyMap.m_suspensionPos.FR]).toFixed(2)
        },
        m_suspensionVel: {
          RL: Number(payload[keyMap.m_suspensionVel.RL]).toFixed(2),
          RR: Number(payload[keyMap.m_suspensionVel.RR]).toFixed(2),
          FL: Number(payload[keyMap.m_suspensionVel.FL]).toFixed(2),
          FR: Number(payload[keyMap.m_suspensionVel.FR]).toFixed(2)
        },

        m_input: {
          Throttle: payload[keyMap.m_input.Throttle],
          Steer: payload[keyMap.m_input.Steer],
          Break: payload[keyMap.m_input.Break],
          Clutch: payload[keyMap.m_input.Clutch]
        },

        m_gear: payload[keyMap.m_gear],
        m_engineRate: Number(payload[keyMap.m_engineRate] * 10).toFixed(0),
        m_maxEngineRate: payload[keyMap.m_maxEngineRate],

        m_brakeTemp: {
          RL: Number(payload[keyMap.m_brakeTemp.RL]).toFixed(2),
          RR: Number(payload[keyMap.m_brakeTemp.RR]).toFixed(2),
          FL: Number(payload[keyMap.m_brakeTemp.FL]).toFixed(2),
          FR: Number(payload[keyMap.m_brakeTemp.FR]).toFixed(2)
        },
        m_gForceLateral: payload[keyMap.m_gForceLateral],
        m_gForceLongitudinal: payload[keyMap.m_gForceLongitudinal],

        m_totalPlayTime: payload[keyMap.m_totalPlayTime],
        m_sectorTime: payload[keyMap.m_sectorTime],
        m_sectorTime2: payload[keyMap.m_sectorTime2],
        m_stageTime: payload[keyMap.m_stageTime],
        m_stageTime2: payload[keyMap.m_stageTime2],

        m_trackLength: payload[keyMap.m_trackLength],
        m_stageDistancePct: Number(payload[keyMap.m_stageDistancePct]).toFixed(2),
        m_stageDistance: Number(payload[keyMap.m_stageDistance]).toFixed(2),

        m_position: {
          x: Number(payload[keyMap.m_position.x]).toFixed(2),
          y: Number(payload[keyMap.m_position.y]).toFixed(2),
          z: Number(payload[keyMap.m_position.z]).toFixed(2)
        }
      }
      break
    default:
      break
  }
  return state
}

export default reducer
