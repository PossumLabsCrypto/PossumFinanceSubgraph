import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  EpochSettled,
  PredictionPosted,
  RewardCompounded,
  Staked,
  SyncFailed,
  Unstaked
} from "../generated/SignalVault/SignalVault"

export function createEpochSettledEvent(
  lastDirectionResult: BigInt,
  epochReward: BigInt,
  winnerVotes: BigInt,
  winnerStakeTotal: BigInt,
  settlementPrice: BigInt,
  settlementTime: BigInt
): EpochSettled {
  let epochSettledEvent = changetype<EpochSettled>(newMockEvent())

  epochSettledEvent.parameters = new Array()

  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "lastDirectionResult",
      ethereum.Value.fromUnsignedBigInt(lastDirectionResult)
    )
  )
  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "epochReward",
      ethereum.Value.fromUnsignedBigInt(epochReward)
    )
  )
  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "winnerVotes",
      ethereum.Value.fromUnsignedBigInt(winnerVotes)
    )
  )
  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "winnerStakeTotal",
      ethereum.Value.fromUnsignedBigInt(winnerStakeTotal)
    )
  )
  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "settlementPrice",
      ethereum.Value.fromUnsignedBigInt(settlementPrice)
    )
  )
  epochSettledEvent.parameters.push(
    new ethereum.EventParam(
      "settlementTime",
      ethereum.Value.fromUnsignedBigInt(settlementTime)
    )
  )

  return epochSettledEvent
}

export function createPredictionPostedEvent(
  user: Address,
  settlementTime: BigInt,
  stakedBalance: BigInt,
  votes: BigInt,
  upOrDown1Or2: BigInt
): PredictionPosted {
  let predictionPostedEvent = changetype<PredictionPosted>(newMockEvent())

  predictionPostedEvent.parameters = new Array()

  predictionPostedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  predictionPostedEvent.parameters.push(
    new ethereum.EventParam(
      "settlementTime",
      ethereum.Value.fromUnsignedBigInt(settlementTime)
    )
  )
  predictionPostedEvent.parameters.push(
    new ethereum.EventParam(
      "stakedBalance",
      ethereum.Value.fromUnsignedBigInt(stakedBalance)
    )
  )
  predictionPostedEvent.parameters.push(
    new ethereum.EventParam("votes", ethereum.Value.fromUnsignedBigInt(votes))
  )
  predictionPostedEvent.parameters.push(
    new ethereum.EventParam(
      "upOrDown1Or2",
      ethereum.Value.fromUnsignedBigInt(upOrDown1Or2)
    )
  )

  return predictionPostedEvent
}

export function createRewardCompoundedEvent(
  user: Address,
  amount: BigInt
): RewardCompounded {
  let rewardCompoundedEvent = changetype<RewardCompounded>(newMockEvent())

  rewardCompoundedEvent.parameters = new Array()

  rewardCompoundedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  rewardCompoundedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return rewardCompoundedEvent
}

export function createStakedEvent(user: Address, amount: BigInt): Staked {
  let stakedEvent = changetype<Staked>(newMockEvent())

  stakedEvent.parameters = new Array()

  stakedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  stakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return stakedEvent
}

export function createSyncFailedEvent(pool: Address): SyncFailed {
  let syncFailedEvent = changetype<SyncFailed>(newMockEvent())

  syncFailedEvent.parameters = new Array()

  syncFailedEvent.parameters.push(
    new ethereum.EventParam("pool", ethereum.Value.fromAddress(pool))
  )

  return syncFailedEvent
}

export function createUnstakedEvent(user: Address, amount: BigInt): Unstaked {
  let unstakedEvent = changetype<Unstaked>(newMockEvent())

  unstakedEvent.parameters = new Array()

  unstakedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  unstakedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return unstakedEvent
}
