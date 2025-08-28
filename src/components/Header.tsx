import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-header backdrop-blur supports-[backdrop-filter]:bg-header/95 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold">
              <span className="text-accent">ImmoSteuer</span><span className="text-primary">365</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="text-foreground hover:text-primary"
            >
              <Globe className="h-4 w-4 mr-2" />
              {language === 'en' ? 'DE' : 'EN'}
            </Button>
            <Button 
              variant="ghost" 
              className="text-foreground hover:text-primary"
              onClick={() => navigate('/login')}
            >
              {t('header.login')}
            </Button>
            <Button 
              className="bg-gradient-primary hover:shadow-glow"
              onClick={() => navigate('/signup')}
            >
              {t('header.signup')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              >
                <Globe className="h-4 w-4 mr-2" />
                {language === 'en' ? 'Deutsch' : 'English'}
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => navigate('/login')}
              >
                {t('header.login')}
              </Button>
              <Button 
                className="w-full bg-gradient-primary hover:shadow-glow"
                onClick={() => navigate('/signup')}
              >
                {t('header.signup')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;