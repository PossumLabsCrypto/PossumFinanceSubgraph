const fs = require("fs");
const path = require("path");
const yaml = require("js-yaml");


// Contract addresses for different vault pairs
const vaultPairs = [
  {
    name: "ETHUSD",
    signalVault: "0xb800b8dbcf9a78b16f5c1135cd1a39384abf1fbc",
    assetVault: "0xc7a22081662faeedc27993cb72cba6141e15ba48",
  },
];

const NETWORK = "arbitrum-one";
const START_BLOCK = 403446009;

/**
 * Create a SignalVault data source configuration
 */
function createSignalVaultDataSource(pair) {
  return {
    kind: "ethereum",
    name: `SignalVault${pair.name}`,
    network: NETWORK,
    source: {
      address: pair.signalVault,
      abi: "SignalVault",
      startBlock: START_BLOCK,
    },
    mapping: {
      kind: "ethereum/events",
      apiVersion: "0.0.7",
      language: "wasm/assemblyscript",
      entities: [
        "EpochSettled",
        "PredictionPosted",
        "RewardCompounded",
        "Staked",
        "SyncFailed",
        "Unstaked",
      ],
      abis: [
        {
          name: "SignalVault",
          file: "./abis/SignalVault.json",
        },
      ],
      eventHandlers: [
        {
          event:
            "EpochSettled(indexed uint256,uint256,uint256,uint256,uint256,uint256)",
          handler: "handleEpochSettled",
        },
        {
          event:
            "PredictionPosted(indexed address,indexed uint256,uint256,uint256,uint256)",
          handler: "handlePredictionPosted",
        },
        {
          event: "RewardCompounded(indexed address,uint256)",
          handler: "handleRewardCompounded",
        },
        {
          event: "Staked(indexed address,uint256)",
          handler: "handleStaked",
        },
        {
          event: "SyncFailed(indexed address)",
          handler: "handleSyncFailed",
        },
        {
          event: "Unstaked(indexed address,uint256)",
          handler: "handleUnstaked",
        },
      ],
      file: "./src/signal-vault.ts",
    },
  };
}

/**
 * Create an AssetVault data source configuration
 */
function createAssetVaultDataSource(pair) {
  return {
    kind: "ethereum",
    name: `AssetVault${pair.name}`,
    network: NETWORK,
    source: {
      address: pair.assetVault,
      abi: "AssetVault",
      startBlock: START_BLOCK,
    },
    mapping: {
      kind: "ethereum/events",
      apiVersion: "0.0.7",
      language: "wasm/assemblyscript",
      entities: ["RedeemedPSM", "Swap"],
      abis: [
        {
          name: "AssetVault",
          file: "./abis/AssetVault.json",
        },
      ],
      eventHandlers: [
        {
          event: "RedeemedPSM(indexed address,indexed address,uint256,uint256)",
          handler: "handleRedeemedPSM",
        },
        {
          event: "Swap(indexed address,uint256,uint256)",
          handler: "handleSwap",
        },
      ],
      file: "./src/asset-vault.ts",
    },
  };
}

/**
 * Populate networks.json with contract addresses
 */
function populateNetworks() {
  const networksPath = path.join(__dirname, "networks.json");

  // Create the networks configuration
  const networksConfig = {
    [NETWORK]: {},
  };

  vaultPairs.forEach((pair) => {
    networksConfig[NETWORK][`SignalVault${pair.name}`] = {
      address: pair.signalVault,
      startBlock: START_BLOCK,
    };
    networksConfig[NETWORK][`AssetVault${pair.name}`] = {
      address: pair.assetVault,
      startBlock: START_BLOCK,
    };
  });

  // Write to networks.json
  fs.writeFileSync(
    networksPath,
    JSON.stringify(networksConfig, null, 2) + "\n"
  );

  console.log("✅ networks.json has been populated");
}

/**
 * Populate subgraph.yaml with all vault contracts
 */
function populateSubgraph() {
  const subgraphPath = path.join(__dirname, "subgraph.yaml");

  // Create data sources for all vault pairs
  const dataSources = [];

  vaultPairs.forEach((pair) => {
    dataSources.push(createSignalVaultDataSource(pair));
    dataSources.push(createAssetVaultDataSource(pair));
  });

  // Create the complete subgraph configuration
  const subgraphConfig = {
    specVersion: "1.0.0",
    indexerHints: {
      prune: "auto",
    },
    schema: {
      file: "./schema.graphql",
    },
    dataSources: dataSources,
  };

  // Convert to YAML with custom formatting
  const yamlContent = yaml.dump(subgraphConfig, {
    indent: 2,
    lineWidth: -1,
    noRefs: true,
    quotingType: '"',
    forceQuotes: false,
  });

  // Write to subgraph.yaml
  fs.writeFileSync(subgraphPath, yamlContent);

  console.log("✅ subgraph.yaml has been populated");
}

/**
 * Main function to populate all configuration files
 */
function populateAll() {
  console.log("🚀 Populating configuration files...\n");
  console.log(`Network: ${NETWORK}`);
  console.log(`Start Block: ${START_BLOCK}\n`);
  console.log("Vault Pairs:");
  vaultPairs.forEach((pair) => {
    console.log(`  ${pair.name}:`);
    console.log(`    SignalVault: ${pair.signalVault}`);
    console.log(`    AssetVault:  ${pair.assetVault}`);
  });
  console.log("");

  try {
    populateNetworks();
    populateSubgraph();
    console.log(
      "\n✨ All configuration files have been successfully populated!"
    );
    console.log(`   - networks.json (${vaultPairs.length * 2} contracts)`);
    console.log(`   - subgraph.yaml (${vaultPairs.length * 2} data sources)`);
  } catch (error) {
    console.error("\n❌ Error populating configuration files:", error.message);
    process.exit(1);
  }
}

// Run the script
populateAll();
