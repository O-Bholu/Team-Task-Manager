import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const AllTasksPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, logout } = useContext(AuthContext);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
    if (user?.role === 'ADMIN') {
      fetchUsers();
    }
  }, [user]);

  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks/all`);
      setTasks(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  const handleEditTask = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/tasks/${editTask.id}/details`, editTask);
      setShowEditModal(false);
      fetchTasks();
    } catch (error) {
      console.error('Failed to edit task', error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.delete(`/tasks/${taskId}`);
        fetchTasks();
      } catch (error) {
        console.error('Failed to delete task', error);
      }
    }
  };

  const handleUpdateStatus = async (taskId, newStatus) => {
    try {
      await api.put(`/tasks/${taskId}?status=${newStatus}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to update task status', error);
    }
  };

  const getUserName = (id) => {
    if (!id) return 'Unassigned';
    if (!users.length) return id; // For members who can't fetch users
    const u = users.find(user => user.id === id);
    return u ? u.name || u.email : id;
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { name: 'Projects', path: '/projects', icon: 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z' },
    { name: 'Tasks', path: '/tasks', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
    { name: 'Calendar', path: '/calendar', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { name: 'Team', path: '/team', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Settings', path: '/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' }
  ];

  // Group tasks by status for a Kanban-lite view
  const tasksByStatus = {
    TODO: tasks.filter(t => t.status === 'TODO'),
    IN_PROGRESS: tasks.filter(t => t.status === 'IN_PROGRESS'),
    DONE: tasks.filter(t => t.status === 'DONE')
  };

  return (
    <div className="flex h-screen bg-[#F4F7FE] font-sans text-slate-800 overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}
      {/* LEFT SIDEBAR */}
      <aside className={`w-64 shrink-0 bg-[#0B132B] text-slate-300 flex flex-col justify-between transition-all duration-300 absolute z-30 h-full md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <div className="h-20 flex items-center px-6 gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="text-white font-bold text-xl tracking-wide">TaskManager</span>
          </div>

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
            <h2 className="text-xl font-bold text-slate-800 tracking-tight hidden sm:block">My Tasks</h2>
          </div>

          <div className="flex items-center gap-6">
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
        <main className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth pb-20 animate-fade-in-up">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-500 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Column: TODO */}
              <div className="bg-slate-100/50 rounded-2xl p-4 border border-slate-200/60 shadow-sm">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-semibold text-slate-700 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span> To Do
                  </h3>
                  <span className="bg-white text-slate-500 text-xs font-bold px-2 py-1 rounded-full shadow-sm">{tasksByStatus.TODO.length}</span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.TODO.map(task => <TaskCard key={task.id} task={task} />)}
                  {tasksByStatus.TODO.length === 0 && <p className="text-sm text-slate-400 italic px-2 py-4 text-center border-2 border-dashed border-slate-200 rounded-xl">No tasks to do</p>}
                </div>
              </div>

              {/* Column: IN_PROGRESS */}
              <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 shadow-sm">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-semibold text-blue-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse"></span> In Progress
                  </h3>
                  <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">{tasksByStatus.IN_PROGRESS.length}</span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.IN_PROGRESS.map(task => <TaskCard key={task.id} task={task} />)}
                  {tasksByStatus.IN_PROGRESS.length === 0 && <p className="text-sm text-slate-400 italic px-2 py-4 text-center border-2 border-dashed border-blue-100 rounded-xl">No active tasks</p>}
                </div>
              </div>

              {/* Column: DONE */}
              <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100 shadow-sm">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className="font-semibold text-emerald-800 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
                  </h3>
                  <span className="bg-white text-emerald-600 text-xs font-bold px-2 py-1 rounded-full shadow-sm">{tasksByStatus.DONE.length}</span>
                </div>
                <div className="space-y-3">
                  {tasksByStatus.DONE.map(task => <TaskCard key={task.id} task={task} />)}
                  {tasksByStatus.DONE.length === 0 && <p className="text-sm text-slate-400 italic px-2 py-4 text-center border-2 border-dashed border-emerald-100 rounded-xl">No completed tasks</p>}
                </div>
              </div>
            </div>
          )}
        </main>
        
        {/* FIXED FOOTER */}
        <footer className="w-full bg-[#0B132B] text-slate-300 py-3 flex justify-center items-center text-sm border-t border-slate-800 z-10">
          <span className="font-medium tracking-wide">
            build with React & SpringBoot by <span className="text-white font-bold">Bholu</span> <span className="text-red-500 animate-pulse text-base inline-block ml-1">❤️</span>
          </span>
        </footer>
      </div>

      {/* EDIT TASK MODAL */}
      {showEditModal && editTask && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity bg-slate-900/50 backdrop-blur-sm" onClick={() => setShowEditModal(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div className="inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-2xl shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Edit Task</h3>
              <form onSubmit={handleEditTask} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Task Title</label>
                  <input type="text" required value={editTask.title} onChange={(e) => setEditTask({...editTask, title: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                  <textarea required value={editTask.description} onChange={(e) => setEditTask({...editTask, description: e.target.value})} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Assign To</label>
                  <select value={editTask.assignedTo || ''} onChange={(e) => setEditTask({...editTask, assignedTo: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none">
                    <option value="">Unassigned</option>
                    {users.map(u => (
                      <option key={u.id} value={u.id}>{u.name || u.email} ({u.role})</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Due Date</label>
                  <input type="date" value={editTask.dueDate ? editTask.dueDate.substring(0, 10) : ''} onChange={(e) => setEditTask({...editTask, dueDate: e.target.value})} className="w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none" />
                </div>
                <div className="mt-5 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 sm:ml-3 sm:w-auto sm:text-sm">Save Changes</button>
                  <button type="button" onClick={() => setShowEditModal(false)} className="mt-3 w-full inline-flex justify-center rounded-lg border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:w-auto sm:text-sm">Cancel</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.5s ease-out forwards;
        }
        main::-webkit-scrollbar { width: 6px; }
        main::-webkit-scrollbar-track { background: transparent; }
        main::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
      `}</style>
    </div>
  );

  function TaskCard({ task }) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow group relative">
        {user.role === 'ADMIN' && (
          <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button onClick={() => { setEditTask({...task}); setShowEditModal(true); }} className="p-1 text-slate-400 hover:text-blue-600 bg-white rounded-md hover:bg-blue-50 shadow-sm border border-slate-100" title="Edit Task">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button>
            <button onClick={() => handleDeleteTask(task.id)} className="p-1 text-slate-400 hover:text-red-600 bg-white rounded-md hover:bg-red-50 shadow-sm border border-slate-100" title="Delete Task">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            </button>
          </div>
        )}
        <Link to={`/projects/${task.projectId}/tasks`} className="block pr-12 hover:text-blue-600">
          <h4 className="font-semibold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors">{task.title}</h4>
        </Link>
        <p className="text-sm text-slate-500 mt-2 line-clamp-2">{task.description}</p>
        
        <div className="mt-4 pt-4 border-t border-slate-100 flex items-end justify-between gap-2">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Assignee</span>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                {task.assignedTo ? getUserName(task.assignedTo).charAt(0).toUpperCase() : '?'}
              </div>
              <span className="text-xs font-medium text-slate-700 truncate max-w-[80px]" title={getUserName(task.assignedTo)}>
                {getUserName(task.assignedTo)}
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-1 items-end">
            <select
              value={task.status}
              onChange={(e) => handleUpdateStatus(task.id, e.target.value)}
              className={`text-xs font-bold px-2 py-1 rounded-md border-0 focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm ${
                task.status === 'TODO' ? 'bg-slate-100 text-slate-700' : 
                task.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-700' : 
                'bg-emerald-100 text-emerald-700'
              }`}
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
};

export default AllTasksPage;
