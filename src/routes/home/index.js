import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import idbKeyval from 'idb-keyval';

import ListContainer from '../../components/list-container/index';

export default class Home extends Component {
	state = {
		position: {}
	}
	getPosition(options) {
		return new Promise(function (resolve, reject) {
			navigator.geolocation.watchPosition(resolve, reject, options);
		});
	}

	componentDidMount() {
		let options = {
			enableHighAccuracy: true,
			timeout: 5000,
			maximumAge: 0
		};
		this.getPosition()
		.then((position) => {
			console.log(position)
			this.setState({
				position: position.coords
			})
		})
		.catch((err) => {
			console.error(err.message);
	});
	}
	
	render() {
		return (
			<div class={style.home}>
				<ListContainer position={this.state.position}/>
			</div>
		);
	}
}
