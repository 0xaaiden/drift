// src/contracts/DopplerContract.ts
import { drift } from '../core/drift';
import { DopplerABI } from '../abis/abi';
import { ReadWriteContract } from '@delvtech/drift';

type DopplerABI = typeof DopplerABI;

export const DopplerContract = (address: `0x${string}`,
 ): ReadWriteContract<DopplerABI> => {
  return drift.contract({
    abi: DopplerABI,
    address,
  });
};    
