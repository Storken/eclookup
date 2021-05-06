import * as React from 'react'
import Head from 'next/head'
import { Col, Row, Typography } from 'antd'
import Cards from '../components/cards/cards'
import { Web3Provider } from '../contexts/web3-context'
import WalletInput from '../components/wallet-input'

const { Title } = Typography

const Home = () => {
  return (
    <>
      <Head>
        <title>ECLookup</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 3 }}>
            <Title>Ether Cards Lookup</Title>
            <Web3Provider>
              <WalletInput />
              <Cards />
            </Web3Provider>
          </Col>
        </Row>
      </>
    </>
  )
}
export default Home
