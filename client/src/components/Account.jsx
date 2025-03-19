import { useAccount, useDisconnect } from "wagmi";

function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <div>
      {address && <p>Address: {address}</p>}
      <button onClick={() => disconnect()}>Disconnect</button>
    </div>
  );
}
export default Account;
