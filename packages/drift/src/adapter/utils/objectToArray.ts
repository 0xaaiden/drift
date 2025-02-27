import type { Abi, AbiItemType, AbiParameterKind } from "abitype";
import type {
  AbiArrayType,
  AbiEntryName,
  AbiObjectType,
} from "src/adapter/types/Abi";
import type { WithOptionalFields } from "src/adapter/utils/types";
import type { AnyObject } from "src/utils/types";

/**
 * Converts an object into an array of input or output values, ensuring the the
 * correct number and order of values are present.
 *
 * @example
 * const abi = [
 *   {
 *     type: "function",
 *     name: "transfer",
 *     inputs: [
 *       { name: "to", type: "address" },
 *       { name: "value", type: "uint256" },
 *     ],
 *     outputs: [{ name: "", type: "bool" }],
 *     stateMutability: "nonpayable",
 *   },
 *   {
 *     type: "event",
 *     name: "Approval",
 *     inputs: [
 *       { indexed: true, name: "owner", type: "address" },
 *       { indexed: true, name: "spender", type: "address" },
 *       { indexed: false, name: "value", type: "uint256" },
 *     ],
 *   },
 * ] as const;
 *
 * const preppedArgs = objectToArray({
 *   abi,
 *   type: "function",
 *   name: "transfer",
 *   kind: "inputs",
 *   value: { value: 123n, to: "0x123" },
 * }); // -> ["0x123", 123n]
 *
 * const preppedFilter = objectToArray({
 *   abi,
 *   type: "event",
 *   name: "Approval",
 *   kind: "inputs",
 *   value: { spender: "0x123" },
 * }); // -> [undefined, "0x123", undefined]
 */
export function objectToArray<
  TAbi extends Abi,
  TItemType extends AbiItemType,
  TName extends AbiEntryName<TAbi, TItemType>,
  TParameterKind extends AbiParameterKind,
  TValue extends AbiObjectType<TAbi, TItemType, TName, TParameterKind>,
>({
  abi: _abi,
  type,
  name,
  kind,
  value,
}: {
  abi: TAbi;
  name: TName;
  kind: TParameterKind;
  type: TItemType;
  value?: Abi extends TAbi ? Record<string, unknown> : TValue;
}): AbiArrayType<TAbi, TItemType, TName, TParameterKind> {
  const abi = _abi as unknown as WithOptionalFields<TAbi>;
  const matches = abi.filter((item) => {
    if (item.type !== type) return false;
    if (item.name !== name) return false;
    if (kind === "inputs" && !("inputs" in item)) return false;
    if (kind === "outputs" && !("outputs" in item)) return false;
    if (value && !("inputs" in item) && !("outputs" in item)) return false;
    return true;
  });

  if (matches.length === 0) {
    return [] as AbiArrayType<TAbi, TItemType, TName, TParameterKind>;
  }

  if (matches.length === 1) {
    const match = matches[0] as WithOptionalFields<TAbi>[number];
    return (match.inputs || []).map(
      ({ name }, i) => value?.[name || i],
    ) as AbiArrayType<TAbi, TItemType, TName, TParameterKind>;
  }

  const argsCount = value ? Object.keys(value).length : 0;
  let arrayArgs: any[] = [];
  let keyMatchCount = 0;

  for (const entry of matches) {
    if (!entry.inputs?.length) {
      if (!argsCount) {
        return [] as AbiArrayType<TAbi, TItemType, TName, TParameterKind>;
      }
      continue;
    }

    const args: AnyObject = value || {};
    const potentialArrayArgs: any[] = [];
    let potentialKeyMatchCount = 0;

    for (const [i, input] of entry.inputs.entries()) {
      const key = input.name || i;
      if (key in args) potentialKeyMatchCount++;
      arrayArgs.push(args[key]);
    }

    if (potentialKeyMatchCount > keyMatchCount) {
      arrayArgs = potentialArrayArgs;
      keyMatchCount = potentialKeyMatchCount;
    }
  }

  return arrayArgs as AbiArrayType<TAbi, TItemType, TName, TParameterKind>;
}
