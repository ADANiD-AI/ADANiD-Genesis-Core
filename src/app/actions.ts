"use server";

import { LoginSchema, RegisterSchema } from "@/lib/schemas";
import type { LoginData, RegisterData } from "@/lib/schemas";

export async function register(data: RegisterData) {
  const validation = RegisterSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data." };
  }

  console.log("Registering user:", data.email);
  // Simulate a successful registration
  return { success: true, message: "Registration successful." };
}

export async function login(data: LoginData) {
  const validation = LoginSchema.safeParse(data);
  if (!validation.success) {
    return { success: false, message: "Invalid data.", user: null };
  }

  console.log("Logging in user:", data.email);
  // Simulate a successful login
  if (data.email && data.password) {
    return { success: true, message: "Login successful.", user: { email: data.email } };
  }

  return { success: false, message: "Invalid credentials.", user: null };
}
