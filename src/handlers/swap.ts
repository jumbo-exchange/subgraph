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
    // const result = json.fromString(argumentsWithReplace)
    // if(result.kind !== JSONValueKind.OBJECT) return;
    // const entry = result.toObject()

    // for(let i = 0; i < entry.entries.length; i++){
    //   let key = entry.entries[i].key.toString()
    //   switch (true) {
    //     case key =='sender_id':
    //       log.error("ft_on_transfer TEST_ACTION: {} ", [entry.entries[i].value.toString()]);
    //       break;
    //     case key =='amount':
    //       log.error("ft_on_transfer TEST_AMOUNT: {} ", [entry.entries[i].value.toString()]);
    //       break;
    //     case key == 'msg':
    //       const unescapedMessage = entry.entries[i].value.data.toString();
    //       const parsedMessage = json.fromString(unescapedMessage);
    //       log.error("ft_on_transfer MSG1: {} {}", [parsedMessage.kind.toString(), parsedMessage.data.toString()]);
    //       log.error("ft_on_transfer MSG2: {} {} {}", [entry.entries[i].value.kind.toString(), unescapedMessage, unescapedMessage.replaceAll('/"', '')]);

    //       if(parsedMessage.kind == JSONValueKind.STRING){
    //         let paramObject = entry.entries[i].value.toArray()
    //         for(let m = 0; m < paramObject.length; m++){
    //           let paramKey = paramObject[m].toString()
    //           log.error("ft_on_transfer paramKey: {} ", [paramKey]);
    //           switch (true) {
    //             case paramKey == 'actions':
    //               log.error("ft_on_transfer TEST_ACTIONS: {} ", [paramObject[m].toString()]);
    //               if(paramObject[m].kind == JSONValueKind.ARRAY){
    //                 let actionsArray = paramObject[m].toObject()
    //                 for(let k = 0; k < actionsArray.entries.length; k++){
    //                   let actionKey = actionsArray.entries[k].key.toString()
    //                   switch (true) {
    //                     case actionKey == 'token_in':
    //                       log.error("ft_on_transfer TEST_TOKEN: {} ", [actionsArray.entries[k].value.toString()]);
    //                     break;
    //                   }
    //                 }
    //               }
    //               break
    //           }
    //         }
    //       }
    //     break
    //   }
    // }

    // if(msg && msg.value.toString() !== ''){
      // log.info("ft_on_transfer ACTION: {} ", [msg.value.toString()]);

      // const params = msg.value.toObject();
      // const actions_object = params.getEntry('actions');
      // if(!actions_object) return;
      // const actions = actions_object.value.toArray();
      // log.info("ft_on_transfer ACTION LENGTH: {} ", [actions.length.toString()]);

      // if(actions.length === 1){
      //   const id = createSwap(receiptId, actions[0])
      //   if(id) account.swap.push(id);
      // }
      // if(actions.length === 2){
      //   const first_id = createSwap(receiptId, actions[0])
      //   const second_id = createSwap(receiptId, actions[1])
      //   if(first_id) account.swap.push(first_id);
      //   if(second_id) account.swap.push(second_id);
      // }
    // }
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