
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

export const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      setError('Please enter your Gemini API key');
      return;
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Please enter a valid Gemini API key (should start with "AIza")');
      return;
    }

    setError('');
    onApiKeySubmit(apiKey.trim());
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">AI Tutoring System</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="apiKey">Gemini API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key"
                className="w-full"
              />
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Alert>
              <AlertDescription>
                You need a Gemini API key to use this tutoring system. Get one from the Google AI Studio.
                Your API key is stored locally in your browser and is not sent to any third-party servers.
              </AlertDescription>
            </Alert>

            <Button type="submit" className="w-full">
              Start Tutoring Session
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
