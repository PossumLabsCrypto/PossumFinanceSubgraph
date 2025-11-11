import { BigInt, Bytes, ethereum } from "@graphprotocol/graph-ts";
import {
  User,
  Prediction,
  EpochSettlement,
  RewardClaim,
  StakeEvent,
  UnstakeEvent,
  SyncFailed as SyncFailedEntity,
} from "../generated/schema";

/**
 * Get or create a User entity
 */
export function getOrCreateUser(address: Bytes): User {
  let user = User.load(address.toHexString());
  if (!user) {
    user = new User(address.toHexString());
    user.totalStaked = BigInt.zero();
    user.totalRewardsClaimed = BigInt.zero();
    user.totalPredictions = BigInt.zero();
    user.save();
  }
  return user;
}

/**
 * Handle EpochSettled event
 */
export function handleEpochSettledEvent(
  vaultAddress: Bytes,
  lastDirectionResult: BigInt,
  epochReward: BigInt,
  winnerVotes: BigInt,
  winnerStakeTotal: BigInt,
  settlementPrice: BigInt,
  settlementTime: BigInt,
  block: ethereum.Block,
  transaction: ethereum.Transaction
): void {
  // Create EpochSettlement entity
  const epochId = vaultAddress.toHexString() + "-" + settlementTime.toString();
  let epoch = new EpochSettlement(epochId);

  epoch.vault = vaultAddress;
  epoch.settlementTime = settlementTime;
  epoch.lastDirectionResult = lastDirectionResult;
  epoch.epochReward = epochReward;
  epoch.winnerVotes = winnerVotes;
  epoch.winnerStakeTotal = winnerStakeTotal;
  epoch.settlementPrice = settlementPrice;
  epoch.blockTimestamp = block.timestamp;

  epoch.save();
}

/**
 * Handle PredictionPosted event
 */
export function handlePredictionPostedEvent(
  vaultAddress: Bytes,
  userAddress: Bytes,
  settlementTime: BigInt,
  stakedBalance: BigInt,
  votes: BigInt,
  upOrDown1Or2: BigInt,
  block: ethereum.Block,
  transaction: ethereum.Transaction
): void {
  // Get or create user
  let user = getOrCreateUser(userAddress);
  user.totalPredictions = user.totalPredictions.plus(BigInt.fromI32(1));
  user.save();

  // Create Prediction entity
  const predictionId =
    vaultAddress.toHexString() +
    "-" +
    userAddress.toHexString() +
    "-" +
    settlementTime.toString();
  let prediction = new Prediction(predictionId);

  prediction.user = user.id;
  prediction.vault = vaultAddress;
  prediction.settlementTime = settlementTime;
  prediction.stakedBalance = stakedBalance;
  prediction.votes = votes;
  prediction.upOrDown1Or2 = upOrDown1Or2;
  prediction.blockTimestamp = block.timestamp;

  prediction.save();
}

/**
 * Handle RewardCompounded event
 */
export function handleRewardCompoundedEvent(
  vaultAddress: Bytes,
  userAddress: Bytes,
  amount: BigInt,
  block: ethereum.Block,
  transaction: ethereum.Transaction,
  logIndex: BigInt
): void {
  // Get or create user
  let user = getOrCreateUser(userAddress);
  user.totalRewardsClaimed = user.totalRewardsClaimed.plus(amount);
  user.save();

  // Create RewardClaim entity
  const claimId = transaction.hash.toHexString() + "-" + logIndex.toString();
  let claim = new RewardClaim(claimId);

  claim.user = user.id;
  claim.vault = vaultAddress;
  claim.amount = amount;
  claim.blockTimestamp = block.timestamp;

  claim.save();
}

/**
 * Handle Staked event
 */
export function handleStakedEvent(
  vaultAddress: Bytes,
  userAddress: Bytes,
  amount: BigInt,
  block: ethereum.Block,
  transaction: ethereum.Transaction,
  logIndex: BigInt
): void {
  // Get or create user
  let user = getOrCreateUser(userAddress);
  user.totalStaked = user.totalStaked.plus(amount);
  user.save();

  // Create StakeEvent entity
  const stakeId = transaction.hash.toHexString() + "-" + logIndex.toString();
  let stakeEvent = new StakeEvent(stakeId);

  stakeEvent.user = user.id;
  stakeEvent.vault = vaultAddress;
  stakeEvent.amount = amount;
  stakeEvent.blockTimestamp = block.timestamp;

  stakeEvent.save();
}

/**
 * Handle Unstaked event
 */
export function handleUnstakedEvent(
  vaultAddress: Bytes,
  userAddress: Bytes,
  amount: BigInt,
  block: ethereum.Block,
  transaction: ethereum.Transaction,
  logIndex: BigInt
): void {
  // Get or create user
  let user = getOrCreateUser(userAddress);
  user.totalStaked = user.totalStaked.minus(amount);
  user.save();

  // Create UnstakeEvent entity
  const unstakeId = transaction.hash.toHexString() + "-" + logIndex.toString();
  let unstakeEvent = new UnstakeEvent(unstakeId);

  unstakeEvent.user = user.id;
  unstakeEvent.vault = vaultAddress;
  unstakeEvent.amount = amount;
  unstakeEvent.blockTimestamp = block.timestamp;

  unstakeEvent.save();
}

/**
 * Handle SyncFailed event
 */
export function handleSyncFailedEvent(
  pool: Bytes,
  block: ethereum.Block,
  transaction: ethereum.Transaction,
  logIndex: BigInt
): void {
  const syncFailedId =
    transaction.hash.toHexString() + "-" + logIndex.toString();
  let syncFailed = new SyncFailedEntity(syncFailedId);

  syncFailed.pool = pool;
  syncFailed.blockTimestamp = block.timestamp;

  syncFailed.save();
}
