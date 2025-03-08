import React, { useState } from 'react';
import { 
  Activity, AlertCircle, CheckCircle2, Download, 
  MessageSquare, Moon, Sun, Terminal 
} from 'lucide-react';
import { Feature, SystemMetrics, AnalysisReport } from '../types';
import FeatureList from './FeatureList';
import MetricsCard from './MetricsCard';
import AIChat from './AIChat';
import DataSourceManager from './DataIntegration/DataSourceManager';
import AnalyticsOverview from './Analytics/AnalyticsOverview';

const mockData: AnalysisReport = {
  timestamp: new Date().toISOString(),
  features: [
    {
      id: '1',
      name: 'Authentication Service',
      status: 'healthy',
      description: 'User authentication and authorization system',
      lastChecked: new Date().toISOString(),
      recommendations: ['Consider implementing 2FA for enhanced security']
    },
    {
      id: '2',
      name: 'Data Processing Pipeline',
      status: 'warning',
      description: 'Real-time data processing and analysis',
      lastChecked: new Date().toISOString(),
      recommendations: ['Optimize batch processing', 'Add error recovery mechanism']
    },
    {
      id: '3',
      name: 'API Gateway',
      status: 'error',
      description: 'API routing and management',
      lastChecked: new Date().toISOString(),
      recommendations: ['Implement rate limiting', 'Add request validation']
    }
  ],
  metrics: {
    cpuUsage: 45,
    memoryUsage: 68,
    responseTime: 250,
    uptime: 99.9
  },
  recommendations: [
    'Implement caching layer for better performance',
    'Add monitoring for API endpoints',
    'Update security protocols'
  ]
};

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const downloadReport = () => {
    const report = JSON.stringify(mockData, null, 2);
    const blob = new Blob([report], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-report-${new Date().toISOString()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold dark:text-white flex items-center gap-2">
            <Activity className="h-8 w-8 text-blue-600" />
            AI Business Intelligence
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {darkMode ? (
                <Sun className="h-6 w-6 text-yellow-400" />
              ) : (
                <Moon className="h-6 w-6 text-gray-600" />
              )}
            </button>
            <button
              onClick={downloadReport}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Export Report
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="CPU Usage"
            value={`${mockData.metrics.cpuUsage}%`}
            icon={<Terminal className="h-6 w-6" />}
            trend="up"
          />
          <MetricsCard
            title="Memory Usage"
            value={`${mockData.metrics.memoryUsage}%`}
            icon={<AlertCircle className="h-6 w-6" />}
            trend="down"
          />
          <MetricsCard
            title="Response Time"
            value={`${mockData.metrics.responseTime}ms`}
            icon={<Activity className="h-6 w-6" />}
            trend="stable"
          />
          <MetricsCard
            title="Uptime"
            value={`${mockData.metrics.uptime}%`}
            icon={<CheckCircle2 className="h-6 w-6" />}
            trend="up"
          />
        </div>

        <div className="space-y-8">
          <AnalyticsOverview />
          
          <DataSourceManager />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FeatureList features={mockData.features} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
              <h2 className="text-xl font-semibold mb-4 dark:text-white">AI Recommendations</h2>
              <ul className="space-y-4">
                {mockData.recommendations.map((rec, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
                  >
                    <span className="mt-1">•</span>
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowChat(!showChat)}
          className="fixed bottom-6 right-6 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {showChat && <AIChat onClose={() => setShowChat(false)} />}
      </div>
    </div>
  );
}