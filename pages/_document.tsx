import { NextComponentType } from 'next'
import {
  AppContextType,
  AppInitialProps,
  AppPropsType
} from 'next/dist/next-server/lib/utils'
import Document, { DocumentContext } from 'next/document'
import { NextRouter } from 'next/router'
import { ServerStyleSheet } from 'styled-components'

/**
 * Added this to make styled components work properly with nextjs
 * read more: https://styled-components.com/docs/advanced#nextjs
 */

export default class MyDocument extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (
            App: NextComponentType<
              AppContextType<NextRouter>,
              AppInitialProps,
              AppPropsType<NextRouter, {}>
            >
          ) => (props: any) => sheet.collectStyles(<App {...props} />)
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
}
