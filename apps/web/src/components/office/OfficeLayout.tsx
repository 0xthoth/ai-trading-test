import { type FC } from 'react'
import type { AgentInfo } from '../../hooks/useAgentStatus'
import { AgentAvatar } from './AgentAvatar'
import { Desk } from './Desk'
import { Lounge } from './Lounge'

interface OfficeLayoutProps {
  agents: AgentInfo[]
}

export const OfficeLayout: FC<OfficeLayoutProps> = ({ agents }) => {
  const workingAgents = agents.filter((a) => a.status === 'working')
  const idleAgents = agents.filter((a) => a.status === 'idle')

  // Map agent to desk
  const getAgentForDesk = (deskId: string) => {
    return workingAgents.find((a) => a.id === deskId)
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-100 font-mono">🏢 Dev Office</h1>
          <p className="text-slate-400 font-mono text-sm">Agent Status Dashboard</p>
        </div>

        {/* Work Area */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-mono text-slate-300 border-b border-slate-700 inline-block px-4 pb-2">
              💼 Work Area
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-8 p-8 bg-slate-800/50 rounded-lg border border-slate-700">
            {['owner', 'frontend', 'backend', 'tester', 'qa'].map((deskId) => {
              const agent = getAgentForDesk(deskId)
              return (
                <Desk key={deskId} label={deskId}>
                  {agent && (
                    <AgentAvatar
                      name={agent.name}
                      emoji={agent.emoji}
                      color={agent.color}
                      status={agent.status}
                    />
                  )}
                </Desk>
              )
            })}
          </div>
        </div>

        {/* Walkway */}
        <div className="h-8 border-t border-b border-dashed border-slate-700 flex items-center justify-center">
          <div className="text-xs font-mono text-slate-600">~ walkway ~</div>
        </div>

        {/* Lounge Area */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-xl font-mono text-slate-300 border-b border-slate-700 inline-block px-4 pb-2">
              ☕ Lounge
            </h2>
          </div>
          <div className="flex justify-center">
            <Lounge>
              {idleAgents.map((agent) => (
                <AgentAvatar
                  key={agent.id}
                  name={agent.name}
                  emoji={agent.emoji}
                  color={agent.color}
                  status={agent.status}
                />
              ))}
            </Lounge>
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 text-xs font-mono">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span className="text-slate-400">Working</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full" />
            <span className="text-slate-400">Idle</span>
          </div>
        </div>
      </div>
    </div>
  )
}
