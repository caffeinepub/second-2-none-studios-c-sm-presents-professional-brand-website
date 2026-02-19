import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useSetDisplayName } from '../hooks/useQueries';
import { toast } from 'sonner';

interface DisplayNameSetupScreenProps {
  onSuccess: () => void;
}

export default function DisplayNameSetupScreen({ onSuccess }: DisplayNameSetupScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const setDisplayNameMutation = useSetDisplayName();

  const handleSave = async () => {
    const trimmedName = displayName.trim();
    
    if (!trimmedName) {
      toast.error('Please enter a display name');
      return;
    }

    if (trimmedName.length > 25) {
      toast.error('Display name must be 25 characters or less');
      return;
    }

    try {
      await setDisplayNameMutation.mutateAsync(trimmedName);
      toast.success('Display name saved successfully!');
      onSuccess();
    } catch (error: any) {
      console.error('Error saving display name:', error);
      toast.error(error.message || 'Failed to save display name');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/20 to-background px-4">
      <Card className="w-full max-w-md shadow-lg border-2">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-serif">Set Your Display Name</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Only you can see this name inside your private member portal.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="displayName" className="text-sm font-medium">
              Display Name
            </Label>
            <Input
              id="displayName"
              type="text"
              placeholder="Enter your display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              maxLength={25}
              disabled={setDisplayNameMutation.isPending}
              className="w-full"
            />
            <p className="text-xs text-muted-foreground">
              {displayName.length}/25 characters
            </p>
          </div>
          <Button
            onClick={handleSave}
            disabled={setDisplayNameMutation.isPending || !displayName.trim()}
            className="w-full"
            size="lg"
          >
            {setDisplayNameMutation.isPending ? 'Saving...' : 'Save & Enter Community'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
