import { Spinner } from "react-bootstrap";

const VerificationLoader = ({variant}) => {
  return (
    <Spinner
      animation="border"
      role="status"
      variant={variant}
      style={{
        width: "60px",
        height: "60px",
        margin: "auto",
        display: "block",
      }}
    ></Spinner>
  );
};
export default VerificationLoader;