
import { Tool } from '@/types/agents';

export class CalculatorTool implements Tool {
  name = 'calculator';
  description = 'Performs basic arithmetic operations: addition, subtraction, multiplication, division';

  async execute(params: { expression: string }): Promise<{ result: number; expression: string }> {
    try {
      // Simple expression parser for basic arithmetic
      const expression = params.expression.replace(/[^0-9+\-*/().]/g, '');
      
      // Basic validation to prevent code injection
      if (!/^[0-9+\-*/().\s]+$/.test(expression)) {
        throw new Error('Invalid expression');
      }

      // Use Function constructor for safe evaluation (better than eval)
      const result = Function(`"use strict"; return (${expression})`)();
      
      if (typeof result !== 'number' || !isFinite(result)) {
        throw new Error('Invalid calculation result');
      }

      return {
        result,
        expression: params.expression
      };
    } catch (error) {
      throw new Error(`Calculator error: ${error.message}`);
    }
  }

  // Helper method to extract mathematical expressions from text
  extractExpressions(text: string): string[] {
    const mathPatterns = [
      /(\d+(?:\.\d+)?)\s*[\+\-\*\/]\s*(\d+(?:\.\d+)?)/g,
      /calculate\s+([0-9+\-*/().\s]+)/gi,
      /what\s+is\s+([0-9+\-*/().\s]+)/gi
    ];

    const expressions: string[] = [];
    mathPatterns.forEach(pattern => {
      const matches = text.matchAll(pattern);
      for (const match of matches) {
        expressions.push(match[1] || match[0]);
      }
    });

    return expressions;
  }
}
