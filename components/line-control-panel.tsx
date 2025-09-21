"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Network, Power, AlertTriangle, CheckCircle, Plus, Edit, Trash2 } from "lucide-react"

interface LineControl {
  lineId: string
  lineName: string
  isActive: boolean
  currentPower: number
  maxPower: number
  voltage: number
  current: number
  status: "online" | "offline" | "maintenance" | "fault"
  lastUpdate: string
}

interface LineControlPanelProps {
  lines: LineControl[]
  onToggleLine?: (lineId: string, active: boolean) => void
  onPowerAdjust?: (lineId: string, power: number) => void
  onAddLine?: (lineName: string) => void
  onEditLine?: (lineId: string, newName: string) => void
  onRemoveLine?: (lineId: string) => void
}

export function LineControlPanel({ lines, onToggleLine, onPowerAdjust, onAddLine, onEditLine, onRemoveLine }: LineControlPanelProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newLineName, setNewLineName] = useState("")
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingLineId, setEditingLineId] = useState<string | null>(null)
  const [editLineName, setEditLineName] = useState("")

  const handleAddLine = () => {
    if (newLineName.trim()) {
      onAddLine?.(newLineName.trim())
      setNewLineName("")
      setIsAddDialogOpen(false)
    }
  }

  const handleEditLine = (lineId: string, currentName: string) => {
    setEditingLineId(lineId)
    // Use the current name as is (no ID prefix to remove)
    setEditLineName(currentName)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (editingLineId && editLineName.trim()) {
      onEditLine?.(editingLineId, editLineName.trim())
      setEditLineName("")
      setEditingLineId(null)
      setIsEditDialogOpen(false)
    }
  }

  const handleRemoveLine = (lineId: string) => {
    onRemoveLine?.(lineId)
  }
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "fault":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      case "maintenance":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <Power className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200"
      case "fault":
        return "bg-red-100 text-red-800 border-red-200"
      case "maintenance":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Line Control Panel
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Line</DialogTitle>
                <DialogDescription>
                  Enter a name for the new line. A unique ID will be generated automatically.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="lineName" className="text-right text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="lineName"
                    value={newLineName}
                    onChange={(e) => setNewLineName(e.target.value)}
                    placeholder="e.g., Office Building"
                    className="col-span-3"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleAddLine()
                      }
                    }}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLine} disabled={!newLineName.trim()}>
                  Add Line
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {lines.map((line, index) => (
          <div key={line.lineId} className="border border-border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(line.status)}
                <span className="font-semibold">{line.lineName}</span>
                <Badge variant="outline" className={getStatusColor(line.status)}>
                  {line.status}
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="text-xs font-mono bg-muted/50">
                  {line.lineId}
                </Badge>
                {index > 0 && (
                  <div className="flex items-center gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      onClick={() => handleEditLine(line.lineId, line.lineName)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Remove Line</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove "{line.lineName}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleRemoveLine(line.lineId)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
                <span className="text-sm text-muted-foreground">Active</span>
                <Switch
                  checked={line.isActive}
                  onCheckedChange={(checked) => onToggleLine?.(line.lineId, checked)}
                  disabled={line.status === "fault" || line.status === "maintenance"}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Voltage:</span>
                <div className="font-medium">{line.voltage}V</div>
              </div>
              <div>
                <span className="text-muted-foreground">Current:</span>
                <div className="font-medium">{line.current}A</div>
              </div>
              <div>
                <span className="text-muted-foreground">Power:</span>
                <div className="font-medium">
                  {line.currentPower}/{line.maxPower} kW
                </div>
              </div>
            </div>

            {line.isActive && line.status === "online" && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Power Allocation</span>
                  <span className="font-medium">{line.currentPower} kW</span>
                </div>
                <Slider
                  value={[line.currentPower]}
                  onValueChange={(value) => onPowerAdjust?.(line.lineId, value[0])}
                  max={line.maxPower}
                  step={5}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0 kW</span>
                  <span>{line.maxPower} kW</span>
                </div>
              </div>
            )}

            <div className="text-xs text-muted-foreground">Last updated: {line.lastUpdate}</div>
          </div>
        ))}
      </CardContent>

      {/* Edit Line Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Line</DialogTitle>
            <DialogDescription>
              Update the name for this line.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="editLineName" className="text-right text-sm font-medium">
                Name
              </label>
              <Input
                id="editLineName"
                value={editLineName}
                onChange={(e) => setEditLineName(e.target.value)}
                placeholder="e.g., Office Building"
                className="col-span-3"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSaveEdit()
                  }
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={!editLineName.trim()}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}
