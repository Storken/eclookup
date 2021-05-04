import { Input } from 'antd'
import { useState } from 'react'
import styled from 'styled-components'
import useWeb3User from '../contexts/web3-context'

const { Search } = Input

const StyledInput = styled(Search)`
  margin-bottom: ${({ theme }) => theme.spacings.lg};
  span {
    background-color: ${({ theme }) => theme.colors.gray.dark};
    border-color: ${({ theme }) => theme.colors.gray.light};
  }
  input {
    background-color: ${({ theme }) => theme.colors.gray.dark};
    border-color: ${({ theme }) => theme.colors.gray.light};
  }
  button {
    background-color: ${({ theme }) => theme.colors.gray.dark};
    border-color: ${({ theme }) => theme.colors.gray.light};
    svg {
      color: white;
    }

    &:hover {
      background-color: #555;
    }
  }
`

const WalletInput = () => {
  const { address, setAddress } = useWeb3User()
  const [loading, setLoading] = useState(false)

  const onChange = (value: string) => {
    setLoading(true)
    setTimeout(() => {
      setAddress(value)
      setLoading(false)
    }, 500)
  }

  return (
    <StyledInput
      addonBefore='wallet'
      defaultValue={address}
      onSearch={onChange}
      enterButton='Search'
      loading={loading}
    />
  )
}

export default WalletInput
