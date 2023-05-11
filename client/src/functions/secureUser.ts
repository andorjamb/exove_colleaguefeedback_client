import { loggedInUser } from "../types/users";

const key = 'AD87A92344AC6C129F46E9EDF2DB4'


export const secureUserUid = async ({ uid, roleLevel,displayName,imageUrl }: loggedInUser) => {
    const userInfo: loggedInUser = {
        uid,
        roleLevel,
        displayName,
        imageUrl,
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(JSON.stringify(userInfo));
    const sessionKey = await crypto.subtle.generateKey({name: 'AES-GCM', length: 256}, true, ['encrypt', 'decrypt']);
    
    // Export the session key as a JWK object
    const exportedKey = await crypto.subtle.exportKey('jwk', sessionKey);
    
    // Store the exported key as a string in sessionStorage
    sessionStorage.setItem('sessionKey', JSON.stringify(exportedKey));
    
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const ciphertext = await crypto.subtle.encrypt({name: 'AES-GCM', iv}, sessionKey, data);
    const encrypted = new Uint8Array([...iv, ...new Uint8Array(ciphertext)]);
    const encryptedString = Array.from(encrypted).join(',');
    sessionStorage.setItem(key, encryptedString);
}


export const  getSecureUserUid = async () => {
    const encryptedString = sessionStorage.getItem(key);
   try {
    if (!encryptedString) {
        return null;
      }
      
      // Retrieve the exported key from sessionStorage
      const exportedKey = JSON.parse(sessionStorage.getItem('sessionKey')!);
      
      // Import the key as a CryptoKey object
      const sessionKey = await crypto.subtle.importKey('jwk', exportedKey, { name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
      
      const encrypted = new Uint8Array(encryptedString.split(',').map(Number));
      const iv = encrypted.slice(0, 12);
      const ciphertext = encrypted.slice(12);
      
      const decrypted = await crypto.subtle.decrypt({name: 'AES-GCM', iv}, sessionKey, ciphertext);
      const decoder = new TextDecoder();
      console.log(decrypted)
      const decryptedString = await decoder.decode(decrypted);
      const decryptedData = await JSON.parse(decryptedString);
      return decryptedData;
   } catch (error) {
       console.log(error)
    return error
   }
    
  }