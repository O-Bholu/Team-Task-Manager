import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import api from '../services/api';

const DashboardPage = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [stats, setStats] = useState({ totalProjects: 0, totalTasks: 0, completedTasks: 0, pendingTasks: 0, overdueTasks: 0 });
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/tasks/dashboard');
        setStats(response.data);
      } catch (err) {
        console.error('Failed to fetch dashboard', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const today = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Projects', path: '/projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { name: 'Tasks', path: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Calendar', path: '/calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Team', path: '/team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans text-slate-800 overflow-hidden">
      
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      {/* LEFT SIDEBAR */}
      <aside className={`w-64 shrink-0 bg-[#0B132B] text-slate-300 flex flex-col justify-between transition-all duration-300 absolute z-30 h-full md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          {/* Logo */}
          <div className="h-20 flex items-center px-6 gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">TaskManager</span>
          </div>

          {/* Nav Links */}
          <nav className="px-4 space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path;
              return (
                <Link 
                  key={item.name} 
                  to={item.path} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive 
                      ? 'bg-blue-600/10 text-blue-500 font-semibold shadow-inner' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
                  }`}
                >
                  <svg className={`w-5 h-5 transition-colors ${isActive ? 'text-blue-500' : 'text-slate-500 group-hover:text-slate-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={isActive ? "2" : "1.5"} d={item.icon} />
                  </svg>
                  <span>{item.name}</span>
                  {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-500"></div>}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* TOP NAVBAR */}
        <header className="h-20 bg-white/70 backdrop-blur-xl border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 rounded-lg text-slate-500 hover:bg-slate-100 md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
            <h2 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">Dashboard</h2>
          </div>

          <div className="flex-1 max-w-md px-8 hidden md:block">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <input type="text" className="block w-full pl-10 pr-3 py-2 border-none rounded-full bg-slate-100/80 text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:bg-white transition-all shadow-sm" placeholder="Search tasks, projects..." />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
              <span className="absolute top-1.5 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white"></span>
            </button>
            
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-sm font-bold text-slate-800 leading-tight">{user.name || user.email?.split('@')[0]}</span>
                <span className="text-xs font-medium text-slate-500">{user.role}</span>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-blue-500/20 ring-2 ring-white cursor-pointer" onClick={handleLogout} title="Click to logout">
                {user.email ? user.email.charAt(0).toUpperCase() : 'U'}
              </div>
            </div>
          </div>
        </header>

        {/* SCROLLABLE MAIN CONTENT */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth pb-20">
          
          {/* Greeting Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 animate-fade-in-up">
            <div>
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                {getGreeting()}, {user.email?.split('@')[0] || 'User'} <span className="text-2xl animate-wave origin-bottom-right inline-block">👋</span>
              </h1>
              <p className="text-slate-500 mt-1">Here's what's happening with your projects today.</p>
            </div>
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-sm text-sm font-medium text-slate-600">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              {today}
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {/* Total Tasks */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Total Tasks</p>
                  <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                    {loading ? <span className="inline-block w-8 h-8 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></span> : (stats?.totalTasks || 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>12%</span>
                <span className="text-slate-400 ml-1 font-normal">from last week</span>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Completed</p>
                  <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                    {loading ? <span className="inline-block w-8 h-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin"></span> : (stats?.completedTasks || 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>8%</span>
                <span className="text-slate-400 ml-1 font-normal">from last week</span>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">In Progress</p>
                  <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                    {loading ? <span className="inline-block w-8 h-8 rounded-full border-2 border-amber-500 border-t-transparent animate-spin"></span> : (stats?.pendingTasks || 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-emerald-600">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                <span>5%</span>
                <span className="text-slate-400 ml-1 font-normal">from last week</span>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-slate-500 mb-1">Overdue</p>
                  <h3 className="text-3xl font-bold text-slate-800 tracking-tight">
                    {loading ? <span className="inline-block w-8 h-8 rounded-full border-2 border-red-500 border-t-transparent animate-spin"></span> : (stats?.overdueTasks || 0)}
                  </h3>
                </div>
                <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs font-medium text-red-500">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                <span>3%</span>
                <span className="text-slate-400 ml-1 font-normal">from last week</span>
              </div>
            </div>
          </div>

          {/* Charts & Visual Hierarchy Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            
            {/* Main Mock Chart Area */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Task Overview</h3>
                <select className="bg-slate-50 border border-slate-200 text-slate-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2 outline-none cursor-pointer">
                  <option>This Week</option>
                  <option>Last Week</option>
                </select>
              </div>
              <div className="flex-1 w-full relative min-h-[250px] flex items-end">
                {/* SVG Mock Chart with Smooth Lines matching the prompt request */}
                <svg viewBox="0 0 800 300" className="w-full h-full text-slate-200 drop-shadow-sm" preserveAspectRatio="none">
                  {/* Grid lines */}
                  <line x1="0" y1="50" x2="800" y2="50" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="0" y1="125" x2="800" y2="125" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                  <line x1="0" y1="200" x2="800" y2="200" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                  
                  {/* Green Line (Completed) */}
                  <path d="M 0,200 C 100,100 200,150 300,50 C 400,-20 500,100 600,120 C 700,140 800,50 800,50" fill="none" stroke="#10b981" strokeWidth="4" strokeLinecap="round" className="drop-shadow-md" />
                  
                  {/* Blue Line (In Progress) */}
                  <path d="M 0,250 C 100,200 200,280 300,180 C 400,120 500,200 600,160 C 700,120 800,220 800,220" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" className="drop-shadow-md" />
                  
                  {/* Red Line (Overdue) */}
                  <path d="M 0,280 C 150,290 250,260 400,270 C 550,280 650,250 800,280" fill="none" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
                </svg>
                {/* X Axis labels */}
                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-xs font-medium text-slate-400 px-2">
                  <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                </div>
              </div>
              <div className="mt-8 flex justify-center gap-6">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-sm text-slate-500">Completed</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-sm text-slate-500">In Progress</span></div>
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-sm text-slate-500">Overdue</span></div>
              </div>
            </div>

            {/* Secondary Visual (Donut Chart Mock) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col items-center justify-center">
              <h3 className="text-lg font-bold text-slate-800 self-start mb-6">Tasks by Status</h3>
              <div className="relative w-48 h-48 mb-6">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90 drop-shadow-md">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="20" strokeDasharray="40 251" strokeDashoffset="0" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="20" strokeDasharray="30 251" strokeDashoffset="-40" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="20" strokeDasharray="80 251" strokeDashoffset="-70" />
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="20" strokeDasharray="101 251" strokeDashoffset="-150" />
                </svg>
                {/* Inner blank circle for donut effect */}
                <div className="absolute inset-0 m-auto w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                  <span className="text-2xl font-bold text-slate-800">{loading ? '...' : (stats?.totalTasks || 0)}</span>
                  <span className="text-xs text-slate-400 font-medium">Total</span>
                </div>
              </div>
              <div className="w-full space-y-3">
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-500"></span><span className="text-slate-600">Completed</span></div><span className="font-semibold text-slate-800">{stats?.completedTasks || 0}</span></div>
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span><span className="text-slate-600">In Progress</span></div><span className="font-semibold text-slate-800">{stats?.pendingTasks || 0}</span></div>
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-500"></span><span className="text-slate-600">To Do</span></div><span className="font-semibold text-slate-800">-</span></div>
                <div className="flex justify-between items-center text-sm"><div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span><span className="text-slate-600">Overdue</span></div><span className="font-semibold text-slate-800">{stats?.overdueTasks || 0}</span></div>
              </div>
            </div>
          </div>

          {/* Quick Actions (Since we can't show actual recent tasks without modifying logic) */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <div className="px-6 py-5 border-b border-slate-100 bg-white flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-800">Quick Actions</h3>
              <Link to="/projects" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">View all</Link>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Link to="/projects" className="group flex items-center p-4 rounded-xl border border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 hover:shadow-md transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">View Projects</h4>
                    <p className="text-sm text-slate-500 mt-0.5">Access and manage team workspaces</p>
                  </div>
                </Link>
                
                {user.role === 'ADMIN' && (
                  <Link to="/projects" className="group flex items-center p-4 rounded-xl border border-slate-100 hover:border-indigo-500 hover:bg-indigo-50/50 hover:shadow-md transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">Create Workspace</h4>
                      <p className="text-sm text-slate-500 mt-0.5">Start a new project for your team</p>
                    </div>
                  </Link>
                )}
              </div>
            </div>
          </div>

        </main>
        
        {/* FIXED FOOTER */}
        <footer className="w-full bg-[#0B132B] text-slate-300 py-3 flex justify-center items-center text-sm border-t border-slate-800 z-10">
          <span className="font-medium tracking-wide">
            build with React & SpringBoot by <span className="text-white font-bold">Bholu</span> <span className="text-red-500 animate-pulse text-base inline-block ml-1">❤️</span>
          </span>
        </footer>
      </div>
      
      {/* Custom CSS for animations */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes wave {
          0% { transform: rotate(0.0deg) }
          10% { transform: rotate(14.0deg) }
          20% { transform: rotate(-8.0deg) }
          30% { transform: rotate(14.0deg) }
          40% { transform: rotate(-4.0deg) }
          50% { transform: rotate(10.0deg) }
          60% { transform: rotate(0.0deg) }
          100% { transform: rotate(0.0deg) }
        }
        .animate-wave {
          animation: wave 2s infinite;
        }
        
        /* Custom scrollbar for main area */
        main::-webkit-scrollbar {
          width: 6px;
        }
        main::-webkit-scrollbar-track {
          background: transparent;
        }
        main::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
