
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

export const LoginModal = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(email, password);
      setIsOpen(false);
      toast.success('Logged in successfully!');
      
      // If user is admin, redirect to admin page
      if (email === 'admin@example.com') {
        navigate('/admin');
      }
    } catch (error) {
      toast.error('Failed to login. Please check your credentials.');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {user ? 'Switch Account' : 'Login'}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleLogin}>
          <DialogHeader>
            <DialogTitle>Login</DialogTitle>
            <DialogDescription>
              Enter your credentials to access your account.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                autoComplete="email"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="col-span-3"
                autoComplete="current-password"
              />
            </div>
          </div>
          <DialogFooter>
            <div className="mt-4 text-sm text-muted-foreground">
              <p>Demo Accounts:</p>
              <p><strong>Admin:</strong> admin@example.com</p>
              <p><strong>User:</strong> user@example.com</p>
              <p>Any password will work</p>
            </div>
            <Button type="submit">Login</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
