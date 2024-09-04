const {ethers, JsonRpcProvider} = require('ethers');
const erc20Abi = require('../abis/erc20.json');
const {getFreeRPCUrl} = require('../utils/rpcUrls');


const EVMChain = (chain_name, isTestnet) => {
  const network = isTestnet ? 'testnet' : 'mainnet';
  const allRpcUrls = getFreeRPCUrl(chain_name)?.[network];
  const localErc20ABI = erc20Abi;


  const retryFunc = async (cb, defaultResponse) => {
    for (let i = 0; i < allRpcUrls.length; i++) {
      try {
        const retryEvmProvider = new JsonRpcProvider(allRpcUrls[i]);
        return await cb(retryEvmProvider);
      } catch (e) {
        console.log('Error for EVM rpc', allRpcUrls[i], 'Errors:', e);
        if (i === allRpcUrls.length - 1) {
          if (defaultResponse) {
            return defaultResponse;
          } else {
            throw e;
          }
        }
      }
    }
  };


  const isValidNameEth = async ({name}) =>
    retryFunc(async (evmProvider) => {
      try {
        return await ethers.resolveAddress(name, evmProvider);
      } catch (e) {
        if (e?.message?.includes('UNCONFIGURED_NAME')) {
          return null;
        }
        throw e;
      }
    }, false);


  const validNameChain = {
    ethereum: isValidNameEth,
  };
  return {
    isValidAddress: ({address}) => {
      return ethers.isAddress(address);
    },
    isValidName: async ({name}) => {
      return validNameChain[chain_name]({name});
    },
    getWallet: ({privateKey}) => {
      return new ethers.Wallet(privateKey);
    },
    isValidPrivateKey: ({privateKey}) => {
      try {
        const wallet = new ethers.Wallet(privateKey);
        return !!wallet?.address;
      } catch (e) {
        return false;
      }
    },
    createWalletByPrivateKey: ({privateKey}) => {
      const wallet = new ethers.Wallet(privateKey);
      return {
        address: wallet.address,
        privateKey: privateKey,
      };
    },
    getContract: async ({contractAddress}) =>
      retryFunc(async (evmProvider) => {
        try {
          const contract = new ethers.Contract(
              contractAddress,
              localErc20ABI,
              evmProvider,
          );
          if (!contract) {
            console.error('no ether contract found');
          }
          const name = await contract.name();
          const decimals = await contract.decimals();
          const symbol = await contract.symbol();
          return {
            name,
            symbol,
            decimals,
          };
        } catch (e) {
          console.error(`error getting contract for ether ${e}`);
          throw e;
        }
      }, {}),
    getBalance: async ({address}) =>
      retryFunc(async (evmProvider) => {
        try {
          const balanceWei = await evmProvider.getBalance(address);
          return balanceWei.toString();
        } catch (e) {
          console.error('error in get balance from ether', e);
          throw e;
        }
      }, ''),

    getTokenBalance: async ({address, contractAddress}) =>
      retryFunc(async (evmProvider) => {
        try {
          const contract = new ethers.Contract(
              contractAddress,
              localErc20ABI,
              evmProvider,
          );
          if (contract) {
            const balance = await contract.balanceOf(address);
            return balance.toString();
          }
          return '0';
        } catch (e) {
          console.error(`error getting token balance for ether ${e}`);
          throw e;
        }
      }, '0'),
  };
};

module.exports = EVMChain;
