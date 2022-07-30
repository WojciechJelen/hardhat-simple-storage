import { ethers, run, network } from 'hardhat'

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage',
    )
    console.log('Deploying SimpleStorage')
    const simpleStorage = await await SimpleStorageFactory.deploy()
    console.log('SimpleStorage deployed to', simpleStorage.address)
    await simpleStorage.deployTransaction.wait(6)
    await simpleStorage.deployed()

    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        await verifyContract(simpleStorage.address)
    }
}

const verifyContract = async (contractAddress: string, args?: any) => {
    try {
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
