import { createCards, syncCardOwnership, getLastBlock } from './db.mjs'
import { etherCardsContract, web3 } from './web3-provider.mjs'

export async function initDb () {
  // init
  await etherCardsContract.setProvider(web3)
  const latestBlock = await web3.eth.getBlockNumber()
  const lastBlock = getLastBlock()
  if (lastBlock === 0) {
    await createCards(latestBlock)
  }
  await syncCardOwnership(latestBlock)
}
