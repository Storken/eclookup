import * as React from 'react'
import Head from 'next/head'
import { Col, Row, Typography } from 'antd'
import LayerBuilder from '../components/layers/layer-builder'
import { LayersProvider } from '../contexts/layer-context'
import LayersOverview from '../components/layers/layers-overview'

const { Title } = Typography

const Builder = () => {
  return (
    <>
      <Head>
        <title>ECLookup - card builder</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <>
        <LayersProvider>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} xl={{ span: 18, offset: 3 }}>
              <Title>Accidental Collaboration builder</Title>
              <LayerBuilder />
            </Col>
          </Row>
          <Row>
            <Col xs={{ span: 24, offset: 0 }} lg={{ span: 12, offset: 6 }}>
              <LayersOverview />
            </Col>
          </Row>
        </LayersProvider>
      </>
    </>
  )
}
export default Builder
