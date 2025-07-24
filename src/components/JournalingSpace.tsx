import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { 
  BookOpen, 
  Plus, 
  Heart, 
  Lightbulb,
  Calendar,
  Lock,
  Trash
} from '@phosphor-icons/react'

interface UserProgress {
  dailyStreak: number
  skillsLearned: number
  journalEntries: number
  moodCheckins: number
}

interface JournalingSpaceProps {
  progress: UserProgress
  setProgress: (progress: UserProgress) => void
}

interface JournalEntry {
  id: string
  date: string
  prompt: string
  content: string
  mood: 'positive' | 'neutral' | 'difficult'
  isPrivate: boolean
}

export function JournalingSpace({ progress, setProgress }: JournalingSpaceProps) {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [showNewEntry, setShowNewEntry] = useState(false)
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [content, setContent] = useState('')
  const [isPrivate, setIsPrivate] = useState(true)

  const traumaInformedPrompts = [
    {
      category: 'Grounding & Safety',
      prompts: [
        'What are three things that make me feel safe right now?',
        'Describe a place where I feel completely at peace.',
        'What are some signs that tell me I\'m feeling grounded today?',
        'How did I take care of myself today, even in small ways?'
      ]
    },
    {
      category: 'Emotional Processing',
      prompts: [
        'What emotion am I noticing right now, and where do I feel it in my body?',
        'If my current feeling had a color and shape, what would it be?',
        'What would I say to a friend who was feeling what I\'m feeling?',
        'What do I need to hear right now?'
      ]
    },
    {
      category: 'Strength & Resilience',
      prompts: [
        'What is one challenge I\'ve overcome that I\'m proud of?',
        'How have I grown or changed in positive ways recently?',
        'What strengths did I use today to get through difficult moments?',
        'What would my younger self think about how far I\'ve come?'
      ]
    },
    {
      category: 'Gratitude & Hope',
      prompts: [
        'What small moment of beauty or joy did I notice today?',
        'Who or what am I grateful for right now?',
        'What am I looking forward to, even if it\'s something small?',
        'How did someone show me kindness recently?'
      ]
    },
    {
      category: 'Self-Compassion',
      prompts: [
        'How can I be more gentle with myself today?',
        'What would unconditional self-love look like for me?',
        'What do I need to forgive myself for?',
        'How can I honor my healing journey today?'
      ]
    }
  ]

  const addEntry = () => {
    if (!content.trim()) return

    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      prompt: selectedPrompt,
      content: content.trim(),
      mood: 'neutral', // Could be determined by content analysis
      isPrivate
    }

    setEntries([newEntry, ...entries])
    setProgress({
      ...progress,
      journalEntries: progress.journalEntries + 1
    })

    // Reset form
    setContent('')
    setSelectedPrompt('')
    setShowNewEntry(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getMoodColor = (mood: string) => {
    switch (mood) {
      case 'positive': return 'bg-green-50 border-green-200 text-green-800'
      case 'difficult': return 'bg-orange-50 border-orange-200 text-orange-800'
      default: return 'bg-blue-50 border-blue-200 text-blue-800'
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            Guided Journaling
          </CardTitle>
          <CardDescription>
            A safe space for reflection and emotional processing through trauma-informed prompts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{entries.length}</div>
              <div className="text-sm text-muted-foreground">Journal Entries</div>
            </div>
            <Button onClick={() => setShowNewEntry(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Entry
            </Button>
          </div>
        </CardContent>
      </Card>

      {showNewEntry && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              New Journal Entry
            </CardTitle>
            <CardDescription>
              Take your time. This is your safe space to explore and express.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-medium mb-3 flex items-center gap-2">
                <Lightbulb className="h-4 w-4 text-accent" />
                Choose a prompt (optional)
              </h3>
              <div className="space-y-4">
                {traumaInformedPrompts.map((category) => (
                  <div key={category.category}>
                    <h4 className="text-sm font-medium text-muted-foreground mb-2">
                      {category.category}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {category.prompts.map((prompt) => (
                        <Button
                          key={prompt}
                          variant={selectedPrompt === prompt ? "default" : "outline"}
                          className="text-left h-auto p-3 text-sm"
                          onClick={() => setSelectedPrompt(prompt)}
                        >
                          {prompt}
                        </Button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedPrompt && (
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h3 className="font-medium mb-2">Reflecting on:</h3>
                <p className="text-muted-foreground italic">"{selectedPrompt}"</p>
              </div>
            )}

            <div>
              <label htmlFor="journal-content" className="block text-sm font-medium mb-2">
                Your thoughts and feelings
              </label>
              <Textarea
                id="journal-content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={selectedPrompt || "What's on your mind today? There's no right or wrong way to journal..."}
                className="min-h-[200px] resize-none"
                rows={8}
              />
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="private"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="rounded"
              />
              <label htmlFor="private" className="text-sm flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Keep this entry private (recommended)
              </label>
            </div>

            <div className="flex gap-3">
              <Button onClick={addEntry} disabled={!content.trim()} className="flex-1">
                Save Entry
              </Button>
              <Button 
                onClick={() => {
                  setShowNewEntry(false)
                  setContent('')
                  setSelectedPrompt('')
                }} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {entries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-accent" />
              Your Journal History
            </CardTitle>
            <CardDescription>
              Your personal collection of thoughts and reflections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {entries.slice(0, 10).map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-muted-foreground">
                          {formatDate(entry.date)}
                        </span>
                        {entry.isPrivate && (
                          <Badge variant="outline" className="text-xs">
                            <Lock className="h-3 w-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                      
                      {entry.prompt && (
                        <div className="bg-muted/50 p-2 rounded text-sm italic text-muted-foreground mb-3">
                          Prompt: "{entry.prompt}"
                        </div>
                      )}
                      
                      <div className="text-sm leading-relaxed">
                        {entry.content.length > 200 ? (
                          <Dialog>
                            <DialogTrigger asChild>
                              <div className="cursor-pointer">
                                {entry.content.substring(0, 200)}...
                                <span className="text-primary hover:underline ml-1">Read more</span>
                              </div>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Journal Entry</DialogTitle>
                                <DialogDescription>
                                  {formatDate(entry.date)}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4">
                                {entry.prompt && (
                                  <div className="bg-muted/50 p-3 rounded">
                                    <h3 className="font-medium mb-1">Prompt:</h3>
                                    <p className="text-sm italic text-muted-foreground">"{entry.prompt}"</p>
                                  </div>
                                )}
                                <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                  {entry.content}
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        ) : (
                          <div className="whitespace-pre-wrap">{entry.content}</div>
                        )}
                      </div>
                    </div>
                    
                    <Button
                      onClick={() => deleteEntry(entry.id)}
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              
              {entries.length > 10 && (
                <div className="text-center text-sm text-muted-foreground">
                  Showing 10 most recent entries. You have {entries.length - 10} more entries.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {entries.length === 0 && !showNewEntry && (
        <Card className="border-dashed border-2 border-muted">
          <CardContent className="p-8 text-center">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">Start Your Healing Journey</h3>
            <p className="text-muted-foreground mb-4">
              Journaling can be a powerful tool for processing emotions and tracking your progress.
            </p>
            <Button onClick={() => setShowNewEntry(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Write Your First Entry
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}