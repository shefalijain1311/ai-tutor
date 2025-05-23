
import { Agent, AgentResponse } from '@/types/agents';
import { GeminiService } from '@/services/gemini';
import { PhysicsConstantsTool } from '@/tools/physicsConstants';

export class PhysicsAgent implements Agent {
  id = 'physics';
  name = 'Physics Specialist';
  specialization = 'Classical Mechanics, Thermodynamics, Electromagnetism, Modern Physics';

  private gemini: GeminiService;
  private constantsTool: PhysicsConstantsTool;

  constructor(geminiApiKey: string) {
    this.gemini = new GeminiService(geminiApiKey);
    this.constantsTool = new PhysicsConstantsTool();
  }

  async processQuery(query: string): Promise<AgentResponse> {
    try {
      const toolsUsed: string[] = [];
      let enhancedQuery = query;

      // Check if the query mentions physics constants
      const constantKeywords = ['constant', 'speed of light', 'gravity', 'gravitational', 'planck', 'charge', 'mass', 'electron', 'proton'];
      const needsConstants = constantKeywords.some(keyword => 
        query.toLowerCase().includes(keyword)
      );

      if (needsConstants) {
        toolsUsed.push('physics_constants');
        
        try {
          const constants = await this.constantsTool.execute({ query });
          if (constants.length > 0) {
            const constantsInfo = constants.map(c => 
              `${c.name} (${c.symbol}): ${c.value} ${c.unit} - ${c.description}`
            ).join('\n');
            
            enhancedQuery = `${query}\n\nRelevant physics constants:\n${constantsInfo}`;
          }
        } catch (error) {
          console.error('Physics constants lookup error:', error);
        }
      }

      const context = `
        You are a specialized Physics Agent in a tutoring system. Your expertise includes:
        - Classical mechanics (Newton's laws, kinematics, dynamics)
        - Thermodynamics and statistical mechanics
        - Electromagnetism and electromagnetic waves
        - Modern physics (quantum mechanics, relativity)
        - Optics and wave physics

        Provide clear explanations with physical reasoning. When relevant constants are provided, use them in your calculations and explanations.
        Always explain the underlying physics principles and help students understand the concepts.
      `;

      const response = await this.gemini.generateResponse(enhancedQuery, context);

      return {
        agentId: this.id,
        agentName: this.name,
        response,
        toolsUsed: toolsUsed.length > 0 ? toolsUsed : undefined,
        confidence: 0.9
      };
    } catch (error) {
      console.error('Physics Agent error:', error);
      return {
        agentId: this.id,
        agentName: this.name,
        response: 'I apologize, but I encountered an error while processing your physics question. Please try rephrasing your question.',
        confidence: 0.1
      };
    }
  }
}
