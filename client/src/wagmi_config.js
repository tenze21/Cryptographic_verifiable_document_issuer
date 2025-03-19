import { http, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect, } from "wagmi/connectors";

const projectId = "1a97668217c210530ef2f686db6760d2";

export const config = createConfig({
  chains: [mainnet, sepolia],
  connectors: [metaMask(), coinbaseWallet(), walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});
