import { near } from "@graphprotocol/graph-ts";

import { handleEvent } from './handlers';

export function handleReceipt(receipt: near.ReceiptWithOutcome): void {
  const actions = receipt.receipt.actions;
  
  for (let i = 0; i < actions.length; i++) {
    handleEvent(
      actions[i], 
      receipt.receipt, 
      receipt.block.header,
      receipt.outcome
      );
  }
}



//  function handleAction(

// ): void {
  
//   if (action.kind != near.ActionKind.FUNCTION_CALL) {
//     log.info("Early return: {}", ["Not a function call"]);
//     return;
//   }
//   let account = Account.load(receipt.predecessorId);

//   if(!account) account = new Account(receipt.predecessorId);

//   const functionCall = action.toFunctionCall();

//   // change the methodName here to the methodName emitting the log in the contract
//   handleAction(functionCall, receipt)

//    // change the methodName here to the methodName emitting the log in the contract
//    if (functionCall.methodName == "add_liquidity") {
//     // const receiptId = receipt.id.toHexString();
//     //   accounts.signerId = receipt.signerId;
//     log.error("add_liquidity functionCall: {} ", [functionCall.args.toString()]);

//     //   // Maps the JSON formatted log to the LOG entity
//     //   let liquidity = new AddLiquidity(`${receiptId}`);
//     //   if(outcome.logs[0]!=null){
//     //     liquidity.id = receipt.signerId;
//     //     liquidity.output = outcome.logs[0]
//     //     liquidity.blockTimestamp = BigInt.fromU64(blockHeader.timestampNanosec/1000000000)
//     //     let rawString = outcome.logs[0]
//     //     let splitString = rawString.split(' ')
//     //     liquidity.functionCalled = functionCall.methodName
//     //     liquidity.functionAction = (splitString[0] + ' ' + splitString[1])
//     //     liquidity.firstPoolAmount = BigInt.fromString(splitString[2].split('"')[1])
//     //     liquidity.firstPool = splitString[3].slice(0, -2)
//     //     liquidity.secondPoolAmount = BigInt.fromString(splitString[4].split('"')[1])
//     //     liquidity.secondPool = splitString[5].slice(0, -3)
//     //     liquidity.sharesMinted = BigInt.fromString(splitString[7])

//     //     liquidity.save()
//     //   }
//     //   accounts.liquidity.push(liquidity.id);
//   } else {
//     log.info("Not processed - FunctionCall is: {}", [functionCall.methodName]);
//   }

//   account.save();
// }