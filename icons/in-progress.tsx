import { SyncOutlined } from '@ant-design/icons'
import styled from 'styled-components'

const StyledSyncOutlined = styled(SyncOutlined)`
  .anticon-spin {
    animation-duration: 5s !important;
  }

  svg {
    fill: ${({ theme }) => theme.colors.success};
  }
`

export const InProgressIcon = () => (
  <StyledSyncOutlined spin title='in-progress' />
)
