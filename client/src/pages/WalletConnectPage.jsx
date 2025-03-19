import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Image, Spinner } from "react-bootstrap";
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
      <article className="position-relative wallet-container">
        <div>
          <Image
            src="metamask.png"
            width={"80px"}
            height={"80px"}
            className="position-absolute"
            style={{ top: "40px", left: "50px" }}
          />
          <Image
            src="coinbase.png"
            width={"80px"}
            height={"80px"}
            className="position-absolute"
            style={{ top: "40px", right: "50px" }}
          />
          <Image
            src="exodus.svg"
            width={"80px"}
            height={"80px"}
            className="position-absolute"
            style={{ top: "150px", left: "60px" }}
          />
          <Image
            src="guarda-1.svg"
            width={"80px"}
            height={"80px"}
            className="position-absolute"
            style={{ top: "170px", right: "180px" }}
          />
          <Image
            src="dash-d.svg"
            width={"80px"}
            height={"80px"}
            className="position-absolute"
            style={{ top: "60px", left: "180px" }}
          />
        </div>
        {account.status === "connecting" ? (
          <button
            style={{ position: "relative", top: "80%" }}
            className="button-custom-loading"
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
            className="button-custom-loading"
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
