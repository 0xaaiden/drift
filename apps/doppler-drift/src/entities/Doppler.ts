// src/entities/Doppler.ts
import { getDopplerContract, getCustomRouterContract } from '../contracts';
import { HookState, DopplerAddresses } from '../types';
import { drift } from '../drift';

export class Doppler {
  private contract;
  private customRouter;

  constructor(public address: string, private addresses: DopplerAddresses) {
    this.contract = getDopplerContract(address);
    this.customRouter = getCustomRouterContract(addresses.customRouter);
  }

  async getState(): Promise<HookState> {
    return this.contract.read('state');
  }

  async buyAssetExactIn(amountIn: bigint): Promise<string> {
    const txHash = await this.customRouter.write('buyExactIn', {
      poolKey: this.getPoolKey(),
      amountIn,
    });
    return txHash;
  }

  async sellAssetExactOut(amountOut: bigint): Promise<string> {
    const txHash = await this.customRouter.write('sellExactOut', {
      poolKey: this.getPoolKey(),
      amountOut,
    });
    return txHash;
  }

  private getPoolKey() {
    // Return the pool key associated with this Doppler instance
    // This may involve storing the pool key during construction
    return {
      currency0: this.addresses.currency0,
      currency1: this.addresses.currency1,
      fee: this.addresses.fee,
      tickSpacing: this.addresses.tickSpacing,
      hooks: this.addresses.hooks,
    };
  }
}