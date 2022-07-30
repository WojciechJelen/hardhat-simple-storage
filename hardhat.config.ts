import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'

dotenv.config()

const GOERLI_URL = process.env.GOERLI_RPC_URL!
const PRIVATE_KEY = process.env.PRIVATE_KEY!

const config: HardhatUserConfig = {
    defaultNetwork: 'hardhat',
    networks: {
        goerli: {
            url: GOERLI_URL,
            accounts: [PRIVATE_KEY],
        },
    },
    solidity: '0.8.9',
}

export default config
