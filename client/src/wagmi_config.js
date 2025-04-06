import { http, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";
import { metaMask, coinbaseWallet, walletConnect, } from "wagmi/connectors";

const projectId = "1a97668217c210530ef2f686db6760d2";

export const config = createConfig({
  chains: [mainnet, sepolia],
  pollingInterval: 1_000,
  connectors: [metaMask(), coinbaseWallet(), walletConnect({ projectId })],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/exXYlVW9dyoLsRi3oioZhH1Q9kMwQxnk'),
  },
});
