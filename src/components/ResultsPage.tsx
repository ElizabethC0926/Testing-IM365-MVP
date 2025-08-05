import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ArrowLeft, TrendingUp, DollarSign, Percent, Target } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface ResultsPageProps {
  onBack: () => void;
}

// Mock data for charts
const cashFlowData = [
  { year: 1, value: 15000 },
  { year: 2, value: 18000 },
  { year: 3, value: 22000 },
  { year: 4, value: 25000 },
  { year: 5, value: 28000 },
  { year: 6, value: 32000 },
  { year: 7, value: 35000 },
  { year: 8, value: 38000 },
  { year: 9, value: 42000 },
  { year: 10, value: 45000 },
];

const taxBurdenData = [
  { year: 1, value: 8000 },
  { year: 2, value: 7500 },
  { year: 3, value: 6800 },
  { year: 4, value: 6200 },
  { year: 5, value: 5800 },
  { year: 6, value: 5200 },
  { year: 7, value: 4800 },
  { year: 8, value: 4200 },
  { year: 9, value: 3800 },
  { year: 10, value: 3200 },
];

const netWorthData = [
  { year: 1, value: 180000 },
  { year: 2, value: 195000 },
  { year: 3, value: 215000 },
  { year: 4, value: 238000 },
  { year: 5, value: 265000 },
  { year: 6, value: 295000 },
  { year: 7, value: 328000 },
  { year: 8, value: 365000 },
  { year: 9, value: 405000 },
  { year: 10, value: 450000 },
];

const liabilitiesData = [
  { year: 1, value: 320000 },
  { year: 2, value: 305000 },
  { year: 3, value: 290000 },
  { year: 4, value: 275000 },
  { year: 5, value: 260000 },
  { year: 6, value: 245000 },
  { year: 7, value: 230000 },
  { year: 8, value: 215000 },
  { year: 9, value: 200000 },
  { year: 10, value: 185000 },
];

const chartConfig = {
  value: {
    label: "Value",
    color: "hsl(var(--primary))",
  },
};

export const ResultsPage: React.FC<ResultsPageProps> = ({ onBack }) => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button onClick={onBack} variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t('results.backToForm')}
          </Button>
          <h1 className="text-3xl font-bold text-slate-900">
            {t('results.title')}
          </h1>
        </div>

        {/* Module A: Core Strategy Recommendation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('results.strategy.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Structural Recommendations */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('results.strategy.structural')}</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  {t('strategy.recommendation1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  {t('strategy.recommendation2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  {t('strategy.recommendation3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full mt-2"></span>
                  {t('strategy.recommendation4')}
                </li>
              </ul>
            </div>

            {/* Action Timeline */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('results.strategy.timeline')}</h3>
              <div className="space-y-4">
                {[
                  { year: 1, action: t('timeline.year1') },
                  { year: 2, action: t('timeline.year2') },
                  { year: 3, action: t('timeline.year3') },
                  { year: 4, action: t('timeline.year4') },
                  { year: 5, action: t('timeline.year5') },
                  { year: 6, action: t('timeline.year6') },
                  { year: 7, action: t('timeline.year7') },
                  { year: 8, action: t('timeline.year8') },
                  { year: 9, action: t('timeline.year9') },
                  { year: 10, action: t('timeline.year10') },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-16 h-8 bg-primary text-white rounded-lg flex items-center justify-center font-semibold text-sm">
                      Year {item.year}
                    </div>
                    <p className="text-slate-700 pt-1">{item.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module B: Financial Forecast & Comparison */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('results.forecast.title')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* KPIs */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('results.forecast.kpis')}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-8 h-8 text-green-600" />
                      <div>
                        <p className="text-sm text-green-700">{t('results.forecast.taxSavings')}</p>
                        <p className="text-2xl font-bold text-green-800">€127,500</p>
                        <p className="text-xs text-green-600">{t('results.forecast.comparedTo')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Target className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="text-sm text-blue-700">{t('results.forecast.netWorth')}</p>
                        <p className="text-2xl font-bold text-blue-800">€450,000</p>
                        <p className="text-xs text-blue-600">Assets - Liabilities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <Percent className="w-8 h-8 text-purple-600" />
                      <div>
                        <p className="text-sm text-purple-700">{t('results.forecast.roa')}</p>
                        <p className="text-2xl font-bold text-purple-800">7.2%</p>
                        <p className="text-xs text-purple-600">10-year average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-8 h-8 text-orange-600" />
                      <div>
                        <p className="text-sm text-orange-700">{t('results.forecast.roe')}</p>
                        <p className="text-2xl font-bold text-orange-800">12.8%</p>
                        <p className="text-xs text-orange-600">10-year average</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Charts */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">Detailed Forecast Charts</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chart 1: Cash Flow */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('results.forecast.chart1')}</CardTitle>
                </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={cashFlowData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

              {/* Chart 2: Tax Burden */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('results.forecast.chart2')}</CardTitle>
                </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={taxBurdenData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--destructive))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Chart 3: Net Worth */}
                <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('results.forecast.chart3')}</CardTitle>
                </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={netWorthData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>

                {/* Chart 4: Liabilities */}
                <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{t('results.forecast.chart4')}</CardTitle>
                </CardHeader>
                  <CardContent>
                    <ChartContainer config={chartConfig} className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={liabilitiesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="year" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="value" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Module C: Sensitivity & Risk Analysis */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-primary">{t('results.risk.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800">{t('results.risk.factors')}</h3>
              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  {t('risk.factor1')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  {t('risk.factor2')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  {t('risk.factor3')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  {t('risk.factor4')}
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2"></span>
                  {t('risk.factor5')}
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};