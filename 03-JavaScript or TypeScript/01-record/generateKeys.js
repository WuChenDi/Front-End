import { base58 } from '@scure/base'
import { HDKey } from '@scure/bip32'
import * as bip39 from '@scure/bip39'
import { wordlist } from '@scure/bip39/wordlists/english'
import ecies from 'eciesjs'

bip39.generateMnemonic(wordlist)

// 默认派生路径
const DEFAULT_DERIVATION_PATH = "m/44'/0'/0'/0/0"

/**
 * 生成用户密钥对
 * @param {string} name - 用户名称
 * @param {string} [mnemonic] - 可选的助记词，如果不提供则自动生成
 * @returns {object} 包含用户信息的对象
 */
function generateUser(name, mnemonic = null) {
  // 如果没有提供助记词，则生成一个新的
  const userMnemonic = mnemonic || bip39.generateMnemonic(wordlist)

  console.log(`\n=== 生成用户 ${name} ===`)
  console.log(`助记词: ${userMnemonic}`)

  // 从助记词生成种子
  const seed = bip39.mnemonicToSeedSync(userMnemonic)

  // 从种子生成主密钥
  const masterKey = HDKey.fromMasterSeed(seed)

  // 派生密钥
  const derivedKey = masterKey.derive(DEFAULT_DERIVATION_PATH)

  // 编码公钥
  const pubKeyEncoded = base58.encode(derivedKey.pubKey)

  console.log(`公钥 (Base58): ${pubKeyEncoded}`)
  console.log(`公钥长度: ${derivedKey.pubKey.length} 字节`)
  console.log(`私钥长度: ${derivedKey.privKeyBytes.length} 字节`)

  return {
    name,
    mnemonic: userMnemonic,
    seed,
    masterKey,
    derivedKey,
    pubKey: derivedKey.pubKey,
    privKey: derivedKey.privKeyBytes,
    pubKeyEncoded,
  }
}

/**
 * 加密消息
 * @param {Buffer} recipientPubKey - 接收者的公钥
 * @param {string} message - 要加密的消息
 * @returns {Buffer} 加密后的数据
 */
function encryptMessage(recipientPubKey, message) {
  const msgBuffer = Buffer.from(message, 'utf8')
  return ecies.encrypt(recipientPubKey, msgBuffer)
}

/**
 * 解密消息
 * @param {Buffer} privKey - 私钥
 * @param {Buffer} encryptedData - 加密的数据
 * @returns {string} 解密后的消息
 */
function decryptMessage(privKey, encryptedData) {
  const decryptedBuffer = ecies.decrypt(privKey, encryptedData)
  return decryptedBuffer.toString('utf8')
}

/**
 * 测试加密通信
 */
function testEncryption() {
  console.log('🔐 开始测试基于助记词的加密通信')
  console.log('=' * 60)

  // 生成两个用户
  const alice = generateUser('Alice')
  const bob = generateUser('Bob')

  console.log('\n📨 测试消息加密和解密')
  console.log('-' * 40)

  // 测试消息
  const messages = [
    { from: 'Alice', to: 'Bob', content: 'Hello Bob, this is a secret message!' },
    { from: 'Bob', to: 'Alice', content: 'Hi Alice, I received your message safely!' },
    { from: 'Alice', to: 'Bob', content: '这是一条中文消息 🚀' },
    {
      from: 'Bob',
      to: 'Alice',
      content: 'Encryption test with special chars: @#$%^&*()',
    },
  ]

  // 处理每条消息
  messages.forEach((msg, index) => {
    console.log(`\n--- 消息 ${index + 1} ---`)
    console.log(`发送者: ${msg.from}`)
    console.log(`接收者: ${msg.to}`)
    console.log(`原始消息: "${msg.content}"`)

    // 确定发送者和接收者
    const sender = msg.from === 'Alice' ? alice : bob
    const recipient = msg.to === 'Alice' ? alice : bob

    try {
      // 加密消息
      const encrypted = encryptMessage(recipient.pubKey, msg.content)
      console.log(`加密后长度: ${encrypted.length} 字节`)

      // 解密消息
      const decrypted = decryptMessage(recipient.privKey, encrypted)
      console.log(`解密后消息: "${decrypted}"`)

      // 验证消息是否正确
      const isValid = decrypted === msg.content
      console.log(`✅ 验证结果: ${isValid ? '成功' : '失败'}`)

      if (!isValid) {
        console.error(`❌ 错误: 解密后的消息与原始消息不匹配`)
      }
    } catch (error) {
      console.error(`❌ 加密/解密过程出错: ${error.message}`)
    }
  })

  console.log('\n🎯 测试完成!')
}

/**
 * 演示如何使用特定助记词重新生成相同的密钥
 */
function testMnemonicRecovery() {
  console.log('\n🔄 测试助记词恢复功能')
  console.log('=' * 60)

  // 第一次生成
  const user1 = generateUser('测试用户1')
  const originalPubKey = user1.pubKeyEncoded

  console.log('\n--- 使用相同助记词重新生成 ---')

  // 使用相同助记词重新生成
  const user2 = generateUser('测试用户2', user1.mnemonic)
  const recoveredPubKey = user2.pubKeyEncoded

  console.log(`\n🔍 验证恢复结果:`)
  console.log(`原始公钥:   ${originalPubKey}`)
  console.log(`恢复后公钥: ${recoveredPubKey}`)
  console.log(`✅ 恢复成功: ${originalPubKey === recoveredPubKey ? '是' : '否'}`)
}

function main() {
  try {
    // 测试基本加密功能
    testEncryption()

    // 测试助记词恢复
    testMnemonicRecovery()

    console.log('\n🎉 所有测试完成!')
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error)
  }
}

// 运行测试
main()
