"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auralab = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Auralab {
    constructor(secret) {
        this.algorithm = 'aes-256-cbc';
        this.secret = secret;
        this.sk = this.getKeyFromSecret();
    }
    getKeyFromSecret() {
        return crypto_1.default.createHash('sha256').update(this.secret).digest();
    }
    // Function to hash (encrypt) the object and return both the encrypted data and IV
    hash(obj) {
        const iv = crypto_1.default.randomBytes(16); // Generate random IV each time for security
        const objectString = JSON.stringify(obj);
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.sk, iv);
        let encrypted = cipher.update(objectString, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        // Return encrypted data along with IV (in hex format)
        return `${iv.toString('hex')}:${encrypted}`;
    }
    // Function to decode (decrypt) the encrypted data using the stored IV
    decode(hash) {
        const [ivHex, encryptedData] = hash.split(':'); // Extract IV and encrypted data
        const iv = Buffer.from(ivHex, 'hex'); // Convert IV from hex back to a Buffer
        const decipher = crypto_1.default.createDecipheriv(this.algorithm, this.sk, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        // Convert the decrypted string back into an object
        return JSON.parse(decrypted);
    }
}
exports.Auralab = Auralab;
//# sourceMappingURL=encrypt.js.map