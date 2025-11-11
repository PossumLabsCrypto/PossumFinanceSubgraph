import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { RedeemedPSM } from "../generated/schema"
import { RedeemedPSM as RedeemedPSMEvent } from "../generated/AssetVault/AssetVault"
import { handleRedeemedPSM } from "../src/asset-vault"
import { createRedeemedPSMEvent } from "./asset-vault-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenOut = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountPSM = BigInt.fromI32(234)
    let amountTokenOut = BigInt.fromI32(234)
    let newRedeemedPSMEvent = createRedeemedPSMEvent(
      user,
      tokenOut,
      amountPSM,
      amountTokenOut
    )
    handleRedeemedPSM(newRedeemedPSMEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("RedeemedPSM created and stored", () => {
    assert.entityCount("RedeemedPSM", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "RedeemedPSM",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "RedeemedPSM",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenOut",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "RedeemedPSM",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountPSM",
      "234"
    )
    assert.fieldEquals(
      "RedeemedPSM",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountTokenOut",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
