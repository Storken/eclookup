import { Layout } from 'antd'
import { ReactNode } from 'react'
import styled from 'styled-components'

const { Content: AntdContent } = Layout

const StyledAntdContent = styled(AntdContent)`
  margin: ${({ theme }) => `${theme.spacings.lg} ${theme.spacings.md}`};
  padding: ${({ theme }) => `${theme.spacings.lg} ${theme.spacings.md}`};
  background-color: black;

  @media (min-width: ${({ theme }) => theme.breakpoints.mobile}) {
    margin: ${({ theme }) => theme.spacings.lg};
    padding: ${({ theme }) => theme.spacings.lg};
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    margin: ${({ theme }) => theme.spacings.xl};
    padding: ${({ theme }) => theme.spacings.xl};
  }
`

export const Content = ({ children }: { children: ReactNode }) => (
  <StyledAntdContent>
    {children}
  </StyledAntdContent>
)
