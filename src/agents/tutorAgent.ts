
import { Agent, AgentResponse } from '@/types/agents';
import { GeminiService } from '@/services/gemini';
import { MathAgent } from './mathAgent';
import { PhysicsAgent } from './physicsAgent';

export class TutorAgent implements Agent {
  id = 'tutor';
  name = 'AI Tutor';
  specialization = 'Query routing and general academic assistance';

  private gemini: GeminiService;
  private mathAgent: MathAgent;
  private physicsAgent: PhysicsAgent;

  constructor(geminiApiKey: string) {
    this.gemini = new GeminiService(geminiApiKey);
    this.mathAgent = new MathAgent(geminiApiKey);
    this.physicsAgent = new PhysicsAgent(geminiApiKey);
  }

  async processQuery(query: string): Promise<AgentResponse> {
    try {
      // First, classify the query to determine which specialist agent to use
      const classification = await this.gemini.classifyQuery(query);
      
      console.log(`Query classified as: ${classification}`);

      // Route to appropriate specialist agent
      switch (classification) {
        case 'math':
          return await this.mathAgent.processQuery(query);
        
        case 'physics':
          return await this.physicsAgent.processQuery(query);
        
        default:
          // Handle general queries directly
          const context = `
            You are the main Tutor Agent in an AI tutoring system. You have specialist agents for math and physics,
            but this query seems to be general in nature. Provide helpful guidance and if the student needs specific
            help with math or physics, suggest they ask a more specific question in those subjects.

            Available specialists:
            - Math Agent: Handles algebra, calculus, geometry, statistics
            - Physics Agent: Handles mechanics, thermodynamics, electromagnetism, modern physics

            Be encouraging and helpful in your response.
          `;

          const response = await this.gemini.generateResponse(query, context);

          return {
            agentId: this.id,
            agentName: this.name,
            response,
            confidence: 0.8
          };
      }
    } catch (error) {
      console.error('Tutor Agent error:', error);
      return {
        agentId: this.id,
        agentName: this.name,
        response: 'I apologize, but I encountered an error while processing your question. Please try asking again.',
        confidence: 0.1
      };
    }
  }
}
