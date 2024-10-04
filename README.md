# Auralab

Auralab is an NPM package that provides a secure way to encrypt and decrypt objects using a secret string, leveraging the AES-256-CBC algorithm. It is useful for implementing encrypted login mechanisms similar to JWT (JSON Web Tokens).

## Features

- Encrypts JavaScript objects into a secure string.
- Decrypts the secure string back into the original object.
- Utilizes AES-256-CBC encryption for robust security.
- Simple and easy to use with a clear API.

## Installation

You can install Auralab via npm:

```bash
npm install auralab
```

## Usage

Here is a basic example of how to use Auralab to encrypt and decrypt objects:

```javascript
const { Auralab } = require("auralab");

const aura = new Auralab("your_secret_string_here");
console.log(aura);

const obj = { username: 'Sajad', password: 'mypassword' };

// Encrypt the object
let hash = aura.hash(obj);
console.log('Encrypted:', hash);

// Decrypt the object
let decoded = aura.decode(hash);
console.log('Decrypted:', decoded);

// Decode using a hash directly
let hashForDecode = "your_hash_here";
let decodedDirectly = aura.decode(hashForDecode);
console.log('Decoded Directly:', decodedDirectly);
```

### Parameters

- **Constructor**: `new Auralab(secret: string)`
  - `secret`: A string used to generate the encryption key.

### Methods

- **`hash(obj: Object): string`**
  - Encrypts the provided object and returns the encrypted string.

- **`decode(hash: string): Object`**
  - Decrypts the provided hash string and returns the original object.

## Example

Here is an example of how to encrypt and decrypt an object:

```javascript
const { Auralab } = require("auralab");

const aura = new Auralab("cfdgbfcyehfvbr");

const obj = { username: 'Sajad', password: 'mypassword' };

// Encrypt the object
let hash = aura.hash(obj);
console.log('Encrypted:', hash);

// Decrypt the object
let decoded = aura.decode(hash);
console.log('Decrypted:', decoded);
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details. 