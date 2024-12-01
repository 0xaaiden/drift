// src/contracts/TokenContract.ts
import { drift } from '../drift';
import  {DERC20ABI} from '../abis/abi';
import { ReadWriteContract } from '@delvtech/drift';

type erc20 = typeof DERC20ABI;

export const TokenContract = (address: `0x${string}`,
 ): ReadWriteContract<erc20> => {
  return drift.contract({
    abi: DERC20ABI,
    address,
  });
};