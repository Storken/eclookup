import { Image, Typography } from 'antd'
import styled from 'styled-components'
import useCardContext from '../../contexts/card-context'

const { Title, Text } = Typography

const StyledTitle = styled(Title)`
  width: 100%;
`

const Images = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledImage = styled(Image)`
  max-width: 200px;
  margin-bottom: ${({ theme }) => theme.spacings.md};
`

const StyledLayerThumbnail = styled(Image)`
  max-width: 100px;
  margin-left: ${({ theme }) => theme.spacings.md};
  box-shadow: ${({ theme }) => theme.shadows.dark};
`

const CardContainer = styled.div`
  padding: ${({ theme }) => theme.spacings.lg} 0;
  border-bottom: ${({ theme }) => theme.borders.light};
  display: flex;
  flex-direction: column;
  width: 100%;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    flex-direction: row;
  }
`

const CardData = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: ${({ theme }) => theme.spacings.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 0;
    margin-left: ${({ theme }) => theme.spacings.xl};
  }
`

const CardInfoContainer = styled.div`
  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    max-height: 400px;
  }
  @media (min-width: ${({ theme }) => theme.breakpoints.laptop}) {
    max-height: 200px;
  }
`

const LayerContent = styled.div`
  display: flex;
  flex-direction: column;
`

const LayerInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CardInfo = styled.div`
  margin: 0 ${({ theme }) => theme.spacings.md};
`

const CardComponent = () => {
  const { card, randomTraits, layerImages } = useCardContext()
  if (!card) return <></>
  return (
    <CardContainer key={card.id}>
      <Images>
        <StyledImage src={card.image} />
        {card.image !== card.layer_image && (
          <StyledImage src={card.layer_image} />
        )}
      </Images>
      <CardData>
        <StyledTitle level={5}>{card.title}</StyledTitle>
        <CardInfoContainer>
          <CardInfo>
            <p>
              <b>Id: </b>
              {card.id}
            </p>
          </CardInfo>
          <CardInfo>
            <p>
              <b>Type: </b>
              {card.attributes.map(attribute => attribute.value)}
            </p>
          </CardInfo>
          <CardInfo>
            <Text>
              <b>Random traits: </b>
              <ul>
                {randomTraits?.traits.map(trait => (
                  <li key={trait}>{trait}</li>
                ))}
              </ul>
            </Text>
          </CardInfo>
          <CardInfo>
            <Text>
              <b>Limited traits: </b>
              <ul>
                {card.traits.map((trait, index) => (
                  <li key={trait.id + '-' + index}>{trait.name}</li>
                ))}
              </ul>
            </Text>
          </CardInfo>
        </CardInfoContainer>
        <LayerContent>
          <Text>
            <b>Accidental Collaboration layers: </b>
          </Text>
          <LayerInformation>
            <Image.PreviewGroup>
              {layerImages?.map(layer => (
                <StyledLayerThumbnail src={layer} />
              ))}
            </Image.PreviewGroup>
          </LayerInformation>
        </LayerContent>
      </CardData>
    </CardContainer>
  )
}

export default CardComponent
