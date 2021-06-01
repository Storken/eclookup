import * as React from 'react'
import Head from 'next/head'
import { Col, Row, Typography } from 'antd'
import { Web3Provider } from '../contexts/web3-context'
import { CardList } from '../components/cards/card-list'
import styled from 'styled-components'

const { Text, Title } = Typography

const Info = styled.div`
  margin-top: ${({ theme }) => theme.spacings.md};
`

const StyledText = styled(Text)`
  overflow-wrap: break-word;
  margin-left: ${({ theme }) => theme.spacings.xs};
`

const Container = styled.div`
  background-color: #18191b;
`

const Home = () => {
  return (
    <>
      <Head>
        <title>ECLookup</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Container>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 3 }}>
            <Title>Burned Ether Cards</Title>
          </Col>
          <Col xs={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 3 }}>
            <Web3Provider
              initialAddress={'0x6abc4684f104aef2e3b37e2e9e8018bfcd30c0d8'}
            >
              <CardList />
            </Web3Provider>
            <Info>
              Made in collaboration with Moonfarm
              <StyledText copyable>
                0x314e5699db4756138107AE7d7EeDDf5708583ff5
              </StyledText>
            </Info>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Home
