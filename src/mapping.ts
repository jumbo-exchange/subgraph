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
