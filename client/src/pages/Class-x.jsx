import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useCreateMarksheetMutation } from "../slices/marksheetApiSlice";

function ClassX() {

  const [createMarksheet, {isLoading}]= useCreateMarksheetMutation();
  const schools = [
    "Gaselo Central School",
    "Bajo Higher Secondary School",
    "Bumthang Higher Secondary School",
    "Chumey Central School",
    "Drukgyel Central School",
    "Gasa Central School",
    "Jakar Higher Secondary School",
    "Jigme Namgyel Engineering College",
    "Karma Yoezerling Central School",
    "Khar Yoezerling Central School",
    "Lhuentse Higher Secondary School",
    "Mongar Higher Secondary School",
    "Nganglam Central School",
    "Pema Gatshel Central School",
    "Phuentsholing Higher Secondary School",
    "Punakha High Secondary School",
    "Rudra International Academy",
    "Samdrup Jongkhar Higher Secondary School",
    "Sarpang Central School",
    "Sherubtse College",
    "Thimphu High Secondary School",
    "Trashigang Central School",
    "Trashiyangtse Central School",
    "Trongsa Central School",
  ];

  const [showSchoolList, setShowSchoolList] = useState(false);

  const [school, setSchool] = useState("");
  const [name, setName] = useState("");
  const [indexNo, setIndexNo] = useState("");
  const [dob, setDob] = useState("");
  const [english, setEnglish] = useState("");
  const [dzongkha, setDzongkha] = useState("");
  const [math, setMath] = useState("");
  const [science, setScience] = useState("");
  const [eco, setEco] = useState("");
  const [ICT, setICT] = useState("");
  const [supw, setSupw]= useState("");
  const [result, setResult] = useState("");

  const submitHandler=(e)=>{
    e.preventDefault();
    const data={}
  }

  return (
    <div className="wrapper">
      <Sidebar />
      <div className="d-flex flex-column justify-content-center align-items-center">
        <h1 className="d-block mx-auto mt-2 mb-3 fs-2">Class X</h1>
        <form className="marksheet-form" onSubmit={submitHandler}>
          <div className="form-field-wrapper">
            <div className="form-field position-relative">
              <label htmlFor="school">School:</label>
              <input
                type="text"
                id="school"
                name="school"
                required="true"
                spellCheck="false"
                autoComplete="false"
                value={school}
                onChange={(e) => {
                  setSchool(e.target.value);
                  setShowSchoolList(true);
                }}
              />
              {showSchoolList === false ? (
                <div></div>
              ) : (
                <div
                  className="bg-dark p-4"
                  style={{
                    width: "max-content",
                    position: "absolute",
                    left: "0.3rem",
                    top: "4.3rem",
                    height: "300px",
                    overflowY: "scroll",
                  }}
                >
                  {schools
                    .filter((s) =>
                      s.toLowerCase().includes(school.toLowerCase())
                    )
                    .map((school) => {
                      return (
                        <p
                          key={school}
                          onClick={() => {
                            setSchool(school);
                            setShowSchoolList(false);
                          }}
                          className="text-light"
                          style={{ cursor: "pointer" }}
                        >
                          {school}
                        </p>
                      );
                    })}
                </div>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="name">Student name:</label>
              <input
                type="text"
                id="name"
                name="name"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onChange={(e)=>setName(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="indexNo">Index number:</label>
              <input
                type="number"
                id="indexNo"
                name="indexNo"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setIndexNo(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="dob">DOB:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onChange={(e)=>setDob(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="english">English:</label>
              <input
                type="number"
                id="english"
                name="english"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setEnglish(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="dzongkha">Dzongkha:</label>
              <input
                type="number"
                id="dzongkha"
                name="dzongkha"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setDzongkha(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="math">Mathematics:</label>
              <input
                type="number"
                id="math"
                name="math"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setMath(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="science">Science:</label>
              <input
                type="number"
                id="science"
                name="science"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setScience(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="eco">Economics:</label>
              <input
                type="number"
                id="eco"
                name="eco"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setEco(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="ICT">ICT:</label>
              <input
                type="number"
                id="ICT"
                name="ICT"
                required="true"
                spellCheck="false"
                autoComplete="false"
                onWheel={(e) => e.target.blur()}
                onChange={(e)=>setICT(e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="supw">SUPW Grade:</label>
              <select
                name="supw"
                id="supw"
                required="true"
                className={supw === "" ? "text-secondary" : ""}
                onChange={(e)=>setSupw(e.target.value)}
              >
                <option value="">SUPW grade</option>
                <option value="A">
                  A
                </option>
                <option value="B">
                  B
                </option>
                <option value="C">
                  C
                </option>
                <option value="D">
                  D
                </option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="result">Result:</label>
              <select
                name="result"
                id="result"
                required="true"
                className={result === "" ? "text-secondary" : ""}
                onChange={(e)=>setResult(e.target.value)}
              >
                <option value="">Result</option>
                <option value="Pass certificate awarded">
                  Pass certificate awarded
                </option>
                <option value="Pass certificate not awarded">
                  Pass certificate not awarded
                </option>
              </select>
            </div>
          </div>
          <button type="submit" className="marksheet-submit-btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default ClassX;
