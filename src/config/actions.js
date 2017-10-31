export const ADD_POSITION = 'ADD_POSITION'
export const ADD_STATIONS = 'ADD_STATIONS'

export function addPosition(position) {
	return {
		type: 'ADD_POSITION',
		position
	};
}

export function addStations(stations) {
	return {
		type: 'ADD_STATIONS',
		stations
	};
}
