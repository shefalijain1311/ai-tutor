
import { Agent, AgentResponse } from '@/types/agents';
import { GeminiService } from '@/services/gemini';
import { CalculatorTool } from '@/tools/calculator';

export class MathAgent implements Agent {
  id = 'math';
  name = 'Math Specialist';
  specialization = 'Mathematics, Algebra, Calculus, Geometry, Statistics';

  private gemini: GeminiService;
  private calculator: CalculatorTool;

  constructor(geminiApiKey: string) {
    this.gemini = new GeminiService(geminiApiKey);
    this.calculator = new CalculatorTool();
  }

  async processQuery(query: string): Promise<AgentResponse> {
    try {
      const toolsUsed: string[] = [];
      let enhancedQuery = query;

      // Check if the query contains mathematical expressions that need calculation
      const expressions = this.calculator.extractExpressions(query);
      
      if (expressions.length > 0) {
        toolsUsed.push('calculator');
        
        // Calculate each expression and add results to context
        const calculations: string[] = [];
        for (const expr of expressions) {
          try {
            const result = await this.calculator.execute({ expression: expr });
            calculations.push(`${expr} = ${result.result}`);
          } catch (error) {
            calculations.push(`${expr} = [calculation error]`);
          }
        }
        
        enhancedQuery = `${query}\n\nCalculation results: ${calculations.join(', ')}`;
      }

      const context = `
        You are a specialized Math Agent in a tutoring system. Your expertise includes:
        - Algebra and equation solving
        - Calculus (differential and integral)
        - Geometry and trigonometry
        - Statistics and probability
        - Mathematical problem-solving strategies

        Provide clear, step-by-step explanations. If calculations were performed, acknowledge them in your response.
        Always explain the mathematical concepts and reasoning behind solutions.
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
      console.error('Math Agent error:', error);
      return {
        agentId: this.id,
        agentName: this.name,
        response: 'I apologize, but I encountered an error while processing your math question. Please try rephrasing your question.',
        confidence: 0.1
      };
    }
  }
}
