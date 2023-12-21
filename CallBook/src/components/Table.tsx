import "../sass/components/table.scss";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { BASE_URL } from "../constants";

export default function Table({ callSign, userData, setCallSign }: any) {
  // filter out the same callSign
  const checkCallSign = callSign.filter((call: any) => {
    return call.callSign === userData.callSign;
  });

  const handleDelete = async (id: any) => {
    await axios.delete(`${BASE_URL}/log/${id}`);
    setCallSign((prevExpenses: any) =>
      prevExpenses?.filter((item: any) => {
        return item?._id !== id;
      })
    );
  };
  // console.log(checkCallSign);

  return (
    checkCallSign.length !== 0 && (
      <table>
        <caption>LogBook</caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Frequency</th>
            <th>Band</th>
            {/* <th>Mode</th> */}
            <th>Report Send</th>
            <th>Report Received</th>
            <th>Date</th>
            <th>Time</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {checkCallSign?.map((data: any) => {
            return (
              <tr key={data._id}>
                <td data-label="Name">{data?.userName}</td>
                <td data-label="Frequency">{data?.frequency}</td>
                <td data-label="Band">{data?.band}</td>
                {/* <td data-label="Mode">Mode</td> */}
                <td data-label="Report Send">{data?.reportSent}</td>
                <td data-label="Report Received">{data?.reportReceived}</td>
                <td data-label="Date">{data?.date}</td>
                <td data-label="Time">{data?.time}</td>
                <td onClick={() => handleDelete(data._id)} data-label="">
                  <FaTrash className="tableTrash" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    )
  );
}

//  <tbody>
// <tr>
//   <td data-label="Name"></td>
//   <td data-label="Frequency">Frequency</td>
//   <td data-label="Band">Band</td>
//   {/* <td data-label="Mode">Mode</td> */}
//   <td data-label="Report Send">Report Send</td>
//   <td data-label="Report Received">Report Received</td>
//   <td data-label="Date">Date</td>
//   <td data-label="Time">Time</td>
// </tr>
// </tbody>

//  <tbody>
// {checkCallSign?.map((data) => {
//   return (
//     <tr key={data._id}>
//     <td data-label="Name"></td>
//     <td data-label="Frequency">Frequency</td>
//     <td data-label="Band">Band</td>
//     {/* <td data-label="Mode">Mode</td> */}
//     <td data-label="Report Send">Report Send</td>
//     <td data-label="Report Received">Report Received</td>
//     <td data-label="Date">Date</td>
//     <td data-label="Time">Time</td>
//   </tr>
//   );
// })}
// </tbody>
