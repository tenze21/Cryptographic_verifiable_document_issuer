import { useState } from "react";
import Sidebar from "../components/Sidebar";

function Commerce() {
  return (
    <div className="d-flex">
      <Sidebar />
      <div>
        <h1 className="d-block mx-auto mt-2">Class XII Commerce</h1>
        <form className="marksheet-form">
          <div className="form-field">
            <label htmlFor="school">School:</label>
            <input
              type="text"
              id="school"
              name="school"
              required="true"
              spellCheck="false"
              autoComplete="false"
            />
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
            />
          </div>
          <div className="form-field">
            <label htmlFor="BE">Business and Entrepreneurship:</label>
            <input
              type="number"
              id="BE"
              name="BE"
              required="true"
              spellCheck="false"
              autoComplete="false"
            />
          </div>
          <div className="form-field">
            <label htmlFor="eco">Economics:</label>
            <input
              type="number"
              id="eco"
              name="eco"
              spellCheck="false"
              autoComplete="false"
            />
          </div>
          <div className="form-field">
            <label htmlFor="accountancy">Accountancy:</label>
            <input
              type="number"
              id="ICT"
              name="ICT"
              spellCheck="false"
              autoComplete="false"
            />
          </div>
          <div className="form-field">
            <label htmlFor="result">Result:</label>
            <select name="result" id="result" required="true">
              <option value="">Result</option>
              <option value="Pass certificate awarded">
                Pass certificate awarded
              </option>
              <option value="Pass certificate not awarded">
                Pass certificate not awarded
              </option>
            </select>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
export default Commerce;
