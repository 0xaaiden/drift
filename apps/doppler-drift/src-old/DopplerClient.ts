import { Drift, ReadContract, ReadWriteContract, ReadAdapter, ReadWriteAdapter } from "@delvtech/drift";
import { DopplerABI } from "./abis/abi";
import { DopplerLensABI } from "./abis/abi";
import { HookState, HookConfig } from "./entities/Doppler";

// Base Read Client for Doppler
export class ReadDoppler {
    contract: ReadContract<typeof DopplerABI>;
    lensContract: ReadContract<typeof DopplerLensABI>;
  
    constructor(
      address: string,
      drift: Drift<ReadAdapter> = new Drift()
    ) {
      this.contract = drift.contract({
        abi: DopplerABI,
        address,
      });
  
      this.lensContract = drift.contract({
        abi: DopplerLensABI,
        address,
      });
    }
  
    async getState(): Promise<HookState> {
      const state = await this.contract.read("state");
      
      // Process the fees data
      const feesAccrued = state[5];
      const amount0 = feesAccrued >> BigInt(128);
      const amount1 = feesAccrued & ((BigInt(1) << BigInt(128)) - BigInt(1));
  
      return {
        lastEpoch: state[0],
        tickAccumulator: state[1],
        totalTokensSold: state[2],
        totalProceeds: state[3],
        totalTokensSoldLastEpoch: state[4],
        feesAccrued: { amount0, amount1 },
      };
    }
  
    async getConfig(): Promise<HookConfig> {
      const config = await this.lensContract.read("getDopplerImmutables", {
        args: [this.contract.address]
      });
  
      return {
        startingTime: config[0],
        endingTime: config[1],
        epochLength: Number(config[2]),
        isToken0: config[3],
        numTokensToSell: config[4],
        minimumProceeds: config[5],
        maximumProceeds: config[6],
        startingTick: config[7],
        endingTick: config[8],
        gamma: config[9],
        totalEpochs: Number(config[10]),
        numPDSlugs: Number(config[11]),
      };
    }
  }
  