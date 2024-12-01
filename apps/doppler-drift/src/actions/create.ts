// src/actions/create.ts
import { Deployer } from '../entities';
import { DopplerDeploymentConfig, DopplerAddresses } from '../types';

export async function createDopplerPool(
  addresses: DopplerAddresses,
  config: DopplerDeploymentConfig
) {
  const deployer = new Deployer(addresses);
  return deployer.deployDoppler(config);
}