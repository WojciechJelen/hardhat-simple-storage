import { task } from 'hardhat/config'

task('block-number', 'Get the current block number').setAction(
    async (taskArgs, hre) => {
        const latestBlockNumber = await hre.ethers.provider.getBlockNumber()
        console.log('Latest block number', latestBlockNumber)
    },
)
