import { createPublicClient, http } from "viem";
import {sepolia} from "viem/chains";
import dotenv from "dotenv";
dotenv.config({ path: "../variables.env" });

export const publicClient = createPublicClient({
  chain: sepolia,
  transport: http(process.env.SEPOLIA_RPC_URL),
});