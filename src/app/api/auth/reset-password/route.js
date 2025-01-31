import { User } from "@/model/user-model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();
  const { urlToken, password } = body;

  try {
    // Connect to MongoDB
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Verify the reset token
    const decoded = jwt.verify(urlToken, process.env.JWT_SECRET);
    const user = await User.findOne({ email: decoded.email });
    console.log("user ========  ", user);

    if (
      !user ||
      user.resetToken !== urlToken ||
      user.resetTokenExpiration < Date.now()
    ) {
      return NextResponse.json({ message: "Invalid or expired token" });
    }

    // Hash new password and save it
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiration = null;
    await user.save();
    //console.log("password reset successful..................");
    return NextResponse.json(
      { message: "Password reset successful" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Server Error", error },
      { status: 500 }
    );
  }
}
