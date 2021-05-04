import { Image, Typography } from 'antd'
import styled from 'styled-components'
import useCardContext from '../../contexts/card-context'

const { Title, Text } = Typography

const StyledTitle = styled(Title)`
  width: 100%;
`

const StyledImage = styled(Image)`
  max-width: 200px;
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

const CardInfo = styled.div`
  margin: 0 ${({theme}) => theme.spacings.md};
`

const CardComponent = () => {
  const { card, randomTraits } = useCardContext()
  if (!card) return <></>
  return (
    <CardContainer key={card.id}>
      <StyledImage src={card.image} />
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
      </CardData>
    </CardContainer>
  )
}

export default CardComponent
