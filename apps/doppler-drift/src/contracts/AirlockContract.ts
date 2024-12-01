// src/contracts/AirlockContract.ts
import { drift } from 'src/core/drift';
import {AirlockABI} from '../abis/abi';
import { ReadContract, ReadWriteContract } from '@delvtech/drift';


type AirlockABI = typeof AirlockABI;

export function getAirlockContract(address: `0x${string}`): ReadWriteContract<AirlockABI> {
  return drift.contract({
    abi: AirlockABI,
    address,
  });
}