
export interface Agent {
  id: string;
  name: string;
  specialization: string;
  processQuery: (query: string) => Promise<AgentResponse>;
}

export interface AgentResponse {
  agentId: string;
  agentName: string;
  response: string;
  toolsUsed?: string[];
  confidence?: number;
}

export interface Tool {
  name: string;
  description: string;
  execute: (params: any) => Promise<any>;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'tutor' | 'math' | 'physics';
  timestamp: Date;
  agentResponse?: AgentResponse;
}
