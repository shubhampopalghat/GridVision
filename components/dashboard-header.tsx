"use client"

import { Bell, Settings, User, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-secondary/70 dark:bg-secondary/20 border-b border-border px-4 sm:px-6 py-3 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard">
        <img className="h-auto w-28 p-0 m-0" src="/GridVisionLogo.png" alt="" />
          {/* <div className="flex items-center gap-3 cursor-pointer"> */}
         
            {/* <div className="bg-primary rounded-lg p-2"> */}
              {/* <Zap className="h-6 w-6 text-primary-foreground" /> */}
             
            {/* </div> */}
            <div>
              {/* <h1 className="text-xl font-bold text-foreground">MicroGrid</h1>
              <p className="text-sm text-muted-foreground">Energy Management</p> */}
            {/* </div> */}
          </div>
        </Link>

        {/* Right side actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Alerts */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              3
            </Badge>
          </Button>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href="/profile">
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href="/settings">
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href="/testai">
                <DropdownMenuItem className="text-purple-600 dark:text-purple-400">
                  <Brain className="h-4 w-4 mr-2" />
                  AI/ML Testing Lab
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <Link href="/settings">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
