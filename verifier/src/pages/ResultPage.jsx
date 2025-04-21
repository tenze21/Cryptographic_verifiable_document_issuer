import { useState } from "react";
import { useGetMarksheetMutation } from "../slices/MarksheetApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { FiDownload } from "react-icons/fi";
import { saveAs } from "file-saver";

function ResultPage() {
  const [indexNo, setIndexNo] = useState("");
  const [dob, setDob] = useState("");
  const [getErr, setGetErr] = useState("");
  const [data, setData] = useState(null);
  const [encryptedData, setEncryptedData] = useState("");

  const [getMarksheet, { isLoading }] = useGetMarksheetMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { marksheet, unsaltedData } = await getMarksheet({
        indexNo,
        dob,
      }).unwrap();
      setData(unsaltedData);
      setEncryptedData(marksheet);
      setIndexNo("");
      setDob("");
    } catch (err) {
      setGetErr(err?.data.message || err.error);
    }
  };

  const handleDownload = () => {
    let blob = new Blob([encryptedData], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "marksheet.txt");
  };

  return (
    <div className="mt-3 px-5 pb-5">
      <form className="detail-form" onSubmit={handleSubmit}>
        <h1>View Result</h1>
        <div className="form-field">
          <label htmlFor="indexNo">Index Number:</label>
          <input
            type="number"
            id="indexNo"
            name="indexNo"
            required
            value={indexNo}
            onChange={(e) => setIndexNo(e.target.value)}
            placeholder="Enter your index number"
            onWheel={(e) => e.target.blur()}
          />
        </div>
        <div className="form-field">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            type="date"
            id="dob"
            name="dob"
            required
            value={dob}
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {isLoading ? (
        <Loader />
      ) : getErr ? (
        <Message variant={"danger"}>{getErr}</Message>
      ) : (
        <>
          <hr />
          {data && (
            <div>
              <button
                className="download-btn"
                title="download marksheet"
                onClick={handleDownload}
              >
                <FiDownload size={32} />
              </button>
              <div className="details-wrapper">
                <h2>Student Details</h2>
                <div className="student-details">
                  <p>
                    <strong>INDEX NO.: </strong>
                    {data.data.student.indexNo}
                  </p>
                  <p>
                    <strong>NAME: </strong>
                    {data.data.student.name.toUpperCase()}
                  </p>
                  <p>
                    <strong>SCHOOL: </strong>
                    {data.data.student.school.toUpperCase()}
                  </p>
                  <p>
                    <strong>DOB: </strong>
                    {data.data.student.dob}
                  </p>
                </div>
                <h2>Marks Obtained</h2>
                <div className="subjects">
                  {data.data.subjects.map((subject) => {
                    if (subject.marks !== "N/A") {
                      return (
                        <p>
                          <strong>{subject.name}:</strong>
                          {subject.marks}
                        </p>
                      );
                    }
                  })}
                </div>
                <div className="supw">
                  <p>
                    <strong>SUPW & COMMUNITY SERVICE:</strong>
                    {data.data.supw}
                  </p>
                </div>
                <strong>{data.data.result}</strong>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default ResultPage;
