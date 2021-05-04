import fs from 'fs'
import { etherCardsContract, web3 } from './web3-provider.mjs'
import { dbFile } from './cli.mjs'

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function readDb (file) {
  try {
    const data = fs.readFileSync(file, { encoding: 'utf8' })
    return JSON.parse(data)
  } catch (e) {
    console.log(e)
    return undefined
  }
}

function writeDb (file, data) {
  fs.writeFileSync(file, JSON.stringify(data))
}

function updateCard (card, latestBlock) {
  const cards = getCards()
  cards[card.id] = card
  writeDb(dbFile, { latestBlock, cards })
}

export const getLastBlock = () => {
  const db = readDb(dbFile)
  return db?.latestBlock
}

export const getCards = () => {
  const db = readDb(dbFile)
  return db?.cards
}

export const createCards = async latestBlock => {
  let i = 0
  const cards = []
  let retry = false
  try {
    while (i < 10000) {
      try {
        const ownerAddress = await etherCardsContract.methods.ownerOf(i).call()
        cards.push({ id: i, owner: ownerAddress })
        if (i % 100 === 0) {
          console.log('fetched', i, 'owners')
        }
        i += 1
        retry = false
      } catch (e) {
        if (!retry) {
          throw new Error(e)
        } else {
          console.log('retrying in 5 seconds')
          await sleep(5000)
          retry = true
        }
      }
    }
    writeDb(dbFile, { latestBlock, cards })
    console.log('wrote cards to db')
  } catch (e) {
    console.log(e)
  }
}

export const syncCardOwnership = async latestBlock => {
  let currentBlock = latestBlock
  let blockNumber = await web3.eth.getBlockNumber()
  let offset = 1000
  while (true) {
    console.log('currentBlock', currentBlock)
    const changes = await etherCardsContract.getPastEvents('Transfer', {
      fromBlock: currentBlock.toString(),
      toBlock: (currentBlock + offset).toString()
    })
    if (changes.length > 0) {
      for (let i = 0; i < changes.length; i++) {
        const change = changes[i]
        const owner = change.returnValues.to
        const id = change.returnValues.tokenId
        updateCard({ id, owner }, change.blockNumber)

        console.log('updated card', id, 'to owner', owner)
      }
    }
    currentBlock += offset
    if (currentBlock >= blockNumber) {
      blockNumber = await web3.eth.getBlockNumber()
      currentBlock = blockNumber
      offset = 10
      await sleep(10*15*1000)
    }
    await sleep(100)
  }
}
