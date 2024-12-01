// src/utils/configBuilder.ts
import {
    DopplerDeploymentConfig,
    DopplerPreDeploymentConfig,
    DopplerAddresses,
  } from '../types';
  import { buildPoolKey } from './poolKeyBuilder';
  
  export function buildConfig(
    params: DopplerPreDeploymentConfig,
    addresses: DopplerAddresses
  ): DopplerDeploymentConfig {
    // Validate and process params
    // Build the pool key
    const poolKey = buildPoolKey(params, addresses);
  
    // Build the doppler factory data (if needed)
    const dopplerFactoryData = '0x'; // Replace with actual data
  
    return {
      ...params,
      poolKey,
      dopplerFactoryData,
      salt: params.salt || '0x', // Generate or use provided salt
    };
  }