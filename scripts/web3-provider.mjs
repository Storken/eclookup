import Web3 from 'web3'
import { ABI } from './ether-cards-abi.mjs'
import { httpProvider, wsProvider } from './config.mjs'

export const web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
export const wsWeb3 = new Web3(new Web3.providers.WebsocketProvider(wsProvider))

export const myAddress = '0x314e5699db4756138107AE7d7EeDDf5708583ff5'
export const etherCardsAddress = '0x97CA7FE0b0288f5EB85F386FeD876618FB9b8Ab8'
export const etherCardsContract = new web3.eth.Contract(
  ABI,
  etherCardsAddress,
  {
    from: myAddress
  }
)
