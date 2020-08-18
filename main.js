import sha256 from 'crypto-js/sha256';
import hmacSHA512 from 'crypto-js/hmac-sha512';
import Base64 from 'crypto-js/enc-base64';

class Block {
    constructor(index, timestamp, data, previosHash = ''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previosHash = previosHash
        this.hash = ''
    }

    calculateHash(){

    }
}