import Keypair from "keypair";
import NodeRSA from "node-rsa";

export const encryption = (pubKey,plaintext)=>{
  const rsa = new NodeRSA(pubKey,'pkcs1-public');
  return rsa.encrypt(plaintext,'base64');
}

export const decryption = (privateKey,ciphertext)=>{
  const rsa = new NodeRSA(privateKey,'pkcs1');
  return rsa.decrypt(ciphertext,'utf-8');
}
