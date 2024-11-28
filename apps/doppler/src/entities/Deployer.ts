export type DopplerPreDeploymentConfig = {
  token: string;
  initialSupply: bigint;
  owner: string;
};

export type DopplerDeploymentConfig = {
  token: string;
  initialSupply: bigint;
  owner: string;
  startTime: bigint;
  endTime: bigint;
  priceRange: PriceRange;
};

export type PriceRange = {
  minPrice: bigint;
  maxPrice: bigint;
};
