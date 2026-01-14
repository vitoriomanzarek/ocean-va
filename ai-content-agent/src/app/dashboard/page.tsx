"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import { Plus } from "lucide-react"
import { format } from "date-fns"
import "react-day-picker/dist/style.css"

// TODO: Replace with real data from API
const SAMPLE_POSTS = [
    { date: new Date(), title: "Why Outsourcing Saves Money", platform: "LinkedIn", status: "Draft" },
    { date: new Date(new Date().setDate(new Date().getDate() + 2)), title: "Top 5 VA Skills", platform: "Webflow", status: "Scheduled" }
]

export default function DashboardPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const selectedPosts = SAMPLE_POSTS.filter(p =>
        date && p.date.toDateString() === date.toDateString()
    )

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Content Schedule</h2>
                        <button className="flex items-center gap-2 bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm hover:bg-blue-700 transition-colors">
                            <Plus className="w-4 h-4" />
                            New Post
                        </button>
                    </div>
                    {/* Calendar Component */}
                    <div className="flex justify-center md:justify-start">
                        <DayPicker
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="bg-white"
                        // Adding some Tailwind classes to customize the DayPicker if needed, 
                        // though default styles are loaded. 
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border h-fit">
                <h3 className="font-medium text-slate-900 mb-4">
                    {date ? format(date, "MMMM do, yyyy") : "Select a date"}
                </h3>

                <div className="space-y-3">
                    {selectedPosts.length > 0 ? (
                        selectedPosts.map((post, i) => (
                            <div key={i} className="p-3 bg-slate-50 border rounded-md">
                                <span className={`text-xs px-2 py-0.5 rounded-full ${post.status === 'Scheduled' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                                    {post.status}
                                </span>
                                <h4 className="font-medium text-sm mt-1">{post.title}</h4>
                                <p className="text-xs text-slate-500 mt-1">Platform: {post.platform}</p>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8 text-slate-400">
                            <p className="text-sm">No content scheduled</p>
                            <button className="text-blue-600 text-sm mt-2 hover:underline">
                                Generate Ideas
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
