import * as React from 'react'
import Head from 'next/head'
import { Col, Row } from 'antd'
import { Web3Provider } from '../contexts/web3-context'
import { CardList } from '../components/cards/card-list'
import styled from 'styled-components';

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
            <Web3Provider
              initialAddress={'0x6abc4684f104aef2e3b37e2e9e8018bfcd30c0d8'}
            >
              <CardList />
            </Web3Provider>
          </Col>
        </Row>
      </Container>
    </>
  )
}
export default Home
