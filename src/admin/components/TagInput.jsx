import React, { useState, useRef } from 'react'
import { X } from 'lucide-react'

export default function TagInput({ value = [], onChange, placeholder = 'Add tag...' }) {
  const [input, setInput] = useState('')
  const inputRef = useRef(null)

  function add(raw) {
    const tag = raw.trim()
    if (!tag || value.includes(tag)) return
    onChange([...value, tag])
    setInput('')
  }

  function remove(tag) {
    onChange(value.filter(t => t !== tag))
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      add(input)
    } else if (e.key === 'Backspace' && !input && value.length) {
      remove(value[value.length - 1])
    }
  }

  return (
    <div
      className="flex flex-wrap gap-1.5 min-h-[42px] w-full border border-gray-300 rounded-lg px-3 py-2 cursor-text focus-within:ring-2 focus-within:ring-ocean-500 focus-within:border-transparent bg-white"
      onClick={() => inputRef.current?.focus()}
    >
      {value.map(tag => (
        <span
          key={tag}
          className="inline-flex items-center gap-1 bg-ocean-100 text-ocean-700 text-xs font-medium px-2 py-0.5 rounded-md"
        >
          {tag}
          <button
            type="button"
            onClick={e => { e.stopPropagation(); remove(tag) }}
            className="hover:text-red-500 transition-colors"
          >
            <X size={11} />
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && add(input)}
        placeholder={value.length === 0 ? placeholder : ''}
        className="flex-1 min-w-24 text-sm outline-none bg-transparent placeholder-gray-400"
      />
    </div>
  )
}
