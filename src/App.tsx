import React, { Component } from "react";
import Map from "./components/Map";
import "./App.css";
import { Polyline, Tooltip } from "react-leaflet";

const MAP_FILL_SCREEN_STYLE = { width: "100vw", height: "100vh" };

class App extends Component {
  state = {
    error: false,
    loading:  true,
    routes: []
  };

  componentDidMount() {
    //fetch("http://127.0.0.1:5000/api/route/", {})
    fetch("https://car-dependence-backend.herokuapp.com/api/route/", {})
      .then(res => res.json())
      .then(
        (res) => {
          this.setState({
            loading: false,
            routes: res.route
          });
          console.log(res);
        },
        (err) => {
          this.setState({
            loading: false,
            error: true
          });
          console.log(err);
      }
    )
  }

  render() {
    const { error, loading, routes } = this.state;
    return (
      <div className="App">
        <Map style={MAP_FILL_SCREEN_STYLE}>
          {loading && <div>Loading...</div>}
          {!loading && !error &&
            <Polyline positions={routes}>
              <Tooltip direction="bottom" offset={[0, 20]} permanent>
                Test tooltip
              </Tooltip>
            </Polyline>
          }
          {error && <div>Error message</div>}
        </Map>
      </div>
    );
  }
}

export default App;
