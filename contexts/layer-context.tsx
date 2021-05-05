import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { getLayerImageURLs } from '../utils/layer-helper'

interface LayersContextProps {
  layerImageURLs: string[]
  layers: string[]
  updateLayer: (index: number, layer: string) => void
}

export const LayersContext: React.Context<LayersContextProps> = createContext<
  LayersContextProps
>({} as LayersContextProps)

export const LayersProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  const [layers, setLayers] = useState(['04', 'd2', '07', '14', '02'])
  const [layerImageURLs, setLayerImageURLs] = useState<string[]>([])

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
  }, [layers])

  useEffect(() => {
    const paramLayers = router.query?.layers
    const initialLayers = []
    if (!Array.isArray(paramLayers) && paramLayers?.length === 10) {
      for (let i = 0; i < 5; i++) {
        initialLayers.push(paramLayers.slice(i * 2, i * 2 + 2))
      }
      setLayers(initialLayers)
      setLayerImageURLs(getLayerImageURLs(initialLayers))
    }
  }, [router])

  return (
    <LayersContext.Provider
      value={{
        layerImageURLs,
        layers,
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
