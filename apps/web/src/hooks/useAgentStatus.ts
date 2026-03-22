import { useState, useEffect } from 'react'

export interface AgentSession {
  sessionKey: string
  agentId?: string
  label?: string
  lastActive?: string
}

export type AgentStatus = 'working' | 'idle'

export interface AgentInfo {
  id: string
  name: string
  emoji: string
  color: string
  status: AgentStatus
}

const AGENT_CONFIG: Record<string, { name: string; emoji: string; color: string }> = {
  owner: { name: 'Owner', emoji: '👑', color: 'text-yellow-400' },
  frontend: { name: 'Frontend', emoji: '🎨', color: 'text-blue-400' },
  backend: { name: 'Backend', emoji: '⚙️', color: 'text-green-400' },
  tester: { name: 'Tester', emoji: '🧪', color: 'text-purple-400' },
  qa: { name: 'QA', emoji: '🔍', color: 'text-orange-400' },
}

function isWorking(lastActive?: string): boolean {
  if (!lastActive) return false
  const lastActiveTime = new Date(lastActive).getTime()
  const now = Date.now()
  const diffMinutes = (now - lastActiveTime) / 1000 / 60
  return diffMinutes <= 5
}

function mapSessionsToAgents(sessions: AgentSession[]): AgentInfo[] {
  const agents: AgentInfo[] = []

  for (const [id, config] of Object.entries(AGENT_CONFIG)) {
    const session = sessions.find((s) => s.agentId === id || s.label?.toLowerCase().includes(id))
    const status: AgentStatus = session && isWorking(session.lastActive) ? 'working' : 'idle'

    agents.push({
      id,
      name: config.name,
      emoji: config.emoji,
      color: config.color,
      status,
    })
  }

  return agents
}

export function useAgentStatus() {
  const [agents, setAgents] = useState<AgentInfo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchStatus() {
      try {
        const token = import.meta.env.VITE_OPENCLAW_TOKEN
        if (!token) {
          throw new Error('VITE_OPENCLAW_TOKEN not configured')
        }

        const response = await fetch('http://localhost:18789/api/sessions', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`)
        }

        const data = await response.json()
        const sessions = data.sessions || []
        const agentInfo = mapSessionsToAgents(sessions)
        setAgents(agentInfo)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }

    fetchStatus()
    const interval = setInterval(fetchStatus, 10000) // Refresh every 10s

    return () => clearInterval(interval)
  }, [])

  return { agents, loading, error }
}
