// src/contracts/CustomRouterContract.ts
import { drift } from 'src/core/drift';
import {CustomRouterABI} from '../abis/abi';
import { ReadWriteContract } from '@delvtech/drift';

type CustomRouterABI = typeof CustomRouterABI;

export function getCustomRouterContract(address: `0x${string}`): ReadWriteContract<CustomRouterABI> {
  return drift.contract({
    abi: CustomRouterABI,
    address,
  });
}
