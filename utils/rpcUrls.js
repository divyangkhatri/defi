
const allFreeRpcUrl = {
  ethereum: {
    mainnet: [
      'https://ethereum.publicnode.com',
      'https://rpc.ankr.com/eth',
      'https://eth.llamarpc.com',
      'https://rpc.mevblocker.io',
      'https://rpc.builder0x69.io',
    ],
    testnet: [
      'https://1rpc.io/sepolia',
      'https://rpc.sepolia.org',
      'https://ethereum-sepolia-rpc.publicnode.com',
      'https://eth-sepolia.public.blastapi.io',
    ],
  },
  arbitrum: {
    mainnet: [
      'https://arbitrum-one.publicnode.com',
      'https://rpc.ankr.com/arbitrum',
      'https://arbitrum.llamarpc.com',
      'https://1rpc.io/arb',
    ],
    testnet: [
      'https://arbitrum-goerli.publicnode.com',
      'https://arbitrum-goerli.public.blastapi.io',
    ],
  },
  base: {
    mainnet: [
      'https://base.publicnode.com',
      'https://base-mainnet.public.blastapi.io',
      'https://base-pokt.nodies.app',
      'https://base.llamarpc.com',
    ],
    testnet: [
      'https://base-goerli.publicnode.com',
      'https://base-goerli.public.blastapi.io',
    ],
  },
  optimism: {
    mainnet: [
      'https://optimism.publicnode.com',
      'https://optimism-mainnet.public.blastapi.io',
      'https://mainnet.optimism.io',
      'https://rpc.ankr.com/optimism',
    ],
    testnet: [
      'https://optimism-goerli.publicnode.com',
      'https://optimism-goerli.public.blastapi.io',
    ],
  },
  polygon: {
    mainnet: [
      'https://polygon-bor.publicnode.com',
      'https://polygon-mainnet.public.blastapi.io',
      'https://polygon-rpc.com',
      'https://rpc.ankr.com/polygon',
    ],
    testnet: [
      'https://polygon-mumbai-bor.publicnode.com',
      'https://polygon-testnet.public.blastapi.io',
    ],
  },
  binance_smart_chain: {
    mainnet: [
      'https://bsc-dataseed4.bnbchain.org',
      'https://bsc-dataseed2.bnbchain.org',
      'https://bscrpc.com',
      'https://bsc-dataseed1.defibit.io',
      'https://bsc-dataseed2.defibit.io',
    ],
    testnet: [
      'https://bsc-testnet.public.blastapi.io',
      'https://bsc-testnet.publicnode.com',
    ],
  },
  fantom: {
    mainnet: [
      'https://rpcapi.fantom.network',
      'https://fantom-pokt.nodies.app',
      'https://rpc.fantom.network',
      'https://fantom-mainnet.public.blastapi.io',
      'https://fantom-rpc.publicnode.com',
    ],
    testnet: [
      'https://fantom.api.onfinality.io/public',
      'https://rpc.testnet.fantom.network',
      'https://rpc.ankr.com/fantom_testnet',
      'https://fantom-testnet.drpc.org',
    ],
  },
  gnosis: {
    mainnet: [
      'https://rpc.ankr.com/gnosis',
      'https://gnosis-mainnet.public.blastapi.io',
      'https://1rpc.io/gnosis',
      'https://gnosis.blockpi.network/v1/rpc/public',
      'https://gnosis-rpc.publicnode.com',
    ],
    testnet: [
      'https://1rpc.io/gnosis',
      'https://gnosis-chiado-rpc.publicnode.com',
      'https://rpc.chiadochain.net',
    ],
  },
  linea: {
    mainnet: [
      'https://linea.decubate.com',
      'https://1rpc.io/linea',
      'https://linea.blockpi.network/v1/rpc/public',
      'https://rpc.linea.build',
    ],
    testnet: [
      'https://linea-sepolia.blockpi.network/v1/rpc/public',
      'https://rpc.sepolia.linea.build',
      'https://linea-sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ],
  },
  zksync: {
    mainnet: [
      'https://zksync.drpc.org',
      'https://mainnet.era.zksync.io',
      'https://go.getblock.io/f76c09905def4618a34946bf71851542',
      'https://zksync-era.blockpi.network/v1/rpc/public',
    ],
    testnet: [
      'https://zksync-sepolia.drpc.org',
      'https://endpoints.omniatech.io/v1/zksync-era/sepolia/public',
    ],
  },
  ethereum_classic: {
    mainnet: [
      'https://etc.etcdesktop.com',
      'https://rpc.etcinscribe.com',
      'https://geth-at.etc-network.info',
      'https://etc.rivet.link',
    ],
    testnet: [
      'https://etc.etcdesktop.com',
      'https://rpc.etcinscribe.com',
      'https://geth-at.etc-network.info',
      'https://etc.rivet.link',
    ],
  },
  ethereum_pow: {
    mainnet: ['https://mainnet.ethereumpow.org'],
    testnet: ['https://mainnet.ethereumpow.org'],
  },
};


const getFreeRPCUrl = (chain_name) => {
  return allFreeRpcUrl[chain_name];
};

module.exports = {
  getFreeRPCUrl,
};
