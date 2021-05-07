import styled from 'styled-components'

const StyledExternalLinkIcon = styled.div`
  margin-left: ${({ theme }) => theme.spacings.xs};
  display: inline-flex;
  justify-content: center;
  align-items: center;

  svg {
    flex-shrink: 0;
    height: 14px;
    width: 14px;
    stroke: ${({ theme }) => theme.colors.primaryColor};
  }
`

// svg fetched from https://heroicons.com/
export const ExternalLinkIcon = () => (
  <StyledExternalLinkIcon>
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
      />
    </svg>
  </StyledExternalLinkIcon>
)
