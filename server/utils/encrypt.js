import crypto from 'crypto';
import dotenv from 'dotenv';
dotenv.config({path: "../variables.env"});



export const decrypt= (data)=>{
    const KEY= process.env.ENCRYPTION_KEY;
    let [ivHex, dataHex]= data.split(":");
    let iv= Buffer.from(ivHex, 'hex');
    let decipher= crypto.createDecipheriv('aes-256-cbc', KEY, iv);
    let decrypted= decipher.update(dataHex, 'hex', 'utf-8');
    decrypted+=decipher.final('utf-8');
    return decrypted;
}

export const encrypt= (data)=>{
    const KEY=process.env.ENCRYPTION_KEY;
    let stringData= JSON.stringify(data);
    let iv= crypto.randomBytes(16);
    let cipher= crypto.createCipheriv('aes-256-cbc', KEY, iv);
    let encrypted=cipher.update(stringData, 'utf-8', 'hex');
    encrypted+=cipher.final('hex');
    let encryptedData= iv.toString('hex') + ":" + encrypted;
    return encryptedData;
}