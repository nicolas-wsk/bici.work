import { h, Component } from 'preact';
import Card from 'preact-material-components/Card';
import 'preact-material-components/Card/style.css';
import 'preact-material-components/Button/style.css';
import style from './style';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';

export default class Home extends Component {
	render() {
		return (
			<div class={style.home}>
				<List two-line="true">
					<List.Item>Item1</List.Item>
					<List.Item>Item2</List.Item>
					<List.Item>Item3</List.Item>
					<List.Item>Item4</List.Item>
					<List.Item>Item5</List.Item>
				</List>
			</div>
		);
	}
}
