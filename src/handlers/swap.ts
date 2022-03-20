import { BigInt, near, log } from "@graphprotocol/graph-ts";
import { Account, Swap } from "../../generated/schema";
import { replaceAllOccurrences } from "../utils/replacer";
import { JSON } from "assemblyscript-json"; 



export default function swap(
  functionCall: near.FunctionCallAction,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
): void {

  let account = Account.load(receipt.predecessorId);

  if(!account) account = new Account(receipt.predecessorId);

    const receiptId = receipt.id.toBase58();
    account.signerId = receipt.signerId;
    const blockTimestamp = BigInt.fromU64(blockHeader.timestampNanosec/1000000000);
    account.blockTimestamp = blockTimestamp;
    const argumentsString = functionCall.args.toString();
    const argumentsWithReplace = replaceAllOccurrences(argumentsString, '\\"', '"');
    const jsonObject: JSON.Obj = <JSON.Obj>JSON.parse(argumentsWithReplace);

    if (jsonObject.isObj) {
      const msgObject = jsonObject.getValue('msg');
      if(msgObject != null && msgObject.toString() != "")  {

        const actions: JSON.Obj = <JSON.Obj>JSON.parse(msgObject.toString());
        if(actions.isObj) {
          const actionsArray = actions.getValue('actions');
          if(actionsArray == null) return;
          const actionsParsed: JSON.Arr = <JSON.Arr>JSON.parse(actionsArray.toString());
          if(actionsArray.isArr) {
           const length = actionsParsed._arr.length;
           for(let k = 0; k < length; k++) {
             const swap = actionsParsed._arr[k];
             const swapParsed: JSON.Obj = <JSON.Obj>JSON.parse(swap.toString());
             const pool_id = swapParsed.getValue('pool_id')
             
             const swapLog = outcome.logs[k];
             const swapLogArray = swapLog.split(' ');
             log.error("ft_on_transfer TEST_ACTION: {} ", [swapParsed.toString()]);
             
             if(pool_id == null) return;
             log.error("ft_on_transfer TEST_ACTION: pool_id {} ", [pool_id.toString()]);

            if(swapLog == '') return;
      
            saveSwap(
              receiptId + ' ' + pool_id.toString(), 
              swapLogArray[2], 
              swapLogArray[5],
              swapLogArray[1],
              swapLogArray[4],
              blockTimestamp,
              pool_id.toString()
            )
           }
          };
        }
      }
      if(msgObject!=null && msgObject.toString() == ""){
        log.debug("ft_transfer with empty message", []);
      }
    }
    account.save()
}

function saveSwap(
  receipt_id: string,
  tokenIn: string,
  tokenOut: string,
  tokenInAmount: string,
  tokenOutAmount: string,
  blockTimestamp: BigInt,
  poolId: string

): void {
  const swap = new Swap(receipt_id);

  swap.tokenIn = tokenIn;
  swap.tokenOut = tokenOut;
  swap.tokenInAmount = BigInt.fromString(tokenInAmount);
  swap.tokenOutAmount = BigInt.fromString(tokenOutAmount);
  swap.blockTimestamp =  blockTimestamp;
  swap.poolId = BigInt.fromString(poolId);

  swap.save();
}