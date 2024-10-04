export declare class Auralab {
    private secret;
    private algorithm;
    private sk;
    constructor(secret: string);
    private getKeyFromSecret;
    hash(obj: Object): string;
    decode(hash: string): any;
}
