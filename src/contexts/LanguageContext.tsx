import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Header
    'header.login': 'Login',
    'header.signup': 'Sign Up',
    
    // Footer
    'footer.copyright': '© 2025 ImmoSteuer365',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Privacy Policy',
    
    // Main Form
    'form.title': '10-Year German Real Estate Tax Optimization Model',
    'form.subtitle': 'Get personalized recommendations for maximizing your real estate portfolio returns',
    'form.asset.title': 'A. Asset Portfolio Status',
    'form.asset.private': 'Privately Held Properties',
    'form.asset.company': 'Company-Held Properties',
    'form.asset.addNew': '+ Add New Property',
    'form.asset.propertyType': 'Property Type',
    'form.asset.city': 'City',
    'form.asset.postalCode': 'Postal Code',
    'form.asset.purchasePrice': 'Purchase Price (€)',
    'form.asset.currentValue': 'Current Market Value (€)',
    'form.asset.annualRent': 'Annual Rent Income (€)',
    'form.asset.purchaseDate': 'Purchase Date',
    'form.asset.loanBalance': 'Remaining Loan Balance (€)',
    'form.asset.interestRate': 'Interest Rate (%)',
    'form.asset.monthlyPayment': 'Monthly Payment (€)',
    'form.asset.edit': 'Edit',
    'form.asset.delete': 'Delete',
    'form.asset.save': 'Save Property',
    'form.asset.cancel': 'Cancel',
    
    'form.financial.title': 'B. Financial Status',
    'form.financial.income': 'Annual Income (€)',
    'form.financial.cash': 'Available Cash (€)',
    'form.financial.debt': 'Other Debts (€)',
    'form.financial.taxRate': 'Personal Tax Rate (%)',
    
    'form.goals.title': 'C. Strategic Goals',
    'form.goals.primary': 'Primary Goal',
    'form.goals.timeline': 'Investment Timeline',
    'form.goals.risk': 'Risk Tolerance',
    
    'form.economy.title': 'D. Economic Environment',
    'form.economy.inflation': 'Expected Inflation Rate (%)',
    'form.economy.appreciation': 'Expected Property Appreciation (%)',
    'form.economy.interest': 'Expected Interest Rate (%)',
    
    'form.submit': 'Generate 10-Year Optimization Report',
    'form.loading': 'Analyzing your portfolio and generating recommendations...',
    
    // Results Page
    'results.title': '10-Year German Real Estate Tax Optimization Report',
    'results.strategy.title': 'A. Core Strategy Recommendation',
    'results.strategy.structural': 'Structural Recommendations',
    'results.strategy.timeline': '10-Year Action Timeline',
    'results.forecast.title': 'B. Financial Forecast & Comparison',
    'results.forecast.kpis': 'Key Performance Indicators',
    'results.forecast.taxSavings': '10-Year Cumulative Tax Savings',
    'results.forecast.netWorth': 'Projected Net Worth at Year 10',
    'results.forecast.roa': '10-Year Average Return on Assets (RoA)',
    'results.forecast.roe': '10-Year Average Return on Equity (RoE)',
    'results.forecast.comparedTo': 'compared to non-optimized strategy',
    'results.forecast.chart1': 'Projected After-Tax Cash Flow per Year',
    'results.forecast.chart2': 'Projected Tax Burden per Year',
    'results.forecast.chart3': 'Projected Net Worth Growth Curve',
    'results.forecast.chart4': 'Projected Total Liabilities Curve',
    'results.risk.title': 'C. Sensitivity & Risk Analysis',
    'results.risk.factors': 'Key Risk Factors',
    'results.backToForm': 'Back to Form',
  },
  
  de: {
    // Header
    'header.login': 'Anmelden',
    'header.signup': 'Registrieren',
    
    // Footer
    'footer.copyright': '© 2025 ImmoSteuer365',
    'footer.impressum': 'Impressum',
    'footer.datenschutz': 'Datenschutz',
    
    // Main Form
    'form.title': '10-Jahres-Deutsches Immobiliensteuer-Optimierungsmodell',
    'form.subtitle': 'Erhalten Sie personalisierte Empfehlungen zur Maximierung der Rendite Ihres Immobilienportfolios',
    'form.asset.title': 'A. Vermögensportfolio-Status',
    'form.asset.private': 'Privatgehaltene Immobilien',
    'form.asset.company': 'Unternehmensgehaltene Immobilien',
    'form.asset.addNew': '+ Neue Immobilie hinzufügen',
    'form.asset.propertyType': 'Immobilientyp',
    'form.asset.city': 'Stadt',
    'form.asset.postalCode': 'Postleitzahl',
    'form.asset.purchasePrice': 'Kaufpreis (€)',
    'form.asset.currentValue': 'Aktueller Marktwert (€)',
    'form.asset.annualRent': 'Jährliche Mieteinnahmen (€)',
    'form.asset.purchaseDate': 'Kaufdatum',
    'form.asset.loanBalance': 'Verbleibendes Darlehenssaldo (€)',
    'form.asset.interestRate': 'Zinssatz (%)',
    'form.asset.monthlyPayment': 'Monatliche Zahlung (€)',
    'form.asset.edit': 'Bearbeiten',
    'form.asset.delete': 'Löschen',
    'form.asset.save': 'Immobilie speichern',
    'form.asset.cancel': 'Abbrechen',
    
    'form.financial.title': 'B. Finanzstatus',
    'form.financial.income': 'Jahreseinkommen (€)',
    'form.financial.cash': 'Verfügbares Bargeld (€)',
    'form.financial.debt': 'Andere Schulden (€)',
    'form.financial.taxRate': 'Persönlicher Steuersatz (%)',
    
    'form.goals.title': 'C. Strategische Ziele',
    'form.goals.primary': 'Hauptziel',
    'form.goals.timeline': 'Investitionszeitraum',
    'form.goals.risk': 'Risikotoleranz',
    
    'form.economy.title': 'D. Wirtschaftliches Umfeld',
    'form.economy.inflation': 'Erwartete Inflationsrate (%)',
    'form.economy.appreciation': 'Erwartete Immobilienwertsteigerung (%)',
    'form.economy.interest': 'Erwarteter Zinssatz (%)',
    
    'form.submit': 'Erstelle 10-Jahres-Optimierungsbericht',
    'form.loading': 'Analysiere Ihr Portfolio und erstelle Empfehlungen...',
    
    // Results Page
    'results.title': '10-Jahres-Deutsches Immobiliensteuer-Optimierungsbericht',
    'results.strategy.title': 'A. Kern-Strategieempfehlung',
    'results.strategy.structural': 'Strukturelle Empfehlungen',
    'results.strategy.timeline': '10-Jahres-Aktionsplan',
    'results.forecast.title': 'B. Finanzprognose & Vergleich',
    'results.forecast.kpis': 'Wichtige Leistungsindikatoren',
    'results.forecast.taxSavings': '10-Jahres-Kumulative Steuereinsparungen',
    'results.forecast.netWorth': 'Prognostiziertes Nettovermögen im Jahr 10',
    'results.forecast.roa': '10-Jahres-Durchschnittliche Eigenkapitalrendite (RoA)',
    'results.forecast.roe': '10-Jahres-Durchschnittliche Eigenkapitalrendite (RoE)',
    'results.forecast.comparedTo': 'im Vergleich zur nicht-optimierten Strategie',
    'results.forecast.chart1': 'Prognostizierter Cashflow nach Steuern pro Jahr',
    'results.forecast.chart2': 'Prognostizierte Steuerbelastung pro Jahr',
    'results.forecast.chart3': 'Prognostizierte Nettovermögenswachstumskurve',
    'results.forecast.chart4': 'Prognostizierte Gesamtverbindlichkeitskurve',
    'results.risk.title': 'C. Sensitivitäts- & Risikoanalyse',
    'results.risk.factors': 'Wichtige Risikofaktoren',
    'results.backToForm': 'Zurück zum Formular',
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};