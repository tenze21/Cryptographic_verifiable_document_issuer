import { useState } from "react";
import { useAccount, useDisconnect } from "wagmi";
import { BiShow, BiHide } from "react-icons/bi";
import {config} from '../wagmi_config.js';
import { useSelector , useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCredentials } from "../slices/authSlice.js";
import { useLogoutMutation } from "../slices/userApiSlice.js";
import {toast} from 'react-toastify';

function Header() {
  const [showDetails, setShowDetails] = useState(true);
  const { address } = useAccount();
  const {disconnect}= useDisconnect();
  const account= useAccount({config});

  const dispatch= useDispatch();
  const navigate= useNavigate();

  const userInfo= useSelector((state)=> state.auth);
  const [logoutApiCall, {isLoading}]= useLogoutMutation();

  const logoutHandler= async ()=>{
    try {
      await logoutApiCall().unwrap();
      dispatch(clearCredentials());
      navigate("/login");
    } catch (err) {
      toast.error("Error logging out: ", err.message);
    }
  }

  return (
    <section aria-labelledby="Account details" className="d-flex justify-content-between alitn-items-center p-4 custom-header">
      {account.status==="connected" ? (
        <>
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
        {userInfo.userInfo? (
          <button className="button-custom rounded-5" onClick={logoutHandler} disabled={isLoading}>Log Out</button>
        ) : (
          <button className="rounded-5 button-custom" onClick={()=> disconnect()}>Disconnect</button>
        )}
        </>
      ) : (
        <h2 className="text-light d-block mx-auto">Connect Wallet</h2>
      )}
    </section>
  );
}
export default Header;
