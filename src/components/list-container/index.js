import { h, Component } from "preact"
import style from "./style"
import List from "preact-material-components/List"
import "preact-material-components/List/style.css"
import geolib from "geolib"

import { connect } from "preact-redux"
import { bindActions } from "../../config/utils"
import reduce from "../../config/reducers"
import * as actions from "../../config/actions"

@connect(reduce, bindActions(actions))
export default class ListContainer extends Component {

  componentDidMount() {
    let url =
      "https://cors-anywhere.herokuapp.com/https://wservice.viabicing.cat/v2/stations"
    // let url = "/assets/mock-bici.json"
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json()
        }
        return Promise.reject(Error("error"))
      })
      .catch(error => {
        return Promise.reject(Error(error.message))
      })
      .then(res => {
        let { stations } = res
        stations = stations.filter(
          el => el.type === "BIKE" && el.status === "OPN" && el.bikes > 0
        )
        let options = {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
        // this.props.addStations(stations)
        navigator.geolocation.watchPosition(
          position => {
            let positionObj = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
            console.log(positionObj)
            this.props.addPosition(positionObj)
            this.distanceToStation(positionObj, stations)
          },
          err => console.error(err.message),
          options
        )
      })
  }

  distanceToStation(position, stations) {
    let newListStations = stations
      .map(el => {
        let distance = geolib.getDistance(position, {
          latitude: el.latitude,
          longitude: el.longitude
        })
        el.distance = distance
        return el
      })
      .filter(el => el.distance < 600)
      .sort((prev, next) => prev.distance - next.distance)

    this.props.addStations(newListStations)
  }

  render() {
    return (
      <List two-line="true">
        {this.props.app.stations.map(el => {
          return (
            <List.Item className="Station">
              <a
                href={`http://maps.google.com/?q=${el.streetName} ${el.streetNumber} Barcelona`}
              >
                <List.TextContainer>
                  <List.PrimaryText>
                    {el.streetName}, {el.streetNumber}
                  </List.PrimaryText>
                  <List.SecondaryText>
                    {el.bikes} 🚲 &nbsp;- {el.slots} 🅿️ &nbsp;- Distance:{" "}
                    {el.distance}m{" "}
                  </List.SecondaryText>
                </List.TextContainer>
              </a>
            </List.Item>
          )
        })}
      </List>
    )
  }
}
