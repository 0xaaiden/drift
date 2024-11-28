export const DopplerLensABI = [
  {
    type: "function",
    name: "getDopplerImmutables",
    inputs: [
      {
        name: "dopplerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "startingTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "endingTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "epochLength",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "isToken0",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "numTokensToSell",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "minimumProceeds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maximumProceeds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "startingTick",
        type: "int24",
        internalType: "int24",
      },
      {
        name: "endingTick",
        type: "int24",
        internalType: "int24",
      },
      {
        name: "gamma",
        type: "int24",
        internalType: "int24",
      },
      {
        name: "totalEpochs",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "numPDSlugs",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
];
