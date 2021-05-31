import styled from 'styled-components'
import useCardLayers from '../../contexts/layer-context'

const StyledLayerOutput = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ImagePlaceholder = styled.div`
  position: relative;
  height: 400px;
  width: 298px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  overflow: hidden;
  border: ${({ theme }) => theme.borders.light};
`

const StyledImg = styled.img<{ zoom: boolean }>`
  ${({zoom}) => zoom ? 'transform: scale(0.29)' : 'transform: scale(0.21)'};
`

const LayersOutput = () => {
  const { layerImageURLs, layerArtists } = useCardLayers()

  return (
    <>
      <ImagePlaceholder>
        {layerImageURLs.map((url, index) => (
          <StyledLayerOutput key={url}>
            <StyledImg zoom={layerArtists[index] === 'Vizie'} key={url} src={url} />
          </StyledLayerOutput>
        ))}
      </ImagePlaceholder>
    </>
  )
}

export default LayersOutput
