import swap from './swap';
import pool from './pool';
import { log, near } from "@graphprotocol/graph-ts";


export function handleEvent(  
  action: near.ActionValue,
  receipt: near.ActionReceipt,
  blockHeader: near.BlockHeader,
  outcome: near.ExecutionOutcome
  ): void {

  if (action.kind != near.ActionKind.FUNCTION_CALL) {
    log.info("Early return: {}", ["Not a function call"]);
    return;
  }
  const functionCall = action.toFunctionCall();
      
  if (functionCall.methodName == "callback_ft_on_transfer") {
    log.error("callback_ft_on_transfer: {}", [outcome.logs.join("\n")]);
    swap(functionCall, receipt, blockHeader, outcome);
    return;
  }

  if(functionCall.methodName =='add_simple_pool') {
    log.error("add_simple_pool: {}", [outcome.logs.join("\n")]);
    pool(functionCall, receipt, blockHeader);
    return;
  }
}
