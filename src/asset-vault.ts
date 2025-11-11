import {
  RedeemedPSM as RedeemedPSMEvent,
  Swap as SwapEvent,
} from "../generated/AssetVaultETHUSD/AssetVault";
import { RedeemedPSM, Swap } from "../generated/schema";

export function handleRedeemedPSM(event: RedeemedPSMEvent): void {
  let entity = new RedeemedPSM(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.user = event.params.user;
  entity.tokenOut = event.params.tokenOut;
  entity.amountPSM = event.params.amountPSM;
  entity.amountTokenOut = event.params.amountTokenOut;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}

export function handleSwap(event: SwapEvent): void {
  let entity = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.tokenIn = event.params.tokenIn;
  entity.amountIn = event.params.amountIn;
  entity.amountOut = event.params.amountOut;

  entity.blockTimestamp = event.block.timestamp;

  entity.save();
}
