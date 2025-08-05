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
    
    // Property types and options
    'options.propertyType.residential': 'Residential',
    'options.propertyType.commercial': 'Commercial',
    'options.propertyType.mixed': 'Mixed-use',
    'options.goal.cashFlow': 'Maximize Cash Flow',
    'options.goal.appreciation': 'Capital Appreciation',
    'options.goal.taxOptimization': 'Tax Optimization',
    'options.timeline.short': '1-3 years',
    'options.timeline.medium': '3-7 years', 
    'options.timeline.long': '7+ years',
    'options.risk.low': 'Conservative',
    'options.risk.medium': 'Moderate',
    'options.risk.high': 'Aggressive',
    
    // Strategy recommendations
    'strategy.recommendation1': 'Establish a property-managing GmbH (VV-GmbH) in Year 2 to optimize tax benefits and liability protection.',
    'strategy.recommendation2': 'Transfer privately held properties A and B into the company structure via Share Deal to minimize transaction costs.',
    'strategy.recommendation3': 'Utilize family members\' gift tax allowances (Schenkungssteuerfreibetrag) for Property C in Year 4.',
    'strategy.recommendation4': 'Implement a holding structure in Year 6 to further optimize tax efficiency and enable future expansion.',
    
    // Timeline actions
    'timeline.year1': 'Initial portfolio optimization and cash flow improvement strategies',
    'timeline.year2': 'Establish \'Mustermann VV-GmbH\'. Transfer private properties A and B into the company.',
    'timeline.year3': 'Perform €50,000 modernization on Property C (Herstellungskosten) financed through Bank D loan.',
    'timeline.year4': 'Transfer Property C to family member using gift tax allowances.',
    'timeline.year5': 'Refinance Loan X (Umschuldung) to secure lower interest rate of 2.8%.',
    'timeline.year6': 'Establish holding structure for tax optimization.',
    'timeline.year7': 'Make special repayment (Sondertilgung) of €50,000 on Loan Y using accumulated cash flow.',
    'timeline.year8': 'Acquire new investment property through company structure.',
    'timeline.year9': 'Optimize depreciation schedules and prepare for exit strategies.',
    'timeline.year10': 'Sell privately held Property D (after 10-year tax-free holding period).',
    
    // Risk factors
    'risk.factor1': 'This strategy is highly dependent on the value appreciation of Property A and overall market conditions.',
    'risk.factor2': 'The success of the refinancing plan in Year 5 is subject to market interest rate conditions at that time.',
    'risk.factor3': 'Changes in tax legislation could significantly impact the effectiveness of the proposed structure.',
    'risk.factor4': 'Family gift tax strategy requires cooperation and may face personal or legal constraints.',
    'risk.factor5': 'Please rerun the model if there\'s any change in the portfolio or market environment.',
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
    
    // Property types and options
    'options.propertyType.residential': 'Wohnimmobilie',
    'options.propertyType.commercial': 'Gewerbeimmobilie',
    'options.propertyType.mixed': 'Mischnutzung',
    'options.goal.cashFlow': 'Cashflow maximieren',
    'options.goal.appreciation': 'Wertsteigerung',
    'options.goal.taxOptimization': 'Steueroptimierung',
    'options.timeline.short': '1-3 Jahre',
    'options.timeline.medium': '3-7 Jahre',
    'options.timeline.long': '7+ Jahre',
    'options.risk.low': 'Konservativ',
    'options.risk.medium': 'Moderat',
    'options.risk.high': 'Aggressiv',
    
    // Strategy recommendations
    'strategy.recommendation1': 'Gründung einer vermögensverwaltenden GmbH (VV-GmbH) im Jahr 2 zur Optimierung von Steuervorteilen und Haftungsschutz.',
    'strategy.recommendation2': 'Übertragung der privat gehaltenen Immobilien A und B in die Unternehmensstruktur via Share Deal zur Minimierung der Transaktionskosten.',
    'strategy.recommendation3': 'Nutzung der Schenkungssteuerfreibeträge von Familienmitgliedern für Immobilie C im Jahr 4.',
    'strategy.recommendation4': 'Implementierung einer Holding-Struktur im Jahr 6 zur weiteren Steueroptimierung und Ermöglichung zukünftiger Expansion.',
    
    // Timeline actions  
    'timeline.year1': 'Erste Portfolio-Optimierung und Verbesserung der Cashflow-Strategien',
    'timeline.year2': 'Gründung der \'Mustermann VV-GmbH\'. Übertragung der privaten Immobilien A und B in das Unternehmen.',
    'timeline.year3': 'Durchführung einer €50.000 Modernisierung bei Immobilie C (Herstellungskosten) finanziert durch Darlehen der Bank D.',
    'timeline.year4': 'Übertragung von Immobilie C an Familienmitglied unter Nutzung der Schenkungssteuerfreibeträge.',
    'timeline.year5': 'Umschuldung von Darlehen X zur Sicherung eines niedrigeren Zinssatzes von 2,8%.',
    'timeline.year6': 'Etablierung einer Holding-Struktur zur Steueroptimierung.',
    'timeline.year7': 'Sondertilgung von €50.000 bei Darlehen Y unter Verwendung des angesammelten Cashflows.',
    'timeline.year8': 'Erwerb einer neuen Investitionsimmobilie über die Unternehmensstruktur.',
    'timeline.year9': 'Optimierung der Abschreibungspläne und Vorbereitung von Exit-Strategien.',
    'timeline.year10': 'Verkauf der privat gehaltenen Immobilie D (nach Erfüllung der 10-jährigen steuerfreien Haltefrist).',
    
    // Risk factors
    'risk.factor1': 'Diese Strategie ist stark abhängig von der Wertsteigerung der Immobilie A und den allgemeinen Marktbedingungen.',
    'risk.factor2': 'Der Erfolg des Umschuldungsplans im Jahr 5 unterliegt den Marktzinsbedingungen zu diesem Zeitpunkt.',
    'risk.factor3': 'Änderungen in der Steuergesetzgebung könnten die Wirksamkeit der vorgeschlagenen Struktur erheblich beeinträchtigen.',
    'risk.factor4': 'Die Familien-Schenkungssteuer-Strategie erfordert Kooperation und kann persönlichen oder rechtlichen Beschränkungen unterliegen.',
    'risk.factor5': 'Bitte führen Sie das Modell erneut aus, falls sich das Portfolio oder die Marktumgebung ändert.',
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