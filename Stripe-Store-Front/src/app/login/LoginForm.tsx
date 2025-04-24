"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Here you would typically send the data to your backend for authentication
    console.log("Login with:", email, password)
    // Redirect to home page after successful login
    router.push("/home")
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
        required
      />
      <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600">
        Login
      </button>
    </form>
  )
}

