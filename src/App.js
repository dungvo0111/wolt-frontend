import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import uuidv4 from "uuid/v4";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  //Fetch restaurants' data with useEffect and axios
  useEffect(() => {
    axios.get("restaurants.json").then(res => {
      //console.log(res.data);
      setItems(res.data.restaurants);
    });
  }, []);

  //store restaurants' data by useState Hook API
  const [items, setItems] = useState([]);

  //sort restaurants' names in ascending order
  const sortAscending = () => {
    const newList = [...items];
    const compare = (a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    };
    newList.sort(compare);
    //console.log(newList);
    setItems(newList);
  };

  //sort restaurants' names in descending order
  const sortDescending = () => {
    const newList = [...items];
    const compare = (a, b) => {
      if (a.name > b.name) {
        return -1;
      }
      if (a.name < b.name) {
        return 1;
      }
      return 0;
    };
    newList.sort(compare);
    setItems(newList);
  };

  //Show restaurants which are available online
  const showOnline = () => {
    const newList = [...items];
    const filteredList = newList.filter(item => item.online);
    setItems(filteredList);
  };

  //Reset filter/sort
  const reset = () => {
    axios.get("restaurants.json").then(res => {
      setItems(res.data.restaurants);
    });
  };

  return (
    <div>
      <div className="header">
        <a href="https://wolt.com/en/discovery" target="_blank" rel="noopener noreferrer">
          <img
            src="https://www.flavore.ee/wp-content/uploads/2019/06/Wolt_Logo_RGB_pepper.png"
            alt="Wolt log" className="logo"
          />
        </a>
      </div>
      <section>
        <h1>List of restaurants</h1>
        <h3>Ding Ding! It's Meal Time!</h3>
        <div className="buttons">
          <DropdownButton variant="outline-primary" id="dropdown-basic-button" title="Sort By ">
            <Dropdown.Item onClick={sortAscending}>
              Name: ascending
            </Dropdown.Item>
            <Dropdown.Item onClick={sortDescending}>
              Name: descending
            </Dropdown.Item>
          </DropdownButton>
          <Button variant="outline-primary" onClick={showOnline}>
            Show online
          </Button>
          <Button variant="outline-primary" onClick={reset}>
            Reset all
          </Button>
        </div>
        <div className="restaurants">
          {items.map(item => (
            <Card
              style={{ width: "22rem" }}
              key={uuidv4()}
              className="card"
              // border={item.online ? "success" : "danger"}
            >
              <Card.Img
                style={{ height: "12rem" }}
                variant="top"
                src={item.image}
              />
              <Card.Body className="card-body">
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {item.description}
                </Card.Subtitle>
              </Card.Body>
              <div className="card-bottom">
                <hr className="hr-line" />
                <Card.Text className="item-tag">
                  {item.tags.join(", ")}
                </Card.Text>
              </div>
              <div className="tag-container">
                <span className="tag-online" >
                  {item.online ? "ONLINE" : "OFFLINE"}                  
                </span>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
