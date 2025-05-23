
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChatMessage, AgentResponse } from '@/types/agents';
import { BookOpen, Calculator } from 'lucide-react';

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<AgentResponse>;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ onSendMessage }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Add welcome message
    const welcomeMessage: ChatMessage = {
      id: '0',
      content: 'Hello! I\'m your AI Tutor. I can help you with math and physics questions. I have specialist agents for each subject who can provide detailed explanations and use tools when needed. What would you like to learn today?',
      sender: 'tutor',
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
  }, []);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await onSendMessage(inputValue);
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.response,
        sender: response.agentId as 'tutor' | 'math' | 'physics',
        timestamp: new Date(),
        agentResponse: response,
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an error. Please try again.',
        sender: 'tutor',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentIcon = (sender: string) => {
    switch (sender) {
      case 'math':
        return <Calculator className="w-4 h-4" />;
      case 'physics':
      case 'tutor':
        return <BookOpen className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getAgentColor = (sender: string) => {
    switch (sender) {
      case 'math':
        return 'bg-blue-500';
      case 'physics':
        return 'bg-green-500';
      case 'tutor':
        return 'bg-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="w-full h-screen flex flex-col p-4">
      <Card className="w-full max-w-4xl mx-auto flex-1 flex flex-col min-h-0">
        <CardHeader className="flex-shrink-0">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            AI Tutoring System
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col gap-4 min-h-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.sender !== 'user' && (
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${getAgentColor(message.sender)}`}>
                          {getAgentIcon(message.sender)}
                        </div>
                        <span className="text-sm font-medium">
                          {message.agentResponse?.agentName || 'AI Tutor'}
                        </span>
                        {message.agentResponse?.toolsUsed && (
                          <div className="flex gap-1 flex-wrap">
                            {message.agentResponse.toolsUsed.map((tool) => (
                              <Badge key={tool} variant="secondary" className="text-xs">
                                {tool}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="whitespace-pre-wrap break-words">{message.content}</div>
                    <div className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-current border-t-transparent rounded-full"></div>
                      <span>Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 flex-shrink-0">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything about math or physics..."
              disabled={isLoading}
              className="flex-1"
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || !inputValue.trim()}
              className="flex-shrink-0"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
