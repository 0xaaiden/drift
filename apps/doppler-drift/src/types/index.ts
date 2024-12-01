// src/types/index.ts
import { PoolKey } from '@uniswap/v4-sdk';

export interface DopplerAddresses {
  airlock: string;
  tokenFactory: string;
  dopplerFactory: string;
  governanceFactory: string;
  migrator: string;
  poolManager: string;
  stateView: string;
  customRouter: string;
  currency0?: string;
  currency1?: string;
  fee?: number;
  tickSpacing?: number;
  hooks?: string;
}

export interface DopplerDeploymentConfig {
  name: string;
  symbol: string;
  totalSupply: bigint;
  numTokensToSell: bigint;
  poolKey: PoolKey;
  dopplerFactoryData: string;
  salt: string;
  // Include other necessary properties
}

export interface DopplerPreDeploymentConfig {
  name: string;
  symbol: string;
  totalSupply: bigint;
  numTokensToSell: bigint;
  // Include other properties needed for config building
}

export interface HookState {
  lastEpoch: number;
  tickAccumulator: bigint;
  totalTokensSold: bigint;
  totalProceeds: bigint;
  // Include other state properties
}