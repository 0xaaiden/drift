import { Contract, Drift } from "@delvtech/drift";
import { ReadDoppler } from "./DopplerClient";
import { DopplerABI } from "./abis/abi";


const drift = new Drift(
    {
        rpcUrl: process.env.RPC_URL,

    }
);
const contract = new ReadDoppler (
   "0xAc37729B76db6438CE62042AE1270ee574CA7571",
    drift
);

const state = await contract.getState();
console.log("State:", state);

const config = await contract.getConfig();
console.log("Config:", config);
