import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, Brain, TrendingUp, Shield, FileText, MapPin, Building, Euro, AlertTriangle } from 'lucide-react';
import cityWireframeHero from '@/assets/city-wireframe-hero.jpg';

interface FormData {
  investableCash: number;
  existingDebt: number;
  riskAppetite: 'conservative' | 'balanced' | 'aggressive' | '';
  economicEnvironment: 'growth' | 'stable' | 'downturn' | '';
  propertyType: string;
  region: string;
}

const germanCities = [
  'Aachen', 'Augsburg', 'Berlin', 'Bielefeld', 'Bochum', 'Bonn', 'Bremen', 'Dortmund', 
  'Dresden', 'Düsseldorf', 'Duisburg', 'Erfurt', 'Essen', 'Frankfurt am Main', 
  'Freiburg im Breisgau', 'Gelsenkirchen', 'Hagen', 'Halle (Saale)', 'Hamburg', 
  'Hamm', 'Hannover', 'Heidelberg', 'Heilbronn', 'Herne', 'Hildesheim', 'Ingolstadt', 
  'Jena', 'Karlsruhe', 'Kassel', 'Kiel', 'Koblenz', 'Köln', 'Krefeld', 'Leipzig', 
  'Leverkusen', 'Lübeck', 'Ludwigshafen am Rhein', 'Magdeburg', 'Mainz', 'Mannheim', 
  'Moers', 'Mönchengladbach', 'Mülheim an der Ruhr', 'München', 'Münster', 'Neuss', 
  'Nürnberg', 'Oberhausen', 'Offenbach am Main', 'Oldenburg', 'Osnabrück', 'Paderborn', 
  'Pforzheim', 'Potsdam', 'Recklinghausen', 'Regensburg', 'Remscheid', 'Reutlingen', 
  'Rostock', 'Saarbrücken', 'Salzgitter', 'Solingen', 'Stuttgart', 'Ulm', 'Wiesbaden', 
  'Wolfsburg', 'Wuppertal', 'Würzburg'
];

const RealEstateEngine: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'input' | 'loading' | 'results'>('input');
  const [formData, setFormData] = useState<FormData>({
    investableCash: 300000,
    existingDebt: 0,
    riskAppetite: '',
    economicEnvironment: '',
    propertyType: '',
    region: ''
  });
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [citySearch, setCitySearch] = useState('');

  const loadingMessages = [
    "Crunching numbers: Analyzing tax efficiencies under §7 EStG...",
    "Stress-testing: What if rates rise 2% next year?",
    "Optimizing: Balancing renovation costs vs. rent premiums in Munich...",
    "Validating: Checking 2-year buy/sell cooling periods...",
    "Finalizing: Quantum-inspired algorithms at work..."
  ];

  const filteredCities = germanCities.filter(city => 
    city.toLowerCase().includes(citySearch.toLowerCase())
  );

  const handleAnalyze = () => {
    setCurrentStep('loading');
    setLoadingProgress(0);
    
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + Math.random() * 15 + 5;
        const messageIndex = Math.floor((newProgress / 100) * loadingMessages.length);
        setLoadingMessage(loadingMessages[Math.min(messageIndex, loadingMessages.length - 1)]);
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentStep('results'), 1000);
          return 100;
        }
        return newProgress;
      });
    }, 400);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const renderInputForm = () => (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-card/10 backdrop-blur-sm px-6 py-4 rounded-lg border border-white/20">
          Train decades of investing in minutes.
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Bias reduction | Risk-aware actions | Long-term rewards
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {/* Financial Status */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Euro className="h-5 w-5 text-accent" />
              Financial Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label className="text-sm font-medium">Investable Cash: {formatCurrency(formData.investableCash)}</Label>
              <Slider
                value={[formData.investableCash]}
                onValueChange={(value) => setFormData({...formData, investableCash: value[0]})}
                max={2000000}
                min={50000}
                step={10000}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground flex justify-between">
                <span>€50k</span>
                <span>€2M</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="debt">Existing Debt (€)</Label>
              <Input
                id="debt"
                type="number"
                value={formData.existingDebt}
                onChange={(e) => setFormData({...formData, existingDebt: Number(e.target.value)})}
                placeholder="0"
              />
            </div>

            <div className="space-y-3">
              <Label>Risk Appetite</Label>
              <RadioGroup 
                value={formData.riskAppetite} 
                onValueChange={(value) => setFormData({...formData, riskAppetite: value as any})}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="conservative" id="conservative" />
                  <Label htmlFor="conservative" className="text-sm">Conservative</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="balanced" id="balanced" />
                  <Label htmlFor="balanced" className="text-sm">Balanced</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="aggressive" id="aggressive" />
                  <Label htmlFor="aggressive" className="text-sm">Aggressive</Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        {/* Economic Environment */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-success" />
              Economic Environment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={formData.economicEnvironment} 
              onValueChange={(value) => setFormData({...formData, economicEnvironment: value as any})}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-success/20 hover:bg-success/5 transition-colors">
                <RadioGroupItem value="growth" id="growth" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="growth" className="font-medium">Economic Growth</Label>
                  <p className="text-sm text-muted-foreground">Low rates, high demand</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-warning/20 hover:bg-warning/5 transition-colors">
                <RadioGroupItem value="stable" id="stable" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="stable" className="font-medium">Stable Economy</Label>
                  <p className="text-sm text-muted-foreground">Neutral rates, steady market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-3 rounded-lg border border-destructive/20 hover:bg-destructive/5 transition-colors">
                <RadioGroupItem value="downturn" id="downturn" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="downturn" className="font-medium">Economic Downturn</Label>
                  <p className="text-sm text-muted-foreground">High rates, rising risks</p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Property Preferences */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-primary" />
              Property Preferences
              <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Property Type</Label>
              <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Residential</SelectItem>
                  <SelectItem value="commercial">Commercial</SelectItem>
                  <SelectItem value="mixed">Mixed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Region</Label>
              <div className="space-y-2">
                <Input
                  placeholder="Search German cities..."
                  value={citySearch}
                  onChange={(e) => setCitySearch(e.target.value)}
                />
                <Select value={formData.region} onValueChange={(value) => setFormData({...formData, region: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {filteredCities.map((city) => (
                      <SelectItem key={city} value={city.toLowerCase()}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="text-center">
        <Button 
          onClick={handleAnalyze}
          size="lg"
          className="bg-card text-card-foreground border-2 border-white/30 hover:bg-white hover:text-card-foreground hover:shadow-elegant transition-all duration-300 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg min-h-[48px] font-semibold"
          disabled={!formData.riskAppetite || !formData.economicEnvironment}
        >
          <Calculator className="mr-2 h-5 w-5" />
          Analyze Investment Opportunity
        </Button>
      </div>
    </div>
  );

  const renderLoadingScreen = () => (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto px-6">
        <div className="relative mb-8">
          <img 
            src={cityWireframeHero} 
            alt="AI Processing" 
            className="w-full max-w-md mx-auto rounded-lg shadow-glow animate-pulse-slow"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg animate-glow"></div>
        </div>
        
        <div className="space-y-6 text-white">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 animate-pulse text-accent" />
            <h2 className="text-2xl font-bold">AI Processing Your Investment</h2>
          </div>
          
          <p className="text-lg opacity-90 min-h-[2rem]">{loadingMessage}</p>
          
          <div className="space-y-3">
            <Progress value={loadingProgress} className="w-full h-3" />
            <div className="flex justify-between text-sm opacity-75">
              <span>Time remaining: {Math.max(0, Math.ceil((100 - loadingProgress) * 0.15))} sec</span>
              <span>{Math.round(loadingProgress)}% complete</span>
            </div>
          </div>
          
          <p className="text-sm opacity-60 italic">
            "Powered by quantum-inspired algorithms - Because your €{(formData.investableCash / 1000).toFixed(0)}k deserves it"
          </p>
        </div>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white/80 mb-2">
          Your Investment Analysis
        </h1>
        <p className="text-muted-foreground">Tailored recommendations based on your profile</p>
      </div>

      <Tabs defaultValue="action" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="action" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Action Plan
          </TabsTrigger>
          <TabsTrigger value="rationale" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Rationale
          </TabsTrigger>
          <TabsTrigger value="legal" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Laws & Taxes
          </TabsTrigger>
          <TabsTrigger value="forecast" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Risk & Forecast
          </TabsTrigger>
        </TabsList>

        <TabsContent value="action">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="text-2xl text-success">Recommended Action Plan</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 bg-success/10 rounded-lg border border-success/20">
                    <h3 className="font-semibold text-success mb-2">🏠 BUY</h3>
                    <p>2-bed apartment in Munich (€600k, 30% down payment)</p>
                  </div>
                  <div className="p-4 bg-warning/10 rounded-lg border border-warning/20">
                    <h3 className="font-semibold text-warning mb-2">🔨 RENOVATE</h3>
                    <p>Budget €50k (expected rent increase: 15%)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-primary/10 rounded-lg border border-primary/20">
                    <h3 className="font-semibold text-primary mb-2">🏦 LOAN</h3>
                    <p>10-year fixed rate (3.2%, Sparkasse Bank)</p>
                  </div>
                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h3 className="font-semibold text-accent mb-2">💡 TAX TIP</h3>
                    <p>Hold via GmbH to deduct trade tax (§15 EstG)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rationale">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Decision Rationale</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-semibold">Market Trends</h4>
                    <p className="text-muted-foreground">Low interest rates + Munich population growth (+2.1%/year)</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-semibold">Risk Mitigation</h4>
                    <p className="text-muted-foreground">Fixed-rate loan to hedge against rate hikes</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-semibold">Tax Optimization</h4>
                    <p className="text-muted-foreground">2% linear depreciation (AfA-Tabelle)</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="legal">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>German Laws & Taxes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <FileText className="h-4 w-4" />
                      Property Tax
                    </h4>
                    <p className="text-sm text-muted-foreground">0.3–1.5% of assessed value (Grundsteuer)</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      Capital Gains
                    </h4>
                    <p className="text-sm text-muted-foreground">25% if sold within 10 years (Spekulationssteuer)</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      Depreciation
                    </h4>
                    <p className="text-sm text-muted-foreground">50 years for residential (§7 EStG); accelerated for commercial</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold flex items-center gap-2 mb-2">
                      <Euro className="h-4 w-4 text-primary" />
                      Trade Tax
                    </h4>
                    <p className="text-sm text-muted-foreground">Deductible when held via GmbH structure</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forecast">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle>Risk & Financial Forecast</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-success mb-3">5-Year Projection</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Net worth:</span>
                      <span className="font-medium">€600k → €720k (+20%)</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cash flow:</span>
                      <span className="font-medium">€24k/year net rent</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-warning mb-3">Risk Alerts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <span>30% chance of negative cash flow if rates rise +1%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-success" />
                      <span>Low risk: Berlin rent cap expansion (unlikely)</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center gap-4 mt-8">
        <Button variant="outline" className="hover:shadow-accent">
          <FileText className="mr-2 h-4 w-4" />
          Save as PDF
        </Button>
        <Button variant="outline" className="hover:shadow-accent">
          <MapPin className="mr-2 h-4 w-4" />
          Contact Tax Advisor
        </Button>
        <Button 
          className="bg-gradient-accent hover:shadow-accent"
          onClick={() => setCurrentStep('input')}
        >
          <Calculator className="mr-2 h-4 w-4" />
          Simulate Another Scenario
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {currentStep === 'input' && renderInputForm()}
        {currentStep === 'loading' && renderLoadingScreen()}
        {currentStep === 'results' && renderResults()}
      </div>
    </div>
  );
};

export default RealEstateEngine;