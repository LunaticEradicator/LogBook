import "../sass/components/form.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { LOG_URL } from "../constants";

import UserForm from "../components/UserForm";
import Table from "../components/Table";

export default function Form() {
  // user Input
  const currentDate =
    new Date().getFullYear() +
    "-" +
    (new Date().getMonth() + 1) +
    "-" +
    new Date().getDate();

  const currentTime = new Date().getHours() + ":" + new Date().getMinutes();

  const [userData, setUserData] = useState({
    callSign: "",
    name: "",
    frequency: "",
    band: "",
    // mode: "",
    reportSent: "",
    reportReceived: "",
    date: currentDate,
    time: currentTime,
  });

  const [callSign, setCallSign] = useState([]);
  useEffect(() => {
    async function fetchApi() {
      const res = await axios.get(LOG_URL);
      setCallSign(res?.data);
    }
    fetchApi();
  }, [userData]);

  return (
    <div className="main">
      <div className="main__userInput">
        <h2>Register CallSign</h2>
        <UserForm
          userData={userData}
          setUserData={setUserData}
          currentDate={currentDate}
          currentTime={currentTime}
        />
      </div>
      <Table
        userData={userData}
        callSign={callSign}
        setCallSign={setCallSign}
      />
    </div>
  );
}
