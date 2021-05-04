import styled from 'styled-components'
import { PowerOffIcon } from './power-off'

const StyledPowerOffIcon = styled(PowerOffIcon)`
  svg {
    fill: ${({ theme }) => theme.colors.warning};
  }
`

export const ExpiredIcon = () => <StyledPowerOffIcon title='expired' />
