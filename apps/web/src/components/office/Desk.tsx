import { type FC, type ReactNode } from 'react'

interface DeskProps {
  label: string
  children?: ReactNode
}

export const Desk: FC<DeskProps> = ({ label, children }) => {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Agent avatar slot */}
      <div className="min-h-[120px] flex items-end">{children}</div>
      {/* Desk surface */}
      <div className="relative">
        <div className="w-24 h-16 bg-gradient-to-b from-slate-700 to-slate-800 border-2 border-slate-600 rounded-sm" />
        {/* Monitor on desk */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-8 bg-slate-900 border border-slate-600 rounded-sm" />
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500">
          {label}
        </div>
      </div>
    </div>
  )
}
