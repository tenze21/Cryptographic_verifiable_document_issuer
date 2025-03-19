import { useAccount } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

function LoginPage() {
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (isDisconnected) {
      navigate(redirect);
    }
  }, [isDisconnected, navigate, redirect]);
  return (
    <>
      <Header/>
      
    </>
  );
}
export default LoginPage;
