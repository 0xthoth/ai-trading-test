import { type FC } from 'react'
import { useAgentStatus } from '../hooks/useAgentStatus'
import { OfficeLayout } from '../components/office/OfficeLayout'

export const OfficePage: FC = () => {
  const { agents, loading, error } = useAgentStatus()

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl animate-pulse">⏳</div>
          <div className="text-slate-400 font-mono">Loading office status...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center space-y-4 p-8 bg-red-500/10 border border-red-500/30 rounded-lg">
          <div className="text-4xl">⚠️</div>
          <div className="text-red-400 font-mono text-sm">Error loading agent status</div>
          <div className="text-red-300/70 font-mono text-xs">{error}</div>
        </div>
      </div>
    )
  }

  return <OfficeLayout agents={agents} />
}
