import Resume from "./Resume";
import React, { useState, useEffect } from 'react';
import { studentAPI } from '../../api/student';
import StudentProfile from './StudentProfile';
import StudentMarks from './StudentMarks';
import StudentQuestions from './StudentQuestion';
import StudentInterests from './StudentInterest';
import TeacherAssignment from './TeacherAssignment';
import SemesterUpdate from './SemisterUpdate';
import StudentUpdate from './StudentUpdate';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const data = await studentAPI.getDashboard();
      setStudentData(data);
      setError(null);
    } catch (err) {
      setError('Failed to load dashboard data: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = () => {
    fetchDashboardData();
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-blue-200/50 shadow-2xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-700 text-lg font-medium">Loading your dashboard...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-red-200/50 shadow-2xl max-w-md">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="text-gray-800 text-lg font-medium text-center">Oops! Something went wrong</p>
        <p className="text-red-600 text-center mt-2">{error}</p>
      </div>
    </div>
  );

  if (!studentData) return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-slate-50 to-zinc-50 flex items-center justify-center">
      <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-gray-200/50 shadow-2xl">
        <p className="text-gray-700 text-lg font-medium">No data available</p>
      </div>
    </div>
  );

  const tabs = [
    { id: 'profile', label: 'Profile', icon: '👤', component: StudentProfile, color: 'from-blue-500 to-cyan-500' },
    { id: 'marks', label: 'Marks', icon: '📊', component: StudentMarks, color: 'from-green-500 to-emerald-500' },
    { id: 'questions', label: 'Questions', icon: '❓', component: StudentQuestions, color: 'from-purple-500 to-violet-500' },
    { id: 'interests', label: 'Interests', icon: '💡', component: StudentInterests, color: 'from-yellow-500 to-orange-500' },
    { id: 'teacher', label: 'Teacher Assignment', icon: '👨‍🏫', component: TeacherAssignment, color: 'from-indigo-500 to-purple-500' },
    { id: 'semester', label: 'Semester', icon: '📅', component: SemesterUpdate, color: 'from-pink-500 to-rose-500' },
    { id: 'updateStudentdetails', label: 'Update Details', icon: '✏️', component: StudentUpdate, color: 'from-teal-500 to-cyan-500' },
    { id: 'resume', label: 'Resume', icon: '📄', component: Resume, color: 'from-slate-500 to-gray-500' }
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  const activeTabData = tabs.find(tab => tab.id === activeTab);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-10 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="flex min-h-screen relative z-10">
        {/* Sidebar */}
        <div className={`transition-all duration-300 ease-in-out ${sidebarCollapsed ? 'w-20' : 'w-80'} bg-white/70 backdrop-blur-xl border-r border-white/40 shadow-2xl flex-shrink-0`}>
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-white/30">
              <div className="flex items-center justify-between">
                <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'justify-center' : ''}`}>
                  <div className={`w-10 h-10 bg-gradient-to-r ${activeTabData?.color || 'from-blue-500 to-cyan-500'} rounded-xl flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-200`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  {!sidebarCollapsed && (
                    <div>
                      <h1 className="text-xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Student Portal</h1>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg hover:bg-white/50 transition-colors duration-200"
                >
                  <svg className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  </svg>
                </button>
              </div>

              {!sidebarCollapsed && (
                <div className="mt-4 p-4 bg-gradient-to-r from-blue-100/50 to-purple-100/50 rounded-xl border border-white/30">
                  <p className="text-sm text-gray-600 mb-1">Welcome back,</p>
                  <p className="font-semibold text-gray-800 flex items-center">
                    {studentData.name} 
                    <span className="ml-2">✨</span>
                  </p>
                </div>
              )}
            </div>

            {/* Navigation Menu */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-2">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full group relative p-4 rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 border text-left ${
                      activeTab === tab.id
                        ? `bg-gradient-to-r ${tab.color} text-white shadow-lg border-transparent`
                        : 'bg-white/40 text-gray-700 hover:bg-white/60 hover:text-gray-900 border-gray-200/30 shadow-sm hover:shadow-md'
                    }`}
                    title={sidebarCollapsed ? tab.label : ''}
                  >
                    <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-3'}`}>
                      <span className="text-xl flex-shrink-0">{tab.icon}</span>
                      {!sidebarCollapsed && (
                        <span className="font-medium">{tab.label}</span>
                      )}
                    </div>
                    {activeTab === tab.id && (
                      <div className="absolute inset-0 bg-white/20 rounded-2xl"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-white/30">
              <button
                onClick={refreshData}
                className={`w-full group relative py-3 bg-gradient-to-r ${activeTabData?.color || 'from-blue-500 to-cyan-500'} text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 overflow-hidden ${sidebarCollapsed ? 'px-3' : 'px-6'}`}
              >
                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl"></div>
                <div className={`relative flex items-center ${sidebarCollapsed ? 'justify-center' : 'space-x-2 justify-center'}`}>
                  <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  {!sidebarCollapsed && <span>Refresh</span>}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar */}
          <div className="bg-white/50 backdrop-blur-xl border-b border-white/30 shadow-sm px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 bg-gradient-to-r ${activeTabData?.color || 'from-blue-500 to-cyan-500'} rounded-2xl flex items-center justify-center shadow-xl`}>
                  <span className="text-white text-xl">{activeTabData?.icon}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">{activeTabData?.label}</h2>
                  <div className={`h-1 w-16 bg-gradient-to-r ${activeTabData?.color || 'from-blue-500 to-cyan-500'} rounded-full mt-1`}></div>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-8">
            <div className="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl h-full overflow-hidden">
              <div className="p-8 h-full">
                {ActiveComponent && (
                  <div className="animate-fadeIn h-full">
                    <ActiveComponent 
                      studentData={studentData}
                      onUpdate={refreshData}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;