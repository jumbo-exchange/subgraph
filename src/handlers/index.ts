import swap from './swap';
import pool from './pool';
import { log, near } from "@graphprotocol/graph-ts";
import addLiquidity from './liquidity';


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
    log.info("swap: {}", ["callback_ft_on_transfer"]);
    swap(functionCall, receipt, blockHeader, outcome);
    return;
  }

  if(functionCall.methodName =='add_simple_pool') {
    pool(functionCall, receipt, outcome, "SIMPLE");
    return;
  }

  if(functionCall.methodName =='add_stable_swap_pool') {
    pool(functionCall, receipt, outcome, "STABLE");
    return;
  }

  if(functionCall.methodName =='add_liquidity' || functionCall.methodName =='add_stable_liquidity') {
    addLiquidity(functionCall, receipt, blockHeader, outcome);
    return;
  }
}
