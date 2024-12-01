// Core types
import { Drift, ReadContract, ReadWriteContract, ReadAdapter, ReadWriteAdapter } from "@delvtech/drift";
import { DopplerABI } from "./abis/abi";
import { StateViewABI } from "./abis/abi";
import { PoolState, Position, HookState, HookConfig } from "./entities/Doppler";

// Base Read Client for Pool
export class ReadPool {
  contract: ReadContract<typeof DopplerABI>;
  stateViewContract: ReadContract<typeof StateViewABI>;

  constructor(
    address: string, 
    stateViewAddress: string,
    drift: Drift<ReadAdapter> = new Drift()
  ) {
    this.contract = drift.contract({
      abi: DopplerABI,
      address,
    });

    this.stateViewContract = drift.contract({
      abi: StateViewABI,
      address: stateViewAddress,
    });
  }

  async getState(poolId: string): Promise<PoolState> {
    // Get number of PD slugs
    const numPdSlugs = await this.contract.read("numPDSlugs");

    // Fetch positions
    const [lowerSlugState, upperSlugState] = await Promise.all([
      this.contract.read("positions", { 
        args: ["0x0000000000000000000000000000000000000000000000000000000000000001"]
      }),
      this.contract.read("positions", {
        args: ["0x0000000000000000000000000000000000000000000000000000000000000002"]
      })
    ]);

    // Fetch PD slug states
    const pdSlugStates = await Promise.all(
      this.getPdSalts(Number(numPdSlugs)).map(salt =>
        this.contract.read("positions", { args: [salt] })
      )
    );

    // Get slot0 data
    const slot0 = await this.stateViewContract.read("getSlot0", { args: [poolId] });
    const sqrtPriceX96 = slot0[0];
    const price = (sqrtPriceX96 * sqrtPriceX96) / BigInt(2 ** 192);

    return {
      positions: [
        this.fromRaw(lowerSlugState),
        this.fromRaw(upperSlugState),
        ...pdSlugStates.map(state => this.fromRaw(state))
      ],
      currentTick: Number(slot0[1]),
      currentPrice: price,
      lastSyncedTimestamp: Math.floor(Date.now() / 1000)
    };
  }

  private fromRaw(raw: any): Position {
    const type = raw[3] == 1 ? 'lowerSlug' : raw[3] == 2 ? 'upperSlug' : 'pdSlug';
    return {
      tickLower: raw[0],
      tickUpper: raw[1],
      liquidity: raw[2],
      salt: raw[3],
      type,
    };
  }

  private getPdSalts(numPdSlugs: number): string[] {
    return Array(numPdSlugs)
      .fill(0)
      .map((_, i) =>
        i < 7
          ? `0x000000000000000000000000000000000000000000000000000000000000000${i + 3}`
          : `0x00000000000000000000000000000000000000000000000000000000000000${i + 3}`
      );
  }
}

