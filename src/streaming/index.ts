import fs from "fs";
import { ethers } from "ethers";

//get abis instance
const getABI = new ethers.utils.Interface(
  fs.readFileSync(`${__dirname}/../abis/uniswap.json`, `utf8`)
); //incomplete
//check for method
const findByMethodName = (name: string) => {
  return ["addLiquidity", "addLiquidityETH"].includes(name);
};
export const streamData = async (_WSS_URL: string) => {
  const provider = new ethers.providers.WebSocketProvider(process.env.WSS_URL!); //error
  //listen on pending transactions

  provider.on("pending", async (txHash: string) => {
    try {
      const transactions = await provider.getTransaction(txHash);
      // console.log(transactions);

      //checks
      if (transactions.data === "0x" || transactions?.data.length < 75) {
        return;
      }
      //decode
      const decodeData = getABI.parseTransaction({ data: transactions?.data });
      let method = decodeData.name;
      console.log("MethodName", method);
      //
      if (
        findByMethodName(decodeData.name) ||
        ["0xf305d719"].includes(decodeData.sighash)
      ) {
        console.log(decodeData);
      }
    } catch (error) {
      //console.log(error);
    }
  });
};
