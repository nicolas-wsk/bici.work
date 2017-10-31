import { h, Component } from "preact"
import "preact-material-components/Card/style.css"
import "preact-material-components/Button/style.css"
import style from "./style"
import ListContainer from "../../components/list-container/index"

export default class Home extends Component {
  
  render() {
    return (
      <div class={style.home}>
        <ListContainer />
      </div>
    )
  }
}
