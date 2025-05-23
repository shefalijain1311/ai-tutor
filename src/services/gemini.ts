
// Gemini API integration service
export class GeminiService {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateResponse(prompt: string, context?: string): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: context ? `${context}\n\nUser query: ${prompt}` : prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Gemini API error details:', errorData);
        throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate response from Gemini API');
    }
  }

  async classifyQuery(query: string): Promise<'math' | 'physics' | 'general'> {
    const classificationPrompt = `
      Classify the following student query into one of these categories: math, physics, or general.
      Respond with only the category name in lowercase.
      
      Query: "${query}"
      
      Classification:
    `;

    try {
      const response = await this.generateResponse(classificationPrompt);
      const classification = response.trim().toLowerCase();
      
      if (['math', 'physics'].includes(classification)) {
        return classification as 'math' | 'physics';
      }
      return 'general';
    } catch (error) {
      console.error('Classification error:', error);
      return 'general';
    }
  }
}
