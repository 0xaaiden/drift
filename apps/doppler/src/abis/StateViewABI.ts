export const StateViewABI = [
  {
    type: "function",
    name: "getSlot0",
    inputs: [
      {
        name: "poolId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "sqrtPriceX96",
        type: "uint160",
        internalType: "uint160",
      },
      {
        name: "tick",
        type: "int24",
        internalType: "int24",
      },
    ],
    stateMutability: "view",
  },
];
