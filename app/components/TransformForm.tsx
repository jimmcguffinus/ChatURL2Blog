'use client'

import { useState } from 'react'
import { FileText, MessageSquare, User, Bot, Sparkles } from 'lucide-react'
import type { TransformRequest, TransformMode, ViewStyle } from '../page'

interface TransformFormProps {
  onSubmit: (request: TransformRequest) => void
}

export default function TransformForm({ onSubmit }: TransformFormProps) {
  const [url, setUrl] = useState('')
  const [speaker1, setSpeaker1] = useState('Human')
  const [speaker2, setSpeaker2] = useState('AI')
  const [mode, setMode] = useState<TransformMode>('blog')
  const [viewStyle, setViewStyle] = useState<ViewStyle>('vertical')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!url.trim()) {
      alert('Please enter a ChatGPT URL')
      return
    }

    onSubmit({
      url: url.trim(),
      speaker1: speaker1.trim() || 'Human',
      speaker2: speaker2.trim() || 'AI',
      mode,
      viewStyle,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* URL Input */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
          ChatGPT Share URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://chat.openai.com/share/..."
          className="input-field"
          required
        />
      </div>

      {/* Speaker Names */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="speaker1" className="block text-sm font-medium text-gray-700 mb-2">
            <User className="w-4 h-4 inline mr-1" />
            Speaker 1 Name
          </label>
          <input
            id="speaker1"
            type="text"
            value={speaker1}
            onChange={(e) => setSpeaker1(e.target.value)}
            placeholder="Human"
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="speaker2" className="block text-sm font-medium text-gray-700 mb-2">
            <Bot className="w-4 h-4 inline mr-1" />
            Speaker 2 Name
          </label>
          <input
            id="speaker2"
            type="text"
            value={speaker2}
            onChange={(e) => setSpeaker2(e.target.value)}
            placeholder="AI"
            className="input-field"
          />
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Output Mode
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setMode('blog')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              mode === 'blog'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <FileText className="w-6 h-6 mb-2 mx-auto" />
            <div className="text-sm font-medium">Blog Mode</div>
            <div className="text-xs text-gray-500 mt-1">
              Structured article with sections
            </div>
          </button>
          
          <button
            type="button"
            onClick={() => setMode('transcript')}
            className={`p-4 rounded-lg border-2 transition-all duration-200 ${
              mode === 'transcript'
                ? 'border-primary-500 bg-primary-50 text-primary-700'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <MessageSquare className="w-6 h-6 mb-2 mx-auto" />
            <div className="text-sm font-medium">Transcript Mode</div>
            <div className="text-xs text-gray-500 mt-1">
              Conversation-style layout
            </div>
          </button>
        </div>
      </div>

      {/* View Style (only for transcript mode) */}
      {mode === 'transcript' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            View Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setViewStyle('vertical')}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                viewStyle === 'vertical'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">Vertical Scroll</div>
              <div className="text-xs text-gray-500 mt-1">
                Traditional scrolling view
              </div>
            </button>
            
            <button
              type="button"
              onClick={() => setViewStyle('cards')}
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                viewStyle === 'cards'
                  ? 'border-primary-500 bg-primary-50 text-primary-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-sm font-medium">Slide Cards</div>
              <div className="text-xs text-gray-500 mt-1">
                Full-screen exchange view
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary w-full flex items-center justify-center py-3"
      >
        <Sparkles className="w-5 h-5 mr-2" />
        Transform Chat
      </button>
    </form>
  )
} 