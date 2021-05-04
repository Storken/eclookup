import { Typography } from 'antd'
import useWeb3User from '../../contexts/web3-context'
import { CardList } from './card-list'

const { Text } = Typography

const Cards = () => {
  const { isConnected } = useWeb3User()
  return (
    <>
      {isConnected ? (
        <CardList />
      ) : (
        <Text>Lookup cards in a wallet using the input field above</Text>
      )}
    </>
  )
}

export default Cards
