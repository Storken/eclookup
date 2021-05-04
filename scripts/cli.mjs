import { createCards, syncCardOwnership, getLastBlock } from './db.mjs'
import { etherCardsContract, wsWeb3 } from './web3-provider.mjs'

export async function initDb () {
  // init
  await etherCardsContract.setProvider(wsWeb3)
  const lastBlock = getLastBlock()
  if (lastBlock === 0) {
    await createCards(lastBlock)
  }
  await syncCardOwnership(lastBlock)
}
