import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useCreateMarksheetMutation } from "../slices/marksheetApiSlice";
import { toast } from "react-toastify";

function Science() {
  const [createMarksheet, { isLoading }] = useCreateMarksheetMutation();
  const initialFormData = {
    school: "",
    name: "",
    indexNo: "",
    dob: "",
    english: "N/A",
    dzongkha: "N/A",
    biology: "N/A",
    math: "N/A",
    physics: "N/A",
    chemistry: "N/A",
    supw: "",
    result: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showSchoolList, setShowSchoolList] = useState(false);

  const schools = [
    "Autsho Central School",
    "Babesa Higher Secondary School",
    "Bajothang Higher Secondary School",
    "Bartsham Central School",
    "Bayling Central School",
    "Bjishong Central School",
    "Buli Central School",
    "Chukha Central School",
    "Chumey Central School",
    "Chaskar Central School",
    "Dagana Higher Secondary School",
    "Damphu Central School",
    "Dashidhing Higher Secondary School",
    "Dechencholing Higher Secondary School",
    "Dechentsemo Central School",
    "Desi Higher Secondary School",
    "Dorokha Higher Secondary School",
    "Drukgyel Central School",
    "Drukjegang Central School",
    "Druk High School",
    "Dungtse Central School",
    "ELC Higher Secondary School",
    "Gasa Central School",
    "Gaselo Central School",
    "Gedu Higher Secondary School",
    "Gelephu Higher Secondary School",
    "Gesarling Central School",
    "Gomdar Central School",
    "Gongzim Ugyen Dorji Central School",
    "Gyelposhing Higher Secondary School",
    "Jakar Higher Secondary School",
    "Jampel Higher Secondary School",
    "Jampeling Central School",
    "Jigme Sherubling Central School",
    "Kamji Central School",
    "Karma Academy",
    "Karma Yoezerling Central School",
    "Karmaling Higher Secondary School",
    "Kelki Higher Secondary School",
    "Khaling Central School",
    "Khar Yoezerling Central School",
    "Kuendrup Higher Secondary School",
    "Kunzangling Central School",
    "Lhuentse Higher Secondary School",
    "Losel Gyatsho Academy",
    "Martshala Central School",
    "Mendrelgang Central School",
    "Minjiwong Central School",
    "Mongar Higher Secondary School",
    "Motithang Higher Secondary School",
    "Nangkor Central School",
    "Nganglam Central School",
    "Nima Higher Secondary School",
    "Norbuling Central School",
    "Orong Central School",
    "Pema Gatshel Central School",
    "Peljoring Higher Secondary School",
    "Pelkhil Higher Secondary School",
    "Pelrithang Higher Secondary School",
    "Phobjikha Central School",
    "Phuentsholing Higher Secondary School",
    "Punakha Central School",
    "Rinchen Higher Secondary School",
    "Royal Academy",
    "Samcholing Higher Secondary School",
    "Samdrup Jongkhar Higher Secondary School",
    "Samtengang Central School",
    "Samtse Higher Secondary School",
    "Sarpang Central School",
    "Shari Higher Secondary School",
    "Sherubling Central School",
    "Sherub Reldri Higher Secondary School",
    "Sonamthang Central School",
    "Tang Central School",
    "Tangmachu Central School",
    "Tashidingkha Central School",
    "Taktse Righung Higher Secondary School",
    "Tendruk Central School",
    "Trashigang Central School",
    "Trashiyangtse Central School",
    "Trongsa Central School",
    "Tshangkha Central School",
    "Udzorong Central School",
    "Ugyen Academy",
    "Ura Central School",
    "Utpal Academy",
    "Wangbama Central School",
    "Wanakha Central School",
    "Yadi Central School",
    "Yangchenphug Higher Secondary School",
    "Yebilabtsa Central School",
    "Yonten Kuenjung Academy",
    "Yoezerling Higher Secondary School",
    "Yoeseltse Higher Secondary School",
    "Yurung Central School",
    "Zhemgang Higher Secondary School",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if(value.length===0){
      const { name} = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: "N/A",
      }));  
    }
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
            name: "BIOLOGY",
            marks: formData.biology,
          },
          {
            name: "MATHEMATICS",
            marks: formData.math,
          },
          {
            name: "PHYSICS",
            marks: formData.physics,
          },
          {
            name: "CHEMISTRY",
            marks: formData.chemistry,
          },
        ],
        supw: formData.supw,
        result: formData.result,
      },
    };
    try {
      const res = await createMarksheet(payload).unwrap();
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
        <h1 className="d-block mx-auto mt-2 mb-3 fs-2">Class XII Science</h1>
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
                            setFormData((prev) => ({
                              ...prev,
                              school,
                            }));
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
                spellCheck="false"
                autoComplete="off"
                value={formData.dzongkha}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="biology">Biology: </label>
              <input
                type="number"
                id="biology"
                name="biology"
                spellCheck="false"
                autoComplete="off"
                value={formData.biology}
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
                spellCheck="false"
                autoComplete="off"
                value={formData.math}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="physics">Physics:</label>
              <input
                type="number"
                id="physics"
                name="physics"
                spellCheck="false"
                autoComplete="off"
                value={formData.physics}
                onWheel={(e) => e.target.blur()}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="chemistry">Chemistry:</label>
              <input
                type="number"
                id="chemistry"
                name="chemistry"
                spellCheck="false"
                autoComplete="off"
                value={formData.chemistry}
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
                <option value="" selected={formData.supw === ""}>
                  SUPW grade
                </option>
                <option value="A" selected={formData.supw === "A"}>
                  A
                </option>
                <option value="B" selected={formData.supw === "B"}>
                  B
                </option>
                <option value="C" selected={formData.supw === "C"}>
                  C
                </option>
                <option value="D" selected={formData.supw === "D"}>
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
                className={formData.result === "" ? "text-secondary" : ""}
                onChange={(e) => handleChange(e)}
              >
                <option value="" selected={formData.supw === ""}>
                  Result
                </option>
                <option
                  value="PASS CERTIFICATE AWARDED"
                  selected={formData.supw === "PASS CERTIFICATE AWARDED"}
                >
                  Pass certificate awarded
                </option>
                <option
                  value="PASS CERTIFICATE NOT AWARDED"
                  selected={formData.supw === "PASS CERTIFICATE NOT AWARDED"}
                >
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
export default Science;
