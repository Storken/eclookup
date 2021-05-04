import '../styles/globals.less'
import '../styles/antd.less'
import { Header } from '../components/header'
import { Layout, Typography } from 'antd'
import { Footer } from '../components/footer'
import { Content } from '../components/content'
import React from 'react'
import { NextRouter } from 'next/router'
import { NextComponentType } from 'next'
import {
  AppContextType,
  AppInitialProps,
  AppPropsType
} from 'next/dist/next-server/lib/utils'
import styled, { ThemeProvider } from 'styled-components'
import { theme } from '../styled-components/theme'

const { Text } = Typography

const StyledText = styled(Text)`
  overflow-wrap: break-word;
`

type AppProps = {
  Component: NextComponentType<
    AppContextType<NextRouter>,
    AppInitialProps,
    AppPropsType<NextRouter, {}>
  >
  pageProps: any
}

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#333' }}>
      <ThemeProvider theme={theme}>
        <>
          <Header />
          <Content>
            <Component {...pageProps} />
          </Content>
        </>
        <Footer>
          Made by Moonfarm{' '}
          <StyledText copyable>0x314e5699db4756138107AE7d7EeDDf5708583ff5</StyledText>
        </Footer>
      </ThemeProvider>
    </Layout>
  )
}

export default App
