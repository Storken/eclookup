import { Typography } from 'antd'
import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'
import { getLayerArtist, getLayerImageURL } from '../../utils/layer-helper'

const { Text } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 ${({ theme }) => theme.spacings.lg}
    ${({ theme }) => theme.spacings.lg} 0;
  position: relative;
  height: 138px;
  width: 100px;
`

const StyledImg = styled.img<{ zoom: boolean }>`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  flex-shrink: 0;
  ${({ zoom }) => (zoom ? 'transform: scale(0.1)' : 'transform: scale(0.071)')};
`

const Background = styled.div`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({ theme }) => theme.colors.gray.medium};
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Overlay = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  ${({ selected }) =>
    selected
      ? `

  `
      : `
  opacity: 0;
  transition: opacity 0.2s;
`}
  &:hover {
    opacity: 1;
  }
`

const StyledText = styled(Text)`
  position: absolute;
  bottom: -20px;
`

interface SelectableImageLayerProps {
  layerId: string
  layerIndex: number
  name: string
}

const SelectableImageLayer = ({
  layerId,
  layerIndex,
  name
}: SelectableImageLayerProps) => {
  const { layers, updateLayer } = useCardLayers()
  const isSelected = layers[layerIndex].toString() === layerId
  const imageURL = getLayerImageURL(layerId, layerIndex + 1)

  const onClick = () => {
    updateLayer(layerIndex, layerId)
  }

  return (
    <Container key={layerId + layerIndex} onClick={onClick}>
      <Background>
        <StyledImg
          zoom={layerIndex === 0 && getLayerArtist(layerId) === 'Vizie'}
          src={imageURL}
        />
      </Background>
      <Overlay selected={isSelected}>
        <Text>{isSelected ? 'Selected' : 'Select layer'}</Text>
      </Overlay>
      <StyledText>{name}</StyledText>
    </Container>
  )
}

export default SelectableImageLayer
