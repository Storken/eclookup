import styled from 'styled-components'

const StyledKeyIcon = styled.div<KeyIconProps>`
  padding: ${({ theme }) => theme.spacings.xs};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    flex-shrink: 0;
    ${({ success, danger, theme }) =>
      success || danger
        ? `stroke: ${
            success ? theme.colors.success : danger ? theme.colors.error : ''
          };`
        : ''};
  }
`

export type KeyIconProps = {
  success?: boolean
  danger?: boolean
}

// svg fetched from https://heroicons.com/
export const KeyIcon = ({ success, danger }: KeyIconProps) => (
  <StyledKeyIcon success={success} danger={danger}>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      width='24px'
      height='24px'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z'
      />
    </svg>
  </StyledKeyIcon>
)
