import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { 
  TrendUp, 
  Calendar, 
  Heart, 
  Brain,
  Warning,
  Sparkle,
  Plus
} from '@phosphor-icons/react'

interface UserProgress {
  dailyStreak: number
  skillsLearned: number
  journalEntries: number
  moodCheckins: number
}

interface MoodTrackerProps {
  progress: UserProgress
  setProgress: (progress: UserProgress) => void
}

interface MoodEntry {
  id: string
  date: string
  mood: number
  anxiety: number
  depression: number
  ptsdSymptoms: number
  triggers: string[]
  copingUsed: string[]
  notes: string
}

export function MoodTracker({ progress, setProgress }: MoodTrackerProps) {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([])
  const [showNewEntry, setShowNewEntry] = useState(false)
  
  // New entry state
  const [mood, setMood] = useState([5])
  const [anxiety, setAnxiety] = useState([5])
  const [depression, setDepression] = useState([5])
  const [ptsdSymptoms, setPtsdSymptoms] = useState([5])
  const [selectedTriggers, setSelectedTriggers] = useState<string[]>([])
  const [selectedCoping, setSelectedCoping] = useState<string[]>([])
  const [notes, setNotes] = useState('')

  const commonTriggers = [
    'Loud noises', 'Crowded places', 'Unexpected touch', 'Conflict',
    'Being alone', 'Driving', 'Medical appointments', 'News/media',
    'Anniversaries', 'Sleep deprivation', 'Work stress', 'Relationship issues'
  ]

  const copingStrategies = [
    'Deep breathing', 'Grounding exercises', 'Physical exercise', 'Meditation',
    'Journaling', 'Talking to someone', 'Listening to music', 'Taking a walk',
    'Progressive muscle relaxation', 'DBT skills', 'Therapy', 'Medication'
  ]

  const addMoodEntry = () => {
    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      mood: mood[0],
      anxiety: anxiety[0],
      depression: depression[0],
      ptsdSymptoms: ptsdSymptoms[0],
      triggers: selectedTriggers,
      copingUsed: selectedCoping,
      notes
    }

    setMoodEntries([newEntry, ...moodEntries])
    setProgress({
      ...progress,
      moodCheckins: progress.moodCheckins + 1
    })

    // Reset form
    setMood([5])
    setAnxiety([5])
    setDepression([5])
    setPtsdSymptoms([5])
    setSelectedTriggers([])
    setSelectedCoping([])
    setNotes('')
    setShowNewEntry(false)
  }

  const toggleTrigger = (trigger: string) => {
    setSelectedTriggers(prev => 
      prev.includes(trigger) 
        ? prev.filter(t => t !== trigger)
        : [...prev, trigger]
    )
  }

  const toggleCoping = (strategy: string) => {
    setSelectedCoping(prev => 
      prev.includes(strategy) 
        ? prev.filter(s => s !== strategy)
        : [...prev, strategy]
    )
  }

  const getRecentTrend = () => {
    if (moodEntries.length < 2) return null
    const recent = moodEntries.slice(0, 7) // Last 7 entries
    const average = recent.reduce((sum, entry) => sum + entry.mood, 0) / recent.length
    const previousAverage = moodEntries.slice(7, 14).reduce((sum, entry) => sum + entry.mood, 0) / Math.min(7, moodEntries.slice(7, 14).length)
    
    if (moodEntries.slice(7, 14).length === 0) return null
    return average - previousAverage
  }

  const getMoodColor = (value: number) => {
    if (value <= 3) return 'text-red-600 bg-red-50 border-red-200'
    if (value <= 6) return 'text-yellow-600 bg-yellow-50 border-yellow-200'
    return 'text-green-600 bg-green-50 border-green-200'
  }

  const getMoodLabel = (value: number) => {
    if (value <= 2) return 'Very Low'
    if (value <= 4) return 'Low'
    if (value <= 6) return 'Moderate'
    if (value <= 8) return 'Good'
    return 'Excellent'
  }

  const trend = getRecentTrend()

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Mood & Wellness Tracker
          </CardTitle>
          <CardDescription>
            Track your emotional patterns and PTSD symptoms to understand your healing journey
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{moodEntries.length}</div>
                <div className="text-sm text-muted-foreground">Total Check-ins</div>
              </div>
              {trend !== null && (
                <div className="flex items-center gap-2">
                  <TrendUp className={`h-4 w-4 ${trend > 0 ? 'text-green-600' : 'text-red-600'} ${trend > 0 ? '' : 'rotate-180'}`} />
                  <span className={`text-sm font-medium ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {trend > 0 ? 'Improving' : 'Needs attention'}
                  </span>
                </div>
              )}
            </div>
            <Button onClick={() => setShowNewEntry(true)}>
              <Plus className="h-4 w-4 mr-2" />
              New Check-in
            </Button>
          </div>
        </CardContent>
      </Card>

      {showNewEntry && (
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Daily Check-in
            </CardTitle>
            <CardDescription>How are you feeling today?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Overall Mood</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={mood}
                      onValueChange={setMood}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Very Low</span>
                      <span className="font-medium">{mood[0]} - {getMoodLabel(mood[0])}</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">Anxiety Level</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={anxiety}
                      onValueChange={setAnxiety}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>None</span>
                      <span className="font-medium">{anxiety[0]}/10</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">Depression Level</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={depression}
                      onValueChange={setDepression}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>None</span>
                      <span className="font-medium">{depression[0]}/10</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-base font-medium">PTSD Symptoms</Label>
                  <div className="mt-2 space-y-2">
                    <Slider
                      value={ptsdSymptoms}
                      onValueChange={setPtsdSymptoms}
                      max={10}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>None</span>
                      <span className="font-medium">{ptsdSymptoms[0]}/10</span>
                      <span>Severe</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Triggers Today</Label>
              <div className="flex flex-wrap gap-2">
                {commonTriggers.map((trigger) => (
                  <Badge
                    key={trigger}
                    variant={selectedTriggers.includes(trigger) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleTrigger(trigger)}
                  >
                    {trigger}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">Coping Strategies Used</Label>
              <div className="flex flex-wrap gap-2">
                {copingStrategies.map((strategy) => (
                  <Badge
                    key={strategy}
                    variant={selectedCoping.includes(strategy) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => toggleCoping(strategy)}
                  >
                    {strategy}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notes" className="text-base font-medium">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="How was your day? Any insights or observations..."
                className="mt-2"
                rows={3}
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={addMoodEntry} className="flex-1">
                Save Check-in
              </Button>
              <Button 
                onClick={() => setShowNewEntry(false)} 
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {moodEntries.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkle className="h-5 w-5 text-accent" />
              Recent Check-ins
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {moodEntries.slice(0, 5).map((entry) => (
                <div key={entry.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{new Date(entry.date).toLocaleDateString()}</span>
                    <Badge className={getMoodColor(entry.mood)}>
                      Mood: {entry.mood}/10
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Anxiety: </span>
                      <span className="font-medium">{entry.anxiety}/10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Depression: </span>
                      <span className="font-medium">{entry.depression}/10</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">PTSD: </span>
                      <span className="font-medium">{entry.ptsdSymptoms}/10</span>
                    </div>
                  </div>

                  {entry.triggers.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Triggers: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {entry.triggers.map((trigger) => (
                          <Badge key={trigger} variant="outline" className="text-xs">
                            {trigger}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.copingUsed.length > 0 && (
                    <div>
                      <span className="text-sm text-muted-foreground">Coping used: </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {entry.copingUsed.map((strategy) => (
                          <Badge key={strategy} variant="secondary" className="text-xs">
                            {strategy}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {entry.notes && (
                    <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
                      {entry.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}