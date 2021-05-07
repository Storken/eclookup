import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'

const StyledLayerOutput = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`

const ImagePlaceholder = styled.div`
  position: relative;
  height: 400px;
  width: 290px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: ${({theme}) => theme.borders.light};
`

const LayersOutput = () => {
  const { layerImageURLs } = useCardLayers()

  return (
    <>
      <ImagePlaceholder>
        {layerImageURLs.map(url => (
          <StyledLayerOutput key={url}>
            <img key={url} width='290' height='400' src={url} />
          </StyledLayerOutput>
        ))}
      </ImagePlaceholder>
    </>
  )
}

export default LayersOutput
