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
    
    isValidTheBlockChain = () => {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index-1];
            
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false
            } 
            
            if (currentBlock.previosHash !== previousBlock.hash) {
                return false
            } 
        }
        return true
    }
    
}

evaBlockChain =  new BlockChain()
evaBlockChain.addBlock(new Block(1, "04/04/2020", {amount: 4}))
evaBlockChain.addBlock(new Block(2, "04/04/2020", {amount: 10}))

console.table([evaBlockChain])
console.log({ evaBlockChain})
console.log(JSON.stringify(evaBlockChain, null, 4))


console.log('Is a valid block chain? ', evaBlockChain.isValidTheBlockChain())

evaBlockChain.chain[1].data = {amount: 100}
console.log('Is a valid block chain? ', evaBlockChain.isValidTheBlockChain())

evaBlockChain.chain[1].previosHash = evaBlockChain.chain[1].calculateHash()
console.log('Is a valid block chain? ', evaBlockChain.isValidTheBlockChain())