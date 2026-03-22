import { type FC } from 'react'
import type { AgentStatus } from '../../hooks/useAgentStatus'

interface AgentAvatarProps {
  name: string
  emoji: string
  color: string
  status: AgentStatus
}

export const AgentAvatar: FC<AgentAvatarProps> = ({ name, emoji, color, status }) => {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Pixel-art avatar using CSS */}
      <div className="relative">
        <div
          className={`w-16 h-16 ${color} bg-slate-700 border-4 border-slate-600 rounded-sm flex items-center justify-center text-2xl pixel-art`}
          style={{ imageRendering: 'pixelated' }}
        >
          {emoji}
        </div>
        {/* Status indicator */}
        <div
          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
            status === 'working' ? 'bg-green-500' : 'bg-gray-500'
          }`}
        />
      </div>
      {/* Name label */}
      <div className="text-xs font-mono text-slate-300">{name}</div>
      {/* Status badge */}
      <div
        className={`text-[10px] px-2 py-0.5 rounded font-mono ${
          status === 'working'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
        }`}
      >
        {status}
      </div>
    </div>
  )
}
