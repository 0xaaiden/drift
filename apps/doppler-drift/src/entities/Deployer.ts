// src/entities/Deployer.ts
import { getAirlockContract } from '../contracts';
import { Doppler } from './Doppler';
import { DopplerDeploymentConfig, DopplerAddresses } from '../types';
import { drift } from '../drift';

export class Deployer {
  private airlockContract;

  constructor(private addresses: DopplerAddresses) {
    this.airlockContract = getAirlockContract(addresses.airlock as `0x${string}`);
  }

  async deployDoppler(config: DopplerDeploymentConfig): Promise<Doppler> {
    // Prepare the arguments for the `create` method
    const createArgs = [
      config.name,
      config.symbol,
      config.totalSupply,
      config.numTokensToSell,
      config.poolKey,
      [], 
      [], 
      this.addresses.tokenFactory,
      '0x', 
      this.addresses.governanceFactory,
      '0x', 
      this.addresses.dopplerFactory,
      config.dopplerFactoryData,
      this.addresses.migrator,
      config.salt,
    ];

    // Send the transaction
    const txHash = await this.airlockContract.write('create', createArgs);

    // Wait for the transaction to be mined
    await drift.adapter.waitForTransaction({
        txHash,
        timeout: 120000
    });

    // Get the deployed Doppler address (depends on your contract's event emission)
    const dopplerAddress = await this.getDopplerAddressFromReceipt(txHash);

    return new Doppler(dopplerAddress, this.addresses);
  }

  private async getDopplerAddressFromReceipt(txHash: string): Promise<string> {
    const receipt = await drift.getTransaction(txHash);

    // Parse the receipt to find the Doppler address
    const event = receipt.logs.find(
      log => log.eventName === 'CreateDoppler' // Replace with your event name
    );

    if (!event) {
      throw new Error('Doppler creation event not found');
    }

    return event.args.dopplerAddress;
  }
}