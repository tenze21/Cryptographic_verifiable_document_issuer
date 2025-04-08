import { http, createConfig } from "wagmi";
import { sepolia, mainnet } from "wagmi/chains";

export const config = createConfig({
  chains: [mainnet, sepolia],
  pollingInterval: 1_000,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/exXYlVW9dyoLsRi3oioZhH1Q9kMwQxnk'),
  },
});
