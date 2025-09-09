import React, { useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import FinancialForm from './components/FinancialForm';
import AnalysisResults from './components/AnalysisResults';
import LoadingSpinner from './components/LoadingSpinner';
import { financialApiService } from './services/financialApi';
import { BarChart3, TrendingUp, AlertCircle } from 'lucide-react';

const App = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (data) => {
    setLoading(true);
    setError(null);
    
    try {
      const analysisResults = await financialApiService.performCompleteAnalysis(data);
      setResults(analysisResults);
      toast.success(`Analysis completed for ${data.company_name}!`);
    } catch (err) {
      const errorMessage = err?.response?.data?.detail || err?.message || 'Failed to analyze financial data';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResults(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#fff',
            color: '#374151',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-primary-600 mr-3" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Financial Analysis Tool
                </h1>
                <p className="text-sm text-gray-600">
                  Comprehensive financial metrics and analysis
                </p>
              </div>
            </div>
            {results && (
              <button
                onClick={resetAnalysis}
                className="btn-secondary flex items-center"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                New Analysis
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading && (
          <div className="flex flex-col items-center justify-center py-12">
            <LoadingSpinner size="large" />
            <p className="mt-4 text-lg text-gray-600">
              Analyzing financial data...
            </p>
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Analysis Error
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!results && !loading && (
          <FinancialForm onSubmit={handleAnalyze} loading={loading} />
        )}

        {results && !loading && (
          <AnalysisResults results={results} />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-500">
            <p>
              Financial Analysis Tool - Built with React and FastAPI
            </p>
            <p className="mt-1">
              Connect to API at: <code className="bg-gray-100 px-2 py-1 rounded">
                http://localhost:8000
              </code>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
