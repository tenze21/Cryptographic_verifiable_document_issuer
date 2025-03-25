import { useAccount, useSignMessage } from "wagmi";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLoginMutation } from "../slices/userApiSlice";
import { SiweMessage } from "siwe";
import { setCredentials } from "../slices/authSlice";
import {useDispatch} from 'react-redux';
import {toast} from 'react-toastify';

function LoginPage() {
  const [email, setEmail] = useState("");
  const { isDisconnected } = useAccount();
  const navigate = useNavigate();
  const { address } = useAccount();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch= useDispatch();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (isDisconnected) {
      navigate(redirect);
    }
  }, [isDisconnected, navigate, redirect]);

  const domain = window.location.host;
  const origin = window.location.origin;
  const statement = "sign in with ethereum";

  const createSiweMessage = async () => {
    const res= await fetch("http://localhost:4000/api/user/nonce", {
      method: "GET",
      credentials: "include"
    });
    const nonce=await res.text();

    const message = new SiweMessage({
      domain,
      address,
      statement,
      uri: origin,
      version: "1",
      chainId: "1",
      nonce: nonce,
    });
    return message.prepareMessage();
  };

  const {signMessageAsync} = useSignMessage();

  const submitHandler = async (e) => {
    e.preventDefault();
    const message = await createSiweMessage();
    console.log(message);
    
    const signature = await signMessageAsync({message});
    try {
      const res= await login({message, signature}).unwrap();
      dispatch(setCredentials({...res}));
      toast.success("Welcome back!");
      navigate("/compile-marksheets");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <article
        onSubmit={submitHandler}
        className="d-flex justify-content-center align-items-center mt-5"
      >
        <form className="d-flex flex-column gap-3 justify-content-center align-items-center p-3 custom-form rounded-3">
          <h1>SIGN IN</h1>
          <div className="form-field d-flex flex-column gap-1">
            <label htmlFor="email" className="fw-bold">
              Email address:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter you email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button disabled={isLoading} type="submit" className="button-custom-loading mt-3">
            Sign In
          </button>
        </form>
      </article>
    </>
  );
}
export default LoginPage;
