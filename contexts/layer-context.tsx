import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'
import { getLayerArtistNames, getLayerImageURLs } from '../utils/layer-helper'

interface LayersContextProps {
  layerImageURLs: string[]
  layers: string[]
  updateLayer: (index: number, layer: string) => void
  layerArtists: string[]
}

export const LayersContext: React.Context<LayersContextProps> = createContext<
  LayersContextProps
>({} as LayersContextProps)

export const LayersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [layers, setLayers] = useState(['04', 'd2', '07', '14', '02'])
  const [layerImageURLs, setLayerImageURLs] = useState<string[]>([])
  const [layerArtists, setLayerArtists] = useState([
    'Common 3',
    'Vizie',
    'Common 6',
    'Zsuzsanna Tasi',
    'Common 1'
  ])

  const paramLayers = useMemo(() => {
    const paramLayers = router.query?.layers
    if (!paramLayers) return undefined
    const initialLayers = []
    if (!Array.isArray(paramLayers) && paramLayers?.length === 10) {
      for (let i = 0; i < 5; i++) {
        initialLayers.push(paramLayers.slice(i * 2, i * 2 + 2))
      }
    }
    return initialLayers
  }, [router])

  const updateLayer = (index: number, layer: string) => {
    const newLayers = [...layers]
    newLayers[index] = layer
    setLayers(newLayers)
    router.replace(
      window.location.origin + '/builder?layers=' + newLayers.join('')
    )
  }

  useEffect(() => {
    setLayerImageURLs(getLayerImageURLs(layers))
    setLayerArtists(getLayerArtistNames(layers))
  }, [layers])

  useEffect(() => {
    if (paramLayers) {
      setLayers(paramLayers)
    }
  }, [paramLayers])

  return (
    <LayersContext.Provider
      value={{
        layerImageURLs,
        layers,
        layerArtists,
        updateLayer
      }}
    >
      {children}
    </LayersContext.Provider>
  )
}

export default function useCardLayers () {
  const context = useContext(LayersContext)

  return context
}
