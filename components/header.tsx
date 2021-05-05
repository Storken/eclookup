import { Col, Layout, Menu, Row } from 'antd'
import { useRouter } from 'next/router'
import { HamburgerIcon } from '../icons/hamburger'
import Link from 'next/link'
import styled from 'styled-components'

const { Header: AntdHeader } = Layout
const { SubMenu } = Menu

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

const MobileMenu = styled(SubMenu)`
  display: inline-block;
  padding-left: ${({ theme }) => theme.spacings.md} !important;
  margin-right: 0 !important;
  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none !important;
  }
`

const CapitalizedLink = styled.a`
  text-transform: capitalize;
`

const DesktopMenuItem = styled(Menu.Item)`
  display: block;
  top: 0 !important;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none !important;
  }
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
              <StyledLogo alt='eclookup' src='/assets/icons/logo.svg' />
            </LogoLink>
          </Link>
          <ResponsiveMenu />
        </Col>
      </Row>
    </AntdHeader>
  )
}

const ResponsiveMenu = () => {
  const router = useRouter()

  const desktopRoutes = [
    { name: 'lookup', key: 'Lookup', url: '/' },
    { name: 'builder', key: 'Builder', url: '/builder' }
  ]
  const mobileRoutes = [...desktopRoutes]

  // Finds the current selected menu item by checking all routes
  // except the menu.convert (first key) because '/' would
  // match all routes
  const selectedKey =
    desktopRoutes
      .slice(1, desktopRoutes.length)
      .find(route => router.pathname.includes(route.url))?.key ?? 'Lookup'

  return (
    <>
      <Menu
        mode='horizontal'
        style={{
          height: 64,
          display: 'flex',
          justifyContent: 'space-between',
          backgroundColor: '#000',
          borderBottom: 0
        }}
        selectedKeys={[selectedKey]}
      >
        <>
          <MobileMenu key='mobile' title='' icon={<HamburgerIcon />}>
            <>
              {mobileRoutes.map(route => (
                <Menu.Item key={route.key}>
                  <Link href={route.url} passHref>
                    <CapitalizedLink style={{ color: 'black' }}>
                      {route.key}
                    </CapitalizedLink>
                  </Link>
                </Menu.Item>
              ))}
            </>
          </MobileMenu>
          {desktopRoutes.map(route => (
            <DesktopMenuItem key={route.key}>
              <Link href={route.url} passHref>
                <CapitalizedLink>{route.key}</CapitalizedLink>
              </Link>
            </DesktopMenuItem>
          ))}
        </>
      </Menu>
    </>
  )
}
