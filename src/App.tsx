import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Shield, 
  Calendar, 
  BookOpen, 
  Brain, 
  TreeEvergreen,
  Phone,
  Compass,
  Sparkle,
  CheckCircle
} from '@phosphor-icons/react'
import { CrisisTools } from '@/components/CrisisTools'
import { DBTModules } from '@/components/DBTModules'
import { MoodTracker } from '@/components/MoodTracker'
import { JournalingSpace } from '@/components/JournalingSpace'
import { SafeSpace } from '@/components/SafeSpace'
import { EmergencyPlan } from '@/components/EmergencyPlan'

interface UserProgress {
  dailyStreak: number
  skillsLearned: number
  journalEntries: number
  moodCheckins: number
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [showCrisis, setShowCrisis] = useState(false)
  const [progress, setProgress] = useState<UserProgress>({
    dailyStreak: 0,
    skillsLearned: 3,
    journalEntries: 0,
    moodCheckins: 0
  })

  const quickTools = [
    {
      title: 'Crisis Support',
      description: 'Immediate grounding and breathing tools',
      icon: Shield,
      color: 'bg-red-50 border-red-200 hover:bg-red-100',
      iconColor: 'text-red-600',
      action: () => setShowCrisis(true)
    },
    {
      title: 'Safe Space',
      description: 'Your personal calming environment',
      icon: Heart,
      color: 'bg-primary/10 border-primary/20 hover:bg-primary/20',
      iconColor: 'text-primary',
      action: () => setActiveTab('safe-space')
    },
    {
      title: 'Daily Practice',
      description: 'DBT skills for today',
      icon: Brain,
      color: 'bg-accent/10 border-accent/20 hover:bg-accent/20',
      iconColor: 'text-accent',
      action: () => setActiveTab('dbt')
    },
    {
      title: 'Mood Check',
      description: 'Track how you\'re feeling',
      icon: Calendar,
      color: 'bg-secondary border-border hover:bg-muted',
      iconColor: 'text-muted-foreground',
      action: () => setActiveTab('tracker')
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Crisis Dialog */}
      <Dialog open={showCrisis} onOpenChange={setShowCrisis}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-600" />
              Crisis Support Tools
            </DialogTitle>
            <DialogDescription>
              You're safe here. Take your time and choose what feels most helpful right now.
            </DialogDescription>
          </DialogHeader>
          <CrisisTools onClose={() => setShowCrisis(false)} />
        </DialogContent>
      </Dialog>

      <div className="container mx-auto p-4 max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2 flex items-center justify-center gap-3">
            <TreeEvergreen className="h-8 w-8 text-primary breathing-animation" />
            CalmBridge
          </h1>
          <p className="text-lg text-muted-foreground">Your companion for healing and growth</p>
        </div>

        {/* Crisis Button - Always Visible */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button 
            onClick={() => setShowCrisis(true)}
            className="h-16 w-16 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-lg gentle-pulse"
            size="icon"
          >
            <Shield className="h-6 w-6" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-6 w-full max-w-2xl mx-auto">
            <TabsTrigger value="home" className="flex items-center gap-2">
              <Compass className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </TabsTrigger>
            <TabsTrigger value="dbt" className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">DBT</span>
            </TabsTrigger>
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Track</span>
            </TabsTrigger>
            <TabsTrigger value="journal" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Journal</span>
            </TabsTrigger>
            <TabsTrigger value="safe-space" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span className="hidden sm:inline">Safe</span>
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Plan</span>
            </TabsTrigger>
          </TabsList>

          {/* Home Tab */}
          <TabsContent value="home" className="space-y-6">
            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkle className="h-5 w-5 text-accent" />
                  Your Journey
                </CardTitle>
                <CardDescription>Celebrating your progress and growth</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{progress.dailyStreak}</div>
                    <div className="text-sm text-muted-foreground">Day Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{progress.skillsLearned}</div>
                    <div className="text-sm text-muted-foreground">Skills Learned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{progress.journalEntries}</div>
                    <div className="text-sm text-muted-foreground">Journal Entries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{progress.moodCheckins}</div>
                    <div className="text-sm text-muted-foreground">Mood Check-ins</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quickTools.map((tool, index) => (
                <Card 
                  key={index} 
                  className={`${tool.color} cursor-pointer transition-all duration-200 hover:shadow-md`}
                  onClick={tool.action}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-white/50 ${tool.iconColor}`}>
                        <tool.icon className="h-6 w-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{tool.title}</h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Today's Recommendation */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  Suggested for Today
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium mb-1">Mindfulness Practice</h3>
                    <p className="text-sm text-muted-foreground">5-minute grounding exercise to center yourself</p>
                  </div>
                  <Button onClick={() => setActiveTab('dbt')} className="shrink-0">
                    Start Practice
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dbt">
            <DBTModules progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="tracker">
            <MoodTracker progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="journal">
            <JournalingSpace progress={progress} setProgress={setProgress} />
          </TabsContent>

          <TabsContent value="safe-space">
            <SafeSpace />
          </TabsContent>

          <TabsContent value="emergency">
            <EmergencyPlan />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default App