import { dbFileProd, dbFileDev } from './config.mjs'
import { createCards, syncCardOwnership, getLastBlock } from './db.mjs'
import { etherCardsContract, wsWeb3 } from './web3-provider.mjs'

export let dbFile = dbFileDev

export async function initDb (prod = false) {
  // init
  if (prod) {
    dbFile = dbFileProd
  }
  await etherCardsContract.setProvider(wsWeb3)
  const lastBlock = getLastBlock()
  if (lastBlock === 0) {
    await createCards(lastBlock)
  }
  await syncCardOwnership(lastBlock)
}
