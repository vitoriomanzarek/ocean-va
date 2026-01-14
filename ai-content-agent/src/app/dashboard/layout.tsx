import Link from "next/link"
import { Calendar, MessageSquare, Settings, LayoutDashboard } from "lucide-react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r px-4 py-6 hidden md:flex flex-col">
        <div className="mb-8 px-2">
          <h1 className="text-xl font-bold tracking-tight text-blue-600">Ocean Content AI</h1>
          <p className="text-sm text-slate-500">Agency Automation</p>
        </div>
        
        <nav className="flex-1 space-y-1">
          <NavLink href="/dashboard" icon={<Calendar className="w-4 h-4 mr-2" />}>
            Content Calendar
          </NavLink>
          <NavLink href="/dashboard/chat" icon={<MessageSquare className="w-4 h-4 mr-2" />}>
            AI Brainstorm
          </NavLink>
          <div className="pt-4 mt-4 border-t border-slate-100">
             <NavLink href="/dashboard/settings" icon={<Settings className="w-4 h-4 mr-2" />}>
              Configuration
            </NavLink>
          </div>
        </nav>

        <div className="mt-auto px-2">
            <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-xs font-medium text-blue-800">Status: Active</p>
                <p className="text-xs text-blue-600 mt-1">Next Post: Tomorrow</p>
            </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-14 border-b bg-white flex items-center px-6">
            <h2 className="font-semibold text-slate-800">Dashboard</h2>
        </header>
        <div className="p-6">
            {children}
        </div>
      </main>
    </div>
  )
}

function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon: React.ReactNode }) {
    return (
        <Link 
            href={href} 
            className="flex items-center px-2 py-2 text-sm font-medium text-slate-700 rounded-md hover:bg-slate-100 group"
        >
            {icon}
            {children}
        </Link>
    )
}
