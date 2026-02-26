import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {
  showCommunityNav?: boolean;
}

export default function Header({ showCommunityNav = false }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
      window.location.reload();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = showCommunityNav
    ? [{ label: 'Community Home', id: 'community' }]
    : [
        { label: 'Home', id: 'hero' },
        { label: 'About', id: 'biography' },
        { label: 'Publications', id: 'publications' },
        { label: 'Training Videos', id: 'training-videos' },
        { label: 'Membership', id: 'membership' },
        { label: 'Book Session', id: 'booking' },
        { label: 'Store', id: 'store' },
        { label: 'Media', id: 'media' },
        { label: 'Contact', id: 'contact' },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/95 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => window.location.reload()}
            className="inline-block px-4 py-2 bg-card border-2 border-border rounded-lg backdrop-blur-sm hover:border-primary/50 hover:shadow-md transition-all duration-300"
          >
            <span className="text-xl font-serif font-bold text-orange-500 animate-orange-radiance hover:scale-105 transition-transform duration-300 inline-block">
              Second‑2‑None Studios (c)sm.
            </span>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              data-testid="auth-button"
              aria-label={isAuthenticated ? 'Log out from Internet Identity' : 'Log in with Internet Identity'}
            >
              {disabled ? 'Loading...' : isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-6 space-y-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left text-sm font-medium text-foreground/80 hover:text-primary transition-colors py-2"
              >
                {link.label}
              </button>
            ))}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
              className="w-full"
              data-testid="auth-button"
              aria-label={isAuthenticated ? 'Log out from Internet Identity' : 'Log in with Internet Identity'}
            >
              {disabled ? 'Loading...' : isAuthenticated ? 'Log Out' : 'Log In'}
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
