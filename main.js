const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previosHash = previosHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return SHA256(`${this.index}${this.previosHash}${this.timestamp}${JSON.stringify(this.data)}`).toString()
    }

    
}


class BlockChain {
    constructor() {
        this.chain = [this.createGenesisBlock()]

    }

    createGenesisBlock = () => {
        return new Block(0, "01/01/2020", "Genesis block", "0")
    }
    
    getLatestBlock = () => {
        return this.chain[this.chain.length - 1]
    }
    
    addBlock = (newBlock) => {
        newBlock.previosHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        // Todo verification process before add a new block
        this.chain.push(newBlock)
    }
    

}

letEvaBlockChain =  new BlockChain()
letEvaBlockChain.addBlock(new Block(1, "04/04/2020", {amount: 4}))
letEvaBlockChain.addBlock(new Block(2, "04/04/2020", {amount: 10}))

console.table([letEvaBlockChain])
console.log({ letEvaBlockChain})
console.log(JSON.stringify(letEvaBlockChain, null, 4))
