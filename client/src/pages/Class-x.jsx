import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useCreateMarksheetMutation } from "../slices/marksheetApiSlice";
import { toast } from "react-toastify";

function ClassX() {
  const [createMarksheet, { isLoading }] = useCreateMarksheetMutation();
  const initialFormData = {
    school: "",
    name: "",
    indexNo: "",
    dob: "",
    english: "",
    dzongkha: "",
    hisGeo: "",
    math: "",
    science: "",
    eco: "",
    ICT: "",
    supw: "",
    result: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showSchoolList, setShowSchoolList] = useState(false);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payload = {
      data: {
        student: {
          indexNo: formData.indexNo,
          name: formData.name,
          dob: formData.dob,
          school: formData.school,
        },
        subjects: [
          {
            name: "ENGLISH",
            marks: formData.english,
          },
          {
            name: "DZONGKHA",
            marks: formData.dzongkha,
          },
          {
            name: "HISTORY CIVICS & GEOGRAPHY",
            marks: formData.hisGeo,
          },
          {
            name: "MATHEMATICS",
            marks: formData.math,
          },
          {
            name: "SCIENCE",
            marks: formData.science,
          },
          {
            name: "ECONOMICS",
            marks: formData.eco,
          },
          {
            name: "ICT",
            marks: formData.ICT,
          },
        ],
        supw: formData.supw,
        result: formData.result,
      },
    };
    try {
      const res= await createMarksheet(payload).unwrap();
      toast.success(res.message);
      setFormData(initialFormData);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
                autoComplete="off"
                value={formData.school}
                onChange={(e) => {
                  handleChange(e);
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
                      s.toLowerCase().includes(formData.school.toLowerCase())
                    )
                    .map((school) => {
                      return (
                        <p
                          key={school}
                          onClick={() => {
                            setFormData((prev)=>({
                              ...prev,
                              school,
                            }))
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
                autoComplete="off"
                value={formData.name}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.indexNo}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.dob}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.english}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.dzongkha}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="hisGeo">History Civics & Geography: </label>
              <input
                type="number"
                id="hisGeo"
                name="hisGeo"
                required="true"
                spellCheck="false"
                autoComplete="off"
                value={formData.hisGeo}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.math}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.science}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.eco}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
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
                autoComplete="off"
                value={formData.ICT}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="supw">SUPW Grade:</label>
              <select
                name="supw"
                id="supw"
                required="true"
                className={formData.supw === "" ? "text-secondary" : ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected={formData.supw===""}>SUPW grade</option>
                <option value="A" selected={formData.supw==="A"}>A</option>
                <option value="B" selected={formData.supw==="B"}>B</option>
                <option value="C" selected={formData.supw==="C"}>C</option>
                <option value="D" selected={formData.supw==="D"}>D</option>
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="result">Result:</label>
              <select
                name="result"
                id="result"
                required="true"
                className={formData.result === "" ? "text-secondary" : ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected={formData.supw===""}>Result</option>
                <option value="PASS CERTIFICATE AWARDED" selected={formData.supw==="PASS CERTIFICATE AWARDED"}>
                  Pass certificate awarded
                </option>
                <option value="PASS CERTIFICATE NOT AWARDED" selected={formData.supw==="PASS CERTIFICATE NOT AWARDED"}>
                  Pass certificate not awarded
                </option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="marksheet-submit-btn"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
export default ClassX;
