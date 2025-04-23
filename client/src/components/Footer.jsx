import { Image } from "react-bootstrap";
function Footer(){
    return (
        <footer className="px-5 pb-2">
            <div className="d-flex justify-content-center py-3">
                <Image src="gcit_logo.png" width={"60px"} height={"60px"}/>
                <Image src="bcsea_logo.png" width={"60px"} height={"60px"}/>
                <Image src="education.png" width={"60px"} height={"60px"}/>
                <Image src="rub_logo.png" width={"60px"} height={"60px"}/>
            </div>
            <hr/>
            <p className="text-center text-light">PRJ202 © 2025. All rights reserved.</p>
        </footer>
    )
}
export default Footer;