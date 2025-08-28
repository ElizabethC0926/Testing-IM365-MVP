import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Building, 
  Euro, 
  FileText, 
  Target, 
  TrendingUp, 
  Plus, 
  Trash2,
  CalendarIcon,
  Edit3,
  MapPin
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ResultsPage } from './ResultsPage';

interface PropertyRecord {
  id: string;
  city: string;
  postalCode: string;
  propertyType: string;
  acquisitionDate: Date | undefined;
  landCost: number;
  buildingCost: number;
  annualRent: number;
  operatingCosts: number;
  lendingBank: string;
  originalLoan: number;
  remainingLoan: number;
  interestRate: number;
  fixedRatePeriod: Date | undefined;
  annualRepayment: number;
  companyType?: string;
  tradeReliefApplied?: boolean;
}

interface FormData {
  privateProperties: PropertyRecord[];
  companyProperties: PropertyRecord[];
  personalIncome: number;
  marginalTaxRate: number;
  taxClass: string;
  currentLiquidity: number;
  hasInheritancePlan: boolean;
  coreObjective: string;
  structuralChangeWillingness: boolean;
  assetTransferWillingness: boolean;
  familyInvolvement: boolean;
  liquidityFloor: number;
  debtRatioCeiling: number;
  plannedPurchaseCity: string;
  plannedPurchaseTime: Date | undefined;
  plannedPurchasePrice: number;
  financingPlan: string;
  plannedCapitalInjection: number;
  capitalInjectionDetails: string;
  economicEnvironment: string;
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
  const { t } = useLanguage();
  const [editingProperty, setEditingProperty] = useState<{ property: PropertyRecord; type: 'private' | 'company' } | null>(null);
  const [isPropertyModalOpen, setIsPropertyModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'form' | 'loading' | 'results'>('form');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    privateProperties: [{
      id: '1',
      city: 'München',
      postalCode: '80331',
      propertyType: 'Residential',
      acquisitionDate: new Date('2020-01-15'),
      landCost: 200000,
      buildingCost: 400000,
      annualRent: 24000,
      operatingCosts: 3000,
      lendingBank: 'Deutsche Bank',
      originalLoan: 480000,
      remainingLoan: 420000,
      interestRate: 2.5,
      fixedRatePeriod: new Date('2030-01-15'),
      annualRepayment: 28800
    }],
    companyProperties: [{
      id: '1',
      city: 'Berlin',
      postalCode: '10115',
      propertyType: 'Commercial',
      acquisitionDate: new Date('2019-06-01'),
      landCost: 300000,
      buildingCost: 700000,
      annualRent: 60000,
      operatingCosts: 8000,
      lendingBank: 'Commerzbank',
      originalLoan: 800000,
      remainingLoan: 650000,
      interestRate: 3.2,
      fixedRatePeriod: new Date('2029-06-01'),
      annualRepayment: 48000,
      companyType: 'GmbH',
      tradeReliefApplied: true
    }],
    personalIncome: 120000,
    marginalTaxRate: 42,
    taxClass: 'Class I',
    currentLiquidity: 250000,
    hasInheritancePlan: false,
    coreObjective: '',
    structuralChangeWillingness: false,
    assetTransferWillingness: false,
    familyInvolvement: false,
    liquidityFloor: 50000,
    debtRatioCeiling: 70,
    plannedPurchaseCity: '',
    plannedPurchaseTime: undefined,
    plannedPurchasePrice: 0,
    financingPlan: '',
    plannedCapitalInjection: 0,
    capitalInjectionDetails: '',
    economicEnvironment: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  const addPropertyRecord = (type: 'private' | 'company') => {
    const newRecord: PropertyRecord = {
      id: Date.now().toString(),
      city: '',
      postalCode: '',
      propertyType: 'Residential',
      acquisitionDate: undefined,
      landCost: 0,
      buildingCost: 0,
      annualRent: 0,
      operatingCosts: 0,
      lendingBank: '',
      originalLoan: 0,
      remainingLoan: 0,
      interestRate: 0,
      fixedRatePeriod: undefined,
      annualRepayment: 0,
      ...(type === 'company' && {
        companyType: 'UG',
        tradeReliefApplied: false
      })
    };

    if (type === 'private') {
      setFormData(prev => ({
        ...prev,
        privateProperties: [...prev.privateProperties, newRecord]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        companyProperties: [...prev.companyProperties, newRecord]
      }));
    }
  };

  const removePropertyRecord = (type: 'private' | 'company', id: string) => {
    if (type === 'private') {
      setFormData(prev => ({
        ...prev,
        privateProperties: prev.privateProperties.filter(p => p.id !== id)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        companyProperties: prev.companyProperties.filter(p => p.id !== id)
      }));
    }
  };

  const updatePropertyRecord = (type: 'private' | 'company', id: string, field: string, value: any) => {
    if (type === 'private') {
      setFormData(prev => ({
        ...prev,
        privateProperties: prev.privateProperties.map(p => 
          p.id === id ? { ...p, [field]: value } : p
        )
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        companyProperties: prev.companyProperties.map(p => 
          p.id === id ? { ...p, [field]: value } : p
        )
      }));
    }
  };

  const DatePicker = ({ date, onSelect, placeholder }: { date: Date | undefined, onSelect: (date: Date | undefined) => void, placeholder: string }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={onSelect}
          initialFocus
          className="p-3 pointer-events-auto"
        />
      </PopoverContent>
    </Popover>
  );

  const openPropertyModal = (property?: PropertyRecord, type?: 'private' | 'company') => {
    if (property && type) {
      setEditingProperty({ property, type });
    } else {
      setEditingProperty(null);
    }
    setIsPropertyModalOpen(true);
  };

  const saveProperty = () => {
    if (editingProperty) {
      // Save all property fields
      Object.keys(editingProperty.property).forEach(field => {
        updatePropertyRecord(
          editingProperty.type,
          editingProperty.property.id,
          field,
          editingProperty.property[field]
        );
      });
    }
    setIsPropertyModalOpen(false);
    setEditingProperty(null);
  };

  const handleSubmit = () => {
    setCurrentView('loading');
    setLoadingProgress(0);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setCurrentView('results'), 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const PropertyCard = ({ property, type }: { property: PropertyRecord, type: 'private' | 'company' }) => (
    <Card className="border border-border/20 hover:border-primary/30 transition-colors bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="font-semibold text-lg flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              {property.city || 'Unnamed Property'}, {property.postalCode}
            </h4>
            <p className="text-sm text-muted-foreground capitalize">{property.propertyType}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => openPropertyModal(property, type)}
            >
              <Edit3 className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => removePropertyRecord(type, property.id)}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Annual Rent Income</p>
            <p className="font-medium text-success">{formatCurrency(property.annualRent)}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Remaining Loan</p>
            <p className="font-medium text-destructive">{formatCurrency(property.remainingLoan)}</p>
          </div>
        </div>
        
        {type === 'company' && (
          <div className="mt-3 pt-3 border-t border-border/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Company Type:</span>
              <span className="font-medium">{property.companyType}</span>
            </div>
            {property.tradeReliefApplied && (
              <div className="mt-1 text-xs text-success">✓ Trade tax relief applied</div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );

  const PropertySection = ({ properties, type, title }: { 
    properties: PropertyRecord[], 
    type: 'private' | 'company',
    title: string 
  }) => (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">{title}</h3>
        <Button 
        onClick={() => {
          addPropertyRecord(type);
          // Open modal for the newly created property
          setTimeout(() => {
            const newProperty = type === 'private' 
              ? formData.privateProperties[formData.privateProperties.length - 1]
              : formData.companyProperties[formData.companyProperties.length - 1];
            if (newProperty) {
              openPropertyModal(newProperty, type);
            }
          }, 100);
        }} 
        variant="outline" 
        className="w-full border-dashed border-2 border-primary/30 hover:border-primary/50 h-20"
      >
        <Plus className="mr-2 h-5 w-5" />
        {t('form.asset.addNew')}
      </Button>
      
      {properties.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} type={type} />
          ))}
        </div>
      )}
    </div>
  );

  const PropertyModal = () => {
    // Initialize currentProperty with editing property or default values
    const [currentProperty, setCurrentProperty] = useState(() => {
      return editingProperty?.property || {
        id: '',
        city: '',
        postalCode: '',
        propertyType: 'Residential',
        acquisitionDate: undefined,
        landCost: 0,
        buildingCost: 0,
        annualRent: 0,
        operatingCosts: 0,
        lendingBank: '',
        originalLoan: 0,
        remainingLoan: 0,
        interestRate: 0,
        fixedRatePeriod: undefined,
        annualRepayment: 0,
        ...(editingProperty?.type === 'company' && {
          companyType: 'UG',
          tradeReliefApplied: false
        })
      };
    });

    // Update currentProperty when editingProperty changes
    React.useEffect(() => {
      if (editingProperty?.property) {
        setCurrentProperty(editingProperty.property);
      }
    }, [editingProperty]);

    const updateCurrentProperty = (field: string, value: any) => {
      setCurrentProperty(prev => ({ ...prev, [field]: value }));
      if (editingProperty) {
        setEditingProperty({
          ...editingProperty,
          property: { ...editingProperty.property, [field]: value }
        });
      }
    };

    return (
      <Dialog open={isPropertyModalOpen} onOpenChange={setIsPropertyModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white/100 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? 'Edit Property' : 'Add New Property'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Basic Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Property City</Label>
                  <Input
                    value={currentProperty.city}
                    onChange={(e) => updateCurrentProperty('city', e.target.value)}
                    placeholder="Enter city"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Postal Code</Label>
                  <Input
                    value={currentProperty.postalCode}
                    onChange={(e) => updateCurrentProperty('postalCode', e.target.value)}
                    placeholder="12345"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select
                    value={currentProperty.propertyType}
                    onValueChange={(value) => updateCurrentProperty('propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">{t('options.propertyType.residential')}</SelectItem>
                      <SelectItem value="Commercial">{t('options.propertyType.commercial')}</SelectItem>
                      <SelectItem value="Other">{t('options.propertyType.mixed')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Acquisition Date</Label>
                  <DatePicker
                    date={currentProperty.acquisitionDate}
                    onSelect={(date) => updateCurrentProperty('acquisitionDate', date)}
                    placeholder="Select date"
                  />
                </div>
              </div>
            </div>

            {/* Financial Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Financial Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Land Acquisition Cost (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.landCost}
                    onChange={(e) => updateCurrentProperty('landCost', Number(e.target.value))}
                    placeholder="200000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Building Acquisition Cost (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.buildingCost}
                    onChange={(e) => updateCurrentProperty('buildingCost', Number(e.target.value))}
                    placeholder="400000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Rent Income (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.annualRent}
                    onChange={(e) => updateCurrentProperty('annualRent', Number(e.target.value))}
                    placeholder="24000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Operating Costs (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.operatingCosts}
                    onChange={(e) => updateCurrentProperty('operatingCosts', Number(e.target.value))}
                    placeholder="3000"
                  />
                </div>
              </div>
            </div>

            {/* Loan Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Loan Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Lending Bank</Label>
                  <Input
                    value={currentProperty.lendingBank}
                    onChange={(e) => updateCurrentProperty('lendingBank', e.target.value)}
                    placeholder="Deutsche Bank"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Original Loan Amount (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.originalLoan}
                    onChange={(e) => updateCurrentProperty('originalLoan', Number(e.target.value))}
                    placeholder="480000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Remaining Loan Balance (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.remainingLoan}
                    onChange={(e) => updateCurrentProperty('remainingLoan', Number(e.target.value))}
                    placeholder="420000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Interest Rate (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    value={currentProperty.interestRate}
                    onChange={(e) => updateCurrentProperty('interestRate', Number(e.target.value))}
                    placeholder="2.5"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <h4 className="font-semibold">Additional Information</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Fixed Interest Rate Period</Label>
                  <DatePicker
                    date={currentProperty.fixedRatePeriod}
                    onSelect={(date) => updateCurrentProperty('fixedRatePeriod', date)}
                    placeholder="Fixed until"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Annual Repayment (€)</Label>
                  <Input
                    type="number"
                    value={currentProperty.annualRepayment}
                    onChange={(e) => updateCurrentProperty('annualRepayment', Number(e.target.value))}
                    placeholder="28800"
                  />
                </div>
                
                {editingProperty?.type === 'company' && (
                  <>
                    <div className="space-y-2">
                      <Label>Company Type</Label>
                      <Select
                        value={currentProperty.companyType || 'UG'}
                        onValueChange={(value) => updateCurrentProperty('companyType', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UG">UG</SelectItem>
                          <SelectItem value="GmbH">GmbH</SelectItem>
                          <SelectItem value="AG">AG</SelectItem>
                          <SelectItem value="GbR">GbR</SelectItem>
                          <SelectItem value="oHG">oHG</SelectItem>
                          <SelectItem value="KG">KG</SelectItem>
                          <SelectItem value="GmbH & Co. KG">GmbH & Co. KG</SelectItem>
                          <SelectItem value="Holding Structure">Holding Structure</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="trade-relief"
                        checked={currentProperty.tradeReliefApplied || false}
                        onCheckedChange={(checked) => updateCurrentProperty('tradeReliefApplied', checked)}
                      />
                      <Label htmlFor="trade-relief">Trade tax extension relief applied for</Label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6">
            <Button variant="outline" onClick={() => setIsPropertyModalOpen(false)}>
              {t('form.asset.cancel')}
            </Button>
            <Button onClick={saveProperty}>
              {t('form.asset.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  // Loading page component
  const LoadingPage = () => (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('form.loading')}
          </h2>
          <p className="text-muted-foreground">
            {t('form.loading')}
          </p>
        </div>
        
        <div className="space-y-4">
          <Progress value={loadingProgress} className="w-full h-3" />
          <p className="text-sm text-muted-foreground">
            {Math.round(loadingProgress)}% Complete
          </p>
        </div>
        
        <div className="mt-8 space-y-2 text-sm text-muted-foreground">
          {loadingProgress < 30 && <p>Analyzing property portfolio...</p>}
          {loadingProgress >= 30 && loadingProgress < 60 && <p>Calculating tax optimization strategies...</p>}
          {loadingProgress >= 60 && loadingProgress < 90 && <p>Generating financial forecasts...</p>}
          {loadingProgress >= 90 && <p>Finalizing recommendations...</p>}
        </div>
      </div>
    </div>
  );

  // Render different views based on current state
  if (currentView === 'loading') {
    return <LoadingPage />;
  }

  if (currentView === 'results') {
    return <ResultsPage onBack={() => setCurrentView('form')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('form.title')}
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('form.subtitle')}
          </p>
        </div>

        {/* A. Asset Portfolio Status */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building className="h-6 w-6 text-primary" />
              {t('form.asset.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <PropertySection 
              properties={formData.privateProperties} 
              type="private"
              title={t('form.asset.private')}
            />
            
            <PropertySection 
              properties={formData.companyProperties} 
              type="company"
              title={t('form.asset.company')}
            />
            
            <PropertyModal />
          </CardContent>
        </Card>

        {/* B. Financial & Legal Status */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Euro className="h-6 w-6 text-accent" />
              {t('form.financial.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Personal Finances */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Personal Finances</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label>Personal/Family Annual Income (excluding rent)</Label>
                  <Input
                    type="number"
                    value={formData.personalIncome}
                    onChange={(e) => setFormData(prev => ({ ...prev, personalIncome: Number(e.target.value) }))}
                    placeholder="€120,000"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Personal Marginal Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={formData.marginalTaxRate}
                    onChange={(e) => setFormData(prev => ({ ...prev, marginalTaxRate: Number(e.target.value) }))}
                    placeholder="42"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Tax Class (Steuerklasse)</Label>
                  <Select
                    value={formData.taxClass}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, taxClass: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select tax class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Class I">Class I</SelectItem>
                      <SelectItem value="Class II">Class II</SelectItem>
                      <SelectItem value="Class III">Class III</SelectItem>
                      <SelectItem value="Class IV">Class IV</SelectItem>
                      <SelectItem value="Class V">Class V</SelectItem>
                      <SelectItem value="Class VI">Class VI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Current Available Liquidity</Label>
                  <Input
                    type="number"
                    value={formData.currentLiquidity}
                    onChange={(e) => setFormData(prev => ({ ...prev, currentLiquidity: Number(e.target.value) }))}
                    placeholder="€250,000"
                  />
                  <p className="text-xs text-muted-foreground">Cash available for investment, repayment, or renovation.</p>
                </div>
              </div>
            </div>

            {/* Inheritance Plan */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Inheritance Plan</h3>
              <div className="space-y-3">
                <Label>Do you have a preliminary inheritance or gift plan?</Label>
                <RadioGroup 
                  value={formData.hasInheritancePlan ? 'yes' : 'no'}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, hasInheritancePlan: value === 'yes' }))}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="inheritance-yes" />
                    <Label htmlFor="inheritance-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="inheritance-no" />
                    <Label htmlFor="inheritance-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* C. Strategic Goals & Constraints */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Target className="h-6 w-6 text-success" />
              {t('form.goals.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Core Objective */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Core Objective (Choose one)</h3>
              <RadioGroup 
                value={formData.coreObjective}
                onValueChange={(value) => setFormData(prev => ({ ...prev, coreObjective: value }))}
              >
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-primary/20 hover:bg-primary/5 transition-colors">
                  <RadioGroupItem value="maximize-value" id="maximize-value" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="maximize-value" className="font-medium">Option 1: Maximize total asset value after 10 years</Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-success/20 hover:bg-success/5 transition-colors">
                  <RadioGroupItem value="maximize-cashflow" id="maximize-cashflow" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="maximize-cashflow" className="font-medium">Option 2: Maximize cumulative after-tax cash flow within 10 years</Label>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 rounded-lg border border-accent/20 hover:bg-accent/5 transition-colors">
                  <RadioGroupItem value="weighted-score" id="weighted-score" className="mt-1" />
                  <div className="space-y-1">
                    <Label htmlFor="weighted-score" className="font-medium">Option 3: A weighted score combining asset value and cash flow</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Risk Appetite & Constraints */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Risk Appetite & Constraints</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-3">
                    <Label>Are you willing to establish new companies (e.g., GmbH, Holding)?</Label>
                    <RadioGroup 
                      value={formData.structuralChangeWillingness ? 'yes' : 'no'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, structuralChangeWillingness: value === 'yes' }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="structural-yes" />
                        <Label htmlFor="structural-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="structural-no" />
                        <Label htmlFor="structural-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Are you willing to transfer properties into a company structure?</Label>
                    <RadioGroup 
                      value={formData.assetTransferWillingness ? 'yes' : 'no'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, assetTransferWillingness: value === 'yes' }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="transfer-yes" />
                        <Label htmlFor="transfer-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="transfer-no" />
                        <Label htmlFor="transfer-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-3">
                    <Label>Are you willing to transfer properties to family members to utilize gift tax allowances?</Label>
                    <RadioGroup 
                      value={formData.familyInvolvement ? 'yes' : 'no'}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, familyInvolvement: value === 'yes' }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="family-yes" />
                        <Label htmlFor="family-yes">Yes</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="family-no" />
                        <Label htmlFor="family-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Minimum cash reserve to be maintained at all times</Label>
                    <Input
                      type="number"
                      value={formData.liquidityFloor}
                      onChange={(e) => setFormData(prev => ({ ...prev, liquidityFloor: Number(e.target.value) }))}
                      placeholder="€50,000"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Maximum total debt-to-asset ratio you are willing to accept (%)</Label>
                    <Input
                      type="number"
                      value={formData.debtRatioCeiling}
                      onChange={(e) => setFormData(prev => ({ ...prev, debtRatioCeiling: Number(e.target.value) }))}
                      placeholder="70"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Future Plans */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold">Future Plans</h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label>Expected Purchase City</Label>
                    <Select
                      value={formData.plannedPurchaseCity}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, plannedPurchaseCity: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select city" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60 overflow-y-auto">
                        {germanCities.map((city) => (
                          <SelectItem key={city} value={city}>{city}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Purchase Time</Label>
                    <DatePicker
                      date={formData.plannedPurchaseTime}
                      onSelect={(date) => setFormData(prev => ({ ...prev, plannedPurchaseTime: date }))}
                      placeholder="Select date"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Expected Price (€)</Label>
                    <Input
                      type="number"
                      value={formData.plannedPurchasePrice}
                      onChange={(e) => setFormData(prev => ({ ...prev, plannedPurchasePrice: Number(e.target.value) }))}
                      placeholder="€600,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Planned Capital Injection (€)</Label>
                    <Input
                      type="number"
                      value={formData.plannedCapitalInjection}
                      onChange={(e) => setFormData(prev => ({ ...prev, plannedCapitalInjection: Number(e.target.value) }))}
                      placeholder="€100,000"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Financing Plan</Label>
                    <Textarea
                      value={formData.financingPlan}
                      onChange={(e) => setFormData(prev => ({ ...prev, financingPlan: e.target.value }))}
                      placeholder="Describe your financing strategy..."
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Capital Injection Details</Label>
                    <Textarea
                      value={formData.capitalInjectionDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, capitalInjectionDetails: e.target.value }))}
                      placeholder="How much additional capital do you plan to invest in the coming years?"
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* D. Economic Environment */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-warning" />
              {t('form.economy.title')}
            </CardTitle>
            <p className="text-muted-foreground">Please select the future market trend you want the digital twin to simulate for the calculation.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={formData.economicEnvironment}
              onValueChange={(value) => setFormData(prev => ({ ...prev, economicEnvironment: value }))}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-success/20 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 hover:from-blue-100 hover:to-blue-150 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 transition-colors">
                <RadioGroupItem value="growth" id="growth" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="growth" className="font-medium text-success">Economic Growth</Label>
                  <p className="text-sm text-muted-foreground">Low rates, high demand</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-warning/20 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 hover:from-blue-100 hover:to-blue-150 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 transition-colors">
                <RadioGroupItem value="stable" id="stable" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="stable" className="font-medium text-warning">Stable Economy</Label>
                  <p className="text-sm text-muted-foreground">Neutral rates, steady market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-destructive/20 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20 hover:from-blue-100 hover:to-blue-150 dark:hover:from-blue-950/30 dark:hover:to-blue-900/30 transition-colors">
                <RadioGroupItem value="downturn" id="downturn" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="downturn" className="font-medium text-destructive">Economic Downturn</Label>
                  <p className="text-sm text-muted-foreground">High rates, rising risks</p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <Button 
            size="lg"
            onClick={handleSubmit}
            className="bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 px-12 py-4 text-lg font-semibold shadow-glow"
          >
            <FileText className="mr-2 h-5 w-5" />
            {t('form.submit')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateEngine;