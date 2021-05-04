import styled from 'styled-components'
import { CheckmarkIcon } from './checkmark'

const StyledCheckmarkIcon = styled(CheckmarkIcon)`
  svg {
    fill: ${({ theme }) => theme.colors.success} !important;
  }
`

export const FinishedIcon = () => <StyledCheckmarkIcon title='finished' />
