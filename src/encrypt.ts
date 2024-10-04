import crypto from "crypto";

export class Auralab {
    private secret: string;
    private algorithm = 'aes-256-cbc';
    private sk: Buffer;

    constructor(secret: string) {
        this.secret = secret;
        this.sk = this.getKeyFromSecret();
    }

    private getKeyFromSecret(): Buffer {
        return crypto.createHash('sha256').update(this.secret).digest();
    }

    // Function to hash (encrypt) the object and return both the encrypted data and IV
    public hash(obj: Object) {
        const iv = crypto.randomBytes(16);  // Generate random IV each time for security
        const objectString = JSON.stringify(obj);
        const cipher = crypto.createCipheriv(this.algorithm, this.sk, iv);

        let encrypted = cipher.update(objectString, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Return encrypted data along with IV (in hex format)
        return `${iv.toString('hex')}:${encrypted}`;
    }

    // Function to decode (decrypt) the encrypted data using the stored IV
    public decode(hash: string) {
        const [ivHex, encryptedData] = hash.split(':');  // Extract IV and encrypted data
        const iv = Buffer.from(ivHex, 'hex');  // Convert IV from hex back to a Buffer

        const decipher = crypto.createDecipheriv(this.algorithm, this.sk, iv);
        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        // Convert the decrypted string back into an object
        return JSON.parse(decrypted);
    }
}
