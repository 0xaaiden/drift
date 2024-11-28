export const hyperdriveAbi = [
  {
    type: "function",
    name: "PERMIT_TYPEHASH",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addLiquidity",
    inputs: [
      {
        name: "_contribution",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minLpSharePrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minApr",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_maxApr",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "lpShares",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "adminController",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "baseToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "batchTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "values",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "checkpoint",
    inputs: [
      {
        name: "_checkpointTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_maxIterations",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "closeLong",
    inputs: [
      {
        name: "_maturityTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_bondAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minOutput",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "proceeds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "closeShort",
    inputs: [
      {
        name: "_maturityTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_bondAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minOutput",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "proceeds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "collectGovernanceFee",
    inputs: [
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "proceeds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "convertToBase",
    inputs: [
      {
        name: "_shareAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "convertToShares",
    inputs: [
      {
        name: "_baseAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "decimals",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "domainSeparator",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCheckpoint",
    inputs: [
      {
        name: "_checkpointTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IHyperdrive.Checkpoint",
        components: [
          {
            name: "weightedSpotPrice",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "lastWeightedSpotPriceUpdateTime",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "vaultSharePrice",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCheckpointExposure",
    inputs: [
      {
        name: "_checkpointTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "int256",
        internalType: "int256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMarketState",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IHyperdrive.MarketState",
        components: [
          {
            name: "shareReserves",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "bondReserves",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "longExposure",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "longsOutstanding",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "shareAdjustment",
            type: "int128",
            internalType: "int128",
          },
          {
            name: "shortsOutstanding",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "longAverageMaturityTime",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "shortAverageMaturityTime",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "isInitialized",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "isPaused",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "zombieBaseProceeds",
            type: "uint112",
            internalType: "uint112",
          },
          {
            name: "zombieShareReserves",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPoolConfig",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IHyperdrive.PoolConfig",
        components: [
          {
            name: "baseToken",
            type: "address",
            internalType: "contract IERC20",
          },
          {
            name: "vaultSharesToken",
            type: "address",
            internalType: "contract IERC20",
          },
          {
            name: "linkerFactory",
            type: "address",
            internalType: "address",
          },
          {
            name: "linkerCodeHash",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "initialVaultSharePrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minimumShareReserves",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minimumTransactionAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "circuitBreakerDelta",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "positionDuration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "checkpointDuration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "timeStretch",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "governance",
            type: "address",
            internalType: "address",
          },
          {
            name: "feeCollector",
            type: "address",
            internalType: "address",
          },
          {
            name: "sweepCollector",
            type: "address",
            internalType: "address",
          },
          {
            name: "checkpointRewarder",
            type: "address",
            internalType: "address",
          },
          {
            name: "fees",
            type: "tuple",
            internalType: "struct IHyperdrive.Fees",
            components: [
              {
                name: "curve",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "flat",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "governanceLP",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "governanceZombie",
                type: "uint256",
                internalType: "uint256",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPoolInfo",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IHyperdrive.PoolInfo",
        components: [
          {
            name: "shareReserves",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "shareAdjustment",
            type: "int256",
            internalType: "int256",
          },
          {
            name: "zombieBaseProceeds",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "zombieShareReserves",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "bondReserves",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lpTotalSupply",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "vaultSharePrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "longsOutstanding",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "longAverageMaturityTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "shortsOutstanding",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "shortAverageMaturityTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "withdrawalSharesReadyToWithdraw",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "withdrawalSharesProceeds",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "lpSharePrice",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "longExposure",
            type: "uint256",
            internalType: "uint256",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getUncollectedGovernanceFees",
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
    name: "getWithdrawPool",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct IHyperdrive.WithdrawPool",
        components: [
          {
            name: "readyToWithdraw",
            type: "uint128",
            internalType: "uint128",
          },
          {
            name: "proceeds",
            type: "uint128",
            internalType: "uint128",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_contribution",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_apr",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "lpShares",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "isPauser",
    inputs: [
      {
        name: "_account",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "kind",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "load",
    inputs: [
      {
        name: "_slots",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "name",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "nonces",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "openLong",
    inputs: [
      {
        name: "_amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minOutput",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minVaultSharePrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "maturityTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "bondProceeds",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "openShort",
    inputs: [
      {
        name: "_bondAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_maxDeposit",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minVaultSharePrice",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "maturityTime",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deposit",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "pause",
    inputs: [
      {
        name: "_status",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "perTokenApprovals",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
    ],
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
    name: "permitForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        internalType: "address",
      },
      {
        name: "_approved",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "v",
        type: "uint8",
        internalType: "uint8",
      },
      {
        name: "r",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "s",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "redeemWithdrawalShares",
    inputs: [
      {
        name: "_withdrawalShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minOutputPerShare",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "proceeds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "withdrawalSharesRedeemed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeLiquidity",
    inputs: [
      {
        name: "_lpShares",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_minOutputPerShare",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_options",
        type: "tuple",
        internalType: "struct IHyperdrive.Options",
        components: [
          {
            name: "destination",
            type: "address",
            internalType: "address",
          },
          {
            name: "asBase",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "extraData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "proceeds",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "withdrawalShares",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApproval",
    inputs: [
      {
        name: "tokenID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalBridge",
    inputs: [
      {
        name: "tokenID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGovernance",
    inputs: [
      {
        name: "_who",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPauser",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "sweep",
    inputs: [
      {
        name: "_target",
        type: "address",
        internalType: "contract IERC20",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "symbol",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "target0",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "target1",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "target2",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "target3",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "target4",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "totalShares",
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
    name: "totalSupply",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "transferFrom",
    inputs: [
      {
        name: "tokenID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "transferFromBridge",
    inputs: [
      {
        name: "tokenID",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "caller",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "vaultSharesToken",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "version",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "event",
    name: "AddLiquidity",
    inputs: [
      {
        name: "provider",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lpAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asBase",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "lpSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spender",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "value",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CloseLong",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "destination",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "maturityTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asBase",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "bondAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CloseShort",
    inputs: [
      {
        name: "trader",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "destination",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "assetId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "maturityTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asBase",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "basePayment",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "bondAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "extraData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CollectGovernanceFee",
    inputs: [
      {
        name: "collector",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asBase",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CreateCheckpoint",
    inputs: [
      {
        name: "checkpointTime",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "checkpointVaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maturedShorts",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maturedLongs",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "lpSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialize",
    inputs: [
      {
        name: "provider",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lpAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "vaultSharePrice",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "asBase",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "apr",
        type: "uint256",
        indexed: false
