import forge from 'node-forge'

export function encryptWithPublicKey(password: string, publicKey: string) {
  try {
    // 解析公钥
    const publicKeyObj = forge.pki.publicKeyFromPem(publicKey)
    const encrypted = publicKeyObj.encrypt(
      password,
      'RSA-OAEP',
      { md: forge.md.sha256.create() },
    )
    return forge.util.encode64(encrypted)
  }
  catch (err) {
    console.error('加密失败:', err)
    return null
  }
}
