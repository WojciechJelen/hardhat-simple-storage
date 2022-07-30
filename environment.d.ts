declare global {
    namespace NodeJS {
        interface ProcessEnv {
            GOERLI_RPC_URL: string
            PRIVATE_KEY: string
            ETHERSCAN_API_KEY: string
        }
    }
}
export {}
