import type {
  Block,
  ContractEvent,
  DecodedFunctionData,
  FunctionArgs,
  Transaction,
  TransactionReceipt,
} from "@delvtech/drift";
import { OxAdapter } from "src/adapter/OxAdapter";
import type { Address as AddressType } from "src/adapter/types/Abi";
import { ZERO_ADDRESS } from "src/constants";
import { erc20 } from "src/utils/testing/erc20";
import { describe, expect, it } from "vitest";

const address = (
  process.env.VITE_TOKEN_ADDRESS || ZERO_ADDRESS
).toLowerCase() as AddressType;
const rpcUrl = process.env.VITE_RPC_URL;

describe("OxAdapter", () => {
  it("fetches the chain id", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const chainId = await adapter.getChainId();
    expect(chainId).toBeTypeOf("number");
  });

  it("fetches the current block", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const block = await adapter.getBlock();
    expect(block).toMatchObject({
      timestamp: expect.any(BigInt),
      extraData: expect.any(String),
      gasLimit: expect.any(BigInt),
      gasUsed: expect.any(BigInt),
      hash: expect.any(String),
      logsBloom: expect.any(String),
      miner: expect.any(String),
      mixHash: expect.any(String),
      nonce: expect.any(BigInt),
      number: expect.any(BigInt),
      parentHash: expect.any(String),
      receiptsRoot: expect.any(String),
      sha3Uncles: expect.any(String),
      size: expect.any(BigInt),
      stateRoot: expect.any(String),
      transactions: expect.any(Array),
      transactionsRoot: expect.any(String),
    } as Block);
  });

  it("fetches account balances", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const balance = await adapter.getBalance({ address });
    expect(balance).toBeTypeOf("bigint");
  });

  it("fetches transactions", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    let block = await adapter.getBlock();
    while (block?.transactions.length === 0) {
      console.log(
        `No transactions in block ${block.number}. Fetching parent block.`,
      );
      block = await adapter.getBlock({ blockHash: block.parentHash });
    }
    const tx = await adapter.getTransaction({
      hash: block!.transactions[0]!,
    });
    expect(tx).toEqual(
      expect.objectContaining({
        gas: expect.any(BigInt),
        gasPrice: expect.any(BigInt),
        input: expect.any(String),
        nonce: expect.any(BigInt),
        type: expect.any(String),
        value: expect.any(BigInt),
        blockHash: expect.any(String),
        blockNumber: expect.any(BigInt),
        from: expect.any(String),
        hash: expect.any(String),
        to: expect.any(String),
        transactionIndex: expect.any(BigInt),
      } as Transaction),
    );
  });

  it("returns receipts for waited transactions", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const blockNumber = await adapter.getBlockNumber();
    let block = await adapter.getBlock({
      blockNumber: blockNumber - 12n * 60n * 24n,
    });
    while (block?.transactions.length === 0) {
      console.log(
        `No transactions in block ${block?.number}. Fetching parent block.`,
      );
      block = await adapter.getBlock({ blockHash: block.parentHash });
    }
    const tx = await adapter.waitForTransaction({
      hash: block!.transactions[0]!,
    });
    expect(tx).toEqual(
      expect.objectContaining({
        blockHash: expect.any(String),
        blockNumber: expect.any(BigInt),
        from: expect.any(String),
        cumulativeGasUsed: expect.any(BigInt),
        effectiveGasPrice: expect.any(BigInt),
        gasUsed: expect.any(BigInt),
        logsBloom: expect.any(String),
        status: expect.stringMatching(/^(success|reverted)$/),
        to: expect.any(String),
        transactionHash: expect.any(String),
        transactionIndex: expect.any(BigInt),
      } as TransactionReceipt),
    );
  });

  it("fetches events", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const currentBlock = await adapter.getBlockNumber();
    const events = await adapter.getEvents({
      abi: erc20.abi,
      address,
      event: "Transfer",
      fromBlock: currentBlock - 100n,
    });
    expect(events).toBeInstanceOf(Array);
    expect(events[0]).toEqual(
      expect.objectContaining({
        args: expect.any(Object),
        blockNumber: expect.any(BigInt),
        data: expect.any(String),
        transactionHash: expect.any(String),
      } as ContractEvent<typeof erc20.abi, "Transfer">),
    );
  });

  describe("read", () => {
    it("reads from contracts", async () => {
      const adapter = new OxAdapter({ rpcUrl });
      const symbol = await adapter.read({
        abi: erc20.abi,
        address,
        fn: "symbol",
      });
      expect(symbol).toBeTypeOf("string");
    });

    it("reads from contracts with args", async () => {
      const adapter = new OxAdapter({ rpcUrl });
      const balance = await adapter.read({
        abi: erc20.abi,
        address,
        fn: "balanceOf",
        args: { account: address },
      });
      expect(balance).toBeTypeOf("bigint");
    });
  });

  it("simulates writes to a contracts", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const balance = await adapter.simulateWrite({
      abi: erc20.abi,
      address,
      fn: "transfer",
      args: {
        amount: 1n,
        to: address,
      },
    });
    expect(balance).toBeTypeOf("boolean");
  });

  it("encodes function data", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const encoded = adapter.encodeFunctionData({
      abi: erc20.abi,
      fn: "transfer",
      args: {
        amount: 123n,
        to: address,
      },
    });
    expect(encoded).toBeTypeOf("string");
  });

  it("decodes function data", async () => {
    const adapter = new OxAdapter({ rpcUrl });
    const args: FunctionArgs<typeof erc20.abi, "transfer"> = {
      amount: 123n,
      to: address,
    };
    const decoded = adapter.decodeFunctionData({
      abi: erc20.abi,
      fn: "transfer",
      data: adapter.encodeFunctionData({
        abi: erc20.abi,
        fn: "transfer",
        args,
      }),
    });
    expect(decoded).toEqual({
      args,
      functionName: "transfer",
    } as DecodedFunctionData<typeof erc20.abi, "transfer">);
  });
});
