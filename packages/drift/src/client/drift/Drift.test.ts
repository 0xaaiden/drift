import { Drift } from "src/client/drift/Drift";
import { describe, expect, it } from "vitest";

describe("Drift", () => {
  it("Should use the cache namespace if provided", () => {
    const drift = new Drift({
      cacheNamespace: "test",
      rpcUrl: "test",
    });

    expect(drift.cacheNamespace).toEqual("test");

    drift.cache.preloadChainId({
      value: 1,
    });

    // The non-namespaced data is ignored.
    expect(drift.getChainId()).rejects.toThrow();

    drift.cache.preloadChainId({
      cacheNamespace: drift.cacheNamespace,
      value: 2,
    });

    // The namespaced data is used.
    expect(drift.getChainId()).resolves.toEqual(2);
  });
});
