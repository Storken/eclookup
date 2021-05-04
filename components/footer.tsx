import { Layout } from 'antd'
import { ReactNode } from 'react'

const { Footer: AntdFooter } = Layout

type FooterProps = { children: ReactNode }
export const Footer = ({ children }: FooterProps) => (
  <AntdFooter style={{ backgroundColor: '#000' }}>{children}</AntdFooter>
)
