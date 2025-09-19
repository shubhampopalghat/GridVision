"use client"

import { useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Edit, Trash2, User } from "lucide-react"

interface SystemUser {
  id: string
  name: string
  email: string
  userType: "admin" | "operator"
  status: "active" | "inactive"
  lastLogin: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<SystemUser[]>([
    {
      id: "U001",
      name: "John Doe",
      email: "john.doe@microgrid.com",
      userType: "admin",
      status: "active",
      lastLogin: "2 hours ago",
    },
    {
      id: "U002",
      name: "Jane Smith",
      email: "jane.smith@microgrid.com",
      userType: "operator",
      status: "active",
      lastLogin: "1 day ago",
    },
    {
      id: "U003",
      name: "Mike Johnson",
      email: "mike.johnson@microgrid.com",
      userType: "operator",
      status: "inactive",
      lastLogin: "1 week ago",
    },
  ])

  const [newUser, setNewUser] = useState({
    email: "",
    userType: "operator" as const,
  })

  const [editingUser, setEditingUser] = useState<string | null>(null)

  const handleAddUser = () => {
    if (newUser.email) {
      const user: SystemUser = {
        id: `U${String(users.length + 1).padStart(3, "0")}`,
        name: newUser.email.split("@")[0],
        email: newUser.email,
        userType: newUser.userType,
        status: "active",
        lastLogin: "Never",
      }
      setUsers((prev) => [...prev, user])
      setNewUser({ email: "", userType: "operator" })
    }
  }

  const handleUpdateUserType = (userId: string, newType: "admin" | "operator") => {
    setUsers((prev) => prev.map((user) => (user.id === userId ? { ...user, userType: newType } : user)))
    setEditingUser(null)
  }

  const handleRemoveUser = (userId: string) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId))
  }

  const getUserTypeColor = (userType: string) => {
    return userType === "admin"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : "bg-blue-100 text-blue-800 border-blue-200"
  }

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-gray-100 text-gray-800 border-gray-200"
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <Link href="/settings">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-foreground">User Management</h1>
          </div>

          {/* Add New User */}
          <Card>
            <CardHeader>
              <CardTitle>Add New User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="userEmail">Email Address</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    placeholder="Enter email address"
                    value={newUser.email}
                    onChange={(e) => setNewUser((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="userType">User Type</Label>
                  <Select
                    value={newUser.userType}
                    onValueChange={(value: any) => setNewUser((prev) => ({ ...prev, userType: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="operator">Operator</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button onClick={handleAddUser} disabled={!newUser.email}>
                <Plus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </CardContent>
          </Card>

          {/* Existing Users */}
          <Card>
            <CardHeader>
              <CardTitle>System Users ({users.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border border-border rounded-lg"
                  >
                    <div className="flex flex-1 min-w-0 items-center gap-4 flex-wrap">
                      <User className="h-5 w-5 text-muted-foreground shrink-0" />
                      <div className="min-w-0">
                        <h3 className="font-medium truncate max-w-[220px] sm:max-w-[280px] md:max-w-[320px]">
                          {user.name}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate max-w-[220px] sm:max-w-[280px] md:max-w-[320px]">
                          {user.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        {editingUser === user.id ? (
                          <div className="flex items-center gap-2">
                            <Select
                              value={user.userType}
                              onValueChange={(value: any) => handleUpdateUserType(user.id, value)}
                            >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="operator">Operator</SelectItem>
                                <SelectItem value="admin">Admin</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button size="sm" onClick={() => setEditingUser(null)}>
                              Save
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="outline" className={getUserTypeColor(user.userType)}>
                            {user.userType}
                          </Badge>
                        )}
                        <Badge variant="outline" className={getStatusColor(user.status)}>
                          {user.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm text-muted-foreground whitespace-nowrap">Last login: {user.lastLogin}</span>
                      <Button variant="ghost" size="sm" onClick={() => setEditingUser(user.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleRemoveUser(user.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
