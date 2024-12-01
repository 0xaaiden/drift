import { Drift } from '@delvtech/drift';

const rpcUrl = process.env.RPC_URL;

export const drift = new Drift({
  rpcUrl: rpcUrl,
});