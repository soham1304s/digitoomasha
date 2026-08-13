import React, { useState, useEffect } from 'react';
import {
  Code,
  CircleDot,
  GitPullRequest,
  PlayCircle,
  Kanban,
  ShieldCheck,
  BarChart2,
  Pin,
  Eye,
  GitFork,
  Star,
  GitBranch,
  Tag,
  Folder,
  FileText,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
  ArrowLeft,
  Activity,
  CheckSquare,
  Plus,
  Upload,
  Download,
  Copy,
  Check,
  Trash2,
  X,
  Terminal,
  FileCode,
  Layers,
  User
} from 'lucide-react';

export default function ProjectGithubDetailView({
  project,
  onBack,
  handleUpdateTaskFiles,
  handleUpdateTaskStatus,
  isClient = false
}) {
  const [activeTab, setActiveTab] = useState('code');
  const [selectedBranch, setSelectedBranch] = useState('main');
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);

  // Initial Mock Repository File Tree matching project domain
  const defaultFiles = [
    {
      name: 'backend',
      type: 'dir',
      commit: 'Refactor: remove legacy dependencies and update REST controllers',
      time: '2 hours ago'
    },
    {
      name: 'client',
      type: 'dir',
      commit: 'feat: implement real-time Socket.IO event stream for client workspace',
      time: '1 hour ago'
    },
    {
      name: 'config',
      type: 'dir',
      commit: 'chore: update PostgreSQL connection pool and fallback store schema',
      time: '1 day ago'
    },
    {
      name: '.gitignore',
      type: 'file',
      commit: 'initial commit: ignore node_modules, build output, and local envs',
      time: '3 days ago',
      content: 'node_modules/\n.env\ndist/\nbuild/\n.DS_Store'
    },
    {
      name: 'README.md',
      type: 'file',
      commit: 'docs: finalize technical spec & deliverable architecture milestones',
      time: '30 mins ago',
      content: `# ${project?.title || 'DigiToomasha Enterprise Project'}\n\n${project?.description || 'Enterprise platform deliverable designed for high availability, security compliance, and real-time Socket.IO data streaming.'}`
    },
    {
      name: 'package.json',
      type: 'file',
      commit: 'build: update scripts and dependencies for Vite & Express server',
      time: '4 hours ago',
      content: '{\n  "name": "digitoomasha-project",\n  "version": "1.0.0",\n  "private": true,\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build"\n  }\n}'
    },
    {
      name: 'docker-compose.yml',
      type: 'file',
      commit: 'deploy: configure multi-stage production container orchestration',
      time: '2 days ago',
      content: 'version: "3.8"\nservices:\n  web:\n    build: .\n    ports:\n      - "5173:5173"'
    }
  ];

  // Parse initial files from project object (default to empty repository)
  const initialFiles = (() => {
    if (!project) return [];
    if (Array.isArray(project.files)) return project.files;
    if (typeof project.files === 'string' && project.files.trim() !== '') {
      try {
        const parsed = JSON.parse(project.files);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.warn('Failed to parse project.files:', e);
      }
    }
    return [];
  })();

  const [projectFiles, setProjectFiles] = useState(initialFiles);
  const [latestCommit, setLatestCommit] = useState({
    message: initialFiles[0]?.commit || 'Initial empty repository workspace',
    author: project?.assignee?.name || project?.assigneeName || 'Soham / Tech Lead',
    time: initialFiles[0]?.time || 'Just now',
    sha: initialFiles.length > 0 ? '9f1ddde' : '0000000',
    commitsCount: initialFiles.length
  });

  // Dynamic prop synchronization for live Socket.IO events
  useEffect(() => {
    if (!project) return;
    const filesData = Array.isArray(project.files)
      ? project.files
      : typeof project.files === 'string' && project.files.trim() !== ''
        ? (() => {
            try { return JSON.parse(project.files); } catch(e) { return []; }
          })()
        : [];

    setProjectFiles(filesData);
    if (filesData.length > 0) {
      setLatestCommit({
        message: filesData[0]?.commit || 'feat: update project deliverables & repository assets',
        author: project?.assignee?.name || project?.assigneeName || 'Soham / Tech Lead',
        time: filesData[0]?.time || 'Just now',
        sha: Math.random().toString(16).substring(2, 9),
        commitsCount: filesData.length
      });
    } else {
      setLatestCommit({
        message: 'Initial empty repository workspace',
        author: project?.assignee?.name || project?.assigneeName || 'Soham / Tech Lead',
        time: 'Just now',
        sha: '0000000',
        commitsCount: 0
      });
    }
  }, [project?.files]);

  // Action Dropdown state
  const [isCodeDropdownOpen, setIsCodeDropdownOpen] = useState(false);
  const [cloneProtocol, setCloneProtocol] = useState('https');
  const [copiedUrl, setCopiedUrl] = useState(false);

  // Modal States
  const [isCreateFileModalOpen, setIsCreateFileModalOpen] = useState(false);
  const [isUploadFilesModalOpen, setIsUploadFilesModalOpen] = useState(false);
  const [inspectedFile, setInspectedFile] = useState(null);

  // Form States
  const [newFileFormData, setNewFileFormData] = useState({ name: '', commit: '', content: '' });
  const [stagedUploadFiles, setStagedUploadFiles] = useState([]);
  const [uploadCommitMsg, setUploadCommitMsg] = useState('');

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3500);
  };

  if (!project) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', background: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
        <p style={{ color: '#64748b' }}>No project selected for inspection.</p>
        <button onClick={onBack} className="btn-outline-purple sm-btn" style={{ marginTop: '1rem' }}>
          <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Projects
        </button>
      </div>
    );
  }

  const subtasks = Array.isArray(project.subtasks) ? project.subtasks : [];
  const compSt = subtasks.filter((st) => st.completed).length;
  const totSt = subtasks.length;

  const repoTitleFormatted = project.title ? project.title.toLowerCase().replace(/\s+/g, '-') : 'project-repo';
  const cloneUrlHttps = `https://github.com/DigiToomasha/${repoTitleFormatted}.git`;
  const cloneUrlSsh = `git@github.com:DigiToomasha/${repoTitleFormatted}.git`;

  // COPY CLONE URL TO CLIPBOARD
  const handleCopyCloneUrl = () => {
    const targetUrl = cloneProtocol === 'https' ? cloneUrlHttps : cloneUrlSsh;
    navigator.clipboard.writeText(targetUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2000);
    showToast('📋 Repository URL copied to clipboard!');
  };

  // HANDLE CREATE NEW FILE
  const handleSaveNewFile = () => {
    if (!newFileFormData.name.trim()) return;

    const commitMsg = newFileFormData.commit.trim() || `feat: create ${newFileFormData.name.trim()}`;
    const newEntry = {
      name: newFileFormData.name.trim(),
      type: newFileFormData.name.includes('.') || !newFileFormData.name.includes('/') ? 'file' : 'dir',
      commit: commitMsg,
      time: 'Just now',
      content: newFileFormData.content || `// File: ${newFileFormData.name.trim()}\n// Created: ${new Date().toLocaleString()}`
    };

    const updatedFiles = [newEntry, ...projectFiles];
    setProjectFiles(updatedFiles);
    setLatestCommit({
      message: commitMsg,
      author: project.assignee?.name || project.assigneeName || 'Soham / Tech Lead',
      time: 'Just now',
      sha: Math.random().toString(16).substring(2, 9),
      commitsCount: latestCommit.commitsCount + 1
    });

    setIsCreateFileModalOpen(false);
    setNewFileFormData({ name: '', commit: '', content: '' });
    showToast(`✅ Created file "${newEntry.name}" successfully!`);

    if (handleUpdateTaskFiles) {
      handleUpdateTaskFiles(project.id, updatedFiles);
    }
  };

  // HANDLE LOCAL FILE SELECTION FOR UPLOAD
  const handleFileSelection = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const promises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            content: event.target.result
          });
        };
        reader.readAsText(file);
      });
    });

    Promise.all(promises).then((readFiles) => {
      setStagedUploadFiles((prev) => [...prev, ...readFiles]);
      if (!uploadCommitMsg) {
        setUploadCommitMsg(`upload: add ${readFiles.map((f) => f.name).join(', ')}`);
      }
    });
  };

  // HANDLE COMMIT UPLOADED FILES
  const handleCommitUploadedFiles = () => {
    if (stagedUploadFiles.length === 0) return;

    const commitMsg = uploadCommitMsg.trim() || `upload: add ${stagedUploadFiles.length} file(s)`;
    const newEntries = stagedUploadFiles.map((f) => ({
      name: f.name,
      type: 'file',
      commit: commitMsg,
      time: 'Just now',
      size: `${Math.round(f.size / 1024)} KB`,
      content: f.content || `// Uploaded file: ${f.name}`
    }));

    const updatedFiles = [...newEntries, ...projectFiles];
    setProjectFiles(updatedFiles);
    setLatestCommit({
      message: commitMsg,
      author: project.assignee?.name || project.assigneeName || 'Soham / Tech Lead',
      time: 'Just now',
      sha: Math.random().toString(16).substring(2, 9),
      commitsCount: latestCommit.commitsCount + stagedUploadFiles.length
    });

    setIsUploadFilesModalOpen(false);
    setStagedUploadFiles([]);
    setUploadCommitMsg('');
    showToast(`✅ Uploaded ${newEntries.length} file(s) to project repository!`);

    if (handleUpdateTaskFiles) {
      handleUpdateTaskFiles(project.id, updatedFiles);
    }
  };

  // HANDLE DELETE FILE
  const handleDeleteFile = (fileName) => {
    const updatedFiles = projectFiles.filter((f) => f.name !== fileName);
    setProjectFiles(updatedFiles);
    setInspectedFile(null);
    showToast(`🗑️ Deleted file "${fileName}"`);

    if (handleUpdateTaskFiles) {
      handleUpdateTaskFiles(project.id, updatedFiles);
    }
  };

  // HANDLE DOWNLOAD ZIP BUNDLE
  const handleDownloadZip = () => {
    let repoBundle = `# =========================================\n# REPOSITORY ARCHIVE: DigiToomasha / ${project.title}\n# EXPORT TIMESTAMP: ${new Date().toISOString()}\n# TOTAL FILES: ${projectFiles.length}\n# =========================================\n\n`;

    projectFiles.forEach((f) => {
      repoBundle += `/// -----------------------------------------\n`;
      repoBundle += `/// PATH: ${f.name}\n`;
      repoBundle += `/// LAST COMMIT: ${f.commit}\n`;
      repoBundle += `/// MODIFIED: ${f.time}\n`;
      repoBundle += `/// -----------------------------------------\n`;
      repoBundle += (f.content || `// [Binary directory or placeholder]`) + `\n\n`;
    });

    const blob = new Blob([repoBundle], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${repoTitleFormatted}-repository-bundle.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📦 Project repository bundle downloaded!');
  };

  return (
    <div
      className="github-project-container animate-fade-in-up"
      style={{
        background: '#ffffff',
        color: '#24292f',
        borderRadius: '16px',
        border: '1px solid #d0d7de',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
        margin: '0 auto 2rem',
        position: 'relative'
      }}
    >
      {/* FLOATING TOAST NOTIFICATION */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#1f2937',
            color: '#ffffff',
            padding: '0.75rem 1.25rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 600,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {toastMessage}
        </div>
      )}

      {/* 1. TOP BREADCRUMB & BACK ACTION BAR */}
      <div
        style={{
          padding: '0.85rem 1.5rem',
          borderBottom: '1px solid #d0d7de',
          background: '#f6f8fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <button
          onClick={onBack}
          style={{
            background: '#ffffff',
            color: '#24292f',
            border: '1px solid #d0d7de',
            borderRadius: '6px',
            padding: '0.4rem 0.85rem',
            fontSize: '0.8rem',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
            transition: 'all 0.2s ease'
          }}
        >
          <ArrowLeft style={{ width: 14, height: 14 }} /> Back to Projects Workspace
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span
            style={{
              background: '#dafbe1',
              color: '#1a7f37',
              border: '1px solid rgba(74, 194, 107, 0.4)',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.25rem 0.65rem',
              borderRadius: '20px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <CheckCircle2 style={{ width: 12, height: 12 }} />
            {project.status === 'Approved' || project.status === 'Accepted' ? 'Approved & Active' : project.status}
          </span>
          <span style={{ fontSize: '0.75rem', color: '#57606a', background: '#ffffff', padding: '0.25rem 0.65rem', borderRadius: '12px', border: '1px solid #d0d7de' }}>
            ID #{project.id}
          </span>
        </div>
      </div>

      {/* 2. GITHUB REPOSITORY HEADER TITLE & STATS */}
      <div style={{ padding: '1.25rem 1.5rem 0.5rem', background: '#ffffff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
            <Folder style={{ width: 22, height: 22, color: '#57606a' }} />
            <h1 style={{ fontSize: '1.35rem', fontWeight: 600, color: '#0969da', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span>DigiToomasha</span>
              <span style={{ color: '#57606a', fontWeight: 400 }}>/</span>
              <span style={{ color: '#0969da', fontWeight: 700 }}>{repoTitleFormatted}</span>
            </h1>
            <span style={{ border: '1px solid #d0d7de', color: '#57606a', fontSize: '0.72rem', fontWeight: 600, padding: '2px 8px', borderRadius: '12px', background: '#f6f8fa' }}>
              Public Contract
            </span>
          </div>

          {/* GitHub Star/Watch/Fork Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{ background: '#f6f8fa', border: '1px solid #d0d7de', color: '#24292f', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Pin style={{ width: 13, height: 13 }} /> Pin
            </button>
            <button style={{ background: '#f6f8fa', border: '1px solid #d0d7de', color: '#24292f', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Eye style={{ width: 13, height: 13 }} /> Watch <span style={{ background: 'rgba(175,184,193,0.2)', borderRadius: '10px', padding: '1px 6px', fontSize: '0.7rem' }}>1</span>
            </button>
            <button style={{ background: '#f6f8fa', border: '1px solid #d0d7de', color: '#24292f', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <GitFork style={{ width: 13, height: 13 }} /> Fork <span style={{ background: 'rgba(175,184,193,0.2)', borderRadius: '10px', padding: '1px 6px', fontSize: '0.7rem' }}>0</span>
            </button>
            <button style={{ background: '#f6f8fa', border: '1px solid #d0d7de', color: '#24292f', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <Star style={{ width: 13, height: 13, color: '#e3b341' }} /> Star <span style={{ background: 'rgba(175,184,193,0.2)', borderRadius: '10px', padding: '1px 6px', fontSize: '0.7rem' }}>1</span>
            </button>
          </div>
        </div>

        {/* 3. GITHUB REPOSITORY NAVIGATION TABS */}
        <div style={{ display: 'flex', gap: '1.25rem', borderBottom: '1px solid #d0d7de', overflowX: 'auto' }}>
          {[
            { id: 'code', label: '<> Code', icon: Code },
            { id: 'issues', label: 'Issues', icon: CircleDot, badge: totSt },
            { id: 'pulls', label: 'Pull requests', icon: GitPullRequest, badge: 0 },
            { id: 'actions', label: 'Actions', icon: PlayCircle },
            { id: 'projects', label: 'Projects', icon: Kanban },
            { id: 'security', label: 'Security & quality', icon: ShieldCheck },
            { id: 'insights', label: 'Insights', icon: BarChart2 }
          ].map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '2px solid #fd8c73' : '2px solid transparent',
                  color: isActive ? '#24292f' : '#57606a',
                  fontWeight: isActive ? 600 : 400,
                  padding: '0.6rem 0.25rem',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  whiteSpace: 'nowrap'
                }}
              >
                <IconComp style={{ width: 16, height: 16 }} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span style={{ background: 'rgba(175,184,193,0.2)', color: '#57606a', borderRadius: '10px', padding: '1px 6px', fontSize: '0.7rem' }}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. MAIN GITHUB BODY SPLIT (LEFT FILE/README + RIGHT SIDEBAR) */}
      <div className="pdc-github-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 280px', gap: '1.5rem', padding: '1.5rem', background: '#ffffff' }}>

        {/* LEFT COLUMN: BRANCH BAR, COMMIT HEADER, FILE TABLE & README */}
        <div>
          {/* Branch & Code Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsBranchDropdownOpen(!isBranchDropdownOpen)}
                  style={{
                    background: '#f6f8fa',
                    border: '1px solid #d0d7de',
                    color: '#24292f',
                    borderRadius: '6px',
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <GitBranch style={{ width: 14, height: 14 }} />
                  <span>{selectedBranch}</span>
                  <ChevronDown style={{ width: 12, height: 12 }} />
                </button>
              </div>

              <span style={{ fontSize: '0.8rem', color: '#57606a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <GitBranch style={{ width: 13, height: 13 }} /> 1 Branch
              </span>
              <span style={{ fontSize: '0.8rem', color: '#57606a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                <Tag style={{ width: 13, height: 13 }} /> 0 Tags
              </span>
            </div>

            {/* FULLY FUNCTIONAL CODE DROPDOWN FOR ADMIN PANEL */}
            {!isClient && (
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsCodeDropdownOpen(!isCodeDropdownOpen)}
                  style={{
                    background: '#1f883d',
                    border: '1px solid rgba(27, 31, 36, 0.15)',
                    color: '#ffffff',
                    borderRadius: '6px',
                    padding: '0.35rem 0.85rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                  }}
                >
                  <Code style={{ width: 14, height: 14 }} />
                  <span>Code</span>
                  <ChevronDown style={{ width: 12, height: 12 }} />
                </button>

                {/* GITHUB CODE ACTION DROPDOWN POPOVER */}
                {isCodeDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      right: 0,
                      top: 'calc(100% + 6px)',
                      width: '320px',
                      background: '#ffffff',
                      border: '1px solid #d0d7de',
                      borderRadius: '12px',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                      padding: '0.85rem',
                      zIndex: 100,
                      animation: 'fadeIn 0.15s ease'
                    }}
                  >
                    {/* Clone Header */}
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1f2328', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>Clone Repository</span>
                      <div style={{ display: 'flex', background: '#f6f8fa', borderRadius: '6px', border: '1px solid #d0d7de', padding: '2px' }}>
                        <button
                          onClick={() => setCloneProtocol('https')}
                          style={{
                            background: cloneProtocol === 'https' ? '#ffffff' : 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            cursor: 'pointer',
                            color: cloneProtocol === 'https' ? '#0969da' : '#57606a'
                          }}
                        >
                          HTTPS
                        </button>
                        <button
                          onClick={() => setCloneProtocol('ssh')}
                          style={{
                            background: cloneProtocol === 'ssh' ? '#ffffff' : 'transparent',
                            border: 'none',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            cursor: 'pointer',
                            color: cloneProtocol === 'ssh' ? '#0969da' : '#57606a'
                          }}
                        >
                          SSH
                        </button>
                      </div>
                    </div>

                    {/* Clone Input Box */}
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '0.85rem' }}>
                      <input
                        type="text"
                        readOnly
                        value={cloneProtocol === 'https' ? cloneUrlHttps : cloneUrlSsh}
                        style={{
                          flex: 1,
                          fontSize: '0.72rem',
                          fontFamily: 'monospace',
                          padding: '0.4rem 0.5rem',
                          background: '#f6f8fa',
                          border: '1px solid #d0d7de',
                          borderRadius: '6px',
                          color: '#24292f'
                        }}
                      />
                      <button
                        onClick={handleCopyCloneUrl}
                        title="Copy to clipboard"
                        style={{
                          background: '#f6f8fa',
                          border: '1px solid #d0d7de',
                          borderRadius: '6px',
                          padding: '0.4rem 0.6rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: copiedUrl ? '#1a7f37' : '#24292f'
                        }}
                      >
                        {copiedUrl ? <Check style={{ width: 14, height: 14 }} /> : <Copy style={{ width: 14, height: 14 }} />}
                      </button>
                    </div>

                    <div style={{ borderTop: '1px solid #d0d7de', margin: '0.5rem -0.85rem', paddingTop: '0.5rem' }} />

                    {/* Admin Action Items */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <button
                        onClick={() => {
                          setIsCodeDropdownOpen(false);
                          setIsCreateFileModalOpen(true);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#1f2328',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f6f8fa')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Plus style={{ width: 15, height: 15, color: '#1a7f37' }} />
                        <span>Create new file</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsCodeDropdownOpen(false);
                          setIsUploadFilesModalOpen(true);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#1f2328',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f6f8fa')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Upload style={{ width: 15, height: 15, color: '#0969da' }} />
                        <span>Upload files</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsCodeDropdownOpen(false);
                          handleDownloadZip();
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          width: '100%',
                          padding: '0.5rem 0.65rem',
                          background: 'transparent',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '0.8rem',
                          fontWeight: 600,
                          color: '#1f2328',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#f6f8fa')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <Download style={{ width: 15, height: 15, color: '#8250df' }} />
                        <span>Download ZIP bundle</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Commit Header Box */}
          <div style={{ background: '#f6f8fa', border: '1px solid #d0d7de', borderRadius: '6px 6px 0 0', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', color: '#57606a' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.75rem' }}>
                {(latestCommit.author || 'S')[0]}
              </div>
              <span style={{ color: '#24292f', fontWeight: 600 }}>{latestCommit.author}</span>
              <span style={{ color: '#1f2328' }}>{latestCommit.message}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
              <span style={{ color: '#0969da', fontWeight: 600 }}>{latestCommit.sha}</span>
              <span style={{ color: '#57606a' }}>{latestCommit.time}</span>
              <span style={{ color: '#24292f', fontWeight: 600 }}>{latestCommit.commitsCount} Commits</span>
            </div>
          </div>

          {/* File Explorer Table */}
          <div className="table-responsive-wrapper" style={{ border: '1px solid #d0d7de', borderTop: 'none', borderRadius: '0 0 6px 6px', overflow: 'hidden', marginBottom: '1.5rem', background: '#ffffff' }}>
            {projectFiles.length === 0 ? (
              <div style={{ padding: '2.5rem 1.5rem', textAlign: 'center', background: '#ffffff', color: '#57606a' }}>
                <Folder style={{ width: 40, height: 40, color: '#8c959f', margin: '0 auto 0.75rem', opacity: 0.6 }} />
                <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#24292f', margin: '0 0 0.35rem' }}>
                  This repository is empty
                </h4>
                <p style={{ fontSize: '0.825rem', color: '#57606a', margin: '0 0 1.25rem', maxWidth: '420px', marginLeft: 'auto', marginRight: 'auto' }}>
                  No source files or technical assets have been committed yet. Use the green <strong>Code</strong> button to add files.
                </p>
                {!isClient && (
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <button
                      onClick={() => setIsCreateFileModalOpen(true)}
                      style={{ background: '#1f883d', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '0.45rem 0.95rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
                    >
                      <Plus style={{ width: 14, height: 14 }} /> Create new file
                    </button>
                    <button
                      onClick={() => setIsUploadFilesModalOpen(true)}
                      style={{ background: '#f6f8fa', color: '#24292f', border: '1px solid #d0d7de', borderRadius: '6px', padding: '0.45rem 0.95rem', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                    >
                      <Upload style={{ width: 14, height: 14 }} /> Upload files
                    </button>
                  </div>
                )}
              </div>
            ) : (
              projectFiles.map((item, idx) => (
                <div
                  key={item.name + idx}
                  onClick={() => setInspectedFile(item)}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '200px minmax(0, 1fr) 120px',
                    padding: '0.6rem 1rem',
                    borderTop: idx === 0 ? 'none' : '1px solid #d0d7de',
                    fontSize: '0.825rem',
                    alignItems: 'center',
                    transition: 'background 0.15s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = '#f6f8fa')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = '#ffffff')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: item.type === 'dir' ? '#0969da' : '#24292f', fontWeight: item.type === 'dir' ? 600 : 400 }}>
                    {item.type === 'dir' ? <Folder style={{ width: 16, height: 16, color: '#54a3ff' }} /> : <FileText style={{ width: 16, height: 16, color: '#57606a' }} />}
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</span>
                  </div>
                  <div style={{ color: '#57606a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.commit}
                  </div>
                  <div style={{ color: '#57606a', textAlign: 'right', fontSize: '0.75rem' }}>
                    {item.time}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* README.MD VIEW CONTAINER */}
          <div style={{ background: '#ffffff', border: '1px solid #d0d7de', borderRadius: '6px', overflow: 'hidden' }}>
            {/* README Header Bar */}
            <div style={{ background: '#f6f8fa', borderBottom: '1px solid #d0d7de', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', fontWeight: 600, color: '#24292f' }}>
                <FileText style={{ width: 15, height: 15, color: '#57606a' }} />
                <span>README.md</span>
              </div>
              <span style={{ fontSize: '0.72rem', color: '#57606a', background: '#ffffff', padding: '2px 8px', borderRadius: '4px', border: '1px solid #d0d7de' }}>
                Markdown Rendered
              </span>
            </div>

            {/* README Markdown Body */}
            <div style={{ padding: '2rem', lineHeight: 1.6, color: '#24292f' }}>
              {/* Badges Row */}
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span style={{ background: '#dafbe1', color: '#1a7f37', border: '1px solid #4ac26b', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  STATUS: APPROVED & ACTIVE
                </span>
                <span style={{ background: '#ddf4ff', color: '#0969da', border: '1px solid #54a3ff', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  DOMAIN: {project.campaign || 'Web Frontend'}
                </span>
                <span style={{ background: '#fbefff', color: '#8250df', border: '1px solid #c8a2c8', fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  BUILD: PASSING
                </span>
              </div>

              {/* Title & Headline */}
              <h1 style={{ fontSize: '1.75rem', fontWeight: 800, borderBottom: '1px solid #d0d7de', paddingBottom: '0.5rem', marginBottom: '1rem', color: '#1f2328' }}>
                ⚡ {project.title}
              </h1>

              <p style={{ fontSize: '0.95rem', color: '#57606a', marginBottom: '1.5rem' }}>
                {project.description || 'Enterprise platform deliverable designed for high availability, security compliance, and real-time Socket.IO data streaming.'}
              </p>

              {/* Subtask Sprint Deliverables Section */}
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '0.35rem', margin: '1.5rem 0 1rem', color: '#1f2328', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckSquare style={{ width: 18, height: 18, color: '#0969da' }} />
                Subtask Architecture Milestones ({compSt}/{totSt} Completed)
              </h2>

              <div style={{ background: '#f6f8fa', border: '1px solid #d0d7de', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem' }}>
                {subtasks.length === 0 ? (
                  <p style={{ fontSize: '0.85rem', color: '#57606a', margin: 0 }}>
                    No granular subtasks defined. Primary deliverable execution is managed under main sprint roadmap.
                  </p>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {subtasks.map((st, idx) => (
                      <div key={st.id || idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.875rem' }}>
                        <input
                          type="checkbox"
                          checked={st.completed}
                          onChange={() => {
                            const updatedSubtasks = subtasks.map((item, i) =>
                              i === idx ? { ...item, completed: !item.completed } : item
                            );
                            if (handleUpdateTaskStatus) {
                              handleUpdateTaskStatus(project.id, project.status, updatedSubtasks);
                            }
                          }}
                          style={{ width: 16, height: 16, accentColor: '#1f883d', cursor: 'pointer' }}
                        />
                        <span style={{ textDecoration: st.completed ? 'line-through' : 'none', color: st.completed ? '#57606a' : '#24292f', fontWeight: 500 }}>
                          {st.title || st.text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Technical Specifications & Architecture Details */}
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, borderBottom: '1px solid #d0d7de', paddingBottom: '0.35rem', margin: '1.5rem 0 1rem', color: '#1f2328' }}>
                🛠️ Technical Specification & Topology
              </h2>

              <div style={{ background: '#f6f8fa', padding: '1rem', borderRadius: '8px', border: '1px solid #d0d7de', fontFamily: 'monospace', fontSize: '0.8rem', color: '#0969da', marginBottom: '1.5rem' }}>
                <div>• Architecture: Modular Micro-Frontend & RESTful API Pipeline</div>
                <div>• WebSockets: Bidirectional Socket.IO live broadcasting enabled</div>
                <div>• Persistence: PostgreSQL DB with automated fallback store</div>
                <div>• Security: JWT Auth + Bearer token header validation</div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: GITHUB SIDEBAR (ABOUT, RELEASES, DEPLOYMENTS, CONTRIBUTORS) */}
        <div>
          {/* About Section */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #d0d7de' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2328', marginBottom: '0.75rem' }}>About</h3>
            <p style={{ fontSize: '0.825rem', color: '#57606a', lineHeight: 1.4, marginBottom: '0.85rem' }}>
              {project.description || 'Full-stack enterprise application deliverable.'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#0969da', marginBottom: '0.85rem' }}>
              <ExternalLink style={{ width: 14, height: 14 }} />
              <a href="https://digitoomasha.com" target="_blank" rel="noreferrer" style={{ color: '#0969da', textDecoration: 'none', fontWeight: 600 }}>
                app.digitoomasha.com
              </a>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', color: '#57606a' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FileText style={{ width: 13, height: 13 }} /> Readme</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Activity style={{ width: 13, height: 13 }} /> Activity</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Star style={{ width: 13, height: 13 }} /> 1 star</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><Eye style={{ width: 13, height: 13 }} /> 1 watching</span>
            </div>
          </div>

          {/* Releases Section */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #d0d7de' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2328', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Releases</span>
              <span style={{ fontSize: '0.72rem', color: '#57606a', background: '#f6f8fa', padding: '1px 6px', borderRadius: '10px', border: '1px solid #d0d7de' }}>1</span>
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#1a7f37', fontWeight: 600 }}>
              <Tag style={{ width: 13, height: 13 }} />
              <span>v1.0.0-release</span>
              <span style={{ color: '#57606a', fontWeight: 400, fontSize: '0.75rem' }}>Latest</span>
            </div>
          </div>

          {/* Deployments Telemetry */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #d0d7de' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2328', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Deployments</span>
              <span style={{ fontSize: '0.72rem', color: '#57606a', background: '#f6f8fa', padding: '1px 6px', borderRadius: '10px', border: '1px solid #d0d7de' }}>2</span>
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1a7f37', fontWeight: 600 }}>
                <CheckCircle2 style={{ width: 14, height: 14 }} />
                <span>Production - digitoomasha-api</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#1a7f37', fontWeight: 600 }}>
                <CheckCircle2 style={{ width: 14, height: 14 }} />
                <span>Production - client-portal-v2</span>
              </div>
            </div>
          </div>

          {/* Client Contract Owner */}
          <div style={{ marginBottom: '1.5rem', paddingBottom: '1.25rem', borderBottom: '1px solid #d0d7de' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2328', marginBottom: '0.75rem' }}>Client / Contract Owner</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#6366f1', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                {(project.client_name || project.clientName || project.assignee_name || project.assigneeName || (typeof project.assignee === 'object' ? project.assignee?.name : project.assignee) || 'Client')[0]}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 600, color: '#24292f' }}>
                  {project.client_name || project.clientName || project.assignee_name || project.assigneeName || (typeof project.assignee === 'object' ? project.assignee?.name : project.assignee) || 'Client Lead'}
                </div>
                <div style={{ fontSize: '0.72rem', color: '#57606a' }}>Contract Owner</div>
              </div>
            </div>
          </div>

          {/* Assigned Contributors */}
          <div>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1f2328', marginBottom: '0.75rem' }}>Contributors</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#7c3aed', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.8rem' }}>
                {(project.assignee?.name || project.assigneeName || 'Soham')[0]}
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <div style={{ fontWeight: 600, color: '#24292f' }}>{project.assignee?.name || project.assigneeName || 'Soham / Tech Lead'}</div>
                <div style={{ fontSize: '0.72rem', color: '#57606a' }}>Lead Developer</div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* MODAL 1: CREATE NEW FILE MODAL                                             */}
      {/* ========================================================================= */}
      {isCreateFileModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setIsCreateFileModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #d0d7de',
              maxWidth: '640px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #d0d7de', background: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1f2328', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Plus style={{ width: 16, height: 16, color: '#1a7f37' }} />
                Create New File in Repository
              </h3>
              <button onClick={() => setIsCreateFileModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#57606a' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#24292f', marginBottom: '4px', display: 'block' }}>
                  File Name & Path *
                </label>
                <input
                  type="text"
                  placeholder="e.g. backend/controllers/auth.js or config/db.sql"
                  value={newFileFormData.name}
                  onChange={(e) => setNewFileFormData({ ...newFileFormData, name: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '0.85rem', fontFamily: 'monospace' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#24292f', marginBottom: '4px', display: 'block' }}>
                  Commit Message
                </label>
                <input
                  type="text"
                  placeholder="e.g. feat: implement authentication logic & schema"
                  value={newFileFormData.commit}
                  onChange={(e) => setNewFileFormData({ ...newFileFormData, commit: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#24292f', marginBottom: '4px', display: 'block' }}>
                  File Code Content
                </label>
                <textarea
                  rows={8}
                  placeholder="// Paste or write your source code here..."
                  value={newFileFormData.content}
                  onChange={(e) => setNewFileFormData({ ...newFileFormData, content: e.target.value })}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, background: '#f6f8fa' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setIsCreateFileModalOpen(false)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #d0d7de', background: '#f6f8fa', color: '#24292f', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveNewFile}
                  style={{ padding: '0.5rem 1.25rem', borderRadius: '8px', border: 'none', background: '#1f883d', color: '#ffffff', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Plus style={{ width: 14, height: 14 }} /> Commit New File
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: UPLOAD FILES MODAL                                              */}
      {/* ========================================================================= */}
      {isUploadFilesModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}
          onClick={() => setIsUploadFilesModalOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #d0d7de',
              maxWidth: '600px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #d0d7de', background: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: '#1f2328', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Upload style={{ width: 16, height: 16, color: '#0969da' }} />
                Upload Local Files to Repository
              </h3>
              <button onClick={() => setIsUploadFilesModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#57606a' }}>
                <X style={{ width: 18, height: 18 }} />
              </button>
            </div>

            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* Dropzone Container */}
              <div
                style={{
                  border: '2px dashed #0969da',
                  borderRadius: '12px',
                  padding: '2rem',
                  textAlign: 'center',
                  background: '#f0f7ff',
                  cursor: 'pointer'
                }}
                onClick={() => document.getElementById('repo-file-picker').click()}
              >
                <Upload style={{ width: 36, height: 36, color: '#0969da', margin: '0 auto 0.5rem' }} />
                <h4 style={{ margin: '0 0 0.25rem', fontSize: '0.95rem', fontWeight: 700, color: '#1f2328' }}>
                  Drag & Drop files here, or click to browse
                </h4>
                <p style={{ margin: 0, fontSize: '0.78rem', color: '#57606a' }}>
                  Supports source code files (.js, .py, .json, .md, .sql, .png, etc.)
                </p>
                <input
                  id="repo-file-picker"
                  type="file"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileSelection}
                />
              </div>

              {/* Staged Files List */}
              {stagedUploadFiles.length > 0 && (
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#24292f', marginBottom: '6px', display: 'block' }}>
                    Staged Files ({stagedUploadFiles.length})
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '140px', overflowY: 'auto' }}>
                    {stagedUploadFiles.map((f, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.4rem 0.75rem', background: '#f6f8fa', borderRadius: '6px', border: '1px solid #d0d7de', fontSize: '0.8rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <FileText style={{ width: 14, height: 14, color: '#0969da' }} />
                          <span style={{ fontWeight: 600 }}>{f.name}</span>
                          <span style={{ color: '#57606a', fontSize: '0.72rem' }}>({Math.round(f.size / 1024)} KB)</span>
                        </div>
                        <button
                          onClick={() => setStagedUploadFiles(stagedUploadFiles.filter((_, idx) => idx !== i))}
                          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#cf222e' }}
                        >
                          <X style={{ width: 14, height: 14 }} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#24292f', marginBottom: '4px', display: 'block' }}>
                  Commit Message
                </label>
                <input
                  type="text"
                  placeholder="e.g. Upload project documentation & assets"
                  value={uploadCommitMsg}
                  onChange={(e) => setUploadCommitMsg(e.target.value)}
                  style={{ width: '100%', padding: '0.6rem 0.8rem', borderRadius: '8px', border: '1px solid #d0d7de', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '0.5rem' }}>
                <button
                  onClick={() => setIsUploadFilesModalOpen(false)}
                  style={{ padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #d0d7de', background: '#f6f8fa', color: '#24292f', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleCommitUploadedFiles}
                  disabled={stagedUploadFiles.length === 0}
                  style={{
                    padding: '0.5rem 1.25rem',
                    borderRadius: '8px',
                    border: 'none',
                    background: stagedUploadFiles.length > 0 ? '#1f883d' : '#8c959f',
                    color: '#ffffff',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: stagedUploadFiles.length > 0 ? 'pointer' : 'not-allowed',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  <Upload style={{ width: 14, height: 14 }} /> Commit Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: FILE INSPECTION & CODE VIEWER MODAL                              */}
      {/* ========================================================================= */}
      {inspectedFile && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(4px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem'
          }}
          onClick={() => setInspectedFile(null)}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #d0d7de',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '85vh',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ padding: '0.85rem 1.25rem', borderBottom: '1px solid #d0d7de', background: '#f6f8fa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', fontWeight: 700, color: '#24292f' }}>
                <FileCode style={{ width: 18, height: 18, color: '#0969da' }} />
                <span>{inspectedFile.name}</span>
                <span style={{ fontSize: '0.72rem', color: '#57606a', background: '#ffffff', padding: '2px 8px', borderRadius: '10px', border: '1px solid #d0d7de' }}>
                  {inspectedFile.type === 'dir' ? 'Directory' : 'Source File'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {!isClient && (
                  <button
                    onClick={() => handleDeleteFile(inspectedFile.name)}
                    style={{ background: '#ffebe9', border: '1px solid rgba(255,129,130,0.4)', color: '#cf222e', borderRadius: '6px', padding: '0.3rem 0.65rem', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    <Trash2 style={{ width: 13, height: 13 }} /> Delete File
                  </button>
                )}
                <button onClick={() => setInspectedFile(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#57606a' }}>
                  <X style={{ width: 18, height: 18 }} />
                </button>
              </div>
            </div>

            {/* Sub-bar Commit Info */}
            <div style={{ padding: '0.6rem 1.25rem', background: '#ffffff', borderBottom: '1px solid #d0d7de', fontSize: '0.78rem', color: '#57606a', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Commit: <strong style={{ color: '#24292f' }}>{inspectedFile.commit}</strong></span>
              <span>Updated: {inspectedFile.time}</span>
            </div>

            {/* Code Body Container */}
            <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1, background: '#0d1117', color: '#e6edf3', fontFamily: 'monospace', fontSize: '0.85rem', lineHeight: 1.6 }}>
              {inspectedFile.content ? (
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {inspectedFile.content}
                </pre>
              ) : (
                <div style={{ color: '#8b949e', textAlign: 'center', padding: '2rem 0' }}>
                  <Folder style={{ width: 32, height: 32, margin: '0 auto 0.5rem', color: '#388bfd' }} />
                  <p style={{ margin: 0 }}>Directory listing or binary file asset without raw text preview.</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding: '0.75rem 1.25rem', borderTop: '1px solid #d0d7de', background: '#f6f8fa', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              {inspectedFile.content && (
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(inspectedFile.content);
                    showToast('📋 File content copied to clipboard!');
                  }}
                  style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', border: '1px solid #d0d7de', background: '#ffffff', color: '#24292f', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                >
                  <Copy style={{ width: 13, height: 13 }} /> Copy Code
                </button>
              )}
              <button
                onClick={() => setInspectedFile(null)}
                style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', border: '1px solid #d0d7de', background: '#f6f8fa', color: '#24292f', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
