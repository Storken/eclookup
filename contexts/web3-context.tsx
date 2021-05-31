import { useRouter } from 'next/router'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface Web3ContextProps {
  address: string
  setAddress: (address: string) => void
  connect: () => void
  disconnect: () => void
  isConnected: boolean
}

interface Web3ProviderProps {
  children: ReactNode
  initialAddress?: string
}

export const Web3Context: React.Context<Web3ContextProps> = createContext<
  Web3ContextProps
>({} as Web3ContextProps)

export const Web3Provider = ({ children, initialAddress }: Web3ProviderProps) => {
  const router = useRouter()
  const [address, setAddress] = useState(initialAddress ?? '')

  useEffect(() => {
    const paramAddress = router.query?.address ?? address
    setAddress(paramAddress.toString())
  }, [router])

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
