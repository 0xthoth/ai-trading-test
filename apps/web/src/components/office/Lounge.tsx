import { type FC, type ReactNode } from 'react'

interface LoungeProps {
  children?: ReactNode
}

export const Lounge: FC<LoungeProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center gap-6 p-8 bg-slate-800/30 rounded-lg border border-slate-700">
      {/* TV on wall */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-32 h-20 bg-slate-900 border-4 border-slate-700 rounded flex items-center justify-center">
          <div className="text-2xl">📺</div>
        </div>
        <div className="text-[10px] font-mono text-slate-500">Lounge TV</div>
      </div>

      {/* Sofa area with idle agents */}
      <div className="flex gap-4 items-end">
        {/* Left armrest */}
        <div className="w-4 h-12 bg-slate-700 border border-slate-600 rounded-l" />
        
        {/* Sofa seating - agents will appear here when idle */}
        <div className="flex gap-2 items-end px-4 py-2 bg-gradient-to-b from-slate-600 to-slate-700 border border-slate-600 rounded min-w-[300px] justify-center">
          {children}
        </div>

        {/* Right armrest */}
        <div className="w-4 h-12 bg-slate-700 border border-slate-600 rounded-r" />
      </div>

      <div className="text-xs font-mono text-slate-500">Break Area</div>
    </div>
  )
}
