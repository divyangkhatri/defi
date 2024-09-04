const EVMChain = require('../services/EVMChain');
const {VALID_EVM_CHAINS} = require('../utils/evm_chains');
const {validateNumber} = require('../utils/helper');
const getBalance = async (req, res) => {
  try {
    const body = req.body;
    let address = body.wallet_address;
    const contractAddress = body.contract_address;
    const chainName = body.chain_name;
    const chainData= VALID_EVM_CHAINS[chainName];
    const isTestnet = body?.is_testnet === true;
    if (!chainData) {
      return res.status(400).json({
        message: `chain_name must be one of this [ ${Object.keys(VALID_EVM_CHAINS).join(', ')} ]`,
      });
    }
    if (!address) {
      return res.status(400).json({message: 'address is required'});
    }
    const chain = EVMChain(chainName, isTestnet);
    const isValidAddress = chain.isValidAddress({address});
    if (!isValidAddress) {
      address = await chain.isValidName({name: address});
      if (!address) {
        return res.status(400).json({message: 'invalid address or EVM name'});
      }
    }
    if (contractAddress) {
      const isValidContractAddress = chain.isValidAddress({address});
      if (!isValidContractAddress) {
        return res.status(400).json({message: 'invalid contract address'});
      }
      const contractData = await chain.getContract({contractAddress});
      if (!contractData?.symbol) {
        return res.status(400).json({message: 'invalid contract address'});
      }
      const balance = await chain.getTokenBalance({address, contractAddress});
      return res.status(200).json({
        chain_symbol: chainData.symbol,
        symbol: contractData?.symbol,
        decimals: validateNumber(contractData?.decimals) || 0,
        value: balance, chain_name: chainName,
      });
    }
    const balance = await chain.getBalance({address});
    res.status(200).json({
      chain_symbol: chainData.symbol,
      symbol: chainData?.symbol,
      decimals: chainData.decimals || 0,
      value: balance,
      chain_name: chainName,
    });
  } catch (e) {
    console.error('error in getBalance', e);
    return res.status(500).json({message: 'Internal server error'});
  }
};

module.exports = {
  getBalance,
};
