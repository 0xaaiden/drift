// src/actions/trade.ts
import { Doppler } from '../entities';

export async function buyAssetExactIn(
  doppler: Doppler,
  amountIn: bigint
): Promise<string> {
  return doppler.buyAssetExactIn(amountIn);
}

export async function sellAssetExactOut(
  doppler: Doppler,
  amountOut: bigint
): Promise<string> {
  return doppler.sellAssetExactOut(amountOut);
}