import { useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { LuPrinter } from "react-icons/lu";
import { useSelector } from "react-redux";
import { convertToWords } from "react-number-to-words";
import { QRCodeSVG } from "qrcode.react";
import { useReactToPrint } from "react-to-print";

function MarksheetViewPage() {
  const marksheetData = useSelector((state) => state.marksheet.data);
  const contentRef = useRef(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <>
      <header className="validation_results">
        <h1>
          Issued by{" "}
          <span className="issuer">Bhutan Council for school Examinations and Assessment</span>
        </h1>
        <div className="d-flex align-items-center gap-5">
          <p>
            <FaCheckCircle color="green" size={24} /> Document hash is valid.
          </p>
          <p>
            <FaCheckCircle color="green" size={24} /> Document root is valid.
          </p>
          <p>
            <FaCheckCircle color="green" size={24} /> Document has been issued.
          </p>
          <p>
            <FaCheckCircle color="green" size={24} /> Document has signed by
            BCSEA.
          </p>
        </div>
      </header>
      <div>
        <button className="print-btn" onClick={handlePrint}>
          <LuPrinter size={24} /> Print
        </button>
        <div className="marksheet" ref={contentRef}>
          <div className="marksheet-header">
            <img src="../seal.png" alt="BCSEA Seal" className="header-logo" />
            <div className="dzongkha-text">འབྲུག་གི་སློབ་གྲའི་ཆོས་རྒྱུགས་དང་བརྟག་ཞིབ་ཚོགས་སྡེ།</div>
            <p className="english-text">Bhutan Council for School Examinations and Assessment</p>
            <p className="dzongkha-text">མཐར་འཁྱོལ་ལག་ཁྱེར།</p>
            <p className="english-text">PASS CERTIFICATE</p>
          </div>
          <div className="marksheet-body">
            <p className="student-detail">
              <span>Certified that</span> <span>{marksheetData.data.student.name.toUpperCase()}</span>  
            </p>
            <p className="student-detail"><span>Index Number</span> <span>{marksheetData.data.student.indexNo}</span></p>
            <p className="student-detail"><span>of</span> <span>{marksheetData.data.student.school.toUpperCase()}</span></p>
            {marksheetData.data.result === "PASS CERTIFICATE AWARDED" ? (
              <p className="student-detail"><span>was awarded a</span> <span>PASS CERTIFICATE</span></p>
            ) : (
              <p className="student-detail"><span>was not awarded a</span> <span>PASS CERTIFICATE</span></p>
            )}
            <h1 className="fs-3">འབྲུག་འབྲིང་རིམ་གོང་མའི་ཤེས་ཡོན་ལག་ཁྱེར།</h1>
            <h1>BHUTAN HIGHER SECONDARY EDUCATION CERTIFICATE (CLASS XII)</h1>
            <table>
              <thead>
                <tr>
                  <th>Subjects</th>
                  <th>Percentage Marks</th>
                </tr>
              </thead>
              {marksheetData.data.subjects.map((subject) => {
                if (subject.marks !== "N/A") {
                  return (
                    <tr key={subject.name}>
                      <td>{subject.name}</td>
                      <td>
                        {subject.marks}{" "}
                        {convertToWords(Number(subject.marks)).toUpperCase()}
                      </td>
                    </tr>
                  );
                }
              })}
            </table>
            <div>
              <p>
                <strong>DATE OF BIRTH</strong> <span className="dob">{marksheetData.data.student.dob}</span>
                {/* <span className="text-muted">(yyyy/mm/dd)</span> */}
              </p>
              <p>
                <strong>RESULT</strong>
                <span className="resultd">{marksheetData.data.result}</span>
              </p>
              <div>
                <p>NOTE</p>
                <ol className="note-list">
                  <li>The pass mark for each subject is 40%.</li>
                  <li>No divisions are awarded.</li>
                </ol>
              </div>
              <p>
                <strong>SUPW & COMMUNITY SERVICE</strong>{" "}
                <span className="supw-grade fw-bold">{marksheetData.data.supw}
                </span>
              </p>
              <p>
                <strong>ISSUED ON</strong>
                <span className="issued-date fw-bold">{marksheetData.updatedAt.split("T")[0]}{" "}</span>
              </p>
            </div>
            <div className="qr_container">
              {/* Include the deployed link here */}
              <QRCodeSVG
                value={`http://localhost:5173/marksheet/${marksheetData._id}`}
                size={90}
              />
            </div>
          </div>
          <div className="marksheet-footer">
            <img
              src="director_bcsea.svg"
              alt="Signature of Director of BCSEA"
            />
            <p>No divisions are awarded</p>
            <img
              src="exam_controller.svg"
              alt="Signature of Controller of Examination BCSEA"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default MarksheetViewPage;
