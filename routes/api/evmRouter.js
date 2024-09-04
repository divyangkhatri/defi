const evmController = require('./../../controllers/evm.controller');
const express = require('express');

const router = express.Router();

/**
 * @openapi
 * /wallet-balance/get-balance:
 *   post:
 *     summary: get the balance of the wallet address
 *     tags: [Wallet]
 *     description: get the balance of the wallet address
 *     requestBody: {
 *                 description: "Create a new address",
 *                 content: {
 *                     "application/json": {
 *                         schema: {
 *                              type: "object",
 *                              properties: {
 *                                  wallet_address: {
 *                                      type: "string",
 *                                      default: "",
 *                                  },
 *                              contract_address: {
 *                                  type: "string",
 *                                  default: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
 *                              },
 *                              chain_name: {
 *                                  type: "string",
 *                                  default: "ethereum",
 *                              },
 *                              is_testnet: {
 *                                  type: "boolean",
 *                                  default: false,
 *                              },
 *                          },
 *                       },
 *                     },
 *                 },
 *                 required: true,
 *             }
 *     responses:
 *       200:
 *         description: successfully get the balance.
 */
router.post('/wallet-balance/get-balance', evmController.getBalance);

module.exports = router;
