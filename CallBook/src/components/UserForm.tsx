import axios from "axios";
import { BASE_URL } from "../constants";
import { toast } from "react-toastify";

export default function UserForm({
  userData,
  setUserData,
  currentDate,
  currentTime,
}: any) {
  // onChange function
  const handleForm = (event: any) => {
    const { name, value } = event.target;
    setUserData((prevUserData: any) => {
      return { ...prevUserData, [name]: value };
    });
  };

  // submitting new callSign
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (
      userData.callSign === "" ||
      userData.userName === "" ||
      userData.frequency === "" ||
      userData.band === "" ||
      userData.reportSent === "" ||
      userData.reportReceived === "" ||
      userData.date === "" ||
      userData.time === ""
    ) {
      toast.error("Fill All Details In The Form");
    } else {
      try {
        // creating new user callSign
        const res = await axios.post(`${BASE_URL}/log`, {
          callSign: userData.callSign,
          userName: userData.name,
          frequency: userData.frequency,
          band: userData.band,
          reportSent: userData.reportSent,
          reportReceived: userData.reportReceived,
          date: userData.date,
          time: userData.time,
        });
        console.log(res.data);
        // clear Data after submitting
        setUserData({
          callSign: "",
          name: "",
          frequency: "",
          band: "",
          reportSent: "",
          reportReceived: "",
          date: "",
          time: "",
        });
        toast.success("CallSign Created Successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  console.log(userData);

  // Restrict Date Selection To current Date
  function useCurrentDate() {
    let currentDate;

    const newDate = new Date();
    const currentDay = newDate.getDate();
    const currentMonth = newDate.getMonth() + 1;
    const currentYear = newDate.getFullYear();

    if (currentDay < 10) {
      currentDate = `${currentYear}0${currentMonth}-0${currentDay}`;
    }
    if (currentMonth < 10) {
      currentDate = `${currentYear}-0${currentMonth}-${currentDay}`;
    } else {
      currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
    }
    return currentDate;
  }

  return (
    <>
      <form action="#" onSubmit={handleSubmit}>
        <div className="callBook">
          <div className="callBook__callSign">
            <label htmlFor="callSign">
              CallSign<span className="required">*</span>
            </label>
            <input
              type="text"
              name="callSign"
              value={userData.callSign}
              onChange={handleForm}
              pattern="^[a-zA-Z0-9\/]*$"
            />
            <p className="error-message">CallSign Should be alphaNumeric</p>
          </div>
          <div className="callBook__name">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleForm}
            />
          </div>
          <div className="callBook__frequency">
            <label htmlFor="frequency">
              Frequency<span className="required">*</span>
            </label>
            <input
              type="number"
              name="frequency"
              value={userData.frequency}
              onChange={handleForm}
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com|net|org|ae
            </p>
          </div>
          <div className="callBook__band">
            <label htmlFor="band">
              Band<span className="required">*</span>
            </label>
            <input
              type="number"
              name="band"
              value={userData.band}
              onChange={handleForm}
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com|net|org|ae
            </p>
          </div>
          <div className="callBook__reportSent">
            <label htmlFor="reportSent">
              Report Sent<span className="required">*</span>
            </label>
            <input
              type="string"
              name="reportSent"
              value={userData.reportSent}
              onChange={handleForm}
              pattern="^(?:[1-9]|[1-4][0-9]|5[0-9])\+?\+?$"
            />
            <p className="error-message">
              {" "}
              Maximum Value upto 59, + sign [ upto two times ]
            </p>
          </div>
          <div className="callBook__reportReceived">
            <label htmlFor="reportReceived">
              Report Received<span className="required">*</span>
            </label>
            <input
              type="string"
              name="reportReceived"
              value={userData.reportReceived}
              onChange={handleForm}
              pattern="^(?:[1-9]|[1-4][0-9]|5[0-9])\+?\+?$"
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com|net|org|ae
            </p>
          </div>
          <div className="callBook__date">
            <label htmlFor="date">
              Date<span className="required">*</span>
            </label>
            <input
              type="date"
              name="date"
              value={userData?.date === "" ? currentDate : userData.date}
              onChange={handleForm}
              max={useCurrentDate()}
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com|net|org|ae
            </p>
          </div>
          <div className="callBook__time">
            <label htmlFor="time">
              Time<span className="required">*</span>
            </label>
            <input
              type="time"
              name="time"
              value={userData?.time === "" ? currentTime : userData.time}
              onChange={handleForm}
            />
            <p className="error-message">
              Email must be a valid address, e.g me@mydomain.com|net|org|ae
            </p>
          </div>
        </div>
        <div className="callBook__buttonDiv">
          <button className="callBook__buttonDiv__button">Submit</button>
        </div>
      </form>
    </>
  );
}
