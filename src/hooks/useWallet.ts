import { useEffect, useState, useCallback } from "react"
import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "@scure/bip39"
import { wordlist } from "@scure/bip39/wordlists/english.js"
import { HDKey } from "@scure/bip32"
import { Keypair } from "@solana/web3.js"
import { ethers } from "ethers"
import type { WalletAccount, Chain } from "@/types"
import { STORAGE_KEYS } from "@/config/constants"

function loadFromStorage<T>(
  key: string,
  parse: (v: string) => T,
  fallback: T
): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? parse(stored) : fallback
  } catch {
    return fallback
  }
}

export function useWallet() {
  const [mnemonic, setMnemonic] = useState<string>(() =>
    loadFromStorage(STORAGE_KEYS.MNEMONIC, (v) => v, "")
  )
  const [chain, setChainState] = useState<Chain | null>(() =>
    loadFromStorage(STORAGE_KEYS.CHAIN, (v) => v as Chain, null)
  )
  const [accounts, setAccounts] = useState<WalletAccount[]>(() =>
    loadFromStorage(STORAGE_KEYS.ACCOUNTS, (v) => {
      const parsed = JSON.parse(v) as WalletAccount[]
      return parsed.map((acc, i) => ({
        ...acc,
        name: acc.name ?? `Account ${i + 1}`,
      }))
    }, [])
  )

  useEffect(() => {
    if (mnemonic) localStorage.setItem(STORAGE_KEYS.MNEMONIC, mnemonic)
  }, [mnemonic])

  useEffect(() => {
    if (chain) localStorage.setItem(STORAGE_KEYS.CHAIN, chain)
  }, [chain])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts))
  }, [accounts])

  const setChain = useCallback((c: Chain) => setChainState(c), [])

  const createMnemonic = useCallback((): string => {
    const m = generateMnemonic(wordlist)
    setMnemonic(m)
    return m
  }, [])

  const importMnemonic = useCallback((m: string) => {
    const trimmed = m.trim()
    if (!validateMnemonic(trimmed, wordlist)) {
      throw new Error("Invalid recovery phrase")
    }
    setMnemonic(trimmed)
    setAccounts([])
  }, [])

  const deriveAccount = useCallback(
    async (index: number, name: string) => {
      if (!chain || !mnemonic) return

      const seed = await mnemonicToSeed(mnemonic)
      const hd = HDKey.fromMasterSeed(seed)
      const accountName =
        name.trim().length > 0 ? name.trim() : `Account ${index + 1}`

      if (chain === "solana") {
        const child = hd.derive(`m/44'/501'/0'/${index}'`)
        const keypair = Keypair.fromSeed(child.privateKey!.slice(0, 32))
        const account: WalletAccount = {
          name: accountName,
          publicKey: keypair.publicKey.toBase58(),
          privateKey: Buffer.from(keypair.secretKey).toString("hex"),
          chain,
        }
        setAccounts((prev) => [...prev, account])
      }

      if (chain === "ethereum") {
        const child = hd.derive(`m/44'/60'/0'/0/${index}`)
        const privateKey =
          "0x" + Buffer.from(child.privateKey!).toString("hex")
        const wallet = new ethers.Wallet(privateKey)
        const account: WalletAccount = {
          name: accountName,
          publicKey: wallet.address,
          privateKey,
          chain,
        }
        setAccounts((prev) => [...prev, account])
      }
    },
    [chain, mnemonic]
  )

  const deleteAccount = useCallback((index: number) => {
    setAccounts((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const resetWallet = useCallback(() => {
    setMnemonic("")
    setAccounts([])
    setChainState(null)
    Object.values(STORAGE_KEYS).forEach((k) => localStorage.removeItem(k))
  }, [])

  return {
    mnemonic,
    chain,
    accounts,
    setChain,
    createMnemonic,
    importMnemonic,
    deriveAccount,
    deleteAccount,
    resetWallet,
  }
}
