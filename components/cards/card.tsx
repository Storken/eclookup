import { Image, Typography } from 'antd'
import Link from 'next/link'
import styled from 'styled-components'
import useCardContext from '../../contexts/card-context'
import { ExternalLinkIcon } from '../../icons/external-link'
import { getLayerIdsFromURLs } from '../../utils/layer-helper'

const { Title, Text } = Typography

const StyledTitle = styled(Title)`
  width: 100%;
`

const Images = styled.div`
  display: flex;
  flex-direction: column;
`

const StyledA = styled.a`
  margin-left: ${({ theme }) => theme.spacings.xs};
`

const StyledImage = styled(Image)`
  max-width: 200px;
  width: auto;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacings.md};
`

const StyledLayerThumbnail = styled(Image)`
  max-width: 100px;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin: ${({ theme }) => theme.spacings.sm};
  box-shadow: ${({ theme }) => theme.shadows.dark};
  background-color: ${({ theme }) => theme.colors.gray.medium};
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
  margin-top: ${({ theme }) => theme.spacings.md};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin-top: 0;
    margin-left: ${({ theme }) => theme.spacings.md};
  }
`

const LayerInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const CardInfo = styled.div`
  margin: 0 ${({ theme }) => theme.spacings.md};
`

const ThumbnailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
          {card.artist !== 'various' && (
            <CardInfo>
              <p>
                <b>Artist: </b>
                {card.artist}
              </p>
            </CardInfo>
          )}
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
                {card.traits
                  .filter(
                    trait =>
                      !randomTraits?.traits.some(
                        rTrait => rTrait === trait.name
                      )
                  )
                  .map((trait, index) => (
                    <li key={trait.id + '-' + index}>{trait.name}</li>
                  ))}
              </ul>
            </Text>
          </CardInfo>
        </CardInfoContainer>
        <LayerContent>
          <Text>
            <b>Accidental Collaboration layers |</b>
            <Link
              href={{
                pathname: '/builder',
                query: {
                  layers: `${getLayerIdsFromURLs(layerImages ?? [])?.join('')}`
                }
              }}
              passHref
            >
              <StyledA>
                Builder
                <ExternalLinkIcon />
              </StyledA>
            </Link>
          </Text>
          <LayerInformation>
            <Image.PreviewGroup>
              {layerImages?.map((layer, i) => (
                <ThumbnailContainer key={layer}>
                  <StyledLayerThumbnail src={layer} />
                  <Text>{card.layer_artists[i]}</Text>
                </ThumbnailContainer>
              ))}
            </Image.PreviewGroup>
          </LayerInformation>
        </LayerContent>
      </CardData>
    </CardContainer>
  )
}

export default CardComponent
