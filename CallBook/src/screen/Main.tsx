import "../sass/components/form.scss";
import { useState, useEffect } from "react";
import axios from "axios";
import { LOG_URL } from "../constants";

import UserForm from "../components/UserForm";
import Table from "../components/Table";

export default function Form() {
  const [logDetails, setLogDetails] = useState<any[]>([]);

  // autofill html date tag
  function getCurrentDate() {
    // user Input
    const currentDate =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate();
    return currentDate;
  }

  // autofill html time tag
  function getCurrentTime() {
    const currentMinutes = new Date().getMinutes();
    // const sike = "0";

    // convert [0-9] to [00-09]
    // to match html clock
    const currentTime =
      new Date().getHours() +
      ":" +
      (currentMinutes.toString().length === 1
        ? "0" + currentMinutes
        : currentMinutes);

    return currentTime;
  }

  const [userData, setUserData] = useState({
    callSign: "",
    name: "",
    frequency: "",
    band: "",
    // mode: "",
    reportSent: "",
    reportReceived: "",
    date: getCurrentDate(),
    time: getCurrentTime(),
  });

  // filter out the same callSign
  const checkCallSign = logDetails.filter((call: any) => {
    // console.log(call);
    return call.callSign.toLowerCase() === userData.callSign.toLowerCase();
  });

  // console.log(checkCallSign);
  // console.log(logDetails);
  // console.log(userData);

  // fill out the name automatically
  useEffect(() => {
    if (checkCallSign.length !== 0) {
      userData.name = checkCallSign[0]?.userName;
    }
  }, [checkCallSign, userData]);

  useEffect(() => {
    async function fetchApi() {
      const res = await axios.get(LOG_URL);
      setLogDetails(res?.data);
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
          currentDate={getCurrentDate()}
          currentTime={getCurrentTime()}
        />
      </div>
      <Table checkCallSign={checkCallSign} setLogDetails={setLogDetails} />
    </div>
  );
}
