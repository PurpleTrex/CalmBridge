import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Wind, 
  HandHeart, 
  Eye, 
  Waves, 
  Timer,
  CheckCircle
} from '@phosphor-icons/react'

interface CrisisToolsProps {
  onClose: () => void
}

export function CrisisTools({ onClose }: CrisisToolsProps) {
  const [activeExercise, setActiveExercise] = useState<string | null>(null)
  const [breathingCount, setBreathingCount] = useState(0)
  const [timer, setTimer] = useState(0)

  const crisisTools = [
    {
      id: 'breathing',
      title: '5-4-3-2-1 Grounding',
      description: 'Ground yourself using your senses',
      icon: Eye,
      duration: '3-5 minutes',
      difficulty: 'Easy',
      steps: [
        'Name 5 things you can see',
        'Name 4 things you can touch',
        'Name 3 things you can hear',
        'Name 2 things you can smell',
        'Name 1 thing you can taste'
      ]
    },
    {
      id: 'box-breathing',
      title: 'Box Breathing',
      description: 'Calm your nervous system with rhythmic breathing',
      icon: Wind,
      duration: '2-10 minutes',
      difficulty: 'Easy',
      steps: [
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 4 counts',
        'Hold for 4 counts',
        'Repeat the cycle'
      ]
    },
    {
      id: 'ice-cube',
      title: 'Ice Cube Technique',
      description: 'Use cold to ground yourself in the present',
      icon: Waves,
      duration: '1-3 minutes',
      difficulty: 'Easy',
      steps: [
        'Hold an ice cube in your hand',
        'Focus on the cold sensation',
        'Notice how it feels against your skin',
        'Pay attention to the melting',
        'Stay present with the sensation'
      ]
    },
    {
      id: 'butterfly-hug',
      title: 'Butterfly Hug',
      description: 'Self-soothing through bilateral stimulation',
      icon: HandHeart,
      duration: '1-5 minutes',
      difficulty: 'Easy',
      steps: [
        'Cross your arms over your chest',
        'Place hands on opposite shoulders',
        'Gently tap alternating shoulders',
        'Breathe slowly and deeply',
        'Continue until you feel calmer'
      ]
    }
  ]

  const startBreathingExercise = () => {
    setActiveExercise('box-breathing')
    setBreathingCount(0)
    
    const breathingCycle = () => {
      setTimer(4) // Inhale
      const inhaleTimer = setInterval(() => {
        setTimer(prev => prev - 1)
      }, 1000)
      
      setTimeout(() => {
        clearInterval(inhaleTimer)
        setTimer(4) // Hold
        const holdTimer1 = setInterval(() => {
          setTimer(prev => prev - 1)
        }, 1000)
        
        setTimeout(() => {
          clearInterval(holdTimer1)
          setTimer(4) // Exhale
          const exhaleTimer = setInterval(() => {
            setTimer(prev => prev - 1)
          }, 1000)
          
          setTimeout(() => {
            clearInterval(exhaleTimer)
            setTimer(4) // Hold
            const holdTimer2 = setInterval(() => {
              setTimer(prev => prev - 1)
            }, 1000)
            
            setTimeout(() => {
              clearInterval(holdTimer2)
              setBreathingCount(prev => prev + 1)
              if (breathingCount < 5) {
                breathingCycle()
              } else {
                setActiveExercise(null)
                setTimer(0)
              }
            }, 4000)
          }, 4000)
        }, 4000)
      }, 4000)
    }
    
    breathingCycle()
  }

  if (activeExercise === 'box-breathing') {
    return (
      <div className="text-center space-y-6">
        <div className="breathing-animation mx-auto w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center">
          <Wind className="h-16 w-16 text-primary" />
        </div>
        
        <div>
          <div className="text-4xl font-bold text-primary mb-2">{timer}</div>
          <div className="text-lg text-muted-foreground">
            {timer > 0 ? (
              breathingCount % 4 === 0 ? 'Breathe In' :
              breathingCount % 4 === 1 ? 'Hold' :
              breathingCount % 4 === 2 ? 'Breathe Out' : 'Hold'
            ) : 'Complete'}
          </div>
        </div>
        
        <div>
          <Progress value={(breathingCount / 5) * 100} className="w-full max-w-xs mx-auto" />
          <p className="text-sm text-muted-foreground mt-2">Cycle {breathingCount + 1} of 5</p>
        </div>
        
        <Button 
          onClick={() => {
            setActiveExercise(null)
            setTimer(0)
            setBreathingCount(0)
          }}
          variant="outline"
        >
          Stop Exercise
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">You're going to be okay</h2>
        <p className="text-muted-foreground">These tools can help you feel safer and more grounded right now.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {crisisTools.map((tool) => (
          <Card key={tool.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <tool.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                  <CardDescription className="text-sm">{tool.description}</CardDescription>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">{tool.duration}</Badge>
                <Badge variant="outline" className="text-xs">{tool.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="space-y-2">
                  {tool.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-2 text-sm">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-xs font-medium text-primary mt-0.5">
                        {index + 1}
                      </div>
                      <span className="text-muted-foreground">{step}</span>
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="flex gap-2">
                  {tool.id === 'box-breathing' ? (
                    <Button onClick={startBreathingExercise} className="flex-1">
                      Start Guided Exercise
                    </Button>
                  ) : (
                    <Button 
                      onClick={() => setActiveExercise(tool.id)} 
                      className="flex-1"
                      variant="outline"
                    >
                      Begin Exercise
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-red-50 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-red-100">
              <CheckCircle className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <h3 className="font-medium text-red-900 mb-1">Still need help?</h3>
              <p className="text-sm text-red-800 mb-3">
                If you're having thoughts of self-harm or suicide, please reach out for immediate support.
              </p>
              <div className="flex flex-wrap gap-2">
                <Button size="sm" className="bg-red-600 hover:bg-red-700">
                  Crisis Text Line: Text HOME to 741741
                </Button>
                <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                  Call 988 - Suicide & Crisis Lifeline
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Button onClick={onClose} variant="outline" className="w-full">
          I'm feeling more stable now
        </Button>
      </div>
    </div>
  )
}