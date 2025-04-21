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
          <span>Bhutan Council for school Examinations and Assessment</span>
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
            {<div className="marksheet-header">
            <img src="../seal.png" alt="BCSEA Seal" className="header-logo" />
            <div className="dzongkha-text">འབྲུག་གི་སློབ་གྲའི་ཆོས་རྒྱུགས་དང་བརྟག་ཞིབ་ཚོགས་སྡེ།
            </div>
            <div className="bcsea-title">
              Bhutan Council for School Examinations and Assessment
            </div>
            <div className="dzongkha-text">འབྲུག་འབྲིང་རིམ་གྱི་ཤེས་ཡོན་ལག་ཁྱེར།།</div>
            <div className="certificate-title">
              BHUTAN CERTIFICATE OF SECONDARY EDUCATION (CLASS X) <br/> <span className="dzongkha-text">སྐུགས་ཐོ།</span> <br/>
              <span>STATEMENT OF MARKS</span>
            </div>
          </div>}
          </div>
          <div className="marksheet-body">
            <p>
              Certified that {marksheetData.data.student.name.toUpperCase()}
            </p>
            <p>Index No. {marksheetData.data.student.indexNo}</p>
            <p>of {marksheetData.data.student.school.toUpperCase()}</p>
            {marksheetData.data.result === "PASS CERTIFICATE AWARDED" ? (
              <p>was awarded a PASS CERTIFICATE</p>
            ) : (
              <p>was not awarded a PASS CERTIFICATE</p>
            )}
            <h1>BHUTAN HIGHER SECONDARY EDUCATION CERTIFICATE (CLASS XII)</h1>
            <table>
              <thead>
                <tr>
                  <th>
                    <span>Subjects</span> <br/><span>External Examination</span>
                  </th>
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
                <strong>DATE OF BIRTH</strong> <span className="dob">{marksheetData.data.student.dob}{" "}</span>
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
                <span className="supw-grade">{marksheetData.data.supw}
                </span>
              </p>
              <p>
                <strong>ISSUED ON</strong>
                <span className="issued-date">{marksheetData.updatedAt.split("T")[0]}{" "}</span>
                {/* <span className="text-muted">(yyyy/mm/dd)</span>{" "} */}
              </p>
            </div>
            <div className="qr_container">
              {/* Include the deployed link here */}
              <QRCodeSVG
                value={`http://localhost:5173/marksheet/${marksheetData._id}`}
                size={90}
              />
            </div>

            <img 
              src="./bcsea_logo_ms.jpeg" 
              alt="BCSEA Logo" 
              className="bcsea-watermark" 
            />
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
