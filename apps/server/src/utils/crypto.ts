import * as crypto from 'crypto';

export class CryptoUtil {
  private static generateSalt(): string {
    return process.env.SALT ?? "" 
  }

  /**
   * 密码加密（scrypt 算法 + 随机盐值）
   * @param plainPassword 明文密码
   * @returns 存储格式：salt$hash（盐值和哈希用 $ 分隔）
   */
  static async encrypt(plainPassword: string): Promise<string> {
    const salt = this.generateSalt();
    const hash = await new Promise<string>((resolve, reject) => {
      crypto.scrypt(plainPassword, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
    return `${salt}$${hash}`;
  }

  /**
   * 密码验证
   * @param plainPassword 输入的明文密码
   * @param storedStr 存储的字符串（格式：salt$hash）
   * @returns 是否匹配
   */
  static async verify(plainPassword: string, storedStr: string): Promise<boolean> {
    const [salt, storedHash] = storedStr.split('$');
    if (!salt || !storedHash) {
      return false; // 格式错误
    }
    const currentHash = await new Promise<string>((resolve, reject) => {
      crypto.scrypt(plainPassword, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
    return currentHash === storedHash;
  }
}
