import React, { useState, useEffect } from 'react';
import { Calendar, TrendingUp, TrendingDown, DollarSign, Filter, Download } from 'lucide-react';
import './App.css';
const ReportsPage = () => {
  const [selectedType, setSelectedType] = useState('debit');
  const [startDate, setStartDate] = useState('2024-01-01');
  const [endDate, setEndDate] = useState('2024-12-31');
  type ChartDataItem = {
    category: string;
    amount: number;
    percentage: string | number;
    color: string;
  };
  const [chartData, setChartData] = useState<ChartDataItem[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState('all');
  const [searchCategory, setSearchCategory] = useState('');

  // Mock transaction data
  const mockTransactions = [
    { id: 1, type: 'debit', category: 'Grocery', amount: 1200, date: '2024-06-15' },
    { id: 2, type: 'debit', category: 'Hospital', amount: 800, date: '2024-06-20' },
    { id: 3, type: 'debit', category: 'Transport', amount: 300, date: '2024-06-25' },
    { id: 4, type: 'debit', category: 'Entertainment', amount: 500, date: '2024-07-01' },
    { id: 5, type: 'credit', category: 'Salary', amount: 5000, date: '2024-07-01' },
    { id: 6, type: 'credit', category: 'Freelance', amount: 1500, date: '2024-06-28' },
    { id: 7, type: 'debit', category: 'Grocery', amount: 950, date: '2024-07-05' },
    { id: 8, type: 'debit', category: 'Hospital', amount: 1200, date: '2024-07-03' },
    { id: 9, type: 'debit', category: 'Transport', amount: 200, date: '2024-07-04' },
    { id: 10, type: 'credit', category: 'Investment', amount: 2000, date: '2024-07-02' },
    { id: 11, type: 'debit', category: 'Utilities', amount: 400, date: '2024-07-06' },
    { id: 12, type: 'debit', category: 'Shopping', amount: 600, date: '2024-07-07' },
  ];

  // Colors for categories
  const categoryColors = {
    'Salary': '#4f46e5',
    'Grocery': '#10b981',
    'Hospital': '#ef4444',
    'Transport': '#f59e0b',
    'Entertainment': '#8b5cf6',
    'Freelance': '#06b6d4',
    'Investment': '#84cc16',
    'Utilities': '#f97316',
    'Shopping': '#ec4899',
    'Others': '#6b7280'
  };

  // Get all unique categories
  const getAllCategories = () => {
    const categories = [...new Set(mockTransactions.map(t => t.category))];
    return categories.sort();
  };

  // Filter and process data
  useEffect(() => {
    let filteredTransactions = mockTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return transaction.type === selectedType &&
             transactionDate >= start &&
             transactionDate <= end;
    });

    // Apply category filtering
    if (selectedCategories.length > 0) {
      filteredTransactions = filteredTransactions.filter(transaction => 
        selectedCategories.includes(transaction.category as string)
      );
    }

    // Apply search filter
    if (searchCategory) {
      filteredTransactions = filteredTransactions.filter(transaction => 
        transaction.category.toLowerCase().includes(searchCategory.toLowerCase())
      );
    }

    // Group by category
    const categoryTotals = {};
    filteredTransactions.forEach(transaction => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });

    const total = Object.values(categoryTotals).reduce((sum, amount) => (sum as number) + (amount as number), 0) as number;
    setTotalAmount(total);

    // Convert to chart data
    let processedData = Object.entries(categoryTotals).map(([category, amount]) => {
      const amountNum = Number(amount);
      return {
        category,
        amount: amountNum,
        percentage: total > 0 ? ((amountNum / total) * 100).toFixed(1) : 0,
        color: categoryColors[category] || categoryColors['Others']
      };
    });

    // Sort by amount (descending)
    processedData.sort((a, b) => b.amount - a.amount);

    // Apply view mode
    if (viewMode === 'top5') {
      processedData = processedData.slice(0, 5);
    }

    setChartData(processedData);
  }, [selectedType, startDate, endDate, selectedCategories, searchCategory, viewMode]);

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchCategory('');
    setViewMode('all');
  };

  // 3D Pie Chart Component
  const PieChart3D = ({ data }) => {
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [rotation, setRotation] = useState(0);
    const [animationProgress, setAnimationProgress] = useState(0);
    
    const radius = 120;
    const centerX = 200;
    const centerY = 150;
    const baseDepth = 25;
    const hoverElevation = 8;
    const total = data.reduce((sum, item) => sum + item.amount, 0);

    // Auto-rotation animation
    useEffect(() => {
      if (hoveredSlice !== null) return;
      
      const interval = setInterval(() => {
        setRotation(prev => (prev + 0.3) % 360);
      }, 100);
      return () => clearInterval(interval);
    }, [hoveredSlice]);

    // Initial animation
    useEffect(() => {
      setAnimationProgress(0);
      const timer = setTimeout(() => {
        setAnimationProgress(1);
      }, 100);
      return () => clearTimeout(timer);
    }, [data]);

    if (data.length === 0 || total === 0) return null;

    const getSliceDepth = (index) => {
      const isHovered = hoveredSlice === index;
      return baseDepth + (isHovered ? hoverElevation : 0);
    };

    const getSliceTransform = (index) => {
      const isHovered = hoveredSlice === index;
      const elevationOffset = isHovered ? -4 : 0;
      const scale = isHovered ? 1.02 : 1;
      return `translate(0, ${elevationOffset}) scale(${scale})`;
    };

    const getSliceOpacity = (index) => {
      if (hoveredSlice === null) return 1;
      return hoveredSlice === index ? 1 : 0.7;
    };

    let currentAngle = rotation;

    return (
      <div className="relative">
        <svg width="400" height="350" className="overflow-visible">
          {/* Background glow */}
          <defs>
            <radialGradient id="backgroundGlow" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="rgba(99, 102, 241, 0.1)" />
              <stop offset="100%" stopColor="rgba(99, 102, 241, 0)" />
            </radialGradient>
          </defs>
          
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 50}
            fill="url(#backgroundGlow)"
          />

          {/* Bottom slices (depth) */}
          {data.map((item, index) => {
            const angle = (item.amount / total) * 360 * animationProgress;
            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;
            const depth = getSliceDepth(index);
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY + depth}`,
              `L ${x1} ${y1 + depth}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2 + depth}`,
              'Z'
            ].join(' ');
            
            currentAngle += angle;
            
            return (
              <path
                key={`bottom-${index}`}
                d={pathData}
                fill={item.color}
                opacity={getSliceOpacity(index) * 0.4}
                stroke="#fff"
                strokeWidth="1"
                transform={getSliceTransform(index)}
                className="transition-all duration-200"
                style={{
                  filter: hoveredSlice === index ? 'brightness(0.7)' : 'brightness(0.5)'
                }}
              />
            );
          })}
          
          {/* Side edges */}
          {(() => { currentAngle = rotation; return null; })()}
          
          {data.map((item, index) => {
            const angle = (item.amount / total) * 360 * animationProgress;
            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;
            const depth = getSliceDepth(index);
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            currentAngle += angle;
            
            return (
              <path
                key={`side-${index}`}
                d={`M ${x1} ${y1} L ${x1} ${y1 + depth} L ${x2} ${y2 + depth} L ${x2} ${y2} Z`}
                fill={item.color}
                opacity={getSliceOpacity(index) * 0.6}
                stroke="#fff"
                strokeWidth="1"
                transform={getSliceTransform(index)}
                className="transition-all duration-200"
                style={{
                  filter: hoveredSlice === index ? 'brightness(0.8)' : 'brightness(0.7)'
                }}
              />
            );
          })}
          
          {/* Top slices */}
          {(() => { currentAngle = rotation; return null; })()}
          
          {data.map((item, index) => {
            const angle = (item.amount / total) * 360 * animationProgress;
            const startAngle = (currentAngle * Math.PI) / 180;
            const endAngle = ((currentAngle + angle) * Math.PI) / 180;
            
            const x1 = centerX + radius * Math.cos(startAngle);
            const y1 = centerY + radius * Math.sin(startAngle);
            const x2 = centerX + radius * Math.cos(endAngle);
            const y2 = centerY + radius * Math.sin(endAngle);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            
            const pathData = [
              `M ${centerX} ${centerY}`,
              `L ${x1} ${y1}`,
              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z'
            ].join(' ');
            
            const labelAngle = (startAngle + endAngle) / 2;
            const labelRadius = radius + 30;
            const labelX = centerX + labelRadius * Math.cos(labelAngle);
            const labelY = centerY + labelRadius * Math.sin(labelAngle);
            
            currentAngle += angle;
            
            return (
              <g key={`top-${index}`}>
                <path
                  d={pathData}
                  fill={item.color}
                  stroke="#fff"
                  strokeWidth="2"
                  opacity={getSliceOpacity(index)}
                  transform={getSliceTransform(index)}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredSlice(index)}
                  onMouseLeave={() => setHoveredSlice(null)}
                  style={{
                    filter: hoveredSlice === index ? 'brightness(1.1) drop-shadow(0 4px 15px rgba(0,0,0,0.2))' : 'brightness(1)'
                  }}
                />
                
                <text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="text-xs font-bold fill-gray-800 pointer-events-none"
                  style={{
                    fontSize: hoveredSlice === index ? '12px' : '11px'
                  }}
                >
                  {item.percentage}%
                </text>
              </g>
            );
          })}
          
          {/* Center dot */}
          <circle
            cx={centerX}
            cy={centerY}
            r="4"
            fill="rgba(255, 255, 255, 0.9)"
            stroke="#e5e7eb"
            strokeWidth="2"
          />
        </svg>
        
        {/* Tooltip */}
        {hoveredSlice !== null && (
          <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 border border-gray-200 z-10 animate-in fade-in duration-200">
            <div className="flex items-center gap-2 mb-2">
              <div 
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: data[hoveredSlice].color }}
              />
              <span className="font-semibold text-gray-900">{data[hoveredSlice].category}</span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Amount: <span className="font-semibold text-gray-900">₹{data[hoveredSlice].amount.toLocaleString()}</span></p>
              <p>Percentage: <span className="font-semibold text-indigo-600">{data[hoveredSlice].percentage}%</span></p>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Financial Reports</h1>
          <p className="text-gray-600">Analyze your spending patterns and income sources</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="debit">Debit (Expenses)</option>
                <option value="credit">Credit (Income)</option>
              </select>
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex-1 min-w-48">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Category
              </label>
              <input
                type="text"
                value={searchCategory}
                onChange={(e) => setSearchCategory(e.target.value)}
                placeholder="Search categories..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-2">
              <button 
                onClick={clearAllFilters}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 flex items-center gap-2"
              >
                Clear Filters
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2">
                <Filter size={16} />
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total {selectedType === 'debit' ? 'Expenses' : 'Income'}</p>
                <p className="text-2xl font-bold text-gray-900">₹{totalAmount.toLocaleString()}</p>
              </div>
              <div className={`p-3 rounded-full ${selectedType === 'debit' ? 'bg-red-100' : 'bg-green-100'}`}>
                {selectedType === 'debit' ? 
                  <TrendingDown className="text-red-600" size={24} /> : 
                  <TrendingUp className="text-green-600" size={24} />
                }
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-gray-900">{chartData.length}</p>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <Filter className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average per Category</p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{chartData.length > 0 ? Math.round(totalAmount / chartData.length).toLocaleString() : 0}
                </p>
              </div>
              <div className="p-3 rounded-full bg-purple-100">
                <DollarSign className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 3D Pie Chart */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedType === 'debit' ? 'Expense' : 'Income'} Distribution
              </h2>
              <div className="flex gap-2">
                <select
                  value={viewMode}
                  onChange={(e) => setViewMode(e.target.value)}
                  className="px-3 py-1 border border-gray-300 rounded-md text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="top5">Top 5 Categories</option>
                </select>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center gap-2">
                  <Download size={16} />
                  Export
                </button>
              </div>
            </div>
            
            {chartData.length > 0 ? (
              <div className="flex justify-center">
                <PieChart3D data={chartData} />
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <div className="text-center">
                  <Calendar size={48} className="mx-auto mb-4 text-gray-400" />
                  <p>No data available for selected period</p>
                </div>
              </div>
            )}
          </div>

          {/* Legend and Details */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Category Breakdown</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {chartData.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-medium text-gray-900">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">₹{item.amount.toLocaleString()}</p>
                    <p className="text-sm text-gray-600">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Analytics */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {chartData.slice(0, 3).map((item, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="font-medium text-gray-900">{item.category}</span>
                </div>
                <p className="text-sm text-gray-600">
                  {index === 0 ? 'Highest' : index === 1 ? 'Second highest' : 'Third highest'} {selectedType === 'debit' ? 'expense' : 'income'} category
                </p>
                <p className="text-lg font-semibold text-gray-900">₹{item.amount.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;