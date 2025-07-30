import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { 
  Building, 
  Euro, 
  FileText, 
  Target, 
  TrendingUp, 
  Plus, 
  Trash2,
  CalendarIcon
} from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

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

  const PropertyTable = ({ properties, type }: { properties: PropertyRecord[], type: 'private' | 'company' }) => (
    <div className="space-y-4">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Acquisition Date</TableHead>
              <TableHead>Land Cost</TableHead>
              <TableHead>Building Cost</TableHead>
              <TableHead>Annual Rent</TableHead>
              <TableHead>Operating Costs</TableHead>
              <TableHead>Bank</TableHead>
              <TableHead>Original Loan</TableHead>
              <TableHead>Remaining Loan</TableHead>
              <TableHead>Interest Rate</TableHead>
              <TableHead>Fixed Rate Period</TableHead>
              <TableHead>Annual Repayment</TableHead>
              {type === 'company' && (
                <>
                  <TableHead>Company Type</TableHead>
                  <TableHead>Trade Relief</TableHead>
                </>
              )}
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {properties.map((property) => (
              <TableRow key={property.id}>
                <TableCell>
                  <Input
                    value={property.city}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'city', e.target.value)}
                    placeholder="City"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={property.postalCode}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'postalCode', e.target.value)}
                    placeholder="12345"
                  />
                </TableCell>
                <TableCell>
                  <Select
                    value={property.propertyType}
                    onValueChange={(value) => updatePropertyRecord(type, property.id, 'propertyType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Residential">Residential</SelectItem>
                      <SelectItem value="Commercial">Commercial</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <DatePicker
                    date={property.acquisitionDate}
                    onSelect={(date) => updatePropertyRecord(type, property.id, 'acquisitionDate', date)}
                    placeholder="Select date"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.landCost}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'landCost', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.buildingCost}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'buildingCost', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.annualRent}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'annualRent', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.operatingCosts}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'operatingCosts', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={property.lendingBank}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'lendingBank', e.target.value)}
                    placeholder="Bank name"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.originalLoan}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'originalLoan', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.remainingLoan}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'remainingLoan', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    step="0.1"
                    value={property.interestRate}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'interestRate', Number(e.target.value))}
                    placeholder="%"
                  />
                </TableCell>
                <TableCell>
                  <DatePicker
                    date={property.fixedRatePeriod}
                    onSelect={(date) => updatePropertyRecord(type, property.id, 'fixedRatePeriod', date)}
                    placeholder="Fixed until"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={property.annualRepayment}
                    onChange={(e) => updatePropertyRecord(type, property.id, 'annualRepayment', Number(e.target.value))}
                    placeholder="€"
                  />
                </TableCell>
                {type === 'company' && (
                  <>
                    <TableCell>
                      <Select
                        value={property.companyType || 'UG'}
                        onValueChange={(value) => updatePropertyRecord(type, property.id, 'companyType', value)}
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
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={property.tradeReliefApplied || false}
                        onCheckedChange={(checked) => updatePropertyRecord(type, property.id, 'tradeReliefApplied', checked)}
                      />
                    </TableCell>
                  </>
                )}
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removePropertyRecord(type, property.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={() => addPropertyRecord(type)} variant="outline" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Add New Property
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-hero p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            10-Year German Real Estate Tax Optimization Model
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis and optimization of your real estate portfolio
          </p>
        </div>

        {/* A. Asset Portfolio Status */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Building className="h-6 w-6 text-primary" />
              A. Asset Portfolio Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Privately Held Properties */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Privately Held Properties</h3>
              <PropertyTable properties={formData.privateProperties} type="private" />
            </div>

            {/* Company-Held Properties */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Company-Held Properties</h3>
              <PropertyTable properties={formData.companyProperties} type="company" />
            </div>
          </CardContent>
        </Card>

        {/* B. Financial & Legal Status */}
        <Card className="shadow-elegant bg-card/95 backdrop-blur-sm border border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Euro className="h-6 w-6 text-accent" />
              B. Financial & Legal Status
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
              C. Strategic Goals & Constraints
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
        <Card className="shadow-elegant bg-gradient-to-br from-blue-900/90 to-blue-700/90 backdrop-blur-sm border border-blue-400/20 text-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-white">
              <TrendingUp className="h-6 w-6 text-blue-300" />
              D. Economic Environment
            </CardTitle>
            <p className="text-blue-100">Please select the future market trend you want the digital twin to simulate for the calculation.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={formData.economicEnvironment}
              onValueChange={(value) => setFormData(prev => ({ ...prev, economicEnvironment: value }))}
              className="space-y-4"
            >
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-green-400/30 bg-green-900/20 hover:bg-green-900/30 transition-colors">
                <RadioGroupItem value="growth" id="growth" className="mt-1 border-green-400 text-green-400" />
                <div className="space-y-1">
                  <Label htmlFor="growth" className="font-medium text-green-100">Economic Growth</Label>
                  <p className="text-sm text-green-200">Low rates, high demand</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-yellow-400/30 bg-yellow-900/20 hover:bg-yellow-900/30 transition-colors">
                <RadioGroupItem value="stable" id="stable" className="mt-1 border-yellow-400 text-yellow-400" />
                <div className="space-y-1">
                  <Label htmlFor="stable" className="font-medium text-yellow-100">Stable Economy</Label>
                  <p className="text-sm text-yellow-200">Neutral rates, steady market</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 rounded-lg border border-red-400/30 bg-red-900/20 hover:bg-red-900/30 transition-colors">
                <RadioGroupItem value="downturn" id="downturn" className="mt-1 border-red-400 text-red-400" />
                <div className="space-y-1">
                  <Label htmlFor="downturn" className="font-medium text-red-100">Economic Downturn</Label>
                  <p className="text-sm text-red-200">High rates, rising risks</p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="text-center pt-8">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-primary to-accent text-white hover:from-primary/90 hover:to-accent/90 px-12 py-4 text-lg font-semibold shadow-glow"
          >
            <FileText className="mr-2 h-5 w-5" />
            Generate 10-Year Optimization Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RealEstateEngine;