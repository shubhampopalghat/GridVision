"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts"
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Activity, 
  Target, 
  Cpu, 
  Database, 
  BarChart3,
  Lightbulb,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download
} from "lucide-react"
import { useState, useEffect, useCallback } from "react"

// Mock AI/ML data generators
const generatePredictionData = (points: number = 50) => {
  return Array.from({ length: points }, (_, i) => ({
    time: i,
    actual: Math.sin(i * 0.1) * 20 + 50 + Math.random() * 10,
    predicted: Math.sin(i * 0.1) * 18 + 52 + Math.random() * 8,
    confidence: 0.7 + Math.random() * 0.3
  }))
}

const generateNeuralNetworkData = () => {
  return Array.from({ length: 20 }, (_, i) => ({
    epoch: i + 1,
    loss: Math.exp(-i * 0.1) + Math.random() * 0.1,
    accuracy: 1 - Math.exp(-i * 0.15) + Math.random() * 0.05,
    valLoss: Math.exp(-i * 0.08) + Math.random() * 0.12,
    valAccuracy: 1 - Math.exp(-i * 0.12) + Math.random() * 0.06
  }))
}

const generateClusterData = () => {
  const clusters = [
    { name: 'High Efficiency', color: '#22c55e', count: 45 },
    { name: 'Medium Efficiency', color: '#f59e0b', count: 30 },
    { name: 'Low Efficiency', color: '#ef4444', count: 15 },
    { name: 'Anomalies', color: '#8b5cf6', count: 10 }
  ]
  return clusters
}

const generateScatterData = (points: number = 100) => {
  return Array.from({ length: points }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    z: Math.random() * 50,
    category: Math.floor(Math.random() * 4)
  }))
}

export default function TestAIPage() {
  const [isTraining, setIsTraining] = useState(false)
  const [modelAccuracy, setModelAccuracy] = useState([0.75])
  const [learningRate, setLearningRate] = useState([0.001])
  const [epochs, setEpochs] = useState([100])
  const [batchSize, setBatchSize] = useState([32])
  const [predictionData, setPredictionData] = useState(generatePredictionData())
  const [neuralData, setNeuralData] = useState(generateNeuralNetworkData())
  const [clusterData, setClusterData] = useState(generateClusterData())
  const [scatterData, setScatterData] = useState(generateScatterData())
  const [autoRefresh, setAutoRefresh] = useState(false)

  // Auto refresh data
  useEffect(() => {
    if (!autoRefresh) return
    
    const interval = setInterval(() => {
      setPredictionData(generatePredictionData())
      setNeuralData(generateNeuralNetworkData())
      setScatterData(generateScatterData())
    }, 2000)

    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleTraining = useCallback(() => {
    setIsTraining(!isTraining)
    if (!isTraining) {
      // Simulate training progress
      setTimeout(() => {
        setNeuralData(generateNeuralNetworkData())
        setIsTraining(false)
      }, 3000)
    }
  }, [isTraining])

  const resetData = useCallback(() => {
    setPredictionData(generatePredictionData())
    setNeuralData(generateNeuralNetworkData())
    setClusterData(generateClusterData())
    setScatterData(generateScatterData())
  }, [])

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />

      <main className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Brain className="h-8 w-8 text-purple-600" />
              AI/ML Testing Lab
            </h1>
            <p className="text-muted-foreground mt-1">
              Experimental environment for AI/ML algorithms and visualizations
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              EXPERIMENTAL
            </Badge>
            <Badge variant={isTraining ? "default" : "secondary"}>
              {isTraining ? "Training..." : "Ready"}
            </Badge>
          </div>
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>Model Accuracy: {modelAccuracy[0].toFixed(3)}</Label>
                <Slider
                  value={modelAccuracy}
                  onValueChange={setModelAccuracy}
                  max={1}
                  min={0}
                  step={0.001}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Learning Rate: {learningRate[0]}</Label>
                <Slider
                  value={learningRate}
                  onValueChange={setLearningRate}
                  max={0.1}
                  min={0.0001}
                  step={0.0001}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Epochs: {epochs[0]}</Label>
                <Slider
                  value={epochs}
                  onValueChange={setEpochs}
                  max={500}
                  min={10}
                  step={10}
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <Label>Batch Size: {batchSize[0]}</Label>
                <Slider
                  value={batchSize}
                  onValueChange={setBatchSize}
                  max={128}
                  min={8}
                  step={8}
                  className="w-full"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-between mt-6 pt-4 border-t">
              <div className="flex items-center gap-4">
                <Button onClick={handleTraining} disabled={isTraining}>
                  {isTraining ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                  {isTraining ? "Stop Training" : "Start Training"}
                </Button>
                <Button variant="outline" onClick={resetData}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset Data
                </Button>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Results
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <Label htmlFor="auto-refresh">Auto Refresh</Label>
                <Switch
                  id="auto-refresh"
                  checked={autoRefresh}
                  onCheckedChange={setAutoRefresh}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI/ML Visualizations */}
        <Tabs defaultValue="predictions" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="predictions">Predictions</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="clustering">Clustering</TabsTrigger>
            <TabsTrigger value="analysis">Analysis</TabsTrigger>
            <TabsTrigger value="experiments">Experiments</TabsTrigger>
          </TabsList>

          {/* Predictions Tab */}
          <TabsContent value="predictions" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Energy Prediction vs Actual
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Actual"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Predicted"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-green-600" />
                    Prediction Confidence
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={predictionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="time" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="confidence" 
                        stroke="#8b5cf6" 
                        fill="#8b5cf6"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-600" />
                    Training Loss
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={neuralData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="loss" 
                        stroke="#ef4444" 
                        strokeWidth={2}
                        name="Training Loss"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valLoss" 
                        stroke="#f97316" 
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        name="Validation Loss"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Model Accuracy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={neuralData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="epoch" />
                      <YAxis domain={[0, 1]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="accuracy" 
                        stroke="#22c55e" 
                        strokeWidth={2}
                        name="Training Accuracy"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="valAccuracy" 
                        stroke="#16a34a" 
                        strokeWidth={2}
                        strokeDasharray="3 3"
                        name="Validation Accuracy"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clustering Tab */}
          <TabsContent value="clustering" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-purple-600" />
                    Data Clusters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={clusterData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="count"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {clusterData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-blue-600" />
                    Feature Space
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ScatterChart data={scatterData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="x" />
                      <YAxis dataKey="y" />
                      <Tooltip />
                      <Scatter dataKey="z" fill="#8b5cf6" />
                    </ScatterChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analysis Tab */}
          <TabsContent value="analysis" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Model Performance</p>
                      <p className="text-2xl font-bold text-green-600">94.2%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Processing Speed</p>
                      <p className="text-2xl font-bold text-blue-600">1.2ms</p>
                    </div>
                    <Zap className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Data Points</p>
                      <p className="text-2xl font-bold text-purple-600">15.7K</p>
                    </div>
                    <Database className="h-8 w-8 text-purple-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Real-time Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                    <span className="text-sm font-medium">Energy Efficiency Optimization</span>
                    <Badge className="bg-green-600">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                    <span className="text-sm font-medium">Predictive Maintenance</span>
                    <Badge className="bg-blue-600">Running</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                    <span className="text-sm font-medium">Anomaly Detection</span>
                    <Badge className="bg-yellow-600">Monitoring</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-950/20 rounded-lg">
                    <span className="text-sm font-medium">Load Forecasting</span>
                    <Badge className="bg-purple-600">Training</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Experiments Tab */}
          <TabsContent value="experiments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-yellow-600" />
                  Experimental Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-medium">Neural Architecture Search</h4>
                    <p className="text-sm text-muted-foreground">Automated model architecture optimization</p>
                    <Button size="sm" variant="outline">Run Experiment</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-medium">Federated Learning</h4>
                    <p className="text-sm text-muted-foreground">Distributed model training across nodes</p>
                    <Button size="sm" variant="outline">Start Federation</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-medium">Reinforcement Learning</h4>
                    <p className="text-sm text-muted-foreground">Adaptive control system optimization</p>
                    <Button size="sm" variant="outline">Initialize Agent</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg space-y-2">
                    <h4 className="font-medium">Quantum ML</h4>
                    <p className="text-sm text-muted-foreground">Quantum-enhanced machine learning</p>
                    <Button size="sm" variant="outline" disabled>Coming Soon</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Custom Model Testing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="model-name">Model Name</Label>
                    <Input id="model-name" placeholder="Enter model name..." />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dataset">Dataset</Label>
                    <Input id="dataset" placeholder="Select dataset..." />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button>Upload Model</Button>
                  <Button variant="outline">Load Pretrained</Button>
                  <Button variant="outline">Create New</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
