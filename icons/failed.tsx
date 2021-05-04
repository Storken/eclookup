import styled from 'styled-components'
import { ExclamationIcon } from './exclamation'

const StyledExclamationIcon = styled(ExclamationIcon)`
  svg {
    fill: ${({ theme }) => theme.colors.error};
  }
`

export const FailedIcon = () => <StyledExclamationIcon />
