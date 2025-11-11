import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { RedeemedPSM, Swap } from "../generated/AssetVault/AssetVault"

export function createRedeemedPSMEvent(
  user: Address,
  tokenOut: Address,
  amountPSM: BigInt,
  amountTokenOut: BigInt
): RedeemedPSM {
  let redeemedPsmEvent = changetype<RedeemedPSM>(newMockEvent())

  redeemedPsmEvent.parameters = new Array()

  redeemedPsmEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  redeemedPsmEvent.parameters.push(
    new ethereum.EventParam("tokenOut", ethereum.Value.fromAddress(tokenOut))
  )
  redeemedPsmEvent.parameters.push(
    new ethereum.EventParam(
      "amountPSM",
      ethereum.Value.fromUnsignedBigInt(amountPSM)
    )
  )
  redeemedPsmEvent.parameters.push(
    new ethereum.EventParam(
      "amountTokenOut",
      ethereum.Value.fromUnsignedBigInt(amountTokenOut)
    )
  )

  return redeemedPsmEvent
}

export function createSwapEvent(
  tokenIn: Address,
  amountIn: BigInt,
  amountOut: BigInt
): Swap {
  let swapEvent = changetype<Swap>(newMockEvent())

  swapEvent.parameters = new Array()

  swapEvent.parameters.push(
    new ethereum.EventParam("tokenIn", ethereum.Value.fromAddress(tokenIn))
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  swapEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return swapEvent
}
