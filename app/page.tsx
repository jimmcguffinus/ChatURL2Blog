'use client'

import { useState } from 'react'
import { Sparkles, FileText, MessageSquare, Loader2, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'
import { cn, validateChatGPTUrl, getReadTime } from '@/lib/utils'
import type { TransformRequest, TransformResult } from '@/types'

const steps = [
  { name: 'Fetching', icon: Loader2, description: 'Retrieving ChatGPT content' },
  { name: 'Analyzing', icon: Loader2, description: 'Processing conversation' },
  { name: 'Structuring', icon: Loader2, description: 'Organizing content' },
  { name: 'Polishing', icon: Loader2, description: 'Final formatting' },
]

export default function Home() {
  const [isTransforming, setIsTransforming] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [result, setResult] = useState<TransformResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    url: '',
    speaker1: 'Human',
    speaker2: 'AI',
    mode: 'blog' as const,
    viewStyle: 'vertical' as const,
  })
  const { toast } = useToast()

  const handleTransform = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.url.trim()) {
      toast({
        title: "Error",
        description: "Please enter a ChatGPT URL",
        variant: "destructive",
      })
      return
    }

    if (!validateChatGPTUrl(formData.url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid ChatGPT share URL",
        variant: "destructive",
      })
      return
    }

    setIsTransforming(true)
    setCurrentStep(0)
    setError(null)
    setResult(null)

    try {
      // Simulate progress steps
      for (let i = 0; i < steps.length; i++) {
        setCurrentStep(i)
        await new Promise(resolve => setTimeout(resolve, 800))
      }

      const response = await fetch('/api/transform', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to transform URL')
      }

      const data = await response.json()
      setResult(data)
      
      toast({
        title: "Success!",
        description: `Transformed to ${formData.mode} mode`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsTransforming(false)
      setCurrentStep(0)
    }
  }

  const handleDownload = (format: 'html' | 'pdf' | 'markdown') => {
    if (!result) return
    
    toast({
      title: "Download Started",
      description: `Downloading as ${format.toUpperCase()}`,
    })
    
    // Implementation for download functionality
    console.log(`Downloading as ${format}`)
  }

  const handleShare = () => {
    if (!result) return
    
    if (navigator.share) {
      navigator.share({
        title: 'ChatURL2Blog',
        text: 'Check out this transformed conversation!',
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link Copied",
        description: "Share link copied to clipboard",
      })
    }
  }

  return (
    <div className="min-h-screen gradient-bg">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-bold text-foreground">ChatURL2Blog</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform ChatGPT share URLs into clean, beautiful, and shareable content
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Transform Your Chat</CardTitle>
              <CardDescription>
                Enter a ChatGPT share URL and customize your output
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isTransforming ? (
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-4">
                      {steps.map((step, index) => (
                        <div key={index} className="flex items-center">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            index < currentStep
                              ? "bg-green-500 text-white"
                              : index === currentStep
                              ? "bg-primary text-white animate-pulse"
                              : "bg-muted text-muted-foreground"
                          )}>
                            {index < currentStep ? (
                              <div className="w-4 h-4 bg-white rounded-full" />
                            ) : (
                              <Loader2 className={cn("w-4 h-4", index === currentStep && "animate-spin")} />
                            )}
                          </div>
                          <span className={cn(
                            "ml-2 text-sm font-medium",
                            index <= currentStep ? "text-foreground" : "text-muted-foreground"
                          )}>
                            {step.name}
                          </span>
                          {index < steps.length - 1 && (
                            <div className={cn(
                              "w-12 h-0.5 mx-4",
                              index < currentStep ? "bg-green-500" : "bg-muted"
                            )} />
                          )}
                        </div>
                      ))}
                    </div>
                    <Progress value={(currentStep / (steps.length - 1)) * 100} className="w-full" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {currentStep < steps.length
                        ? `Currently ${steps[currentStep].name.toLowerCase()}...`
                        : 'Transformation complete!'}
                    </p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleTransform} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url">ChatGPT Share URL</Label>
                    <Input
                      id="url"
                      type="url"
                      placeholder=""
                      value={formData.url}
                      onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="speaker1">Speaker 1 Name</Label>
                      <Input
                        id="speaker1"
                        value={formData.speaker1}
                        onChange={(e) => setFormData(prev => ({ ...prev, speaker1: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="speaker2">Speaker 2 Name</Label>
                      <Input
                        id="speaker2"
                        value={formData.speaker2}
                        onChange={(e) => setFormData(prev => ({ ...prev, speaker2: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Output Mode</Label>
                    <RadioGroup
                      value={formData.mode}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, mode: value as 'blog' | 'transcript' }))}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="blog" id="blog" />
                        <Label htmlFor="blog" className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          Blog Mode
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="transcript" id="transcript" />
                        <Label htmlFor="transcript" className="flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Transcript Mode
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>View Style</Label>
                    <RadioGroup
                      value={formData.viewStyle}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, viewStyle: value as 'vertical' | 'cards' }))}
                      className="grid grid-cols-2 gap-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="vertical" id="vertical" />
                        <Label htmlFor="vertical">Vertical Scroll</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="cards" id="cards" />
                        <Label htmlFor="cards">Slide Cards</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    <Sparkles className="w-5 h-5 mr-2" />
                    Transform Chat
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card className="animate-slide-in">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <CardDescription>
                Your transformed content will appear here
              </CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
                  <p className="text-destructive">{error}</p>
                </div>
              )}
              
              {result && (
                <div className="space-y-4">
                  {result.blog && (
                    <div className="space-y-4">
                      <div className="border-b pb-4">
                        <h2 className="text-2xl font-bold mb-2">{result.blog.title}</h2>
                        {result.blog.subtitle && (
                          <p className="text-lg text-muted-foreground mb-3">{result.blog.subtitle}</p>
                        )}
                        <p className="text-foreground leading-relaxed mb-4">{result.blog.summary}</p>
                        <div className="flex flex-wrap gap-2">
                          {result.blog.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        {result.blog.sections.map((section, index) => (
                          <div key={index} className="border-l-4 border-primary/20 pl-4">
                            <h3 className="text-lg font-semibold mb-2 flex items-center">
                              <FileText className="w-4 h-4 mr-2 text-primary" />
                              {section.title}
                            </h3>
                            <div
                              className="text-foreground leading-relaxed prose prose-sm max-w-none"
                              dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 pt-4 border-t">
                        <Button onClick={() => handleDownload('html')} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          HTML
                        </Button>
                        <Button onClick={() => handleDownload('pdf')} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button onClick={() => handleDownload('markdown')} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          MD
                        </Button>
                        <Button onClick={handleShare} variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  {result.transcript && (
                    <div className="space-y-4">
                      <div className="space-y-4 max-h-96 overflow-y-auto">
                        {result.transcript.map((exchange, index) => (
                          <div
                            key={index}
                            className={cn(
                              "flex gap-3",
                              exchange.speaker.toLowerCase().includes('human') || exchange.speaker.toLowerCase().includes('user')
                                ? "justify-start"
                                : "justify-end"
                            )}
                          >
                            <div
                              className={cn(
                                "max-w-xs lg:max-w-md p-3 rounded-lg",
                                exchange.speaker.toLowerCase().includes('human') || exchange.speaker.toLowerCase().includes('user')
                                  ? "bg-blue-100 text-blue-900"
                                  : "bg-muted text-foreground"
                              )}
                            >
                              <div className="flex items-center mb-2">
                                <span className="text-sm font-medium">{exchange.speaker}</span>
                                {exchange.timestamp && (
                                  <span className="text-xs text-muted-foreground ml-auto">{exchange.timestamp}</span>
                                )}
                              </div>
                              <div
                                className="text-sm leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: exchange.message }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 pt-4 border-t">
                        <Button onClick={() => handleDownload('html')} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          HTML
                        </Button>
                        <Button onClick={() => handleDownload('pdf')} variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        <Button onClick={handleShare} variant="outline" size="sm">
                          <Share2 className="w-4 h-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {!result && !error && !isTransforming && (
                <div className="text-center py-12 text-muted-foreground">
                  <div className="flex justify-center mb-4">
                    <div className="flex space-x-4">
                      <FileText className="w-8 h-8 text-muted-foreground" />
                      <MessageSquare className="w-8 h-8 text-muted-foreground" />
                    </div>
                  </div>
                  <p>Enter a ChatGPT URL to see the preview here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 