import React from "react";
import logo from "./logo.svg";
import "./App.css";
import moment from "moment";
import Input from "./Input.js";
import axios from "axios";

const subjects = ["Angular", "React", "Golang"];
const targetDate = moment("12/21/2019 17:00:00");

function App() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [check, setCheck] = React.useState("");
  const [timer, setTimer] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [isLoading, setIsLoading] = React.useState("");

  const handleSubmit = () => {
    //setMessage("Success");
    setIsLoading(true);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde561310000ed1ac96e39?mocky-delay=4000ms&fbclid=IwAR1AoFLjW9jt8nRbK8jLwN-zWfbHPy6w5mBV8kMqbI6TUaQuS3_ZM0BLvJY"
      )
      .then(response => {
        const { data } = response;
        setMessage(data.response);
        setIsLoading(false);
      });
  };

  const updatetimer = () => {
    const diffHours = targetDate.diff(moment(), "hours");
    const diffMinutes = targetDate.diff(moment(), "minutes") % 60;
    const diffSeconds = targetDate.diff(moment(), "seconds") % 60;

    setTimer(`${diffHours}hours ${diffMinutes}minutes ${diffSeconds}seconds`);
  };

  React.useEffect(() => {
    const interval = setInterval(updatetimer, 1000);
    axios
      .get(
        "http://www.mocky.io/v2/5dfde8a6310000551ec96e5b?fbclid=IwAR3JS11em93bYSlan-ZF3HYf-Np6468CgxgO3LNVn9YU29Fkimvh3tbbfEI"
      )
      .then(response => {
        setSubject(response.data.subject);
      });

    return () => clearInterval(interval);
  }, []);

  console.log("State", { name, email, subject, check });

  return (
    <div className="App">
      <div className="title">Season change Registration form</div>
      <p> Form ends in </p>
      <p> {timer} </p>
      <Input
        label="Name"
        value={name}
        onChangeFromComponent={value => setName(value)}
      />
      <Input
        label="Email"
        value={email}
        onChangeFromComponent={value => setEmail(value)}
      />

      <div className="field">
        <label className="label">Subject</label>
        <div className="control">
          <div className="select">
            <select
              value={subject}
              onChange={event => setSubject(event.target.value)}
            >
              {subjects.map(subjects => (
                <option key={subjects}>{subjects}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              type="checkbox"
              value={check}
              onChange={event => setCheck(event.target.checked)}
            />
            I agree to the <a href="#">terms and conditions</a>
          </label>
        </div>
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            className={`button is-link ${isLoading && "is-loading"}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            Submit
          </button>
        </div>
        <div className="control">
          <button className="button is-link is-light">Cancel</button>
        </div>
      </div>
      <p>{message}</p>
    </div>
  );
}

export default App;
