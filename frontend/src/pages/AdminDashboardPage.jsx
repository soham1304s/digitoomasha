import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import {
  Users,
  User,
  Activity,
  DollarSign,
  Database,
  Search,
  Briefcase,
  RefreshCw,
  Zap,
  UserCheck,
  Building2,
  Globe,
  Phone,
  Mail,
  ShieldCheck,
  Radio,
  Clock,
  ChevronRight,
  Lock,
  KeyRound,
  LogOut,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  ShieldAlert,
  Sliders,
  ArrowRight,
  LayoutDashboard,
  Share2,
  Plus,
  Check,
  X,
  Eye,
  Edit2,
  Trash2,
  PauseCircle,
  PlayCircle,
  AlertTriangle,
  UserX,
  Upload,
  MessageSquare,
  ThumbsUp,
  Calendar,
  Grid,
  List,
  Linkedin,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  FolderKanban,
  CheckSquare,
  ListTodo
} from 'lucide-react';
import { SOCKET_SERVER_URL, API_BASE_URL } from '../config/api';
import ProjectDeliveryCenter from '../components/ProjectDeliveryCenter';
import ProjectGithubDetailView from '../components/ProjectGithubDetailView';

const INITIAL_SOCIAL_POSTS = [
  {
    id: 'sp-101',
    title: 'Q3 Growth Blueprint: Scaling E-Commerce ROAS from 2.5x to 5.2x',
    caption: '🔥 Unlocking hyper-growth in 2026 requires real-time attribution and dynamic creative testing. Swipe to see our 3-step framework.',
    platforms: ['Linkedin', 'Twitter'],
    status: 'Scheduled',
    scheduledDate: '2026-08-05',
    scheduledTime: '14:30',
    media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Thought Leadership',
    author: 'Growth Team',
    publishedAt: '',
    projectedReach: '5.5k',
    likes: 24,
    shares: 8,
    comments: 12
  }
];

export default function AdminDashboardPage({ initialView }) {
  const { user, login, logout, isLoggedIn } = useAuth();
  const isAdminAuthenticated = isLoggedIn && user?.role === 'admin';

  // Navigation Sidebar Active Tab: 'overview' | 'social-studio' | 'clients' | 'live-feed'
  const [activeTab, setActiveTab] = useState('overview');

  // Admin Auth Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [showAuthSection, setShowAuthSection] = useState(!isAdminAuthenticated || initialView === 'login');

  // Dashboard Data State
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Real-Time Socket State
  const [isConnected, setIsConnected] = useState(false);
  const [liveSocketId, setLiveSocketId] = useState('');
  const [onlineSocketsCount, setOnlineSocketsCount] = useState(1);
  const [liveEvents, setLiveEvents] = useState([]);
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [confirmActionModal, setConfirmActionModal] = useState({
    isOpen: false,
    type: 'suspend',
    client: null,
  });

  // Social Content Studio State
  const [socialPosts, setSocialPosts] = useState(INITIAL_SOCIAL_POSTS);
  const [postPlatformFilter, setPostPlatformFilter] = useState('All');
  const [postStatusFilter, setPostStatusFilter] = useState('All');
  const [postSearchQuery, setPostSearchQuery] = useState('');
  const [postViewMode, setPostViewMode] = useState('grid'); // 'grid' | 'list'
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [uploadingMedia, setUploadingMedia] = useState(false);

  // Admin Projects Center State
  const [adminProjectSearch, setAdminProjectSearch] = useState('');
  const [adminProjectStatusFilter, setAdminProjectStatusFilter] = useState('All');
  const [inspectedAdminProject, setInspectedAdminProject] = useState(null);
  const mediaFileInputRef = useRef(null);

  const [composerData, setComposerData] = useState({
    title: '',
    caption: '',
    platforms: ['Linkedin', 'Instagram'],
    status: 'Scheduled',
    scheduledDate: new Date().toISOString().split('T')[0],
    scheduledTime: '14:00',
    media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    category: 'Educational'
  });

  // Task Studio State
  const [tasks, setTasks] = useState([]);
  const [taskSearchQuery, setTaskSearchQuery] = useState('');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState('All');
  const [taskStatusFilter, setTaskStatusFilter] = useState('All');
  const [taskViewMode, setTaskViewMode] = useState('list'); // 'list' | 'kanban'
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    status: 'To Do',
    priority: 'High',
    campaign: 'Full-Stack Software Architecture',
    assigneeName: 'Client Lead',
    dueDate: new Date().toISOString().split('T')[0],
    subtasksInput: 'Code & Architecture Review, Unit Test Coverage, Staging Deployment',
  });

  // Sync auth state
  useEffect(() => {
    if (!isAdminAuthenticated && !showAuthSection) {
      setShowAuthSection(true);
    }
  }, [isAdminAuthenticated]);

  const handleAdminLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    if (!adminEmail || !adminPassword) {
      setAuthError('Please enter both Admin Email and Password.');
      return;
    }

    setAuthLoading(true);
    const result = await login(adminEmail, adminPassword);
    setAuthLoading(false);

    if (!result.success) {
      setAuthError(result.message);
      return;
    }

    if (result.user && result.user.role !== 'admin') {
      setAuthError('Access Denied: Logged in account is a Client user, not a System Administrator.');
      return;
    }

    setShowAuthSection(false);
  };

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/admin/users`);
      const data = await res.json();
      setUsers(data.users || []);
    } catch (err) {
      console.warn('Failed to fetch admin users:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocialPosts = async () => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/social/posts`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.posts) && data.posts.length > 0) {
        setSocialPosts(data.posts);
      }
    } catch (err) {
      console.warn('Failed to fetch social posts:', err);
    }
  };

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks`);
      const data = await res.json();
      if (data && data.success && Array.isArray(data.tasks)) {
        setTasks(data.tasks);
        setInspectedAdminProject((prev) => {
          if (!prev) return null;
          const found = data.tasks.find((t) => String(t.id) === String(prev.id));
          return found ? { ...prev, ...found } : prev;
        });
      }
    } catch (err) {
      console.warn('Failed to fetch admin tasks:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSocialPosts();
    fetchTasks();

    // Connect Socket.IO Client
    const socket = io(SOCKET_SERVER_URL, {
      reconnectionAttempts: 5,
      timeout: 10000,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      setLiveSocketId(socket.id);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('socket_status', (data) => {
      setOnlineSocketsCount(data.onlineClients || 1);
    });

    socket.on('online_count_update', (data) => {
      setOnlineSocketsCount(data.count);
    });

    socket.on('user_registered', (userEvent) => {
      const newEvent = {
        id: Date.now(),
        type: 'registration',
        title: 'New Client Registered',
        details: `${userEvent.fullName} (${userEvent.email}) signed up for ${userEvent.businessName || 'growth Services'}.`,
        time: userEvent.timestamp || new Date().toLocaleTimeString(),
      };
      setLiveEvents((prev) => [newEvent, ...prev]);
      fetchUsers();
    });

    socket.on('user_logged_in', (loginEvent) => {
      const newEvent = {
        id: Date.now(),
        type: 'login',
        title: 'Client Logged In',
        details: `${loginEvent.fullName} (${loginEvent.email}) logged in.`,
        time: loginEvent.timestamp || new Date().toLocaleTimeString(),
      };
      setLiveEvents((prev) => [newEvent, ...prev]);
    });

    socket.on('new_inquiry', (inquiryEvent) => {
      const newEvent = {
        id: Date.now(),
        type: 'inquiry',
        title: 'New Proposal Request',
        details: `${inquiryEvent.name} (${inquiryEvent.email}) requested proposal for ${inquiryEvent.company || 'Direct Client'} (${inquiryEvent.budget}).`,
        time: inquiryEvent.timestamp || new Date().toLocaleTimeString(),
      };
      setLiveEvents((prev) => [newEvent, ...prev]);
    });

    // Social Content Live Sockets
    socket.on('social_post_created', (newPost) => {
      setSocialPosts((prev) => {
        if (prev.some((p) => p.id === newPost.id)) return prev;
        return [newPost, ...prev];
      });
    });

    socket.on('social_post_updated', (updatedPost) => {
      setSocialPosts((prev) =>
        prev.map((p) => (p.id === updatedPost.id ? { ...p, ...updatedPost } : p))
      );
    });

    socket.on('social_post_deleted', ({ id }) => {
      setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    });

    socket.on('user_status_changed', ({ id, status }) => {
      setUsers((prev) =>
        prev.map((u) => (String(u.id) === String(id) ? { ...u, status } : u))
      );
    });

    socket.on('user_deleted', ({ id }) => {
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
    });

    // Task Studio Sockets
    socket.on('task_created', (evt) => {
      fetchTasks();
      if (evt && evt.title) {
        setLiveEvents((prev) => [
          {
            id: Date.now(),
            type: 'task',
            title: 'Sprint Task Created',
            details: `Task "${evt.title}" created for ${evt.assignee || 'Client'}.`,
            time: evt.timestamp || new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
    });

    socket.on('task_updated', (evt) => {
      fetchTasks();
      if (evt && evt.id) {
        setLiveEvents((prev) => [
          {
            id: Date.now(),
            type: 'task',
            title: 'Sprint Task Status Updated',
            details: `Task updated to "${evt.status || 'Updated'}".`,
            time: evt.timestamp || new Date().toLocaleTimeString(),
          },
          ...prev,
        ]);
      }
    });

    socket.on('task_deleted', ({ id }) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setLiveEvents((prev) => [
        {
          id: Date.now(),
          type: 'task',
          title: 'Sprint Task Deleted',
          details: `Task ID #${id} deleted from delivery pipeline.`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev,
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Media File Upload to Cloudinary CDN
  const handleMediaFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingMedia(true);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const res = await fetch(`${SOCKET_SERVER_URL}/api/upload/media`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Data }),
        });
        const data = await res.json();
        if (data && data.url) {
          setComposerData((prev) => ({ ...prev, media: data.url }));
        } else {
          alert('Failed to upload media attachment.');
        }
        setUploadingMedia(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Media upload error:', err);
      setUploadingMedia(false);
    }
  };

  const handleOpenComposer = (postToEdit = null) => {
    if (postToEdit) {
      setEditingPostId(postToEdit.id);
      setComposerData({
        title: postToEdit.title,
        caption: postToEdit.caption,
        platforms: [...postToEdit.platforms],
        status: postToEdit.status,
        scheduledDate: postToEdit.scheduledDate || postToEdit.scheduled_date || new Date().toISOString().split('T')[0],
        scheduledTime: postToEdit.scheduledTime || postToEdit.scheduled_time || '14:00',
        media: postToEdit.media || '',
        category: postToEdit.category || 'General'
      });
    } else {
      setEditingPostId(null);
      setComposerData({
        title: '',
        caption: '',
        platforms: ['Linkedin', 'Instagram'],
        status: 'Scheduled',
        scheduledDate: new Date().toISOString().split('T')[0],
        scheduledTime: '14:00',
        media: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
        category: 'Educational'
      });
    }
    setIsComposerOpen(true);
  };

  const handleToggleComposerPlatform = (platformName) => {
    setComposerData((prev) => {
      const exists = prev.platforms.includes(platformName);
      let updated = [];
      if (exists) {
        if (prev.platforms.length === 1) return prev;
        updated = prev.platforms.filter((p) => p !== platformName);
      } else {
        updated = [...prev.platforms, platformName];
      }
      return { ...prev, platforms: updated };
    });
  };

  const handleGenerateAICaptions = () => {
    const topic = composerData.title || 'Digital Growth Strategy';
    const aiCaption = `🔥 Accelerate your ${topic} with DigiToomasha's automated AI engine!\n\nKey takeaways for agency leaders:\n1. Automate multi-channel campaign attribution 📊\n2. Scale high-ROAS creative iterations 🚀\n3. Optimize budget reallocation in real-time ✨\n\nWhat is your top strategy for Q3? Drop your thoughts below! 👇\n\n#DigiToomasha #GrowthMarketing #DigitalStrategy #ROI #AgencyGrowth`;
    setComposerData((prev) => ({
      ...prev,
      caption: aiCaption
    }));
  };

  const handleSaveComposerPost = async (actionStatus = null) => {
    if (!composerData.title.trim()) {
      alert('Please enter a post title or topic reference.');
      return;
    }

    const finalStatus = actionStatus || composerData.status || 'Scheduled';
    const payload = {
      ...composerData,
      status: finalStatus,
      author: user?.name || 'System Admin',
      publishedAt: finalStatus === 'Published' ? 'Just Now' : '',
    };

    try {
      if (editingPostId) {
        const res = await fetch(`${SOCKET_SERVER_URL}/api/social/posts/${editingPostId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data && data.success && data.post) {
          setSocialPosts((prev) =>
            prev.map((p) => (p.id === editingPostId ? { ...p, ...data.post } : p))
          );
        }
      } else {
        const res = await fetch(`${SOCKET_SERVER_URL}/api/social/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data && data.success && data.post) {
          setSocialPosts((prev) => {
            if (prev.some((p) => p.id === data.post.id)) return prev;
            return [data.post, ...prev];
          });
        }
      }
    } catch (err) {
      console.error('Save post error:', err);
    }

    setIsComposerOpen(false);
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`${SOCKET_SERVER_URL}/api/social/posts/${id}`, { method: 'DELETE' });
      } catch (err) {
        console.error('Delete post error:', err);
      }
      setSocialPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleQuickPublish = async (id) => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/social/posts/${id}/publish`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data && data.success && data.post) {
        setSocialPosts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, ...data.post } : p))
        );
      }
    } catch (err) {
      console.error('Quick publish error:', err);
    }
  };

  const handleToggleSuspendClient = async (client) => {
    const newStatus = client.status === 'Suspended' ? 'Active' : 'Suspended';
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/admin/users/${client.id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data && data.success) {
        setUsers((prev) =>
          prev.map((u) => (String(u.id) === String(client.id) ? { ...u, status: newStatus } : u))
        );
      }
    } catch (err) {
      console.error('Toggle suspend error:', err);
    }
    setConfirmActionModal({ isOpen: false, type: 'suspend', client: null });
  };

  const handleRemoveClient = async (client) => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/admin/users/${client.id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data && data.success) {
        setUsers((prev) => prev.filter((u) => String(u.id) !== String(client.id)));
      }
    } catch (err) {
      console.error('Remove client error:', err);
    }
    setConfirmActionModal({ isOpen: false, type: 'delete', client: null });
  };

  // Task Studio Handlers
  const handleOpenTaskModal = (taskToEdit = null) => {
    if (taskToEdit) {
      setEditingTaskId(taskToEdit.id);
      const subtasks = Array.isArray(taskToEdit.subtasks)
        ? taskToEdit.subtasks
        : typeof taskToEdit.subtasks === 'string'
          ? JSON.parse(taskToEdit.subtasks || '[]')
          : [];
      setTaskFormData({
        title: taskToEdit.title || '',
        description: taskToEdit.description || '',
        status: taskToEdit.status || 'To Do',
        priority: taskToEdit.priority || 'High',
        campaign: taskToEdit.campaign || 'General',
        assigneeName: taskToEdit.assignee_name || taskToEdit.assigneeName || 'Client Lead',
        dueDate: taskToEdit.due_date || taskToEdit.dueDate || new Date().toISOString().split('T')[0],
        subtasksInput: subtasks.map((st) => st.text).join(', '),
      });
    } else {
      setEditingTaskId(null);
      setTaskFormData({
        title: '',
        description: '',
        status: 'To Do',
        priority: 'High',
        campaign: 'Full-Stack Software Architecture',
        assigneeName: 'Client Lead',
        dueDate: new Date().toISOString().split('T')[0],
        subtasksInput: 'Code & Architecture Review, Unit Test Coverage, Staging Deployment',
      });
    }
    setIsTaskModalOpen(true);
  };

  const handleSaveTask = async () => {
    if (!taskFormData.title.trim()) {
      alert('Please enter a task title.');
      return;
    }

    const subtasksList = taskFormData.subtasksInput
      .split(',')
      .map((st) => st.trim())
      .filter(Boolean)
      .map((text, idx) => ({ id: `st-${Date.now()}-${idx + 1}`, text, completed: false }));

    const payload = {
      title: taskFormData.title,
      description: taskFormData.description,
      status: taskFormData.status,
      priority: taskFormData.priority,
      campaign: taskFormData.campaign,
      assigneeName: taskFormData.assigneeName,
      dueDate: taskFormData.dueDate,
      subtasks: subtasksList,
    };

    try {
      if (editingTaskId) {
        const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks/${editingTaskId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data && data.success) {
          fetchTasks();
        }
      } else {
        const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data && data.success) {
          fetchTasks();
        }
      }
    } catch (err) {
      console.error('Save task error:', err);
    }
    setIsTaskModalOpen(false);
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task deliverable?')) {
      try {
        await fetch(`${SOCKET_SERVER_URL}/api/tasks/${id}`, { method: 'DELETE' });
        setTasks((prev) => prev.filter((t) => t.id !== id));
      } catch (err) {
        console.error('Delete task error:', err);
      }
    }
  };

  const handleChangeTaskStatus = async (id, newStatus) => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data && data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
        );
      }
    } catch (err) {
      console.error('Change status error:', err);
    }
  };

  const handleToggleSubtask = async (taskId, subtaskId) => {
    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    const currentSubtasks = Array.isArray(task.subtasks)
      ? task.subtasks
      : typeof task.subtasks === 'string'
        ? JSON.parse(task.subtasks || '[]')
        : [];

    const updatedSubtasks = currentSubtasks.map((st) =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );

    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subtasks: updatedSubtasks }),
      });
      const data = await res.json();
      if (data && data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, subtasks: updatedSubtasks } : t))
        );
      }
    } catch (err) {
      console.error('Toggle subtask error:', err);
    }
  };

  const handleUpdateTaskFiles = async (taskId, updatedFiles) => {
    try {
      const res = await fetch(`${SOCKET_SERVER_URL}/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ files: JSON.stringify(updatedFiles) }),
      });
      const data = await res.json();
      if (data && data.success) {
        setTasks((prev) =>
          prev.map((t) => (t.id === taskId ? { ...t, files: updatedFiles } : t))
        );
      }
    } catch (err) {
      console.error('Update task files error:', err);
    }
  };

  // Filtered users for table
  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      (u.full_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.email || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (u.business_name || u.company_name || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === 'All' || (u.business_category || '').includes(categoryFilter);

    return matchesSearch && matchesCategory;
  });

  // Filtered Social Posts
  const filteredSocialPosts = socialPosts.filter((post) => {
    const matchesPlatform =
      postPlatformFilter === 'All' || post.platforms.includes(postPlatformFilter);
    const matchesStatus =
      postStatusFilter === 'All' || post.status.toLowerCase() === postStatusFilter.toLowerCase();
    const matchesSearch =
      !postSearchQuery.trim() ||
      post.title.toLowerCase().includes(postSearchQuery.toLowerCase()) ||
      post.caption.toLowerCase().includes(postSearchQuery.toLowerCase());

    return matchesPlatform && matchesStatus && matchesSearch;
  });

  // Filtered Sprint Tasks
  const filteredTasks = tasks.filter((t) => {
    const assigneeName = t.assignee_name || t.assigneeName || (typeof t.assignee === 'object' ? t.assignee?.name : t.assignee) || '';
    const matchesSearch =
      !taskSearchQuery.trim() ||
      (t.title || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      (t.description || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      (t.campaign || '').toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
      assigneeName.toLowerCase().includes(taskSearchQuery.toLowerCase());

    const taskPrioClean = (t.priority || '').replace(/ priority$/i, '').toLowerCase();
    const filterPrioClean = taskPriorityFilter.replace(/ priority$/i, '').toLowerCase();
    const matchesPriority =
      taskPriorityFilter === 'All' || taskPrioClean === filterPrioClean;

    const matchesStatus =
      taskStatusFilter === 'All' || (t.status || '').toLowerCase() === taskStatusFilter.toLowerCase();

    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (!isAdminAuthenticated) {
    return (
      <div className="admin-page-container admin-login-only-wrapper">
        <div className="admin-auth-gateway-wrapper">
          <div className="admin-auth-card">
            <div className="admin-auth-card-header">
              <div className="admin-auth-badge">
                <ShieldCheck className="shield-icon" />
                <span>Enterprise Security Access</span>
              </div>
              <h2 className="admin-auth-title">Admin Portal Login</h2>
              <p className="admin-auth-subtitle">
                Authenticate with administrator credentials to manage database records, broadcast live Socket.IO events, and view agency retainers.
              </p>
            </div>

            {isLoggedIn && user?.role !== 'admin' && (
              <div className="admin-auth-alert alert-warning">
                <ShieldAlert className="alert-icon" />
                <div>
                  <strong>Logged in as Client ({user?.email})</strong>
                  <p>You are currently logged in with a non-admin account. Please sign in with administrator credentials below.</p>
                </div>
              </div>
            )}

            {authError && (
              <div className="admin-auth-alert alert-danger">
                <AlertCircle className="alert-icon" />
                <div>{authError}</div>
              </div>
            )}

            <form onSubmit={handleAdminLoginSubmit} className="admin-auth-form">
              <div className="admin-input-group">
                <label className="admin-input-label">Admin Email Address</label>
                <div className="admin-input-wrapper">
                  <Mail className="admin-field-icon" />
                  <input
                    type="email"
                    required
                    placeholder="admin@digitoomasha.com"
                    value={adminEmail}
                    onChange={(e) => {
                      setAdminEmail(e.target.value);
                      setAuthError('');
                    }}
                    className="admin-input-field"
                  />
                </div>
              </div>

              <div className="admin-input-group">
                <label className="admin-input-label">Admin Security Key / Password</label>
                <div className="admin-input-wrapper">
                  <Lock className="admin-field-icon" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••••••"
                    value={adminPassword}
                    onChange={(e) => {
                      setAdminPassword(e.target.value);
                      setAuthError('');
                    }}
                    className="admin-input-field"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="admin-auth-submit-btn"
              >
                <span>{authLoading ? 'Verifying Admin Token...' : 'Authenticate & Open Control Center'}</span>
                <ArrowRight className="btn-arrow" />
              </button>
            </form>

            <div className="admin-auth-footer-notes">
              <div className="sec-note-item">
                <CheckCircle2 className="sec-icon" />
                <span>JWT Token Encrypted</span>
              </div>
              <div className="sec-note-item">
                <CheckCircle2 className="sec-icon" />
                <span>PostgreSQL DB Synced</span>
              </div>
              <div className="sec-note-item">
                <CheckCircle2 className="sec-icon" />
                <span>Socket.IO Live Stream</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-portal-wrapper">
      <aside className="admin-sidebar">
        <div>
          <div className="admin-sidebar-header">
            <div className="admin-sidebar-logo-icon">D</div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="admin-sidebar-brand">DigiToomasha</span>
                <span className="admin-sidebar-tag">PRO</span>
              </div>
              <span style={{ fontSize: '0.725rem', color: '#64748b', fontWeight: 500 }}>Admin Portal v2.4</span>
            </div>
          </div>

          <nav className="admin-sidebar-nav">
            <div className="admin-sidebar-section-label">MAIN MENU</div>

            <button
              className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <div className="admin-nav-item-left">
                <LayoutDashboard className="admin-nav-item-icon" />
                <span>Dashboard Overview</span>
              </div>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => setActiveTab('templates')}
            >
              <div className="admin-nav-item-left">
                <FolderKanban className="admin-nav-item-icon" />
                <span>Templates</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-count">12</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'social-studio' ? 'active' : ''}`}
              onClick={() => setActiveTab('social-studio')}
            >
              <div className="admin-nav-item-left">
                <Share2 className="admin-nav-item-icon" />
                <span>Social Studio</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-live">Live</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'tasks' ? 'active' : ''}`}
              onClick={() => setActiveTab('tasks')}
            >
              <div className="admin-nav-item-left">
                <CheckSquare className="admin-nav-item-icon" />
                <span>Tasks Center</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-count">{tasks.length}</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'projects' || activeTab === 'project-detail' ? 'active' : ''}`}
              onClick={() => setActiveTab('projects')}
            >
              <div className="admin-nav-item-left">
                <Briefcase className="admin-nav-item-icon" />
                <span>Projects Center</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-count" style={{ background: '#10b981', color: '#ffffff' }}>
                {tasks.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status)).length}
              </span>
            </button>

            <div className="admin-sidebar-section-label" style={{ marginTop: '1rem' }}>ENGINES & DATA</div>

            <button
              className={`admin-nav-item ${activeTab === 'clients' ? 'active' : ''}`}
              onClick={() => setActiveTab('clients')}
            >
              <div className="admin-nav-item-left">
                <Users className="admin-nav-item-icon" />
                <span>Client Database</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-count">{users.length}</span>
            </button>

            <button
              className={`admin-nav-item ${activeTab === 'live-feed' ? 'active' : ''}`}
              onClick={() => setActiveTab('live-feed')}
            >
              <div className="admin-nav-item-left">
                <Radio className="admin-nav-item-icon" />
                <span>WebSockets Feed</span>
              </div>
              <span className="admin-nav-badge admin-nav-badge-live">{onlineSocketsCount}</span>
            </button>
          </nav>
        </div>

        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-sidebar-user-left">
              <div className="admin-sidebar-avatar">
                {(user?.name || 'A').charAt(0)}
                <span className="admin-avatar-status-dot" />
              </div>
              <div className="admin-sidebar-user-info">
                <span className="admin-sidebar-user-name">{user?.name || 'System Admin'}</span>
                <span className="admin-sidebar-user-role">Super Administrator</span>
              </div>
            </div>
          </div>
          <button
            className="admin-sidebar-logout-btn"
            onClick={() => logout()}
          >
            <LogOut style={{ width: 14, height: 14 }} />
            <span>Sign Out Session</span>
          </button>
        </div>
      </aside>

      <main className="admin-main-stage">
        <div className="admin-header-row" style={{ marginBottom: '1.5rem', paddingBottom: '1rem' }}>
          <div>
            <div className="admin-header-top-line">
              <div className="admin-badge">
                {activeTab === 'overview' && 'System Dashboard'}
                {activeTab === 'templates' && 'Templates & Project Delivery'}
                {activeTab === 'social-studio' && 'Social Content Studio'}
                {activeTab === 'tasks' && 'Sprint Tasks Deliverables'}
                {activeTab === 'projects' && 'Approved Client Projects Center'}
                {activeTab === 'project-detail' && 'Project Technical Specification Inspection'}
                {activeTab === 'clients' && 'Client Management'}
                {activeTab === 'live-feed' && 'Live Sockets Broadcast'}
              </div>
              <span className="admin-verified-pill">
                <ShieldCheck className="vpill-icon" />
                <span>Super Admin Session Active</span>
              </span>
            </div>
            <h1 className="admin-title">
              {activeTab === 'overview' && 'Admin Control Center'}
              {activeTab === 'templates' && 'Project Delivery & Templates Center'}
              {activeTab === 'social-studio' && 'Social Content Studio (Omnichannel)'}
              {activeTab === 'tasks' && 'Sprint Deliverables & Task Management'}
              {activeTab === 'projects' && 'Manage high-value agency contracts, live sprint execution, subtasks velocity, and architecture specs.'}
              {activeTab === 'project-detail' && 'Inspect GitHub-style technical documentation, subtask milestones, and deployment telemetry.'}
              {activeTab === 'clients' && 'Registered Clients Database'}
              {activeTab === 'live-feed' && 'Live WebSockets Event Feed'}
            </h1>
          </div>

          <div className="admin-header-actions">
            <div className={`socket-status-badge ${isConnected ? 'status-online' : 'status-offline'}`}>
              <Radio className={`pulse-icon ${isConnected ? 'anim-pulse' : ''}`} />
              <span>{isConnected ? `Sockets Live (${onlineSocketsCount})` : 'Sockets Disconnected'}</span>
            </div>
            <button className="admin-refresh-btn" onClick={() => { fetchUsers(); fetchSocialPosts(); fetchTasks(); }}>
              <RefreshCw className={loading ? 'spin-icon' : ''} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            {/* Metrics Row */}
            <div className="admin-metrics-grid">
              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Total Registered Clients</span>
                  <div className="ametric-icon-box bg-blue">
                    <Users className="ametric-icon" />
                  </div>
                </div>
                <div className="ametric-value">{users.length}</div>
                <span className="ametric-trend text-green">+100% PostgreSQL Synced</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Live Socket Connections</span>
                  <div className="ametric-icon-box bg-purple">
                    <Activity className="ametric-icon" />
                  </div>
                </div>
                <div className="ametric-value">{onlineSocketsCount}</div>
                <span className="ametric-trend text-blue">Real-Time WebSocket Stream</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Active Retainers Volume</span>
                  <div className="ametric-icon-box bg-green">
                    <DollarSign className="ametric-icon" />
                  </div>
                </div>
                <div className="ametric-value">₹145,000/mo</div>
                <span className="ametric-trend text-green">High-Budget Tier Clients</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Social Studio Posts</span>
                  <div className="ametric-icon-box bg-dark">
                    <Share2 className="ametric-icon" />
                  </div>
                </div>
                <div className="ametric-value">{socialPosts.length}</div>
                <span className="ametric-trend text-green">Cloudinary CDN Synced</span>
              </div>
            </div>

            {/* Grid: Clients + Feed */}
            <div className="admin-main-grid">
              <div className="admin-table-card">
                <div className="table-header-controls">
                  <h2 className="card-sec-title">Recent Registered Clients</h2>
                </div>
                <div className="table-responsive-box">
                  <table className="admin-users-table">
                    <thead>
                      <tr>
                        <th>Client</th>
                        <th>Business & Website</th>
                        <th>Category</th>
                        <th>Budget</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.slice(0, 5).map((u) => (
                        <tr key={u.id}>
                          <td>
                            <div className="table-user-cell">
                              <div className="user-avatar-circle">{(u.full_name || 'U').charAt(0)}</div>
                              <div>
                                <strong className="tuser-name">{u.full_name}</strong>
                                <span className="tuser-email">{u.email}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="tbusiness-cell">
                              <strong>{u.business_name || u.company_name || 'Individual'}</strong>
                            </div>
                          </td>
                          <td><span className="tcategory-badge">{u.business_category || 'E-commerce'}</span></td>
                          <td><span className="tbudget-badge">{u.monthly_budget || '₹5k - ₹10k'}</span></td>
                          <td>
                            <button className="table-action-btn" onClick={() => setSelectedUserModal(u)}>Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Socket Feed */}
              <div className="admin-activity-card">
                <div className="activity-card-header">
                  <div className="live-dot-title">
                    <span className="live-red-dot" />
                    <h3>Live WebSockets Feed</h3>
                  </div>
                </div>
                <div className="activity-feed-list">
                  {liveEvents.length === 0 ? (
                    <div className="activity-empty-box">
                      <Clock className="empty-clock-icon" />
                      <span>Waiting for live Socket.IO events...</span>
                    </div>
                  ) : (
                    liveEvents.map((evt) => (
                      <div key={evt.id} className={`activity-feed-item ${evt.type === 'registration' ? 'evt-reg' : 'evt-login'}`}>
                        <div className="evt-icon-box">
                          {evt.type === 'registration' ? <Zap className="evt-icon" /> : <UserCheck className="evt-icon" />}
                        </div>
                        <div className="evt-content">
                          <div className="evt-header-row">
                            <strong className="evt-title">{evt.title}</strong>
                            <span className="evt-time">{evt.time}</span>
                          </div>
                          <p className="evt-details">{evt.details}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: TEMPLATES & PROJECT DELIVERY CENTER TAB */}
        {activeTab === 'templates' && (
          <div className="admin-templates-container">
            <ProjectDeliveryCenter hideHeaderCard={true} hideWebsiteTemplates={true} />
          </div>
        )}

        {/* VIEW 2: SOCIAL CONTENT STUDIO TAB */}
        {activeTab === 'social-studio' && (
          <div className="social-studio-container">
            {/* KPI Cards */}
            <div className="admin-metrics-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Total Social Posts</span>
                  <Share2 className="ametric-icon text-purple" />
                </div>
                <div className="ametric-value">{socialPosts.length}</div>
                <span className="ametric-trend text-blue">Across 6 Platforms</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Scheduled Posts</span>
                  <Clock className="ametric-icon text-green" />
                </div>
                <div className="ametric-value">
                  {socialPosts.filter((p) => p.status === 'Scheduled').length}
                </div>
                <span className="ametric-trend text-green">Auto-Publish Ready</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Published Posts</span>
                  <CheckCircle2 className="ametric-icon text-green" />
                </div>
                <div className="ametric-value">
                  {socialPosts.filter((p) => p.status === 'Published').length}
                </div>
                <span className="ametric-trend text-green">Live on Social Channels</span>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">Sockets Live Stream</span>
                  <Radio className="ametric-icon text-purple" />
                </div>
                <div className="ametric-value">{isConnected ? 'ONLINE' : 'OFFLINE'}</div>
                <span className="ametric-trend text-purple">Multi-Client Synced</span>
              </div>
            </div>

            {/* Actions Bar & Filters */}
            <div className="table-header-controls" style={{ background: '#fff', padding: '1.25rem 1.5rem', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                <div className="table-filter-group">
                  <div className="admin-search-wrapper" style={{ minWidth: 220 }}>
                    <Search className="search-icon" />
                    <input
                      type="text"
                      placeholder="Search posts..."
                      value={postSearchQuery}
                      onChange={(e) => setPostSearchQuery(e.target.value)}
                      className="admin-search-input"
                    />
                  </div>

                  <select
                    value={postPlatformFilter}
                    onChange={(e) => setPostPlatformFilter(e.target.value)}
                    className="admin-filter-select"
                  >
                    <option value="All">All Platforms</option>
                    <option value="Linkedin">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Twitter">Twitter / X</option>
                    <option value="Facebook">Facebook</option>
                  </select>

                  <select
                    value={postStatusFilter}
                    onChange={(e) => setPostStatusFilter(e.target.value)}
                    className="admin-filter-select"
                  >
                    <option value="All">All Statuses</option>
                    <option value="Scheduled">Scheduled</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Posts Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
              {filteredSocialPosts.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: '#fff', borderRadius: '18px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <Share2 style={{ width: 40, height: 40, color: '#94a3b8', marginBottom: '1rem' }} />
                  <h3>No Social Posts Found</h3>
                  <p style={{ color: '#64748b' }}>Create a new post or adjust filters to view posts.</p>
                </div>
              ) : (
                filteredSocialPosts.map((post) => (
                  <div key={post.id} style={{ background: '#fff', borderRadius: '20px', padding: '1.25rem', border: '1px solid rgba(0,0,0,0.06)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                    <div>
                      {/* Media Image Attachment */}
                      {post.media && (
                        <div style={{ width: '100%', height: 160, borderRadius: '14px', overflow: 'hidden', marginBottom: '1rem', background: '#f1f5f9' }}>
                          <img src={post.media} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                      )}

                      {/* Header Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                          {(post.platforms || []).map((p) => (
                            <span key={p} style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#334155' }}>
                              {p}
                            </span>
                          ))}
                        </div>
                        <span style={{ fontSize: '0.725rem', fontWeight: 700, padding: '2px 8px', borderRadius: '9999px', background: post.status === 'Published' ? '#f0fdf4' : '#eff6ff', color: post.status === 'Published' ? '#16a34a' : '#2563eb' }}>
                          {post.status}
                        </span>
                      </div>

                      <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#0f172a', marginBottom: '0.5rem' }}>{post.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: '#475569', lineHeight: 1.5, marginBottom: '1rem', whiteSpace: 'pre-line' }}>
                        {post.caption.length > 140 ? post.caption.slice(0, 140) + '...' : post.caption}
                      </p>
                    </div>

                    {/* Footer Actions */}
                    <div style={{ paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                        {post.status === 'Published' ? `Published: ${post.publishedAt || 'Live'}` : `Scheduled: ${post.scheduledDate || 'Today'}`}
                      </span>

                      <div style={{ display: 'flex', gap: '6px' }}>
                        {post.status !== 'Published' && (
                          <button
                            onClick={() => handleQuickPublish(post.id)}
                            style={{ padding: '4px 8px', borderRadius: '6px', background: '#10b981', color: '#fff', border: 'none', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                            title="Publish Instantly"
                          >
                            Publish Now
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenComposer(post)}
                          style={{ padding: '4px 8px', borderRadius: '6px', background: '#f1f5f9', color: '#334155', border: 'none', cursor: 'pointer' }}
                          title="Edit Post"
                        >
                          <Edit2 style={{ width: 14, height: 14 }} />
                        </button>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          style={{ padding: '4px 8px', borderRadius: '6px', background: '#fef2f2', color: '#dc2626', border: 'none', cursor: 'pointer' }}
                          title="Delete Post"
                        >
                          <Trash2 style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Post Composer Modal */}
            {isComposerOpen && (
              <div className="social-composer-modal-overlay">
                <div className="social-composer-modal-card animate-scale-up" style={{ maxWidth: 680 }}>
                  <div className="composer-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h2>{editingPostId ? 'Edit Admin Social Post' : 'Create & Schedule Social Content'}</h2>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Broadcasting live to all client dashboards via Socket.IO.</p>
                    </div>
                    <button className="composer-close-btn" onClick={() => setIsComposerOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <X className="close-ic" />
                    </button>
                  </div>

                  <div className="composer-form-column">
                    <div className="form-group">
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Post Topic / Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Q3 Strategic Agency Blueprint"
                        value={composerData.title}
                        onChange={(e) => setComposerData({ ...composerData, title: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    <div className="form-group margin-top-sm" style={{ marginTop: '1rem' }}>
                      <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Target Social Platforms</label>
                      <div className="platform-selector-grid" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {['Linkedin', 'Instagram', 'Twitter', 'Facebook', 'Youtube', 'TikTok'].map((plat) => {
                          const selected = composerData.platforms.includes(plat);
                          return (
                            <button
                              type="button"
                              key={plat}
                              className={`plat-select-card ${selected ? 'selected' : ''}`}
                              onClick={() => handleToggleComposerPlatform(plat)}
                              style={{
                                padding: '6px 12px',
                                borderRadius: '8px',
                                border: selected ? '1px solid #7c3aed' : '1px solid #cbd5e1',
                                background: selected ? '#f5f3ff' : '#fff',
                                color: selected ? '#7c3aed' : '#475569',
                                fontWeight: 600,
                                fontSize: '0.8rem',
                                cursor: 'pointer'
                              }}
                            >
                              {plat}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="form-group margin-top-sm" style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Post Caption & Copy</label>
                        <button
                          type="button"
                          onClick={handleGenerateAICaptions}
                          style={{ padding: '4px 10px', borderRadius: '8px', background: '#f5f3ff', color: '#7c3aed', border: '1px solid #ddd6fe', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        >
                          <Sparkles style={{ width: 14, height: 14 }} /> AI Captions
                        </button>
                      </div>
                      <textarea
                        rows={4}
                        placeholder="Write your post content..."
                        value={composerData.caption}
                        onChange={(e) => setComposerData({ ...composerData, caption: e.target.value })}
                        className="form-input form-textarea"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    {/* Media Upload */}
                    <div className="form-group margin-top-sm" style={{ marginTop: '1rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label className="form-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Media Attachment (Cloudinary CDN)</label>
                        <button
                          type="button"
                          onClick={() => mediaFileInputRef.current?.click()}
                          disabled={uploadingMedia}
                          style={{ padding: '4px 10px', borderRadius: '8px', background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe', fontSize: '0.75rem', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                        >
                          {uploadingMedia ? (
                            <>
                              <RefreshCw className="animate-spin" style={{ width: 14, height: 14 }} />
                              <span>Uploading...</span>
                            </>
                          ) : (
                            <>
                              <Upload style={{ width: 14, height: 14 }} />
                              <span>Upload Image</span>
                            </>
                          )}
                        </button>
                        <input
                          type="file"
                          ref={mediaFileInputRef}
                          onChange={handleMediaFileUpload}
                          accept="image/*,video/*"
                          style={{ display: 'none' }}
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="https://images.unsplash.com/... or Cloudinary URL"
                        value={composerData.media}
                        onChange={(e) => setComposerData({ ...composerData, media: e.target.value })}
                        className="form-input"
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1.5rem' }}>
                      <button
                        type="button"
                        onClick={() => setIsComposerOpen(false)}
                        style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: '#f1f5f9', color: '#475569', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveComposerPost('Scheduled')}
                        style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: '#7c3aed', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                      >
                        {editingPostId ? 'Save Changes' : 'Schedule Post'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW 5: TASK STUDIO TAB */}
        {activeTab === 'tasks' && (
          <div className="tasks-container">
            {/* Actions Bar & Controls */}
            <div className="task-toolbar" style={{ marginBottom: '1.5rem' }}>
              <div className="task-filters-group">
                <div className="task-search-box">
                  <Search className="task-search-icon" />
                  <input
                    type="text"
                    placeholder="Search tasks, campaigns, assignees..."
                    value={taskSearchQuery}
                    onChange={(e) => setTaskSearchQuery(e.target.value)}
                    className="task-search-input"
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="task-filter-label">Priority:</span>
                  <select
                    value={taskPriorityFilter}
                    onChange={(e) => setTaskPriorityFilter(e.target.value)}
                    className="task-select-input"
                  >
                    <option value="All">All Priorities</option>
                    <option value="Urgent">Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="task-filter-label">Status:</span>
                  <select
                    value={taskStatusFilter}
                    onChange={(e) => setTaskStatusFilter(e.target.value)}
                    className="task-select-input"
                  >
                    <option value="All">All Statuses</option>
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="In Review / QA">In Review / QA</option>
                    <option value="Approved">Approved</option>
                    <option value="Completed">Completed</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => handleOpenTaskModal()}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '0.55rem 1.1rem',
                    borderRadius: '12px',
                    background: '#7c3aed',
                    color: '#ffffff',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(124, 58, 237, 0.25)',
                  }}
                >
                  <Plus style={{ width: 16, height: 16 }} />
                  <span>Create Task</span>
                </button>
              </div>
            </div>

            {/* TABLE VIEW */}
            <div className="admin-table-card">
                <div className="table-responsive-box">
                  <table className="admin-users-table">
                    <thead>
                      <tr>
                        <th>Task Deliverable</th>
                        <th>Campaign / Category</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Assignee</th>
                        <th>Subtasks Progress</th>
                        <th>Due Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTasks.map((t) => {
                        const subtasks = Array.isArray(t.subtasks)
                          ? t.subtasks
                          : typeof t.subtasks === 'string'
                            ? JSON.parse(t.subtasks || '[]')
                            : [];
                        const compSt = subtasks.filter((st) => st.completed).length;
                        const totSt = subtasks.length;

                        return (
                          <tr key={t.id}>
                            <td>
                              <div>
                                <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{t.title}</strong>
                                {t.description && (
                                  <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                                    {t.description.length > 80 ? t.description.slice(0, 80) + '...' : t.description}
                                  </p>
                                )}
                              </div>
                            </td>
                            <td>
                              <span className="kanban-cmp-tag">{t.campaign || 'General'}</span>
                            </td>
                            <td>
                              <span className={`task-prio-badge prio-${(t.priority || 'high').toLowerCase().replace(' priority', '').replace(' ', '')}`}>
                                {t.priority || 'High'}
                              </span>
                            </td>
                            <td>
                              <select
                                value={t.status || 'To Do'}
                                onChange={(e) => handleChangeTaskStatus(t.id, e.target.value)}
                                style={{
                                  fontSize: '0.78rem',
                                  fontWeight: 700,
                                  padding: '4px 8px',
                                  borderRadius: '8px',
                                  border: '1px solid #cbd5e1',
                                  background: t.status === 'Approved' || t.status === 'Completed' ? '#dcfce7' : t.status === 'Rejected' ? '#fee2e2' : t.status === 'In Progress' ? '#f3e8ff' : '#fff',
                                  color: t.status === 'Approved' || t.status === 'Completed' ? '#15803d' : t.status === 'Rejected' ? '#b91c1c' : t.status === 'In Progress' ? '#7c3aed' : '#334155',
                                  cursor: 'pointer'
                                }}
                              >
                                <option value="To Do">To Do</option>
                                <option value="In Progress">In Progress</option>
                                <option value="In Review / QA">In Review / QA</option>
                                <option value="Approved">Approved</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                              </select>
                            </td>
                            <td>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <div className="user-avatar-circle" style={{ width: 22, height: 22, fontSize: '0.7rem' }}>
                                  {(t.assignee_name || t.assigneeName || (typeof t.assignee === 'object' ? t.assignee?.name : t.assignee) || 'Client Lead').charAt(0)}
                                </div>
                                <span style={{ fontSize: '0.82rem', color: '#334155', fontWeight: 600 }}>
                                  {t.assignee_name || t.assigneeName || (typeof t.assignee === 'object' ? t.assignee?.name : t.assignee) || 'Client Lead'}
                                </span>
                              </div>
                            </td>
                            <td>
                              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>
                                {compSt}/{totSt} Subtasks ({totSt > 0 ? Math.round((compSt / totSt) * 100) : 0}%)
                              </span>
                            </td>
                            <td className="tdate-cell">{t.due_date || t.dueDate || '2026-08-10'}</td>
                            <td>
                              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <button
                                  className="table-action-btn btn-accept-success"
                                  onClick={() => handleChangeTaskStatus(t.id, 'Approved')}
                                  title="Accept / Approve Task"
                                  style={{
                                    background: t.status === 'Approved' ? '#10b981' : '#ecfdf5',
                                    color: t.status === 'Approved' ? '#ffffff' : '#047857',
                                    border: '1px solid #a7f3d0',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: t.status === 'Approved' ? '0 2px 8px rgba(16, 185, 129, 0.3)' : 'none'
                                  }}
                                >
                                  <Check style={{ width: 13, height: 13 }} />
                                  <span>{t.status === 'Approved' ? 'Accepted' : 'Accept'}</span>
                                </button>
                                <button
                                  className="table-action-btn btn-reject-danger"
                                  onClick={() => handleChangeTaskStatus(t.id, 'Rejected')}
                                  title="Reject Task"
                                  style={{
                                    background: t.status === 'Rejected' ? '#ef4444' : '#fef2f2',
                                    color: t.status === 'Rejected' ? '#ffffff' : '#b91c1c',
                                    border: '1px solid #fecaca',
                                    padding: '0.3rem 0.65rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '4px',
                                    transition: 'all 0.2s ease',
                                    boxShadow: t.status === 'Rejected' ? '0 2px 8px rgba(239, 68, 68, 0.3)' : 'none'
                                  }}
                                >
                                  <X style={{ width: 13, height: 13 }} />
                                  <span>{t.status === 'Rejected' ? 'Rejected' : 'Reject'}</span>
                                </button>
                                <button
                                  className="table-action-btn"
                                  onClick={() => handleOpenTaskModal(t)}
                                  title="Edit Task"
                                  style={{
                                    padding: '0.3rem 0.6rem',
                                    borderRadius: '6px',
                                    fontSize: '0.78rem',
                                    fontWeight: 600
                                  }}
                                >
                                  <Edit2 style={{ width: 13, height: 13 }} /> Edit
                                </button>
                                <button
                                  className="table-action-btn btn-remove-danger"
                                  onClick={() => handleDeleteTask(t.id)}
                                  title="Delete Task"
                                  style={{
                                    padding: '0.3rem 0.5rem',
                                    borderRadius: '6px'
                                  }}
                                >
                                  <Trash2 style={{ width: 13, height: 13 }} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            {/* TASK COMPOSER / EDIT MODAL */}
            {isTaskModalOpen && (
              <div className="social-composer-modal-overlay">
                <div className="social-composer-modal-card animate-scale-up" style={{ maxWidth: 640 }}>
                  <div className="composer-modal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <div>
                      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
                        {editingTaskId ? 'Edit Sprint Task Deliverable' : 'Create New Sprint Task'}
                      </h2>
                      <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                        Task updates are broadcasted instantly to client portal dashboards via Socket.IO.
                      </p>
                    </div>
                    <button className="composer-close-btn" onClick={() => setIsTaskModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                      <X className="close-ic" />
                    </button>
                  </div>

                  <div className="composer-form-column" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                      <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Task Title *</label>
                      <input
                        type="text"
                        placeholder="e.g. Implement OAuth 2.0 & JWT Refresh Middleware"
                        value={taskFormData.title}
                        onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Campaign / Technical Domain</label>
                        <input
                          type="text"
                          placeholder="e.g. API Infrastructure"
                          value={taskFormData.campaign}
                          onChange={(e) => setTaskFormData({ ...taskFormData, campaign: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                      <div>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Assignee Name</label>
                        <input
                          type="text"
                          placeholder="e.g. Soham / Client Lead"
                          value={taskFormData.assigneeName}
                          onChange={(e) => setTaskFormData({ ...taskFormData, assigneeName: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Priority</label>
                        <select
                          value={taskFormData.priority}
                          onChange={(e) => setTaskFormData({ ...taskFormData, priority: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        >
                          <option value="Urgent">Urgent</option>
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Status Column</label>
                        <select
                          value={taskFormData.status}
                          onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        >
                          <option value="To Do">To Do</option>
                          <option value="In Progress">In Progress</option>
                          <option value="In Review / QA">In Review / QA</option>
                          <option value="Approved">Approved</option>
                          <option value="Completed">Completed</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Target Due Date</label>
                        <input
                          type="date"
                          value={taskFormData.dueDate}
                          onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                          style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Description & Acceptance Criteria</label>
                      <textarea
                        rows={3}
                        placeholder="Detail the task objectives, scope, and technical requirements..."
                        value={taskFormData.description}
                        onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                    </div>

                    <div>
                      <label style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '4px', display: 'block' }}>Subtasks Checklist (Comma-separated)</label>
                      <input
                        type="text"
                        placeholder="e.g. Audit API Schema, Write unit tests, Deploy to staging"
                        value={taskFormData.subtasksInput}
                        onChange={(e) => setTaskFormData({ ...taskFormData, subtasksInput: e.target.value })}
                        style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '10px', border: '1px solid #cbd5e1' }}
                      />
                      <span style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Enter subtask items separated by commas to create a progress checklist.
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '1rem' }}>
                      <button
                        type="button"
                        onClick={() => setIsTaskModalOpen(false)}
                        style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: '#f1f5f9', color: '#475569', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={handleSaveTask}
                        style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', background: '#7c3aed', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}
                      >
                        {editingTaskId ? 'Update Task' : 'Create Task'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* VIEW: APPROVED CLIENT PROJECTS CENTER TAB */}
        {activeTab === 'projects' && (
          <div className="admin-projects-workspace animate-fade-in-up">
            {/* KPI Summary Row */}
            <div className="admin-metrics-grid" style={{ marginBottom: '1.5rem' }}>
              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">APPROVED CONTRACTS</span>
                  <div className="ametric-icon-box" style={{ background: '#dcfce7', color: '#16a34a' }}>
                    <Briefcase style={{ width: 18, height: 18 }} />
                  </div>
                </div>
                <div className="ametric-value">
                  {tasks.filter(t => t.status === 'Approved' || t.status === 'Accepted').length}
                </div>
                <div className="ametric-subtitle" style={{ color: '#16a34a', fontWeight: 600 }}>
                  Active enterprise projects
                </div>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">IN ACTIVE SPRINT</span>
                  <div className="ametric-icon-box" style={{ background: '#f3e8ff', color: '#7c3aed' }}>
                    <Zap style={{ width: 18, height: 18 }} />
                  </div>
                </div>
                <div className="ametric-value">
                  {tasks.filter(t => t.status === 'In Progress').length}
                </div>
                <div className="ametric-subtitle" style={{ color: '#7c3aed', fontWeight: 600 }}>
                  Development in progress
                </div>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">COMPLETED SYSTEMS</span>
                  <div className="ametric-icon-box" style={{ background: '#e0f2fe', color: '#0284c7' }}>
                    <ShieldCheck style={{ width: 18, height: 18 }} />
                  </div>
                </div>
                <div className="ametric-value">
                  {tasks.filter(t => t.status === 'Completed').length}
                </div>
                <div className="ametric-subtitle" style={{ color: '#0284c7', fontWeight: 600 }}>
                  Deployed & QA verified
                </div>
              </div>

              <div className="ametric-card">
                <div className="ametric-header">
                  <span className="ametric-title">SUBTASKS VELOCITY</span>
                  <div className="ametric-icon-box" style={{ background: '#fef3c7', color: '#d97706' }}>
                    <CheckSquare style={{ width: 18, height: 18 }} />
                  </div>
                </div>
                <div className="ametric-value">
                  {(() => {
                    const approvedTasks = tasks.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status));
                    let total = 0;
                    let completed = 0;
                    approvedTasks.forEach(t => {
                      const subs = Array.isArray(t.subtasks) ? t.subtasks : (typeof t.subtasks === 'string' ? JSON.parse(t.subtasks || '[]') : []);
                      total += subs.length;
                      completed += subs.filter(s => s.completed).length;
                    });
                    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
                    return `${completed}/${total} (${pct}%)`;
                  })()}
                </div>
                <div className="ametric-subtitle" style={{ color: '#d97706', fontWeight: 600 }}>
                  Architecture milestone velocity
                </div>
              </div>
            </div>

            {/* Filter & Search Header */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '1.25rem', marginBottom: '1.5rem', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                {/* Status Filter Tabs */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['All', 'Approved', 'In Progress', 'Completed'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setAdminProjectStatusFilter(st)}
                      style={{
                        padding: '0.4rem 0.9rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: adminProjectStatusFilter === st ? 700 : 600,
                        border: adminProjectStatusFilter === st ? '1px solid #7c3aed' : '1px solid #e2e8f0',
                        background: adminProjectStatusFilter === st ? '#7c3aed' : '#ffffff',
                        color: adminProjectStatusFilter === st ? '#ffffff' : '#64748b',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {st === 'All' ? 'All Active Projects' : st}
                    </button>
                  ))}
                </div>

                {/* Search */}
                <div className="admin-search-wrapper" style={{ width: '280px' }}>
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search active project specs..."
                    value={adminProjectSearch}
                    onChange={(e) => setAdminProjectSearch(e.target.value)}
                    className="admin-search-input"
                  />
                </div>
              </div>
            </div>

            {/* Real Projects Grid */}
            {(() => {
              const activeProjects = tasks.filter(t => ['Approved', 'Accepted', 'In Progress', 'Completed'].includes(t.status));
              const filtered = activeProjects.filter(p => {
                const matchesFilter = adminProjectStatusFilter === 'All'
                  ? true
                  : adminProjectStatusFilter === 'Approved'
                    ? (p.status === 'Approved' || p.status === 'Accepted')
                    : p.status === adminProjectStatusFilter;
                const q = adminProjectSearch.toLowerCase();
                const matchesSearch = !q || p.title.toLowerCase().includes(q) || (p.campaign || '').toLowerCase().includes(q) || (p.assigneeName || '').toLowerCase().includes(q);
                return matchesFilter && matchesSearch;
              });

              if (filtered.length === 0) {
                return (
                  <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '3rem', textAlign: 'center' }}>
                    <Briefcase style={{ width: 40, height: 40, color: '#94a3b8', margin: '0 auto 0.75rem' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1e293b' }}>No Approved Projects Found</h3>
                    <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Approve tasks in the Tasks Center to move deliverables into the active Projects workspace.</p>
                  </div>
                );
              }

              return (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
                  {filtered.map(proj => {
                    const subtasks = Array.isArray(proj.subtasks) ? proj.subtasks : (typeof proj.subtasks === 'string' ? JSON.parse(proj.subtasks || '[]') : []);
                    const compSt = subtasks.filter(s => s.completed).length;
                    const totSt = subtasks.length;
                    const percent = totSt > 0 ? Math.round((compSt / totSt) * 100) : proj.status === 'Completed' ? 100 : 40;

                    return (
                      <div
                        key={proj.id}
                        style={{
                          background: '#ffffff',
                          borderRadius: '16px',
                          border: '1px solid #e2e8f0',
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          justify: 'space-between',
                          boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                        }}
                      >
                        <div>
                          {/* Category & Status Row */}
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.85rem' }}>
                            <span style={{ background: '#f1f5f9', color: '#64748b', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px' }}>
                              {proj.campaign || 'Web Frontend'}
                            </span>

                            {/* Status Dropdown */}
                            <select
                              value={proj.status}
                              onChange={(e) => handleChangeTaskStatus(proj.id, e.target.value)}
                              style={{
                                padding: '3px 8px',
                                borderRadius: '12px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                border: '1px solid #cbd5e1',
                                background: proj.status === 'Approved' || proj.status === 'Accepted' ? '#dcfce7' : proj.status === 'In Progress' ? '#f3e8ff' : '#e0f2fe',
                                color: proj.status === 'Approved' || proj.status === 'Accepted' ? '#15803d' : proj.status === 'In Progress' ? '#6b21a8' : '#0369a1',
                                cursor: 'pointer'
                              }}
                            >
                              <option value="Approved">Approved & Active</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          {/* Title & Client Name */}
                          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                            {proj.title}
                          </h3>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '0.65rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#64748b' }}>Client:</span>
                            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: '#f3e8ff', color: '#7e22ce', fontSize: '0.75rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px', border: '1px solid #e9d5ff' }}>
                              <User style={{ width: 12, height: 12 }} />
                              {(() => {
                                const matched = users.find(u => String(u.id) === String(proj.user_id || proj.userId || proj.client_id));
                                return matched
                                  ? (matched.full_name || matched.name || matched.company_name || matched.email)
                                  : (proj.client_name || proj.clientName || proj.assignee_name || proj.assigneeName || (typeof proj.assignee === 'object' ? proj.assignee?.name : proj.assignee) || 'Client Lead');
                              })()}
                            </span>
                          </div>

                          <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5, marginBottom: '1rem' }}>
                            {proj.description || 'Enterprise contract deliverable under active execution.'}
                          </p>

                          {/* Subtask Progress */}
                          <div style={{ background: '#f8fafc', padding: '0.85rem', borderRadius: '12px', border: '1px solid #f1f5f9', marginBottom: '1rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: '#475569' }}>
                              <span>Subtask Deliverables ({compSt}/{totSt})</span>
                              <span>{percent}%</span>
                            </div>
                            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: subtasks.length > 0 ? '0.75rem' : '0' }}>
                              <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', transition: 'width 0.4s ease' }} />
                            </div>

                            {/* Checkboxes for admin to toggle subtasks */}
                            {subtasks.length > 0 && (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '0.5rem' }}>
                                {subtasks.map(st => (
                                  <label key={st.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: st.completed ? '#94a3b8' : '#334155', cursor: 'pointer' }}>
                                    <input
                                      type="checkbox"
                                      checked={st.completed}
                                      onChange={() => handleToggleSubtask(proj.id, st.id)}
                                      style={{ width: 14, height: 14, accentColor: '#10b981' }}
                                    />
                                    <span style={{ textDecoration: st.completed ? 'line-through' : 'none' }}>{st.title || st.text}</span>
                                  </label>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Card Footer Actions */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', paddingTop: '0.85rem', borderTop: '1px solid #f1f5f9' }}>
                          <button
                            onClick={() => {
                              setInspectedAdminProject(proj);
                              setActiveTab('project-detail');
                            }}
                            style={{ flex: 1, padding: '0.45rem 0.85rem', borderRadius: '8px', border: '1px solid #7c3aed', background: '#ffffff', color: '#7c3aed', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}
                          >
                            <Eye style={{ width: 14, height: 14 }} /> Inspect Project Workspace
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        )}

        {/* VIEW: GITHUB-STYLE PROJECT INSPECTION VIEW IN ADMIN PANEL */}
        {activeTab === 'project-detail' && (
          <ProjectGithubDetailView
            project={inspectedAdminProject}
            onBack={() => setActiveTab('projects')}
            handleUpdateTaskFiles={handleUpdateTaskFiles}
            handleUpdateTaskStatus={handleChangeTaskStatus}
          />
        )}

        {/* VIEW 3: CLIENT DATABASE TAB */}
        {activeTab === 'clients' && (
          <div className="admin-table-card">
            <div className="table-header-controls">
              <h2 className="card-sec-title">Registered Clients Database</h2>
              <div className="table-filter-group">
                <div className="admin-search-wrapper">
                  <Search className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search name, email, company..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="admin-search-input"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="admin-filter-select"
                >
                  <option value="All">All Categories</option>
                  <option value="E-commerce">E-commerce</option>
                  <option value="B2B SaaS">B2B SaaS</option>
                </select>
              </div>
            </div>

            <div className="table-responsive-box">
              <table className="admin-users-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Business & Website</th>
                    <th>Category</th>
                    <th>Budget</th>
                    <th>Status</th>
                    <th>Registered</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className={u.status === 'Suspended' ? 'row-suspended' : ''}>
                      <td>
                        <div className="table-user-cell">
                          <div className="user-avatar-circle">{(u.full_name || 'U').charAt(0)}</div>
                          <div>
                            <strong className="tuser-name">{u.full_name}</strong>
                            <span className="tuser-email">{u.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="tbusiness-cell">
                          <strong>{u.business_name || u.company_name || 'Individual'}</strong>
                          {u.business_website && (
                            <a href={u.business_website} target="_blank" rel="noreferrer" className="tbusiness-link">
                              {u.business_website.replace('https://', '').replace('http://', '')}
                            </a>
                          )}
                        </div>
                      </td>
                      <td><span className="tcategory-badge">{u.business_category || 'E-commerce'}</span></td>
                      <td><span className="tbudget-badge">{u.monthly_budget || '₹5k - ₹10k'}</span></td>
                      <td>
                        <span className={`status-pill ${u.status === 'Suspended' ? 'status-suspended' : 'status-active'}`}>
                          {u.status || 'Active'}
                        </span>
                      </td>
                      <td className="tdate-cell">{new Date(u.created_at || Date.now()).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <button className="table-action-btn" onClick={() => setSelectedUserModal(u)}>Details</button>

                          <button
                            className={`table-action-btn ${u.status === 'Suspended' ? 'btn-reactivate' : 'btn-suspend'}`}
                            onClick={() => setConfirmActionModal({ isOpen: true, type: u.status === 'Suspended' ? 'reactivate' : 'suspend', client: u })}
                            title={u.status === 'Suspended' ? 'Reactivate Client Access' : 'Suspend Client Access'}
                          >
                            {u.status === 'Suspended' ? (
                              <>
                                <PlayCircle style={{ width: 13, height: 13 }} />
                                <span>Reactivate</span>
                              </>
                            ) : (
                              <>
                                <PauseCircle style={{ width: 13, height: 13 }} />
                                <span>Suspend</span>
                              </>
                            )}
                          </button>

                          <button
                            className="table-action-btn btn-remove-danger"
                            onClick={() => setConfirmActionModal({ isOpen: true, type: 'delete', client: u })}
                            title="Remove Client Account Permanently"
                          >
                            <Trash2 style={{ width: 13, height: 13 }} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW 4: SOCKET FEED TAB */}
        {activeTab === 'live-feed' && (
          <div className="admin-activity-card">
            <div className="activity-card-header">
              <div className="live-dot-title">
                <span className="live-red-dot" />
                <h3>Live WebSockets Broadcast Stream</h3>
              </div>
              <span className="activity-socket-id">ID: {liveSocketId}</span>
            </div>
            <p className="activity-desc">Full real-time event log emitted over Socket.IO stream across all clients.</p>
            <div className="activity-feed-list" style={{ maxHeight: '600px' }}>
              {liveEvents.map((evt) => (
                <div key={evt.id} className={`activity-feed-item ${evt.type === 'registration' ? 'evt-reg' : 'evt-login'}`}>
                  <div className="evt-icon-box">
                    {evt.type === 'registration' ? <Zap className="evt-icon" /> : <UserCheck className="evt-icon" />}
                  </div>
                  <div className="evt-content">
                    <div className="evt-header-row">
                      <strong className="evt-title">{evt.title}</strong>
                      <span className="evt-time">{evt.time}</span>
                    </div>
                    <p className="evt-details">{evt.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* User Detail Modal */}
      {selectedUserModal && (
        <div className="auth-modal-overlay" onClick={() => setSelectedUserModal(null)}>
          <div className="admin-detail-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h2>Client Onboarding Profile</h2>
              <button className="auth-modal-close" onClick={() => setSelectedUserModal(null)}>×</button>
            </div>
            <div className="modal-body-content">
              <div className="detail-grid-2">
                <div><label className="dlabel">Full Name</label><p className="dval">{selectedUserModal.full_name}</p></div>
                <div><label className="dlabel">Email Address</label><p className="dval">{selectedUserModal.email}</p></div>
                <div><label className="dlabel">Account Status</label><p className="dval" style={{ color: selectedUserModal.status === 'Suspended' ? '#ef4444' : '#10b981', fontWeight: 700 }}>{selectedUserModal.status || 'Active'}</p></div>
                <div><label className="dlabel">Phone Number</label><p className="dval">{selectedUserModal.phone || 'N/A'}</p></div>
                <div><label className="dlabel">Company Name</label><p className="dval">{selectedUserModal.company_name || selectedUserModal.business_name}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suspend / Delete Confirmation Modal */}
      {confirmActionModal.isOpen && confirmActionModal.client && (
        <div className="auth-modal-overlay" onClick={() => setConfirmActionModal({ isOpen: false, type: 'suspend', client: null })}>
          <div className="admin-confirm-modal animate-scale-up" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 460, background: '#fff', padding: '1.75rem', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
              <div style={{ width: 44, height: 44, borderRadius: '12px', background: confirmActionModal.type === 'delete' ? '#fef2f2' : confirmActionModal.type === 'suspend' ? '#fff7ed' : '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {confirmActionModal.type === 'delete' ? (
                  <Trash2 style={{ width: 22, height: 22, color: '#ef4444' }} />
                ) : confirmActionModal.type === 'suspend' ? (
                  <PauseCircle style={{ width: 22, height: 22, color: '#f59e0b' }} />
                ) : (
                  <PlayCircle style={{ width: 22, height: 22, color: '#10b981' }} />
                )}
              </div>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
                  {confirmActionModal.type === 'delete'
                    ? 'Remove Client Permanently'
                    : confirmActionModal.type === 'suspend'
                      ? 'Suspend Client Account'
                      : 'Reactivate Client Account'}
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>Client: {confirmActionModal.client.full_name} ({confirmActionModal.client.email})</p>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: 1.5, marginBottom: '1.5rem', background: '#f8fafc', padding: '0.85rem 1rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
              {confirmActionModal.type === 'delete'
                ? 'Warning: This action will permanently remove the client and all associated metrics from database records.'
                : confirmActionModal.type === 'suspend'
                  ? 'Suspending this account will immediately block the client from logging in until reactivated by an admin.'
                  : 'Reactivating this account will restore full access to the client dashboard.'}
            </p>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setConfirmActionModal({ isOpen: false, type: 'suspend', client: null })}
                style={{ padding: '0.6rem 1.1rem', borderRadius: '10px', border: '1px solid #cbd5e1', background: '#fff', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (confirmActionModal.type === 'delete') {
                    handleRemoveClient(confirmActionModal.client);
                  } else {
                    handleToggleSuspendClient(confirmActionModal.client);
                  }
                }}
                style={{
                  padding: '0.6rem 1.25rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: confirmActionModal.type === 'delete' ? '#ef4444' : confirmActionModal.type === 'suspend' ? '#f59e0b' : '#10b981',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                {confirmActionModal.type === 'delete'
                  ? 'Confirm Remove'
                  : confirmActionModal.type === 'suspend'
                    ? 'Confirm Suspend'
                    : 'Confirm Reactivate'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
