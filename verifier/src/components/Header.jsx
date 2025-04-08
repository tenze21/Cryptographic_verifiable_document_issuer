import { FaArrowRightLong } from "react-icons/fa6";
function Header(){
    return (
        <nav className="nav-bar">
            <a href="/">
                <img src="bcsea_logo_white.png" alt="BCSEA logo" />
            </a>
            <a href="/get-result" className="nav-link">View Result <FaArrowRightLong/></a>
        </nav>
    )
}
export default Header;