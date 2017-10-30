import { h, Component } from 'preact';
import style from './style';
import List from 'preact-material-components/List';
import 'preact-material-components/List/style.css';
import geolib from 'geolib';

export default class ListContainer extends Component {
  state = {
    listStations: []
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  async componentDidMount() {
    // StatusBar.setNetworkActivityIndicatorVisible(true)
    // const res = await fetch('https://wservice.viabicing.cat/v2/stations')
    const res = await fetch('/assets/mock-bici.json')
    const {stations} = await res.json()
    // Filter only open stations
    await this.setStateAsync({listStations: stations})
    // StatusBar.setNetworkActivityIndicatorVisible(false)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.position !== this.props.position) {
      if(typeof(this.props.position.latitude) !== 'undefined'){
        this.distanceToStation()
      }
    }
  }

  distanceToStation() {
    let newListStations = this.state.listStations.map(el => {
      let positionUser = {
        latitude: this.props.position.latitude,
        longitude: this.props.position.longitude
      }
      let distance = geolib.getDistance(positionUser, {
        latitude: el.latitude,
        longitude: el.longitude
    });
    el.distance = distance;
    return el;
    });
    this.setState({listStations: newListStations.sort((prev, next) => prev.distance - next.distance)})
    console.log(this.state)
  }


  render() {

    return (
      <List two-line="true">
        {this.state.listStations.map((el) => {
          return (
            <List.Item>
            <List.TextContainer>
              <List.PrimaryText>{el.streetName}, {el.streetNumber}</List.PrimaryText>
              <List.SecondaryText>{el.bikes} 🚲  - {el.slots}  🅿️ -  Distance: {el.distance} </List.SecondaryText>
            </List.TextContainer>
            </List.Item>        
          )
        })}
      </List>
    )
  }
}