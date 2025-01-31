import { User } from "@/model/user-model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { Resend } from "resend";

export async function POST(req, res) {
  const body = await req.json();

  const { email } = body;

  // Connect to MongoDB
  if (!mongoose.connection.readyState) {
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }

  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Generate reset token
  const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  // Save the token and its expiration date in the DB
  user.resetToken = resetToken;
  user.resetTokenExpiration = Date.now() + 7200000; // 1 hour expiration
  await user.save();

  // Send the email
  const resetUrl = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
  //console.log(resetUrl);
  console.log("................. ", email);
  try {
    const resend = new Resend("re_eRvbQtkn_6rR15L3Y52jCPJvXyUj1bbZ9");
    resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Password Reset",
      html: `<p>Click <a href="${resetUrl}">here</a> to reset your password.</p>`,
    });
    return NextResponse.json(
      { message: "Email sent successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
