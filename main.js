import sha256 from 'crypto-js/sha256';

class Block {
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previosHash = previosHash
        this.hash = this.calculateHash()
    }

    calculateHash() {
        return sha256(`${this.index}${this.previosHash}${this.timestamp}${JSON.stringify(this.data)}`).toString()
    }

    
}


class BlockChain {
    constructor() {
        this.chain = []

    }

    createGenesisBlock = () => {
        return new Block(0, "01/01/2020", "Genesis block", "0")           
    }
    
    getLatestBlock = () => {
        return this.chain(this.chain.length - 1)
    }
    
    addBlock = (newBlock) => {
        newBlock.previosHash = this.getLatestBlock().hash
        newBlock.hash = newBlock.calculateHash()
        // Todo verification process before add a new block
        this.chain.push(newBlock)
    }
    
}