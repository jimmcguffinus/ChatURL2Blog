export type TransformMode = 'blog' | 'transcript'
export type ViewStyle = 'vertical' | 'cards'

export interface TransformRequest {
  url: string
  speaker1: string
  speaker2: string
  mode: TransformMode
  viewStyle: ViewStyle
}

export interface TokenUsage {
  promptTokens: number
  responseTokens: number
  totalTokens: number
  estimatedCost: number
}

export interface TransformResult {
  blog?: BlogContent
  transcript?: TranscriptExchange[]
  tokenUsage?: TokenUsage
}

export interface BlogContent {
  title: string
  subtitle: string
  summary: string
  tags: string[]
  sections: BlogSection[]
}

export interface BlogSection {
  title: string
  content: string
}

export interface TranscriptExchange {
  speaker: string
  message: string
  timestamp?: string
}

export interface ProgressStep {
  name: string
  icon: any
  description: string
}

export interface SavedItem {
  id: string
  title: string
  type: TransformMode
  createdAt: Date
  url: string
  result: TransformResult
}

export interface DownloadFormat {
  type: 'html' | 'pdf' | 'markdown'
  label: string
  icon: string
}

export interface ShareOptions {
  title: string
  text: string
  url: string
} 