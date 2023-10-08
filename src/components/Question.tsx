'use client'
import React from 'react'
import prisma from '@/lib/prismaClient'
import {useEffect} from 'react'
import { MongoClient } from "mongodb";
import promises from 'fs/promises'

const Question = () => {
  // const client = new MongoClient(process.env.DATABASE_URL as string);
  
  // let changeStream;
  
  // // Define an asynchronous function to manage the change stream
  // async function run() {
  //   try {
  //     const database = client.db("test0");
  //     const haikus = database.collection("Question");
  
  //     // Open a Change Stream on the "haikus" collection
  //     changeStream = haikus.watch();
  
  //     // Print change events as they occur
  //     for await (const change of changeStream) {
  //       console.log("Received change:\n", change);
  //     }
  //     // Close the change stream when done
  //     await changeStream.close();
  
  //   } finally {
  //     // Close the MongoDB client connection
  //     await client.close();
  //   }
  // }
  // run().catch(console.dir);
  
  return (
    <div>
        <h1>Question</h1>
    </div>
)
}


export default Question