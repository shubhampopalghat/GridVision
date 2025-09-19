# 🔋 MicroGrid Energy Management System

A modern, intelligent energy management dashboard for microgrid systems built with Next.js, TypeScript, and advanced AI/ML capabilities.

![MicroGrid Dashboard](https://img.shields.io/badge/Next.js-14.2.16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1.9-38B2AC?style=for-the-badge&logo=tailwind-css)

## 🌟 Features

### 🏠 **Core Dashboard**
- **Real-time Monitoring**: Live sensor data visualization for voltage, current, power, energy, and power factor
- **Interactive Charts**: Dynamic line charts, bar charts, and area charts using Recharts
- **Responsive Design**: Mobile-first design that works seamlessly across all devices
- **Dark/Light Theme**: Built-in theme switching with next-themes

### ⚡ **Energy Management Modules**
- **🔋 Generation**: Solar panels, wind turbines, and renewable energy source monitoring
- **🔋 Storage**: Battery management system with charge/discharge optimization
- **📊 Consumption**: Energy usage tracking and pattern analysis
- **🌐 Distribution**: Smart grid load balancing and distribution management

### 🤖 **AI/ML Testing Lab** (`/testai`)
- **Neural Network Training**: Real-time training visualization with loss and accuracy curves
- **Predictive Analytics**: Energy prediction vs actual comparison with confidence intervals
- **Clustering Analysis**: Data clustering visualization with efficiency categorization
- **Experimental Features**: Neural Architecture Search, Federated Learning, Reinforcement Learning
- **Interactive Controls**: Real-time parameter adjustment (learning rate, epochs, batch size)
- **Custom Model Testing**: Upload and test custom AI/ML models

### 🎛️ **Application Management** (`/applications`)
- **Centralized Control**: Enable/disable individual microgrid applications
- **Dependency Management**: Smart dependency tracking between applications
- **System Status**: Real-time health monitoring and performance metrics
- **Quick Actions**: Bulk enable/disable operations
- **Visual Indicators**: Status badges and criticality levels

### 🔐 **User Management**
- **Authentication**: Secure login/logout system
- **Profile Management**: User profile and account settings
- **Role-based Access**: Different access levels for different user types

## 🛠️ **Technology Stack**

### **Frontend**
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript 5.0
- **Styling**: Tailwind CSS 4.1.9
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Charts**: Recharts
- **Animations**: Tailwind CSS Animate

### **Key Libraries**
- **Form Handling**: React Hook Form + Zod validation
- **State Management**: React hooks and local storage
- **Theme**: next-themes for dark/light mode
- **Date Handling**: date-fns
- **Utilities**: clsx, tailwind-merge, class-variance-authority

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm, yarn, or pnpm

### **Installation**

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd microgrid
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Available Scripts**

```bash
# Development
npm run dev              # Start development server
npm run dev:lan          # Start dev server accessible on LAN
npm run dev:lan:https    # Start dev server with HTTPS on LAN

# Production
npm run build            # Build for production
npm run start            # Start production server
npm run start:lan        # Start production server on LAN
npm run start:lan:https  # Start production server with HTTPS on LAN

# Code Quality
npm run lint             # Run ESLint
```

## 📁 **Project Structure**

```
microgrid/
├── app/                          # Next.js App Router
│   ├── dashboard/               # Main dashboard page
│   ├── applications/            # Application management
│   ├── testai/                  # AI/ML testing lab
│   ├── consumption/             # Energy consumption module
│   ├── distribution/            # Grid distribution module
│   ├── storage/                 # Energy storage module
│   ├── auth/                    # Authentication pages
│   ├── profile/                 # User profile
│   ├── settings/                # Application settings
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── components/                   # Reusable components
│   ├── ui/                      # UI component library
│   ├── dashboard-header.tsx     # Main navigation header
│   ├── dashboard-footer.tsx     # Bottom navigation
│   ├── sensor-data-card.tsx     # Sensor display cards
│   ├── ml-advice-card.tsx       # AI recommendations
│   └── weather-prediction-card.tsx
├── hooks/                       # Custom React hooks
├── lib/                         # Utility functions
├── public/                      # Static assets
└── styles/                      # Additional stylesheets
```

## 🎯 **Key Pages & Routes**

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/dashboard` | Main energy dashboard |
| `/applications` | Application management center |
| `/testai` | AI/ML testing laboratory |
| `/storage` | Battery and storage management |
| `/consumption` | Energy usage analytics |
| `/distribution` | Grid distribution control |
| `/auth/*` | Authentication pages |
| `/profile` | User profile management |
| `/settings` | Application settings |

## 🔧 **Configuration**

### **Environment Variables**
Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url
DATABASE_URL=your_database_url
```

### **Tailwind Configuration**
The project uses Tailwind CSS 4.1.9 with custom configuration in `tailwind.config.js`

### **TypeScript Configuration**
TypeScript is configured in `tsconfig.json` with strict mode enabled

## 🎨 **UI Components**

The project uses a comprehensive UI component library built on Radix UI:

- **Layout**: Cards, Containers, Separators
- **Navigation**: Tabs, Dropdown Menus, Navigation Menus
- **Forms**: Inputs, Selects, Checkboxes, Switches, Sliders
- **Feedback**: Alerts, Badges, Progress Bars, Tooltips
- **Data Display**: Tables, Charts, Avatars
- **Overlays**: Dialogs, Popovers, Hover Cards

## 📊 **Data Visualization**

### **Chart Types**
- **Line Charts**: Real-time sensor data, predictions
- **Bar Charts**: Energy generation, consumption patterns
- **Area Charts**: Confidence intervals, filled data
- **Scatter Plots**: Feature space visualization
- **Pie Charts**: Distribution analysis, clustering

### **Interactive Features**
- Real-time data updates
- Responsive design
- Hover tooltips
- Zoom and pan capabilities
- Custom styling and theming

## 🤖 **AI/ML Features**

### **Implemented Algorithms**
- **Predictive Analytics**: Energy forecasting
- **Anomaly Detection**: System health monitoring
- **Clustering**: Efficiency categorization
- **Neural Networks**: Deep learning models
- **Optimization**: Load balancing algorithms

### **Experimental Features**
- Neural Architecture Search (NAS)
- Federated Learning
- Reinforcement Learning
- Quantum Machine Learning (Coming Soon)

## 🔒 **Security**

- **Authentication**: Secure login system
- **Authorization**: Role-based access control
- **Data Protection**: Encrypted data transmission
- **Input Validation**: Zod schema validation
- **XSS Protection**: Built-in Next.js security

## 📱 **Responsive Design**

The application is fully responsive and optimized for:
- **Desktop**: Full-featured dashboard experience
- **Tablet**: Touch-optimized interface
- **Mobile**: Compact, gesture-friendly design
- **PWA Ready**: Progressive Web App capabilities

## 🚀 **Deployment**

### **Vercel (Recommended)**
```bash
npm run build
# Deploy to Vercel
```

### **Docker**
```dockerfile
# Dockerfile example
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### **Static Export**
```bash
npm run build
npm run export
```

## 🤝 **Contributing**

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Next.js Team** for the amazing framework
- **Radix UI** for accessible component primitives
- **Tailwind CSS** for utility-first styling
- **Recharts** for beautiful data visualization
- **Lucide** for consistent iconography

## 📞 **Support**

For support, email support@microgrid.com or join our Slack channel.

## 🗺️ **Roadmap**

- [ ] Real-time WebSocket integration
- [ ] Advanced AI/ML model deployment
- [ ] Mobile app development
- [ ] IoT device integration
- [ ] Advanced analytics dashboard
- [ ] Multi-tenant support
- [ ] API documentation
- [ ] Performance optimization

---

**Built with ❤️ for sustainable energy management**
