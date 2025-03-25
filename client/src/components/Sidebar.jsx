import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";

function Sidebar() {
  const [show, setShow] = useState(true);
  return (
    <nav className="sidebar">
      <ul>
        <li>
          <Link to="/compile-marksheets">Compile Marksheets</Link>
        </li>
        <li>
          <p onClick={() => setShow(!show)}>
            Create Marksheets
            {show ? (
              <IoMdArrowDropup size={"32px"} color="#fff" />
            ) : (
              <MdArrowDropDown size={"32px"} color="#fff" />
            )}
          </p>
          <ul className={`dropdown ${show ? "show" : ""}`}>
            <li>
              <p>Class X</p>
            </li>
            <li>
              <p>Science</p>
            </li>
            <li>
              <p>Commerce</p>
            </li>
            <li>
              <p>Arts</p>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;