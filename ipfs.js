import { NFTStorage } from "nft.storage";
import mime from 'mime'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

export default async function ipfs(fileName, maker, model, year, color) {
  const NFT_STORAGE_API_KEY = process.env.NFT_STORAGE_API_KEY;

  const picture = await fileFromPath(`img/${fileName}`)

  const nft = {
    image: picture,
    name: "DeFlan RWA car twin",
    description: "This is the real world asset's NFT connected to the owner's car thanks to DeFlan",
    properties: {
        maker: maker, 
        model: model, 
        year: year, 
        color: color
    }
  };

  const submit = new NFTStorage({ token: NFT_STORAGE_API_KEY });

  const metadata = await submit.store(nft);
  const img = metadata.data.image.href;
  console.log("NFT data stored successfully 🚀");
  console.log("Metadata URI: ", metadata.url);

  return [metadata, img];
};
