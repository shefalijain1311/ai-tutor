
import React, { useState, useEffect } from 'react';
import { ChatInterface } from '@/components/ChatInterface';
import { ApiKeyInput } from '@/components/ApiKeyInput';
import { TutorAgent } from '@/agents/tutorAgent';
import { AgentResponse } from '@/types/agents';

const Index = () => {
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [tutorAgent, setTutorAgent] = useState<TutorAgent | null>(null);

  useEffect(() => {
    // Check if API key is stored in localStorage
    const storedApiKey = localStorage.getItem('gemini_api_key');
    if (storedApiKey) {
      setApiKey(storedApiKey);
      setTutorAgent(new TutorAgent(storedApiKey));
    }
  }, []);

  const handleApiKeySubmit = (key: string) => {
    localStorage.setItem('gemini_api_key', key);
    setApiKey(key);
    setTutorAgent(new TutorAgent(key));
  };

  const handleSendMessage = async (message: string): Promise<AgentResponse> => {
    if (!tutorAgent) {
      throw new Error('Tutor agent not initialized');
    }
    
    return await tutorAgent.processQuery(message);
  };

  if (!apiKey || !tutorAgent) {
    return <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="container mx-auto py-8">
        <ChatInterface onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Index;
