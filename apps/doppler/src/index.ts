import { Contract } from "@delvtech/drift";
import { hyperdriveAbi } from "./abis/hyperdrive";

const contract = new Contract({
  abi: hyperdriveAbi,
  address: "0xAc37729B76db6438CE62042AE1270ee574CA7571",
  rpcUrl: process.env.RPC_URL,
});

const balance = await contract.read("balanceOf", {
  tokenId: 1,
  owner: contract.address,
});

console.log("Balance:", balance);
