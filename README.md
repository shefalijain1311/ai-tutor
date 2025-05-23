
# Multi-Agent AI Tutoring System

A sophisticated educational AI system built with Next.js that features specialized agents for mathematics and physics tutoring, powered by Google's Gemini AI.

## 🎯 Project Overview

This multi-agent AI tutoring system implements Google's Agent Development Kit (ADK) principles with a modular, tool-using agent design. The system features:

- **Main Tutor Agent**: Routes student queries to appropriate specialist agents
- **Math Agent**: Specialized for mathematics with calculator tool integration
- **Physics Agent**: Specialized for physics with physics constants lookup tool
- **Gemini AI Integration**: All agents use Google's Gemini API for natural language understanding

## 🏗️ Architecture

### Agent Hierarchy
```
TutorAgent (Main Router)
├── MathAgent (Calculator Tool)
├── PhysicsAgent (Physics Constants Tool)
└── Direct Response (General queries)
```

### Core Components
- **Agent Interface**: Standardized agent contract
- **Tool System**: Modular tools for specialized functionality
- **Gemini Service**: Centralized API integration
- **Chat Interface**: Real-time conversation UI

## 🚀 Features

- **Intelligent Query Routing**: Automatically classifies and routes queries to appropriate specialists
- **Tool Integration**: 
  - Calculator for mathematical computations
  - Physics constants lookup for scientific queries
- **Real-time Chat Interface**: Modern, responsive chat UI
- **Agent Identification**: Clear visual indicators of which agent is responding
- **Tool Usage Tracking**: Visual badges showing which tools were used

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **UI Components**: shadcn/ui with Tailwind CSS
- **AI Integration**: Google Gemini API
- **State Management**: React hooks
- **Styling**: Tailwind CSS with custom gradients

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Google Gemini API key

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd multi-agent-ai-tutoring-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

5. **Enter API Key**
   - Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Enter it in the application interface
   - The key is stored locally in your browser

## 🔧 Configuration

### Environment Variables
The application uses client-side API key input for simplicity. For production deployment, consider using environment variables:

```bash
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

## 📁 Project Structure

```
src/
├── agents/           # Agent implementations
│   ├── tutorAgent.ts
│   ├── mathAgent.ts
│   └── physicsAgent.ts
├── components/       # React components
│   ├── ChatInterface.tsx
│   └── ApiKeyInput.tsx
├── services/         # External service integrations
│   └── gemini.ts
├── tools/           # Agent tools
│   ├── calculator.ts
│   └── physicsConstants.ts
├── types/           # TypeScript type definitions
│   └── agents.ts
└── pages/           # Next.js pages
    └── Index.tsx
```

## 🤖 Agent Details

### Tutor Agent
- **Role**: Main orchestrator and query router
- **Capabilities**: Query classification, agent delegation, general assistance
- **Tools**: None (uses other agents' tools indirectly)

### Math Agent
- **Specialization**: Algebra, Calculus, Geometry, Statistics
- **Tools**: Calculator for arithmetic operations
- **Features**: Automatic expression detection and calculation

### Physics Agent
- **Specialization**: Classical Mechanics, Thermodynamics, Electromagnetism, Modern Physics
- **Tools**: Physics constants lookup
- **Features**: Contextual constant integration in responses

## 🔨 Tool System

### Calculator Tool
- Performs basic arithmetic operations
- Expression parsing and validation
- Safe evaluation without code injection risks

### Physics Constants Tool
- Comprehensive database of fundamental constants
- Searchable by name, symbol, or description
- Includes units and detailed descriptions

## 🚀 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Configure Environment Variables**
   - Add `NEXT_PUBLIC_GEMINI_API_KEY` in Vercel dashboard
   - Or use the client-side input method

### Railway Deployment

1. **Connect Repository**
   - Link your GitHub repository to Railway
   - Deploy automatically on push

2. **Configure Variables**
   - Set environment variables in Railway dashboard

## 🧪 Usage Examples

### Math Queries
```
"What is 15 * 23 + 45?"
"Solve the quadratic equation x² - 5x + 6 = 0"
"Explain the derivative of sin(x)"
```

### Physics Queries
```
"What is the speed of light?"
"Explain Newton's second law"
"Calculate the gravitational force between Earth and Moon"
```

### General Queries
```
"How does the tutoring system work?"
"What subjects can you help with?"
"Explain the difference between math and physics"
```

## 🔍 Key Implementation Details

### Query Classification
The system uses Gemini AI to classify incoming queries into categories (math, physics, general) for appropriate routing.

### Tool Integration
Agents can invoke tools and integrate results into their Gemini-generated responses, providing accurate calculations and data.

### Error Handling
Comprehensive error handling ensures graceful degradation when tools fail or API calls timeout.

## 🎯 Future Enhancements

- Additional specialist agents (Chemistry, Biology)
- More sophisticated tools (Graphing, Simulations)
- User authentication and session persistence
- Advanced analytics and learning progress tracking
- Multi-language support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙋‍♀️ Support

For questions or support:
- Create an issue in the GitHub repository
- Check the documentation
- Review the code comments for implementation details

---