import { Typography } from 'antd'
import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'
import { getLayerImageURL } from '../../utils/layer-helper'

const { Text } = Typography

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 ${({ theme }) => theme.spacings.lg}
    ${({ theme }) => theme.spacings.lg} 0;
  flex-shrink: 0;
  position: relative;
  height: 138px;
  width: 100px;
`

const StyledImg = styled.img`
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  background-color: ${({theme}) => theme.colors.gray.medium};
`

const Overlay = styled.div<{ selected: boolean }>`
  position: absolute;
  top: 0;
  right: 0;
  height: 135px;
  width: 100px;
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
    <Container onClick={onClick}>
      <Overlay selected={isSelected}>
        <Text>{isSelected ? 'Selected' : 'Select layer'}</Text>
      </Overlay>
      <StyledImg src={imageURL} height='138' width='100' />
      <Text>{name}</Text>
    </Container>
  )
}

export default SelectableImageLayer
