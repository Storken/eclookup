import { Col, Layout, Row } from 'antd'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import styled from 'styled-components'

const { Header: AntdHeader } = Layout

const LogoLink = styled.a`
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledLogo = styled.img`
  padding-left: ${({ theme }) => theme.spacings.sm};
  height: 18px;
`

export const Header = () => {
  const ResponsiveMenu = dynamic(() => import('./responsive-menu'), {
    ssr: false
  })

  return (
    <AntdHeader style={{ backgroundColor: '#000' }}>
      <Row>
        <Col
          offset={0}
          span={24}
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'space-between'
          }}
        >
          <Link href='/' passHref>
            <LogoLink>
              <StyledLogo alt='eclookup' src='/assets/icons/logo.svg' />
            </LogoLink>
          </Link>
          <ResponsiveMenu />
        </Col>
      </Row>
    </AntdHeader>
  )
}
