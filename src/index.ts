import {streamData}from "./streaming";
import dotenv from "dotenv";

//get variables
dotenv.config()//.env


const start  =  async() => {
    /// check for variables
    if(!process.env.WSS_URL) {
        throw new Error("please provide your WSS_URI in root .env file");
    }

    await streamData(process.env.WSS_URL!);
}

start();
