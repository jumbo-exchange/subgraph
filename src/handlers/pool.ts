import { near, log, BigInt } from "@graphprotocol/graph-ts";
import { Pool, Swap } from "../../generated/schema";
import { replaceAllOccurrences } from "../utils/replacer";
import { JSON } from "assemblyscript-json"; 

export let ZERO_BI = BigInt.fromI32(0)
export const HOURS_IN_MILLISECONDS  = BigInt.fromI32(86400000);

export default function pool(
  functionCall: near.FunctionCallAction,
  receipt: near.ActionReceipt,
  outcome: near.ExecutionOutcome,
  type: String
): void {
    const receiptId = receipt.id.toHexString();
    const argumentsString = functionCall.args.toString()
    const argumentsWithReplace = replaceAllOccurrences(argumentsString, '\\"', '"');
    const jsonObject: JSON.Obj = <JSON.Obj>JSON.parse(argumentsWithReplace);
    const tokensString = jsonObject.getArr('tokens');
    log.debug("add_simple_pool: pool arguments {}", [argumentsString]);
    if(tokensString != null){
      const array = tokensString._arr
      const firstToken = array[0].toString();
      const secondToken = array[1].toString();
      const poolId = outcome.status;
      const poolIdString = poolId.toValue();
      savePool(
        receiptId, 
        poolIdString.toString(), 
        firstToken, 
        secondToken, 
        argumentsString,
        type
      )
    }
}

function savePool(
  receipt_id: string,
  poolId: string,
  tokenIn: string,
  tokenOut: string,
  fee: string,
  type: string
): void {
  const pool = new Pool(poolId.toString())
  pool.poolId = poolId;
  pool.receiptId = receipt_id;
  pool.tokenFirst = tokenIn;
  pool.tokenSecond = tokenOut;
  pool.fee = fee;
  pool.swapsFirst = [];
  pool.swapsSecond = [];
  pool.firstTokenVolume = ZERO_BI;
  pool.secondTokenVolume = ZERO_BI;
  pool.poolType = type;
  pool.save();
}

export function addSwap(
  receipt_id: string,
  tokenIn: string,
  tokenInAmount: string,
  poolId: string
  ): void {
    const pool: Pool | null = Pool.load(poolId);
    
    if(!pool) return;
    const firstToken: string | null = pool.tokenFirst;
    const secondToken: string | null = pool.tokenSecond;
    const firstTokenVolume: BigInt | null = pool.firstTokenVolume;
    const secondTokenVolume: BigInt | null = pool.secondTokenVolume;
    if(!pool.swapsFirst || !pool.swapsSecond) return;

    if(firstToken === null || secondToken === null || firstTokenVolume === null || secondTokenVolume === null) return
    log.error("addSwap: {} {} {}", [ tokenIn, firstToken, secondToken]);
    if(tokenIn == firstToken){
      pool.swapsFirst = pool.swapsFirst.concat([receipt_id])
      log.error("add swap first token: {} {}", [ tokenIn, BigInt.fromString(tokenInAmount).toString()]);
      pool.firstTokenVolume = firstTokenVolume.plus(BigInt.fromString(tokenInAmount)) 
    } else {
      pool.swapsSecond = pool.swapsSecond.concat([receipt_id])
      log.error("add swap second token: {} {}", [ tokenIn, BigInt.fromString(tokenInAmount).toString()]);
      pool.secondTokenVolume = secondTokenVolume.plus(BigInt.fromString(tokenInAmount)) 
    }

    pool.save();
}