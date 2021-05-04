import { Col, Layout, Menu, Row } from 'antd'
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
  opacity: 0.85;
`

export const Header = () => {
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
              <StyledLogo alt='ECMe' src='/assets/icons/logo.svg' />
            </LogoLink>
          </Link>
          <ResponsiveMenu />
        </Col>
      </Row>
    </AntdHeader>
  )
}

const ResponsiveMenu = () => {
  return (
    <>
      <Menu
        mode='horizontal'
        style={{
          height: 65,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      ></Menu>
    </>
  )
}
