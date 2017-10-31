import {
  ADD_STATIONS,
  ADD_POSITION
} from './actions'

const initialState = {
	stations: [],
	position: {}
};

function app(state = initialState, action) {
  switch (action.type) {
    case ADD_STATIONS:
			return Object.assign({}, state, {
				stations: action.stations
			})			
		case ADD_POSITION:
			return Object.assign({}, state, {
				position: action.position
			})			
    default:
      return state
  }
}

export default app