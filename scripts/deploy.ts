import { ethers, run, network } from 'hardhat'

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage',
    )
    console.log('Deploying SimpleStorage')
    const simpleStorage = await await SimpleStorageFactory.deploy()
    console.log('SimpleStorage deployed to', simpleStorage.address)
    await simpleStorage.deployed()

    /**
     * it doesn't make sense to verify the ocntract on the hardhat network
     */
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        /**
         * Wait for 6 block verifications so the contract is detected byetehrscan
         * */
        await simpleStorage.deployTransaction.wait(6)
        await verifyContract(simpleStorage.address)
    }

    const currentValue = await simpleStorage.retrieve()
    console.log(`Current value: ${currentValue}`)

    // update the current value
    const txResponse = await simpleStorage.store(7)
    await txResponse.wait(1)

    const newValue = await simpleStorage.retrieve()
    console.log(`New value: ${newValue}`)
}

const verifyContract = async (contractAddress: string, args?: any[]) => {
    try {
        /**
         * "run" lets you to run different hardhat commands programmatically
         */
        await run('verify:verify', {
            address: contractAddress,
            constructorArguments: args,
        })
        console.log('Contract verified')
    } catch (error: unknown) {
        if (
            (error as Error).message.toLowerCase().includes('already verfiied')
        ) {
            console.log('Already verified')
        } else {
            console.log(error)
        }
    }
}

main()
    .then(() => {
        console.log('done')
        process.exit(0)
    })
    .catch((err) => {
        console.error(err)
        process.exit(1)
    })

// 9h
