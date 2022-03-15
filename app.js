import "./styles.css";
import { useEffect, useState } from "react";
import fetchJsonp from "fetch-jsonp";
import jsonp from "jsonp";

function Airline(props) {
  console.log(props.airline);
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  function mouseOver(event) {
    setShowMoreInfo(true);
  }
  function mouseOut(event) {
    setShowMoreInfo(false);
  }
  let site = props.airline.site;
  if (site.startsWith("https://www.")) {
    site = site.slice(12);
  } else {
    site = site.slice(8);
  }
  const slash = site.indexOf("/");
  if (slash >= 0) {
    site = site.slice(0, slash);
  }

  let allianceName = "";
  if (props.airline.alliance === "SA") {
    allianceName = "Star Alliance";
  } else if (props.airline.alliance === "OW") {
    allianceName = "OneWorld";
  } else if (props.airline.alliance === "ST") {
    allianceName = "Sky Team";
  }

  return (
    <li className="airlines" onMouseOver={mouseOver} onMouseOut={mouseOut}>
      <img
        src={"https://www.kayak.com/" + props.airline.logoURL}
        alt={"Airline logo for " + props.airline.name}
      />
      <h3>{props.airline.name}</h3>
      {showMoreInfo ? (
        <div>
          {" "}
          <span className="allianceName">{allianceName}</span>
          <span className="airlinePhone">{props.airline.phone}</span>
          <a href={props.airline.site}>{site}</a>
        </div>
      ) : null}
    </li>
  );
}
export default function App() {
  const [airlineData, setAirlineData] = useState([]);
  const [allianceFilter, setAllianceFilter] = useState(null);
  useEffect(() => {
    fetchJsonp(
      "https://www.kayak.com/h/mobileapis/directory/airlines/homework",
      {
        jsonpCallback: "jsonp",
      }
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (json) {
        //console.log('parsed json', json)

        setAirlineData(json);
      })
      .catch(function (err) {
        //console.log("parsing failed", err);
      });
  }, []);

  function handleAllianceCheckBox(e) {
    if (e.target.checked) {
      console.log("turning on", e.target.name);
      setAllianceFilter(e.target.name);
    } else {
      console.log("turning off", e.target.name);

      setAllianceFilter(null);
    }
  }
  let airlines;

  if (allianceFilter) {
    airlines = airlineData
      .filter((airline) => airline.alliance === allianceFilter)
      .slice(0, 12)
      .map((airline) => <Airline airline={airline} />);
  } else {
    airlines = airlineData
      .slice(0, 12)
      .map((airline) => <Airline airline={airline} />);
  }
  return (
    <div>
      <ul className="menu_container">
        <li className="menu_content">
          <label>
            <input
              type="checkbox"
              name="OW"
              checked={allianceFilter === "OW"}
              onChange={handleAllianceCheckBox}
            />
            <span className="menu">Oneworld</span>
          </label>
        </li>

        <li class="menu_content">
          <label>
            <input
              type="checkbox"
              name="ST"
              checked={allianceFilter === "ST"}
              onChange={handleAllianceCheckBox}
            />
            <span class="menu">Sky Team</span>
          </label>
        </li>
        <li class="menu_content">
          <label>
            <input
              type="checkbox"
              name="SA"
              checked={allianceFilter === "SA"}
              onChange={handleAllianceCheckBox}
            />
            <span class="menu">Star Alliance </span>
          </label>
        </li>
      </ul>
      <ul>{airlines}</ul>
    </div>
  );
}
//
//
