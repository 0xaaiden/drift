import type { Block } from "src/adapter/types/Block";
import type { ContractEvent } from "src/adapter/types/Event";
import type { DecodedFunctionData } from "src/adapter/types/Function";
import type {
  Transaction,
  TransactionReceipt,
} from "src/adapter/types/Transaction";
import type {
  DecodeFunctionDataParams,
  EncodeFunctionDataParams,
  GetEventsParams,
  ReadParams,
  WriteParams,
} from "src/client/drift/Drift";
import { MockDrift } from "src/client/drift/MockDrift";
import { erc20 } from "src/utils/testing/erc20";
import { describe, expect, it } from "vitest";

type Erc20Abi = typeof erc20.abi;

describe("MockDrift", () => {
  describe("contract", () => {
    it("Creates mock read-write contracts", async () => {
      const mockDrift = new MockDrift();
      const mockContract = mockDrift.contract({
        abi: erc20.abi,
        address: "0xVaultAddress",
      });

      mockContract
        .onWrite("approve", {
          spender: "0x1",
          amount: 100n,
        })
        .resolves("0xHash");

      expect(
        await mockContract.write("approve", {
          spender: "0x1",
          amount: 100n,
        }),
      ).toBe("0xHash");
    });

    it("Creates contracts that share mock values", async () => {
      const mockDrift = new MockDrift();
      const contract = mockDrift.contract({
        abi: erc20.abi,
        address: "0xVaultAddress",
      });

      mockDrift
        .onRead({
          abi: erc20.abi,
          address: "0xVaultAddress",
          fn: "symbol",
        })
        .resolves("VAULT");

      expect(await contract.read("symbol")).toBe("VAULT");

      contract.onRead("name").resolves("Vault Token");

      expect(
        await mockDrift.read({
          abi: erc20.abi,
          address: "0xVaultAddress",
          fn: "name",
        }),
      ).toBe("Vault Token");
    });

    it("Creates contracts that share cache values", async () => {
      const mockDrift = new MockDrift();
      const contract = mockDrift.contract({
        abi: erc20.abi,
        address: "0xVaultAddress",
      });

      mockDrift.cache.preloadRead({
        abi: erc20.abi,
        address: "0xVaultAddress",
        fn: "symbol",
        value: "VAULT",
      });

      expect(await contract.read("symbol")).toBe("VAULT");
    });
  });

  describe("getChainId", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getChainId();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed", async () => {
      const drift = new MockDrift();
      drift.onGetChainId().resolves(123);
      expect(await drift.getChainId()).toBe(123);
    });
  });

  describe("getBlockNumber", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getBlockNumber();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed", async () => {
      const drift = new MockDrift();
      drift.onGetBlockNumber().resolves(123n);
      expect(await drift.getBlockNumber()).toBe(123n);
    });
  });

  describe("getBlock", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getBlock();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const block0 = {
        number: 0n,
        timestamp: 0n,
      } as Block;
      const block1 = {
        number: 1n,
        timestamp: 1n,
      } as Block;
      const block2 = {
        number: 2n,
        timestamp: 2n,
      } as Block;
      drift.onGetBlock().resolves(block0);
      drift.onGetBlock({ blockNumber: 1n }).resolves(block1);
      drift.onGetBlock({ blockNumber: 2n }).resolves(block2);
      expect(await drift.getBlock()).toBe(block0);
      expect(await drift.getBlock({ blockNumber: 1n })).toBe(block1);
      expect(await drift.getBlock({ blockNumber: 2n })).toBe(block2);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      const block = {
        number: 123n,
        timestamp: 123n,
      } as Block;
      drift.onGetBlock({}).resolves(block);
      expect(await drift.getBlock({ blockNumber: 123n })).toBe(block);
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      const block = {
        number: 123n,
        timestamp: 123n,
      } as Block;
      drift.onGetBlock().resolves(block);
      expect(await drift.getBlock({ blockNumber: 123n })).toBe(block);
    });
  });

  describe("getBalance", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getBalance({ address: "0x" });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      drift.onGetBalance({ address: "0xAlice" }).resolves(1n);
      drift.onGetBalance({ address: "0xBob" }).resolves(2n);
      expect(await drift.getBalance({ address: "0xAlice" })).toBe(1n);
      expect(await drift.getBalance({ address: "0xBob" })).toBe(2n);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      drift.onGetBalance({ address: "0xAlice" }).resolves(1n);
      expect(
        await drift.getBalance({ address: "0xAlice", blockTag: "latest" }),
      ).toBe(1n);
      expect(
        await drift.getBalance({ address: "0xAlice", blockNumber: 123n }),
      ).toBe(1n);
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      drift.onGetBalance().resolves(123n);
      expect(await drift.getBalance({ address: "0x" })).toBe(123n);
    });
  });

  describe("getTransaction", () => {
    it("Resolves to undefined by default", async () => {
      const drift = new MockDrift();
      expect(await drift.getTransaction({ hash: "0x" })).toBeUndefined();
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const transaction1: Transaction = {
        input: "0x1",
        blockNumber: 123n,
        gas: 123n,
        gasPrice: 123n,
        nonce: 123n,
        type: "0x123",
        value: 123n,
      };
      const transaction2: Transaction = {
        ...transaction1,
        input: "0x2",
      };
      drift.onGetTransaction({ hash: "0x1" }).resolves(transaction1);
      drift.onGetTransaction({ hash: "0x2" }).resolves(transaction2);
      expect(await drift.getTransaction({ hash: "0x1" })).toBe(transaction1);
      expect(await drift.getTransaction({ hash: "0x2" })).toBe(transaction2);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      const transaction: Transaction = {
        blockNumber: 123n,
        gas: 123n,
        gasPrice: 123n,
        input: "0x",
        nonce: 123n,
        type: "0x123",
        value: 123n,
      };
      drift.onGetTransaction({}).resolves(transaction);
      expect(await drift.getTransaction({ hash: "0x" })).toBe(transaction);
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      const transaction: Transaction = {
        blockNumber: 123n,
        gas: 123n,
        gasPrice: 123n,
        input: "0x",
        nonce: 123n,
        type: "0x123",
        value: 123n,
      };
      drift.onGetTransaction().resolves(transaction);
      expect(await drift.getTransaction({ hash: "0x" })).toBe(transaction);
    });
  });

  describe("waitForTransaction", () => {
    it("Resolves to undefined by default", async () => {
      const drift = new MockDrift();
      expect(drift.waitForTransaction({ hash: "0x" })).resolves.toBeUndefined();
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const receipt1: TransactionReceipt = {
        transactionHash: "0x1",
        blockNumber: 123n,
        blockHash: "0x",
        cumulativeGasUsed: 123n,
        effectiveGasPrice: 123n,
        from: "0x",
        gasUsed: 123n,
        logsBloom: "0x",
        status: "success",
        to: "0x",
        transactionIndex: 123n,
      };
      const receipt2: TransactionReceipt = {
        ...receipt1,
        transactionHash: "0x2",
      };
      drift.onWaitForTransaction({ hash: "0x1" }).resolves(receipt1);
      drift.onWaitForTransaction({ hash: "0x2" }).resolves(receipt2);
      expect(await drift.waitForTransaction({ hash: "0x1" })).toBe(receipt1);
      expect(await drift.waitForTransaction({ hash: "0x2" })).toBe(receipt2);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      const receipt: TransactionReceipt = {
        blockNumber: 123n,
        blockHash: "0x",
        cumulativeGasUsed: 123n,
        effectiveGasPrice: 123n,
        from: "0x",
        gasUsed: 123n,
        logsBloom: "0x",
        status: "success",
        to: "0x",
        transactionHash: "0x",
        transactionIndex: 123n,
      };
      drift.onWaitForTransaction({ hash: "0x" }).resolves(receipt);
      expect(
        await drift.waitForTransaction({ hash: "0x", timeout: 10_000 }),
      ).toBe(receipt);
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      const receipt: TransactionReceipt = {
        blockNumber: 123n,
        blockHash: "0x",
        cumulativeGasUsed: 123n,
        effectiveGasPrice: 123n,
        from: "0x",
        gasUsed: 123n,
        logsBloom: "0x",
        status: "success",
        to: "0x",
        transactionHash: "0x",
        transactionIndex: 123n,
      };
      drift.onWaitForTransaction().resolves(receipt);
      expect(await drift.waitForTransaction({ hash: "0x" })).toBe(receipt);
    });
  });

  describe("encodeFunctionData", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        drift.encodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
          args: { account: "0x" },
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: EncodeFunctionDataParams<Erc20Abi, "balanceOf"> = {
        abi: erc20.abi,
        fn: "balanceOf",
        args: { account: "0x1" },
      };
      const params2: EncodeFunctionDataParams<Erc20Abi, "balanceOf"> = {
        ...params1,
        args: { account: "0x2" },
      };
      drift.onEncodeFunctionData(params1).returns("0x1");
      drift.onEncodeFunctionData(params2).returns("0x2");
      expect(drift.encodeFunctionData(params1)).toBe("0x1");
      expect(drift.encodeFunctionData(params2)).toBe("0x2");
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      drift
        .onEncodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
        })
        .returns("0x123");
      expect(
        drift.encodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
          args: { account: "0x" },
        }),
      ).toBe("0x123");
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      drift.onEncodeFunctionData().returns("0x123");
      expect(
        drift.encodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
          args: { account: "0x" },
        }),
      ).toBe("0x123");
    });
  });

  describe("decodeFunctionData", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        drift.decodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
          data: "0x",
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: DecodeFunctionDataParams<Erc20Abi, "balanceOf"> = {
        abi: erc20.abi,
        fn: "balanceOf",
        data: "0x1",
      };
      const return1: DecodedFunctionData<Erc20Abi, "balanceOf"> = {
        functionName: "balanceOf",
        args: { account: "0x1" },
      };
      const params2: DecodeFunctionDataParams<Erc20Abi, "balanceOf"> = {
        ...params1,
        data: "0x2",
      };
      const return2: DecodedFunctionData<Erc20Abi, "balanceOf"> = {
        functionName: "balanceOf",
        args: { account: "0x2" },
      };
      drift.onDecodeFunctionData(params1).returns(return1);
      drift.onDecodeFunctionData(params2).returns(return2);
      expect(drift.decodeFunctionData(params1)).toBe(return1);
      expect(drift.decodeFunctionData(params2)).toBe(return2);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      const decoded: DecodedFunctionData<Erc20Abi, "balanceOf"> = {
        functionName: "balanceOf",
        args: { account: "0x1" },
      };
      drift
        .onDecodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
        })
        .returns(decoded);
      expect(
        drift.decodeFunctionData({
          abi: erc20.abi,
          fn: "balanceOf",
          data: "0x1",
        }),
      ).toBe(decoded);
    });
  });

  describe("getEvents", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getEvents({
          abi: erc20.abi,
          address: "0x",
          event: "Transfer",
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: GetEventsParams<Erc20Abi, "Transfer"> = {
        abi: erc20.abi,
        address: "0x1",
        event: "Transfer",
        filter: { from: "0x1" },
      };
      const params2: GetEventsParams<Erc20Abi, "Transfer"> = {
        ...params1,
        filter: { from: "0x2" },
      };
      const events1: ContractEvent<Erc20Abi, "Transfer">[] = [
        {
          eventName: "Transfer",
          args: {
            from: "0x1",
            to: "0x1",
            value: 123n,
          },
        },
      ];
      const events2: ContractEvent<Erc20Abi, "Transfer">[] = [
        {
          eventName: "Transfer",
          args: {
            from: "0x2",
            to: "0x2",
            value: 123n,
          },
        },
      ];
      drift.onGetEvents(params1).resolves(events1);
      drift.onGetEvents(params2).resolves(events2);
      expect(await drift.getEvents(params1)).toBe(events1);
      expect(await drift.getEvents(params2)).toBe(events2);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      const events: ContractEvent<Erc20Abi, "Transfer">[] = [
        {
          eventName: "Transfer",
          args: {
            from: "0x1",
            to: "0x1",
            value: 123n,
          },
        },
      ];
      drift
        .onGetEvents({
          abi: erc20.abi,
          event: "Transfer",
        })
        .resolves(events);
      expect(
        await drift.getEvents({
          abi: erc20.abi,
          address: "0x1",
          event: "Transfer",
          filter: { from: "0x1" },
        }),
      ).toBe(events);
    });
  });

  describe("read", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.read({
          abi: erc20.abi,
          address: "0x",
          fn: "symbol",
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: ReadParams<Erc20Abi, "allowance"> = {
        abi: erc20.abi,
        address: "0x1",
        fn: "allowance",
        args: { owner: "0x1", spender: "0x1" },
      };
      const params2: ReadParams<Erc20Abi, "allowance"> = {
        ...params1,
        args: { owner: "0x2", spender: "0x2" },
      };
      drift.onRead(params1).resolves(1n);
      drift.onRead(params2).resolves(2n);
      expect(await drift.read(params1)).toBe(1n);
      expect(await drift.read(params2)).toBe(2n);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      drift
        .onRead({
          abi: erc20.abi,
          fn: "balanceOf",
        })
        .resolves(123n);
      expect(
        await drift.read({
          abi: erc20.abi,
          address: "0x",
          fn: "balanceOf",
          args: { account: "0x" },
        }),
      ).toBe(123n);
    });
  });

  describe("simulateWrite", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.simulateWrite({
          abi: erc20.abi,
          address: "0x",
          fn: "transfer",
          args: { to: "0x", amount: 123n },
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: WriteParams<Erc20Abi, "transfer"> = {
        abi: erc20.abi,
        address: "0x1",
        fn: "transfer",
        args: { to: "0x1", amount: 123n },
      };
      const params2: WriteParams<Erc20Abi, "transfer"> = {
        ...params1,
        args: { to: "0x2", amount: 123n },
      };
      drift.onSimulateWrite(params1).resolves(true);
      drift.onSimulateWrite(params2).resolves(false);
      expect(await drift.simulateWrite(params1)).toBe(true);
      expect(await drift.simulateWrite(params2)).toBe(false);
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      drift
        .onSimulateWrite({
          abi: erc20.abi,
          fn: "transfer",
        })
        .resolves(true);
      expect(
        await drift.simulateWrite({
          abi: erc20.abi,
          address: "0x1",
          fn: "transfer",
          args: { to: "0x1", amount: 123n },
        }),
      ).toBe(true);
    });
  });

  describe("write", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.write({
          abi: erc20.abi,
          address: "0x",
          fn: "transfer",
          args: { to: "0x", amount: 123n },
        });
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed with specific params", async () => {
      const drift = new MockDrift();
      const params1: WriteParams<Erc20Abi, "transfer"> = {
        abi: erc20.abi,
        address: "0x",
        fn: "transfer",
        args: { to: "0x1", amount: 123n },
      };
      const params2: WriteParams<Erc20Abi, "transfer"> = {
        ...params1,
        args: { to: "0x2", amount: 123n },
      };
      drift.onWrite(params1).resolves("0x1");
      drift.onWrite(params2).resolves("0x2");
      expect(await drift.write(params1)).toBe("0x1");
      expect(await drift.write(params2)).toBe("0x2");
    });

    it("Can be stubbed with partial params", async () => {
      const drift = new MockDrift();
      drift
        .onWrite({
          abi: erc20.abi,
          fn: "transfer",
        })
        .resolves("0x123");
      expect(
        await drift.write({
          abi: erc20.abi,
          address: "0x",
          fn: "transfer",
          args: { to: "0x", amount: 123n },
        }),
      ).toBe("0x123");
    });

    it("Can be called with args after being stubbed with no args", async () => {
      const drift = new MockDrift();
      drift.onWrite().resolves("0x123");
      expect(
        await drift.write({
          abi: erc20.abi,
          address: "0x",
          fn: "transfer",
          args: { to: "0x", amount: 123n },
        }),
      ).toBe("0x123");
    });
  });

  describe("getSignerAddress", () => {
    it("Throws an error by default", async () => {
      const drift = new MockDrift();
      let error: unknown;
      try {
        await drift.getSignerAddress();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
    });

    it("Can be stubbed", async () => {
      const drift = new MockDrift();
      drift.onGetSignerAddress().resolves("0x123");
      expect(await drift.getSignerAddress()).toBe("0x123");
    });
  });
});
