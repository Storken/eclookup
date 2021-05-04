import { createContext, ReactNode, useContext, useState } from 'react'

interface Web3ContextProps {
  address: string
  setAddress: (address: string) => void
  connect: () => void
  disconnect: () => void
  isConnected: boolean
}

export const Web3Context: React.Context<Web3ContextProps> = createContext<
  Web3ContextProps
>({} as Web3ContextProps)

export const Web3Provider = ({ children }: { children: ReactNode }) => {
  const [address, setAddress] = useState(
    '0x314e5699db4756138107AE7d7EeDDf5708583ff5'
  )

  const disconnect = () => {}

  const connect = () => {}

  return (
    <Web3Context.Provider
      value={{
        address,
        setAddress,
        connect,
        disconnect,
        isConnected: Boolean(address)
      }}
    >
      {children}
    </Web3Context.Provider>
  )
}

export default function useWeb3User () {
  const context = useContext(Web3Context)

  return context
}
