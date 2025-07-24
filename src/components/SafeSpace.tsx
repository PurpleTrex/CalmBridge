import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'
import { 
  Heart, 
  TreeEvergreen, 
  Waves, 
  Sun,
  Moon,
  Sparkle,
  Play,
  Pause,
  SpeakerHigh,
  Gear
} from '@phosphor-icons/react'

interface SafeSpaceSettings {
  environment: 'forest' | 'ocean' | 'mountains' | 'garden'
  timeOfDay: 'sunrise' | 'day' | 'sunset' | 'night'
  soundVolume: number
  affirmationsEnabled: boolean
  breathingGuideEnabled: boolean
}

export function SafeSpace() {
  const [settings, setSettings] = useState<SafeSpaceSettings>({
    environment: 'forest',
    timeOfDay: 'day',
    soundVolume: 50,
    affirmationsEnabled: true,
    breathingGuideEnabled: true
  })
  
  const [isActive, setIsActive] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentAffirmation, setCurrentAffirmation] = useState(0)

  const environments = [
    {
      id: 'forest',
      name: 'Peaceful Forest',
      icon: TreeEvergreen,
      description: 'Tall trees, gentle breeze, bird songs',
      gradient: 'from-green-400 via-green-500 to-green-600',
      sounds: 'Forest sounds, birds chirping, leaves rustling'
    },
    {
      id: 'ocean',
      name: 'Calm Ocean',
      icon: Waves,
      description: 'Gentle waves, soft sand, seagulls',
      gradient: 'from-blue-400 via-blue-500 to-blue-600',
      sounds: 'Ocean waves, seagulls, gentle breeze'
    },
    {
      id: 'mountains',
      name: 'Mountain Vista',
      icon: Sun,
      description: 'Rolling hills, clear sky, peaceful silence',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      sounds: 'Wind through mountains, distant birds'
    },
    {
      id: 'garden',
      name: 'Zen Garden',
      icon: Sparkle,
      description: 'Blooming flowers, flowing water, butterflies',
      gradient: 'from-pink-400 via-pink-500 to-pink-600',
      sounds: 'Water fountain, bees humming, gentle wind'
    }
  ]

  const affirmations = [
    "I am safe in this moment.",
    "I am worthy of love and healing.",
    "My feelings are valid and temporary.",
    "I have survived difficult times before.",
    "I am stronger than I know.",
    "I choose peace over worry.",
    "I am exactly where I need to be.",
    "I trust in my ability to heal.",
    "I am surrounded by love and support.",
    "Each breath brings me more peace.",
    "I release what no longer serves me.",
    "I am growing and learning every day.",
    "I deserve compassion, especially from myself.",
    "I can handle whatever comes my way.",
    "I am creating a life filled with peace."
  ]

  const timeOfDayOptions = [
    { id: 'sunrise', name: 'Sunrise', icon: Sun, description: 'Warm, hopeful light' },
    { id: 'day', name: 'Bright Day', icon: Sun, description: 'Clear, energizing light' },
    { id: 'sunset', name: 'Sunset', icon: Sun, description: 'Golden, calming light' },
    { id: 'night', name: 'Peaceful Night', icon: Moon, description: 'Soft, restful moonlight' }
  ]

  const selectedEnvironment = environments.find(env => env.id === settings.environment)

  const enterSafeSpace = () => {
    setIsActive(true)
    setCurrentAffirmation(0)
    
    // Cycle through affirmations every 30 seconds
    if (settings.affirmationsEnabled) {
      const interval = setInterval(() => {
        setCurrentAffirmation(prev => (prev + 1) % affirmations.length)
      }, 30000)
      
      return () => clearInterval(interval)
    }
  }

  if (isActive) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className={`absolute inset-0 bg-gradient-to-br ${selectedEnvironment?.gradient} opacity-90`}>
          <div className="absolute inset-0 bg-black/20" />
        </div>
        
        <div className="relative z-10 text-center text-white space-y-8 p-8 max-w-2xl mx-auto">
          <div className="breathing-animation">
            {selectedEnvironment && <selectedEnvironment.icon className="h-24 w-24 mx-auto mb-6 opacity-80" />}
          </div>
          
          <h1 className="text-4xl font-light mb-4">Your Safe Space</h1>
          <p className="text-xl opacity-90 mb-8">{selectedEnvironment?.description}</p>
          
          {settings.affirmationsEnabled && (
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
              <p className="text-2xl font-light italic">
                "{affirmations[currentAffirmation]}"
              </p>
            </div>
          )}
          
          {settings.breathingGuideEnabled && (
            <div className="space-y-4">
              <div className="text-lg opacity-80">Breathe with the gentle rhythm</div>
              <div className="breathing-animation w-20 h-20 mx-auto bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full" />
              </div>
              <div className="text-sm opacity-70">Inhale... hold... exhale... hold...</div>
            </div>
          )}
          
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button 
              onClick={() => setIsActive(false)}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Pause className="h-4 w-4 mr-2" />
              Leave Safe Space
            </Button>
            <Button 
              onClick={() => setShowSettings(true)}
              variant="outline"
              className="bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              <Gear className="h-4 w-4 mr-2" />
              Customize
            </Button>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-3 text-white">
            <SpeakerHigh className="h-4 w-4" />
            <span className="text-sm">{selectedEnvironment?.sounds}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            Your Safe Space
          </CardTitle>
          <CardDescription>
            Create a personalized calming environment for moments when you need comfort and grounding
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={enterSafeSpace} className="w-full h-16 text-lg">
            <Play className="h-6 w-6 mr-3" />
            Enter Your Safe Space
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customize Your Environment</CardTitle>
          <CardDescription>
            Choose settings that feel most calming and safe for you
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">Environment</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {environments.map((env) => (
                <Card 
                  key={env.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    settings.environment === env.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'border-border'
                  }`}
                  onClick={() => setSettings({ ...settings, environment: env.id as any })}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${env.gradient}`}>
                        <env.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium">{env.name}</h3>
                        <p className="text-sm text-muted-foreground">{env.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-4 block">Time of Day</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {timeOfDayOptions.map((time) => (
                <Card 
                  key={time.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    settings.timeOfDay === time.id 
                      ? 'ring-2 ring-primary border-primary' 
                      : 'border-border'
                  }`}
                  onClick={() => setSettings({ ...settings, timeOfDay: time.id as any })}
                >
                  <CardContent className="p-3 text-center">
                    <time.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <div className="font-medium text-sm">{time.name}</div>
                    <div className="text-xs text-muted-foreground">{time.description}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-base font-medium mb-3 block">Sound Volume</Label>
            <div className="space-y-2">
              <Slider
                value={[settings.soundVolume]}
                onValueChange={(value) => setSettings({ ...settings, soundVolume: value[0] })}
                max={100}
                min={0}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Silent</span>
                <span>{settings.soundVolume}%</span>
                <span>Full Volume</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="affirmations"
                checked={settings.affirmationsEnabled}
                onChange={(e) => setSettings({ ...settings, affirmationsEnabled: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="affirmations" className="text-sm font-medium">
                Show healing affirmations
              </label>
            </div>
            
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="breathing"
                checked={settings.breathingGuideEnabled}
                onChange={(e) => setSettings({ ...settings, breathingGuideEnabled: e.target.checked })}
                className="rounded"
              />
              <label htmlFor="breathing" className="text-sm font-medium">
                Include breathing guide
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-primary/10">
              <Heart className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-medium mb-2">How to Use Your Safe Space</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use during or after flashbacks, panic attacks, or overwhelming emotions</li>
                <li>• Stay as long as you need - there's no time limit</li>
                <li>• Focus on the affirmations and breathing guide to ground yourself</li>
                <li>• Remember: you can return here anytime you need comfort</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}