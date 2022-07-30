import { ethers } from 'hardhat'

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        'SimpleStorage',
    )
    console.log('Deploying SimpleStorage')
    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log('SimpleStorage deployed to', simpleStorage.address)
    await simpleStorage.deployed()
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
