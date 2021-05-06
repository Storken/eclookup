import { useEffect, useState } from 'react'
import { CardProvider } from '../../contexts/card-context'
import useWeb3User from '../../contexts/web3-context'
import CardComponent from './card'

export const CardList = () => {
  const { address } = useWeb3User()
  const [cards, setCards] = useState<
    { id: number; owner: string }[] | undefined
  >(undefined)

  useEffect(() => {
    fetch(window.location.origin + '/assets/db.json')
      .then(response => response.json())
      .then(
        (data: {
          latestBlock: string
          cards: { id: number; owner: string }[]
        }) =>
          setCards(
            data.cards.filter(
              card => card.owner?.toLowerCase() === address?.toLowerCase()
            )
          )
      )
  }, [address])

  return (
    <>
      {cards?.map(card => (
        <CardProvider key={card.id} id={card.id}>
          <CardComponent />
        </CardProvider>
      ))}
    </>
  )
}
