import { Client, Wallet, convertStringToHex } from "xrpl";
import ipfs from "./ipfs.js";
import dotenv from 'dotenv'
dotenv.config()

const networks = {
    RIPPLE_TESTNET: "wss://s.altnet.rippletest.net:51233"
}

let xrplClient;

const getXrplClient = () => {
    if (!xrplClient) {
      xrplClient = new Client(networks.RIPPLE_TESTNET)
    }

    return xrplClient
}

const Wallet1 = Wallet.fromSeed(process.env.XRPL_WALLET_SEED);

export default async function mintToken(fileName, maker, model, year, color, token) {
    const [metadatas, img] = await ipfs(fileName, maker, model, year, color, token);

    const ipfsURL = metadatas.url;

    const client = getXrplClient()
    await client.connect()

    const transactionJson = {
      "TransactionType": "NFTokenMint",
      "Account": Wallet1.classicAddress,
      "URI": convertStringToHex(ipfsURL),
      "Flags": 8,
      "TransferFee": 0,
      "NFTokenTaxon": 0
    }

    const submit = await client.submitAndWait(transactionJson, { wallet: Wallet1 })

    const hash = submit.result.hash;
    console.log("Token hash: ", hash);

    client.disconnect()

    return [hash, metadatas, img];
}
