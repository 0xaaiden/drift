export const DopplerABI = [
  {
    type: "function",
    name: "numPDSlugs",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "positions",
    inputs: [
      {
        name: "slug",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "tickLower",
        type: "int24",
        internalType: "int24",
      },
      {
        name: "tickUpper",
        type: "int24",
        internalType: "int24",
      },
      {
        name: "liquidity",
        type: "uint128",
        internalType: "uint128",
      },
      {
        name: "salt",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "state",
    inputs: [],
    outputs: [
      {
        name: "lastEpoch",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "tickAccumulator",
        type: "int256",
        internalType: "int256",
      },
      {
        name: "totalTokensSold",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalProceeds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "totalTokensSoldLastEpoch",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "feesAccrued",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
];
