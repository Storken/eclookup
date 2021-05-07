import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { Card, RandomTraits } from '../models/card'

interface CardContextProps {
  card: Card | undefined
  randomTraits: RandomTraits | undefined
  layerImages: string[] | undefined
  loading: boolean
}

export const CardContext: React.Context<CardContextProps> = createContext<
  CardContextProps
>({} as CardContextProps)

export const CardProvider = ({
  children,
  id
}: {
  children: ReactNode
  id: number
}) => {
  const [loading, setLoading] = useState(false)
  const [card, setCard] = useState<Card | undefined>(undefined)
  const [randomTraits, setRandomTraits] = useState(undefined)
  const [layerImages, setLayerImages] = useState<string[] | undefined>(
    undefined
  )

  useEffect(() => {
    setLoading(true)
    id = Number.parseInt(id.toString())
    getMetaData(getMetaDataURI(id))
    getData(id)
  }, [id])

  useEffect(() => {
    if (card && randomTraits) {
      setLayerImages(getLayerImages(card.layer_image))
      setLoading(false)
    }
  }, [card, randomTraits])

  const getLayerImages = (source: string) => {
    const commonLayerURLBase = `${window.location.origin}/assets/layer_images/common_layers`
    const artistLayerURLBase = `${window.location.origin}/assets/layer_images`
    const images: string[] = []
    const index = source.indexOf('.jpg')
    const layers = source.slice(index - 10, index)
    for (let i = 0; i < 5; i++) {
      const layerId = layers.slice(i * 2, i * 2 + 2)
      if (layerId.startsWith('0')) {
        images.push(`${commonLayerURLBase}/${i + 1}/${layerId}.png`)
      } else {
        images.push(`${artistLayerURLBase}/${layerId}.png`)
      }
    }

    return images
  }

  const getMetaData = async (uri: string) => {
    return fetch(uri)
      .then(response => response.json())
      .then(data => setRandomTraits(data))
  }

  const getData = async (tokenId: number) => {
    let categoryId = tokenId.toString()
    if (tokenId > 100) categoryId = tokenId.toString().slice(1, 3)
    if (tokenId > 1000) categoryId = tokenId.toString().slice(2, 4)
    categoryId = Number.parseInt(categoryId).toString()
    const uri = `https://heroku.ether.cards/card/${categoryId}/${tokenId}.json`
    return fetch(uri)
      .then(response => response.json())
      .then(data => setCard(data))
  }

  const getMetaDataURI = (tokenId: number) => {
    let shiftedId = tokenId
    let categoryId = tokenId.toString()
    if (tokenId < 100) {
      const idStart = 10
      const offset = 45
      const offsetId = tokenId + offset
      const newId = offsetId % 100
      shiftedId = newId < offset ? newId + idStart : newId
      categoryId = shiftedId.toString()
    } else if (tokenId < 1000) {
      const idStart = 100
      const offset = 824
      const offsetId = tokenId + offset
      const newId = offsetId % 1000
      shiftedId = newId < offset ? newId + idStart : newId
      categoryId = shiftedId.toString().slice(1, 3)
    } else {
      const idStart = 1000
      const offset = 7976
      const offsetId = tokenId + offset
      const newId = offsetId % 10000
      shiftedId = newId < offset ? newId + idStart : newId
      categoryId = shiftedId.toString().slice(2, 4)
    }
    categoryId = Number.parseInt(categoryId).toString()
    return `https://ether-cards.mypinata.cloud/ipfs/QmfC87yxZKPSU3vQdsh8CBdgJttrLDJmS1HSfFfYqeRyUQ/${categoryId}/${shiftedId}.json`
  }

  return (
    <CardContext.Provider
      value={{
        loading,
        card,
        randomTraits,
        layerImages
      }}
    >
      {children}
    </CardContext.Provider>
  )
}

export default function useCardContext () {
  const context = useContext(CardContext)

  return context
}
