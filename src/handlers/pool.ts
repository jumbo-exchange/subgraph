import { BigInt, near, log } from "@graphprotocol/graph-ts";
import { Account, Pool } from "../../generated/schema";
import { replaceAllOccurrences } from "../utils/replacer";
import { JSON } from "assemblyscript-json"; 

export default function pool(
  functionCall: near.FunctionCallAction,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader
): void {
    const receiptId = receipt.id.toHexString();
    const argumentsString = functionCall.args.toString()
    log.error("add_simple_pool: pool arguments {}", [argumentsString]);
    savePool(receiptId, 'token in', 'token out', argumentsString)
}

function savePool(
  receipt_id: string,
  tokenIn: string,
  tokenOut: string,
  fee: string,
): void {
  const pool = new Pool(receipt_id)

  pool.tokenFirst = tokenIn
  pool.tokenSecond = tokenOut
  pool.fee = fee
  pool.swapsFirst = [];
  pool.swapsSecond = [];

  pool.save();
}