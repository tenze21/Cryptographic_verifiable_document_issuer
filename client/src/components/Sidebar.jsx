import { Link } from "react-router-dom";
import { MdArrowDropDown } from "react-icons/md";
import { IoMdArrowDropup } from "react-icons/io";
import { useState } from "react";

function Sidebar({state}) {
  const [show, setShow] = useState(true);
  return (
    <nav className="sidebar">
      <ul>
        <li className={state==0? "active-sidebar-link": "sidebar-link"}>
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
            <li className={state==1? "active-sidebar-link": "sidebar-link"}>
              <Link to="/science">Science</Link>
            </li>
            <li className={state==2? "active-sidebar-link": "sidebar-link"}>
              <Link to="/commerce">Commerce</Link>
            </li>
            <li className={state==3? "active-sidebar-link": "sidebar-link"}>
              <Link to="/arts">Arts</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}

export default Sidebar;