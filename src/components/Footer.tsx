import { Button } from '@/components/ui/button';

const Footer = () => {

  return (
    <>
      {/* Fixed footer at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 bg-header/95 backdrop-blur-sm border-t border-border/20 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-4 text-sm text-foreground/80">
            <span>© 2025 ImmoSteuer365</span>
            <span>|</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-foreground/80 hover:text-foreground"
              onClick={() => window.open('/impressum.html', '_blank')}
            >
              Impressum
            </Button>
            <span>|</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-auto p-0 text-foreground/80 hover:text-foreground"
              onClick={() => window.open('/datenschutz.html', '_blank')}
            >
              Datenschutz
            </Button>
          </div>
        </div>
      </footer>
      
      {/* Spacer to prevent content from being hidden behind fixed footer */}
      <div className="h-16"></div>
    </>
  );
};

export default Footer;