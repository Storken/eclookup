import { Menu } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const CapitalizedLink = styled.a`
  text-transform: capitalize;
`

const DesktopMenuItem = styled(Menu.Item)`
  height: 64px;
  top: 0 !important;
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    ${CapitalizedLink} {
      color: black;
    }
  }
`

const StyledMenu = styled(Menu)`
  height: 64px;
  background-color: #000;
  border-bottom: 0;
`

const ResponsiveMenu = () => {
  const router = useRouter()

  const desktopRoutes = [
    { name: 'lookup', key: 'Lookup', url: '/' },
    { name: 'builder', key: 'Builder', url: '/builder' }
  ]

  // Finds the current selected menu item by checking all routes
  // except the menu.convert (first key) because '/' would
  // match all routes
  const selectedKey =
    desktopRoutes
      .slice(1, desktopRoutes.length)
      .find(route => router.pathname.includes(route.url))?.key ?? 'Lookup'

  return (
    <StyledMenu mode='horizontal' selectedKeys={[selectedKey]}>
      {desktopRoutes.map(route => (
        <DesktopMenuItem key={route.key}>
          <Link href={route.url} passHref>
            <CapitalizedLink>{route.key}</CapitalizedLink>
          </Link>
        </DesktopMenuItem>
      ))}
    </StyledMenu>
  )
}

export default ResponsiveMenu
