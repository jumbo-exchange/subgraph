import { near, log, BigInt, json } from "@graphprotocol/graph-ts";
import { AddLiquidity } from "../../generated/schema";


export let ZERO_BI = BigInt.fromI32(0)
export const HOURS_IN_MILLISECONDS  = BigInt.fromI32(86400000);

export default function addLiquidity(
  functionCall: near.FunctionCallAction,
  receipt: near.ActionReceipt,
  blockHeader:near.BlockHeader,
  outcome: near.ExecutionOutcome,
): void {
    const receiptId = receipt.id.toHexString();
    const argumentsString = functionCall.args.toString()
    log.warning("addLiquidity: pool arguments {}", [argumentsString]);
    const blockTimestamp = BigInt.fromU64(blockHeader.timestampNanosec/1000000000);

    const jsonData = json.try_fromString(argumentsString);
    const jsonObject = jsonData.value.toObject();
    
    const poolId = jsonObject.get('pool_id')!.toU64().toString();
    const amounts = jsonObject.get('amounts')!.toArray();

    saveLiquidity(receiptId, poolId, amounts[0].toString(), amounts[1].toString(), blockTimestamp)
}


function saveLiquidity(
  receipt_id: string,
  poolId: string,
  firstAmount: string,
  secondAmount: string,
  blockTimestamp: BigInt
): void {
  const liquidity = new AddLiquidity(receipt_id)
  liquidity.poolId = poolId;
  liquidity.receiptId = receipt_id;
  liquidity.firstPoolAmount = BigInt.fromString(firstAmount);
  liquidity.secondPoolAmount = BigInt.fromString(secondAmount);
  liquidity.blockTimestamp = blockTimestamp;
  liquidity.save();
}