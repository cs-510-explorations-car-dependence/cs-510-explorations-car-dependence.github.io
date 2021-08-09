import "./../../App.css";
import React from "react";
import "../../css/landingPage.css";
import logo1 from "../About/about1.png";
import logo2 from "../About/about2.png";
import logo3 from "../About/jf.png";
import logo4 from "../About/hw.png";
import logo5 from "../About/formula.png";


export default class About extends React.Component {
 
  state = {
    our: true,
    model: false,
}

  show_our(){
    this.setState({
      our: true,
      model: false,
    });
  }

  show_model(){
    this.setState({
      our: false,
      model: true,
    });
  }

  render() {
    return (
      <div className="container text-center">

        {this.state.our === true && 

        <ul className="nav nav-tabs">
          <li className="tabs" style={{backgroundColor: "lightgray"}}>About Our Project</li>
          <li className="tabs" onClick={() => this.show_model()}>How We Model Emission</li>
        </ul>

        }

        {this.state.model === true && 

          <ul className="nav nav-tabs">
            <li className="tabs" onClick={() => this.show_our()}>About Our Project</li>
            <li className="tabs" style={{backgroundColor: "lightgray"}}>How We Model Emission</li>
          </ul>

        }

        <div className="about_content mt-3">

          {this.state.our === true && 
            <div>
              <img 
                    className="logo mb-3"
                    src={logo1}
                    alt="about_emission"
              />

              <h4>We wanted visualize emissions caused by traffic in real time and estimate how many vehicles are contributing by having a tool which will looks at live traffic data in the world.</h4>

              <img 
                    className="logo mb-3 mt-4"
                    src={logo2}
                    alt="how_much_emission"
              />

              <h4>With that in mind, we hope that everyone could have a look the roads around their neighborhood or any places in their mind and know how much emissions is produced there. </h4>

            </div>
          }
          {this.state.model === true && 
            <div>
              <h4>Our air quality model estimates how many vehicles are emitting pollutants in a given area, scales that estimate by the average emissions per car, and divides that number by the area being accounted for</h4>
            
              <img 
                    className="logo2"
                    src={logo3}
                    alt="jam_factor_visulized"
              />
              <h4>The HERE API calls give us a traffic indicator called the "jam factor (JF)". The jam factor is a floating-point number from 0.0 to 10.0, with higher numbers meaning more congestion.</h4>
              <br></br>
              <hr></hr>
              <br></br>
              <h4>We have directly scaled this to the more widespread "level of service (LOS)" system, which assigns a letter rank A-F to traffic conditions, and has a direct cars-per-lane association for each rank</h4>
              <br></br>
            <table>
              <tr>
                <th>LOS</th>
                <th>JF min</th>
                <th>JF max</th>
                <th>average cars/lane/mile</th>
              </tr>

              <tr>
                <td>A</td>
                <td>0.00</td>
                <td>1.66</td>
                <td>11</td>
              </tr>
              <tr>
                <td>B</td>
                <td>1.66</td>
                <td>3.33</td>
                <td>18</td>
              </tr>
              <tr>
                <td>C</td>
                <td>3.33</td>
                <td>5.00</td>
                <td>26</td>
              </tr>
              <tr>
                <td>D</td>
                <td>5.00</td>
                <td>6.66</td>
                <td>35</td>
              </tr>
              <tr>
                <td>E</td>
                <td>6.66</td>
                <td>8.33</td>
                <td>45</td>
              </tr>
              <tr>
                <td>F</td>
                <td>8.33</td>
                <td>10.0</td>
                <td>200</td>
              </tr>
              
            </table>
            <h4> In this way, we translate the black box jam factor calculation into a reasonable guess of cars per lane on a stretch of road.</h4>
            <br></br>
            <hr></hr>
            <br></br>

            <img 
                    className="logo2 mb-3"
                    src={logo4}
                    alt="highwayVSnormalway"
              />

            <h4>We also guess the number of lanes based on the type of road reported by HERE. A highway is likely to have 3-4 lanes in each direction, while a residential road probably only has one lane each way</h4>
            <h4>Multiply the number of estimated cars per lane by the number of lanes to get the number of cars per mile on a stretch of road.</h4>

            <br></br>
            <hr></hr>

            <img 
                    className="logo3"
                    src={logo5}
                    alt="average_emissions_per_car_MULTIPLY_lane_count_MULTIPLY_cars_per_lane_per_mile_OVER_distance_between_nodes"
              />

            <h4>Now that we have the number of vehicles per mile, we can use that number to scale the average emissions per car of each type we are tracking.</h4>
            </div>

            

            
          }
        </div>
        
      </div>
    );
  }
}
