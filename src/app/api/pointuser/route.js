import UserModal from "DBconfig/models/UserModal";
import { connectMongoDB } from "DBconfig/mongo";
import { NextResponse } from "next/server";

import bcrypt from "bcrypt"


export async function POST(request) {
  // 1- Receive data from Front-end
  const objFromFrontEnd = await request.json();
  console.log(objFromFrontEnd);

  // 2- connect to DB
  await connectMongoDB();

  // 3- Hashing password with bcrypt.js
  console.log("*****************    salt   **************************");

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(objFromFrontEnd.password, salt);

  // 4- Try to Store obj to DB
  await UserModal.create({
    name: objFromFrontEnd.name,
    email: objFromFrontEnd.email,
    password: hashedPassword,
    customers: objFromFrontEnd.customers,
    
  });

  // 5- Go back to frontend
  return NextResponse.json("zainaddyes");
}



