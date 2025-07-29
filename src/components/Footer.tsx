import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const [impressumOpen, setImpressumOpen] = useState(false);
  const [datenschutzOpen, setDatenschutzOpen] = useState(false);

  return (
    <>
      {/* Fixed footer at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 bg-header/95 backdrop-blur-sm border-t border-border/20 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center space-x-4 text-sm text-foreground/80">
            <span>© 2025 ImmoSteuer365</span>
            <span>|</span>
            <Dialog open={impressumOpen} onOpenChange={setImpressumOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-foreground/80 hover:text-foreground">
                  Impressum
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
                <DialogHeader>
                  <DialogTitle className="text-card-foreground">Impressum</DialogTitle>
                </DialogHeader>
                <div className="prose prose-sm max-w-none text-card-foreground">
                  <h2>Angaben gemäß § 5 TMG</h2>
                  <p>
                    <strong>ImmoSteuer365</strong><br />
                    Musterstraße 123<br />
                    12345 Musterstadt<br />
                    Deutschland
                  </p>
                  
                  <h3>Vertreten durch:</h3>
                  <p>Max Mustermann</p>
                  
                  <h3>Kontakt:</h3>
                  <p>
                    Telefon: +49 (0) 123 456789<br />
                    E-Mail: info@immosteuer365.de
                  </p>
                  
                  <h3>Umsatzsteuer-ID:</h3>
                  <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                  DE123456789</p>
                  
                  <h3>Wirtschafts-ID:</h3>
                  <p>DE123456789</p>
                  
                  <h3>Aufsichtsbehörde:</h3>
                  <p>Musterbehörde Musterstadt</p>
                  
                  <h3>Haftungsausschluss:</h3>
                  <h4>Haftung für Inhalte</h4>
                  <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.</p>
                  
                  <h4>Haftung für Links</h4>
                  <p>Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.</p>
                  
                  <h4>Urheberrecht</h4>
                  <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.</p>
                </div>
              </DialogContent>
            </Dialog>
            <span>|</span>
            <Dialog open={datenschutzOpen} onOpenChange={setDatenschutzOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-foreground/80 hover:text-foreground">
                  Datenschutz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-card">
                <DialogHeader>
                  <DialogTitle className="text-card-foreground">Datenschutzerklärung</DialogTitle>
                </DialogHeader>
                <div className="prose prose-sm max-w-none text-card-foreground">
                  <h2>1. Datenschutz auf einen Blick</h2>
                  
                  <h3>Allgemeine Hinweise</h3>
                  <p>Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.</p>
                  
                  <h3>Datenerfassung auf dieser Website</h3>
                  <h4>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h4>
                  <p>Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
                  
                  <h4>Wie erfassen wir Ihre Daten?</h4>
                  <p>Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.</p>
                  
                  <h2>2. Hosting</h2>
                  <p>Wir hosten die Inhalte unserer Website bei folgendem Anbieter:</p>
                  
                  <h3>GitHub Pages</h3>
                  <p>Diese Website wird gehostet bei GitHub Inc., 88 Colin P Kelly Jr Street, San Francisco, CA 94107, USA. Beim Besuch dieser Website erfasst GitHub verschiedene Daten automatisch, einschließlich Ihrer IP-Adresse.</p>
                  
                  <h2>3. Allgemeine Hinweise und Pflichtinformationen</h2>
                  
                  <h3>Datenschutz</h3>
                  <p>Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.</p>
                  
                  <h3>Hinweis zur verantwortlichen Stelle</h3>
                  <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
                  <p>
                    ImmoSteuer365<br />
                    Musterstraße 123<br />
                    12345 Musterstadt<br />
                    Telefon: +49 (0) 123 456789<br />
                    E-Mail: info@immosteuer365.de
                  </p>
                  
                  <h3>Speicherdauer</h3>
                  <p>Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.</p>
                  
                  <h2>4. Datenerfassung auf dieser Website</h2>
                  
                  <h3>Server-Log-Dateien</h3>
                  <p>Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:</p>
                  <ul>
                    <li>Browsertyp und Browserversion</li>
                    <li>verwendetes Betriebssystem</li>
                    <li>Referrer URL</li>
                    <li>Hostname des zugreifenden Rechners</li>
                    <li>Uhrzeit der Serveranfrage</li>
                    <li>IP-Adresse</li>
                  </ul>
                  
                  <p>Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
      
      {/* Spacer to prevent content from being hidden behind fixed footer */}
      <div className="h-16"></div>
    </>
  );
};

export default Footer;