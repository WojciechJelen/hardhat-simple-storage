import { ethers } from 'hardhat'
import { SimpleStorage__factory, SimpleStorage } from '../typechain-types'
import { expect } from 'chai'

describe('SimpleStorage', function () {
    let SimpleStorageFactory: SimpleStorage__factory,
        simpleStorage: SimpleStorage

    beforeEach(async function () {
        SimpleStorageFactory = await ethers.getContractFactory('SimpleStorage')
        simpleStorage = await await SimpleStorageFactory.deploy()
        await simpleStorage.deployed()
    })

    it('Should start with favorite number of 0', async function () {
        const currentValue = await simpleStorage.retrieve()
        expect(currentValue.toString()).to.eql('0')
    })

    it('Should udpate the vlaue when we call the store', async function () {
        const txResponse = await simpleStorage.store(7)
        await txResponse.wait(1)
        const newValue = await simpleStorage.retrieve()
        expect(newValue.toString()).to.eql('7')
    })
})
