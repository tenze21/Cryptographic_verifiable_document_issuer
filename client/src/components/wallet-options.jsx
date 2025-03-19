import { useConnect } from "wagmi";
import { Button, Image } from "react-bootstrap";
import { Modal } from "react-bootstrap";

function WalletOptions(props) {
  const { connectors, connect } = useConnect();
  const walletIcons = {
    MetaMask: "metamask.png",
    "Coinbase Wallet": "coinbase.png",
    WalletConnect: "wallet-connect.png",
  };

  return (
    <Modal {...props} size="sm" centered>
      <Modal.Header closeButton>
        <Modal.Title>Connect Wallet</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column gap-2">
        {connectors.map((connector) => (
          <Button
          size="lg"
            variant="light"
            key={connector.uid}
            onClick={() => {
              props.onHide();
              connect({ connector });
            }}
            className="d-flex justify-content-between gap-5 pt-3"
          >
            <p>{connector.name}</p>
            <Image src={walletIcons[connector.name]} width={"30px"} height={"30px"}/>
          </Button>
        ))}
      </Modal.Body>
    </Modal>
  );
}
export default WalletOptions;
