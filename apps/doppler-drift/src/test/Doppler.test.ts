// src/test/Doppler.test.ts
import { MockDrift } from '@delvtech/drift/testing';
import { DopplerABI } from '../abis/abi';
import { Doppler } from 'src/entities';

test('Doppler getState returns correct state', async () => {
  const mockDrift = new MockDrift();
  const mockContract = mockDrift.contract({
    abi: DopplerABI,
    address: '',
  });

  const doppler = new Doppler('0xMockAddress', mockDrift);
  const state = await doppler.getState();

  expect(state.lastEpoch).toBe(1);
});