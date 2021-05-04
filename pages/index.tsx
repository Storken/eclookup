import * as React from 'react'
import Head from 'next/head'
import { Col, Row } from 'antd'
import Cards from '../components/cards/cards'
import { Web3Provider } from '../contexts/web3-context'
import WalletInput from '../components/wallet-input';

const Home = () => {
  return (
    <>
      <Head>
        <title>My Ether Cards</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <>
        <Row>
          <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 6 }}>
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
