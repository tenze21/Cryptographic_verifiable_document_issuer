import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { BiShow, BiHide } from "react-icons/bi";

function Header() {
  const [showDetails, setShowDetails] = useState(true);
  const { address } = useAccount();
  const {disconnect}= useDisconnect();

  return (
    <section aria-labelledby="Account details" className="d-flex justify-content-between alitn-items-center p-4 custom-header">
      {showDetails ? (
        <div className="d-flex align-items-center gap-3">
          <h2 className="fw-normal fs-4 text-light">Address: {address}</h2>{" "}
          <button
            onClick={() => setShowDetails(false)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
          >
            <BiShow color="white" size={"32px"} />
          </button>
        </div>
      ) : (
        <div className="d-flex align-items-center gap-3">
          <h2 className="fw-normal fs-4 text-light">Address: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</h2>
          <button
            onClick={() => setShowDetails(true)}
            style={{
              border: "none",
              backgroundColor: "transparent",
              outline: "none",
            }}
          >
            <BiHide color="white" size={"32px"} />
          </button>
        </div>
      )}
      <button className="rounded-5 button-custom" onClick={()=> disconnect()}>Disconnect</button>
    </section>
  );
}
export default Header;
