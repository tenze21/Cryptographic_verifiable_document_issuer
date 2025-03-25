import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Image, Spinner } from "react-bootstrap";
import WalletOptions from "../components/wallet-options";
import { config } from "../wagmi_config";

function WalletConnectPage() {
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const account = useAccount({ config });
  const navigate= useNavigate();

  const {search}= useLocation();
  const sp= new URLSearchParams(search);
  const redirect= sp.get("redirect") || "/login";

  useEffect(()=>{
    if(account.status==="connected"){
      navigate(redirect);
    }
  },[navigate, account, redirect]);

  return (
    <>
      <article className="position-relative wallet-container d-block m-auto mt-5">
        <div>
          <Image
            src="metamask.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "50px", left: "50px" }}
          />
          <Image
            src="coinbase.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "50px", right: "70px" }}
          />
          <Image
            src="exodus_logo.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "160px", left: "90px" }}
          />
          <Image
            src="loopering_logo.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "230px", right: "160px" }}
          />
          <Image
            src="zerion_logo.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "160px", right: "70px" }}
          />
          <Image
            src="bybit_logo.png"
            width={"60px"}
            height={"60px"}
            className="position-absolute"
            style={{ top: "80px", left: "170px" }}
          />
        </div>
        {account.status === "connecting" ? (
          <button
            style={{ position: "relative", top: "80%" }}
            className="button-custom-loading d-block m-auto"
            disabled
          >
            <Spinner
              as="span"
              variant="light"
              animation="border"
              size="md"
              role="status"
              aria-hidden="true"
            />
          </button>
        ) : (
          <button
            style={{ position: "relative", top: "80%" }}
            className="button-custom-loading d-block m-auto"
            onClick={() => setShowWalletOptions(true)}
          >
            Connect Wallet
          </button>
        )}
      </article>
      <WalletOptions
        show={showWalletOptions}
        onHide={() => setShowWalletOptions(false)}
      />
    </>
  );
}
export default WalletConnectPage;
