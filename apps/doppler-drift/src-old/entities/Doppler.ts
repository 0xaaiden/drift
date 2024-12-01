export type HookConfig = {
  startingTime: bigint;
  endingTime: bigint;
  epochLength: number;
  isToken0: boolean;
  numTokensToSell: bigint;
  minimumProceeds: bigint;
  maximumProceeds: bigint;
  startingTick: number;
  endingTick: number;
  gamma: number;
  totalEpochs: number;
  numPDSlugs: number;
};

export type HookState = {
  lastEpoch: bigint;
  tickAccumulator: bigint;
  totalTokensSold: bigint;
  totalProceeds: bigint;
  totalTokensSoldLastEpoch: bigint;
  feesAccrued: {
    amount0: bigint;
    amount1: bigint;
  };
};

export type Position = {
  tickLower: number;
  tickUpper: number;
  liquidity: bigint;
  salt: number;
  type: 'lowerSlug' | 'upperSlug' | 'pdSlug';
};

export type PoolState = {
  positions: Position[];
  currentTick: number;
  currentPrice: bigint;
  lastSyncedTimestamp: bigint;
};
