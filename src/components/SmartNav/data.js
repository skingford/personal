export const INITIAL_TOOLS = [
  {
    id: 'vscode',
    title: 'VS Code',
    url: 'vscode://',
    category: 'development',
    tags: ['editor', 'code', 'microsoft'],
    usageCount: 1542,
    lastUsed: '2023-11-29T10:30:00',
    status: 'healthy',
    description: 'Code editing. Redefined.',
    icon: 'Code'
  },
  {
    id: 'github',
    title: 'GitHub',
    url: 'https://github.com',
    category: 'development',
    tags: ['git', 'repo', 'collaboration'],
    usageCount: 892,
    lastUsed: '2023-11-29T09:15:00',
    status: 'healthy',
    description: 'Where the world builds software.',
    icon: 'Github'
  },
  {
    id: 'vercel',
    title: 'Vercel',
    url: 'https://vercel.com',
    category: 'deployment',
    tags: ['cloud', 'nextjs', 'serverless'],
    usageCount: 430,
    lastUsed: '2023-11-28T16:45:00',
    status: 'healthy',
    description: 'Develop. Preview. Ship.',
    icon: 'Triangle'
  },
  {
    id: 'figma',
    title: 'Figma',
    url: 'https://figma.com',
    category: 'design',
    tags: ['ui', 'ux', 'prototyping'],
    usageCount: 320,
    lastUsed: '2023-11-27T14:20:00',
    status: 'update_available',
    description: 'The collaborative interface design tool.',
    icon: 'PenTool'
  },
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    url: 'https://chat.openai.com',
    category: 'ai',
    tags: ['llm', 'assistant', 'productivity'],
    usageCount: 1250,
    lastUsed: '2023-11-29T11:00:00',
    status: 'healthy',
    description: 'AI assistant by OpenAI.',
    icon: 'Bot'
  },
  {
    id: 'linear',
    title: 'Linear',
    url: 'https://linear.app',
    category: 'productivity',
    tags: ['issue-tracking', 'agile', 'management'],
    usageCount: 210,
    lastUsed: '2023-11-29T09:00:00',
    status: 'healthy',
    description: 'The issue tracking tool you\'ll enjoy using.',
    icon: 'ListTodo'
  },
  {
    id: 'notion',
    title: 'Notion',
    url: 'https://notion.so',
    category: 'productivity',
    tags: ['notes', 'wiki', 'docs'],
    usageCount: 670,
    lastUsed: '2023-11-28T18:30:00',
    status: 'healthy',
    description: 'All-in-one workspace.',
    icon: 'FileText'
  },
  {
    id: 'docker',
    title: 'Docker',
    url: 'https://www.docker.com/',
    category: 'devops',
    tags: ['container', 'virtualization'],
    usageCount: 150,
    lastUsed: '2023-11-25T11:00:00',
    status: 'warning',
    description: 'OS-level virtualization to deliver software in packages.',
    icon: 'Container'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Tools', color: '#64748b' },
  { id: 'development', label: 'Development', color: '#3b82f6' },
  { id: 'design', label: 'Design', color: '#ec4899' },
  { id: 'productivity', label: 'Productivity', color: '#f59e0b' },
  { id: 'deployment', label: 'Deployment', color: '#10b981' },
  { id: 'devops', label: 'DevOps', color: '#6366f1' },
  { id: 'ai', label: 'AI & ML', color: '#8b5cf6' }
];

export const WORKFLOWS = [
  {
    id: 'dev-start',
    title: 'Start Dev Environment',
    description: 'Open VS Code, GitHub, and Localhost',
    actions: ['open:vscode', 'open:github', 'cmd:npm run dev']
  },
  {
    id: 'deploy-prod',
    title: 'Deploy to Production',
    description: 'Run tests, build, and deploy to Vercel',
    actions: ['cmd:npm test', 'cmd:npm run build', 'open:vercel']
  },
  {
    id: 'morning-routine',
    title: 'Morning Routine',
    description: 'Check Linear, Notion, and Email',
    actions: ['open:linear', 'open:notion', 'open:gmail']
  }
];
