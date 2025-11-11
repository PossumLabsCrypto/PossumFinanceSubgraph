import {
  EpochSettled,
  PredictionPosted,
  RewardCompounded,
  Staked,
  SyncFailed,
  Unstaked,
} from "../generated/SignalVaultETHUSD/SignalVault";
import {
  handleEpochSettledEvent,
  handlePredictionPostedEvent,
  handleRewardCompoundedEvent,
  handleStakedEvent,
  handleUnstakedEvent,
  handleSyncFailedEvent,
} from "./signal-vault-shared";

export function handleEpochSettled(event: EpochSettled): void {
  handleEpochSettledEvent(
    event.address,
    event.params.lastDirectionResult,
    event.params.epochReward,
    event.params.winnerVotes,
    event.params.winnerStakeTotal,
    event.params.settlementPrice,
    event.params.settlementTime,
    event.block,
    event.transaction
  );
}

export function handlePredictionPosted(event: PredictionPosted): void {
  handlePredictionPostedEvent(
    event.address,
    event.params.user,
    event.params.settlementTime,
    event.params.stakedBalance,
    event.params.votes,
    event.params.upOrDown1Or2,
    event.block,
    event.transaction
  );
}

export function handleRewardCompounded(event: RewardCompounded): void {
  handleRewardCompoundedEvent(
    event.address,
    event.params.user,
    event.params.amount,
    event.block,
    event.transaction,
    event.logIndex
  );
}

export function handleStaked(event: Staked): void {
  handleStakedEvent(
    event.address,
    event.params.user,
    event.params.amount,
    event.block,
    event.transaction,
    event.logIndex
  );
}

export function handleUnstaked(event: Unstaked): void {
  handleUnstakedEvent(
    event.address,
    event.params.user,
    event.params.amount,
    event.block,
    event.transaction,
    event.logIndex
  );
}

export function handleSyncFailed(event: SyncFailed): void {
  handleSyncFailedEvent(
    event.params.pool,
    event.block,
    event.transaction,
    event.logIndex
  );
}
