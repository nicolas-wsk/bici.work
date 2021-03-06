import { h, Component } from "preact"
import { Router } from "preact-router"
import Helmet from "preact-helmet"
import { Provider } from "preact-redux"

import Header from "./header"
import Home from "../routes/home"
import Profile from "../routes/profile"
// import store from '../config/store';
import { PersistGate } from "redux-persist/es/integration/react"

import {configureStore} from "../config/store"

const { persistor, store } = configureStore()

// import Home from 'async!../routes/home';
// import Profile from 'async!../routes/profile';

export default class App extends Component {
  /** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
  handleRoute = e => {
    this.currentUrl = e.url
  }

  render() {
    return (
      <div id="app">
        <Helmet title="Bici.work">
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
        </Helmet>
        <Header />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Router onChange={this.handleRoute}>
              <Home path="/" />
              {/* <Profile path="/profile/" user="me" /> */}
              {/* <Profile path="/profile/:user" /> */}
            </Router>
          </PersistGate>
        </Provider>
      </div>
    )
  }
}
