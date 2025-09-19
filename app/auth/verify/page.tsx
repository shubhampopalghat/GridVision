"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Zap, CheckCircle } from "lucide-react"

export default function VerifyPage() {
  const [otp, setOtp] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement OTP verification logic
    setShowSuccess(true)
    setTimeout(() => {
      router.push("/auth/login")
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="bg-primary rounded-full p-3">
                  <CheckCircle className="h-8 w-8 text-primary-foreground" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-balance">Account Verified!</h2>
              <p className="text-muted-foreground text-pretty">
                Your account has been successfully verified. Redirecting to login...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-primary rounded-full p-3">
              <Zap className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-balance">Verify Your Account</CardTitle>
          <CardDescription className="text-pretty">Enter the verification code sent to your email</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleVerify} className="space-y-4">
            <div>
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                maxLength={6}
                required
              />
            </div>

            <Button type="submit" className="w-full">
              Verify Account
            </Button>

            <Alert>
              <AlertDescription>Didn't receive the code? Check your spam folder or contact support.</AlertDescription>
            </Alert>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
