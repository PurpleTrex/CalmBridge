import { SkillDialogContent } from "./SkillDialogContent"
import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { 
  Brain, 
  Heart, 
  Shield, 
  Users, 
  CheckCircle,
  Star,
  Play,
  BookOpen,
  PencilSimple,
  Heart as HeartFilled,
  Sparkle
} from '@phosphor-icons/react'

interface UserProgress {
  dailyStreak: number
  skillsLearned: number
  journalEntries: number
  moodCheckins: number
}

interface DBTModulesProps {
  progress: UserProgress
  setProgress: (progress: UserProgress) => void
}

interface WorksheetField {
  id: string
  label: string
  type: 'text' | 'textarea' | 'select' | 'number'
  placeholder?: string
  options?: string[]
  required?: boolean
}

interface Worksheet {
  id: string
  title: string
  description: string
  fields: WorksheetField[]
}

interface TrainingExercise {
  id: string
  title: string
  description: string
  duration: string
  steps: string[]
  reflection: string
}

interface DBTSkill {
  id: string
  title: string
  description: string
  reading?: string[]
  content: string[]
  worksheet?: Worksheet
  training?: TrainingExercise
  completed: boolean
}

interface DBTModule {
  id: string
  title: string
  description: string
  icon: any
  color: string
  skills: DBTSkill[]
}

interface DBTMantra {
  id: string
  text: string
  category: string
  description: string
}

export function DBTModules({ progress, setProgress }: DBTModulesProps) {
  const [completedSkills, setCompletedSkills] = useState<string[]>([])
  const [selectedSkill, setSelectedSkill] = useState<DBTSkill | null>(null)
  const [showMantras, setShowMantras] = useState(false)
  const [worksheetData, setWorksheetData] = useState<{[key: string]: any}>({})
  const [activeTraining, setActiveTraining] = useState<TrainingExercise | null>(null)

  const dbtMantras: DBTMantra[] = [
    {
      id: 'radical-acceptance',
      text: "I can't change what has already happened, but I can choose how I respond now.",
      category: "Radical Acceptance",
      description: "For accepting difficult situations"
    },
    {
      id: 'emotions-temporary',
      text: "This emotion is temporary. It will pass like a wave.",
      category: "Emotion Regulation",
      description: "When feeling overwhelmed by emotions"
    },
    {
      id: 'wise-mind',
      text: "I am accessing my wise mind - the balance between emotion and reason.",
      category: "Mindfulness",
      description: "For finding balance in decision-making"
    },
    {
      id: 'distress-tolerance',
      text: "I can survive this moment without making it worse.",
      category: "Distress Tolerance",
      description: "During crisis moments"
    },
    {
      id: 'self-compassion',
      text: "I am doing the best I can with the skills I have right now.",
      category: "Self-Compassion",
      description: "When being self-critical"
    },
    {
      id: 'interpersonal',
      text: "I can ask for what I need while respecting others' boundaries.",
      category: "Interpersonal Effectiveness",
      description: "Before difficult conversations"
    }
  ]

  const modules: DBTModule[] = [
    {
      id: 'mindfulness',
      title: 'Mindfulness',
      description: 'Present moment awareness and grounding techniques',
      icon: Brain,
      color: 'bg-purple-50 border-purple-200',
      skills: [
        // ...existing Observe and Describe skills...
        {
          id: 'participate',
          title: 'Participate',
          description: 'Fully engage in the present moment',
          reading: [
            'Participate means throwing yourself completely into activities, becoming one with what you are doing, and letting go of self-consciousness. This skill is about being fully present and engaged, not holding back or observing from the sidelines. Practice Participate by immersing yourself in the moment, allowing yourself to experience life directly and wholeheartedly.'
          ],
          content: [
            'Throw yourself into the activity',
            'Become one with what you are doing',
            'Let go of self-consciousness',
            'Practice being fully present, not holding back'
          ],
          worksheet: {
            id: 'participate-worksheet',
            title: 'Participate Practice Log',
            description: 'Record your experiences of full participation',
            fields: [
              {
                id: 'activity',
                label: 'Activity participated in',
                type: 'text',
                placeholder: 'e.g., dancing, conversation, work',
                required: true
              },
              {
                id: 'how-present',
                label: 'How present were you?',
                type: 'select',
                options: ['Not at all', 'Somewhat', 'Mostly', 'Completely'],
                required: true
              },
              {
                id: 'challenges',
                label: 'Challenges to participation',
                type: 'textarea',
                placeholder: 'What made it hard to fully engage?'
              },
              {
                id: 'benefits',
                label: 'Benefits noticed',
                type: 'textarea',
                placeholder: 'What did you gain from participating?'
              }
            ]
          },
          training: {
            id: 'participate-training',
            title: 'Participate Challenge',
            description: 'Practice full engagement in a chosen activity',
            duration: '10 minutes',
            steps: [
              'Pick an activity you enjoy',
              'Set aside distractions',
              'Focus fully on the activity',
              'Notice distractions and return your attention',
              'Reflect on how this changes your experience'
            ],
            reflection: 'How did practicing one-mindfully affect your focus and enjoyment?'
          },
          completed: completedSkills.includes('participate')
        },
        {
          id: 'check-the-facts',
          title: 'Check the Facts',
          description: 'Analyze whether your emotion fits the facts',
          content: [
            'Describe the situation objectively',
            'Identify your emotion',
            'Check if the emotion fits the facts',
            'If not, use opposite action'
          ],
          worksheet: {
            id: 'check-the-facts-worksheet',
            title: 'Check the Facts Worksheet',
            description: 'Practice checking the facts before acting on emotion',
            fields: [
              {
                id: 'situation',
                label: 'Situation',
                type: 'textarea',
                placeholder: 'Describe the situation',
                required: true
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., anger, sadness, fear',
                required: true
              },
              {
                id: 'facts',
                label: 'Does the emotion fit the facts?',
                type: 'select',
                options: ['Yes', 'No'],
                required: true
              },
              {
                id: 'action',
                label: 'Action taken',
                type: 'textarea',
                placeholder: 'What did you do?'
              }
            ]
          },
          training: {
            id: 'check-the-facts-training',
            title: 'Check the Facts Practice',
            description: 'Practice checking the facts in a real situation',
            duration: '10 minutes',
            steps: [
              'Notice a strong emotion',
              'Describe the situation objectively',
              'Ask: Does my emotion fit the facts?',
              'If not, try opposite action',
              'Reflect on the outcome'
            ],
            reflection: 'How did checking the facts change your response?'
          },
          completed: completedSkills.includes('check-the-facts')
        },
        {
          id: 'build-positive-experiences',
          title: 'Build Positive Experiences',
          description: 'Increase positive emotions by planning enjoyable activities',
          content: [
            'Make a list of enjoyable activities',
            'Schedule at least one each day',
            'Notice and savor positive emotions',
            'Practice gratitude for positive experiences'
          ],
          worksheet: {
            id: 'build-positive-experiences-worksheet',
            title: 'Positive Experiences Log',
            description: 'Track your positive activities and emotions',
            fields: [
              {
                id: 'activity',
                label: 'Activity',
                type: 'text',
                placeholder: 'e.g., walk, music, hobby',
                required: true
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., joy, calm, excitement'
              },
              {
                id: 'gratitude',
                label: 'Gratitude reflection',
                type: 'textarea',
                placeholder: 'What are you grateful for?'
              }
            ]
          },
          training: {
            id: 'build-positive-experiences-training',
            title: 'Positive Experience Challenge',
            description: 'Plan and complete a positive activity each day for a week',
            duration: '1 week',
            steps: [
              'List 7 enjoyable activities',
              'Schedule one for each day',
              'Notice and savor positive emotions',
              'Reflect on the impact of positive experiences'
            ],
            reflection: 'How did building positive experiences affect your mood?'
          },
          completed: completedSkills.includes('build-positive-experiences')
        },
        {
          id: 'reduce-vulnerability',
          title: 'Reduce Vulnerability',
          description: 'Take care of your body and mind to prevent emotional crises',
          content: [
            'Practice PLEASE skills daily',
            'Get enough sleep, eat well, exercise',
            'Avoid mood-altering substances',
            'Practice self-care and stress management'
          ],
          worksheet: {
            id: 'reduce-vulnerability-worksheet',
            title: 'Vulnerability Checklist',
            description: 'Track your self-care habits to reduce vulnerability',
            fields: [
              {
                id: 'sleep',
                label: 'Sleep (hours)',
                type: 'number',
                placeholder: 'e.g., 7',
                required: true
              },
              {
                id: 'nutrition',
                label: 'Nutrition',
                type: 'text',
                placeholder: 'Describe meals and snacks'
              },
              {
                id: 'exercise',
                label: 'Exercise',
                type: 'text',
                placeholder: 'Type and duration'
              },
              {
                id: 'substances',
                label: 'Mood-altering substances',
                type: 'text',
                placeholder: 'Alcohol, drugs, etc.'
              },
              {
                id: 'stress-management',
                label: 'Stress management practiced?',
                type: 'select',
                options: ['Yes', 'No']
              }
            ]
          },
          training: {
            id: 'reduce-vulnerability-training',
            title: 'Self-Care Challenge',
            description: 'Practice all vulnerability-reducing habits for a week',
            duration: '1 week',
            steps: [
              'Track sleep, nutrition, exercise, and substances daily',
              'Practice one stress management technique each day',
              'Reflect on changes in mood and vulnerability'
            ],
            reflection: 'How did reducing vulnerability affect your emotional stability?'
          },
          completed: completedSkills.includes('reduce-vulnerability')
        },
        {
          id: 'increase-positive-emotions',
          title: 'Increase Positive Emotions',
          description: 'Intentionally create and savor positive emotions',
          content: [
            'Notice and savor positive moments',
            'Practice gratitude daily',
            'Engage in activities that bring joy',
            'Share positive experiences with others'
          ],
          worksheet: {
            id: 'increase-positive-emotions-worksheet',
            title: 'Positive Emotion Log',
            description: 'Track and increase positive emotions each day',
            fields: [
              {
                id: 'date',
                label: 'Date',
                type: 'text',
                placeholder: 'e.g., July 24',
                required: true
              },
              {
                id: 'positive-moment',
                label: 'Positive moment noticed',
                type: 'textarea',
                placeholder: 'Describe the moment'
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., joy, gratitude'
              },
              {
                id: 'gratitude',
                label: 'Gratitude practiced?',
                type: 'select',
                options: ['Yes', 'No']
              }
            ]
          },
          training: {
            id: 'increase-positive-emotions-training',
            title: 'Positive Emotion Practice',
            description: 'Practice increasing positive emotions for a week',
            duration: '1 week',
            steps: [
              'Notice and savor at least one positive moment daily',
              'Practice gratitude each day',
              'Share a positive experience with someone else',
              'Reflect on changes in mood and relationships'
            ],
            reflection: 'How did increasing positive emotions affect your life?'
          },
          completed: completedSkills.includes('increase-positive-emotions')
        },
      // ...existing skills for Mindfulness module...
      ]
    },
    {
      id: 'emotion-regulation',
      title: 'Emotion Regulation',
      description: 'Skills for managing intense emotions effectively',
      icon: Heart,
      color: 'bg-red-50 border-red-200',
      skills: [
        // PLEASE Skills removed from Mindfulness module (exists in Emotion Regulation)
        {
          id: 'check-the-facts',
          title: 'Check the Facts',
          description: 'Analyze whether your emotion fits the facts',
          content: [
            'Describe the situation objectively',
            'Identify your emotion',
            'Check if the emotion fits the facts',
            'If not, use opposite action'
          ],
          worksheet: {
            id: 'check-the-facts-worksheet',
            title: 'Check the Facts Worksheet',
            description: 'Practice checking the facts before acting on emotion',
            fields: [
              {
                id: 'situation',
                label: 'Situation',
                type: 'textarea',
                placeholder: 'Describe the situation',
                required: true
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., anger, sadness, fear',
                required: true
              },
              {
                id: 'facts',
                label: 'Does the emotion fit the facts?',
                type: 'select',
                options: ['Yes', 'No'],
                required: true
              },
              {
                id: 'action',
                label: 'Action taken',
                type: 'textarea',
                placeholder: 'What did you do?'
              }
            ]
          },
          training: {
            id: 'check-the-facts-training',
            title: 'Check the Facts Practice',
            description: 'Practice checking the facts in a real situation',
            duration: '10 minutes',
            steps: [
              'Notice a strong emotion',
              'Describe the situation objectively',
              'Ask: Does my emotion fit the facts?',
              'If not, try opposite action',
              'Reflect on the outcome'
            ],
            reflection: 'How did checking the facts change your response?'
          },
          completed: completedSkills.includes('check-the-facts')
        },
        {
          id: 'build-positive-experiences',
          title: 'Build Positive Experiences',
          description: 'Increase positive emotions by planning enjoyable activities',
          content: [
            'Make a list of enjoyable activities',
            'Schedule at least one each day',
            'Notice and savor positive emotions',
            'Practice gratitude for positive experiences'
          ],
          worksheet: {
            id: 'build-positive-experiences-worksheet',
            title: 'Positive Experiences Log',
            description: 'Track your positive activities and emotions',
            fields: [
              {
                id: 'activity',
                label: 'Activity',
                type: 'text',
                placeholder: 'e.g., walk, music, hobby',
                required: true
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., joy, calm, excitement'
              },
              {
                id: 'gratitude',
                label: 'Gratitude reflection',
                type: 'textarea',
                placeholder: 'What are you grateful for?'
              }
            ]
          },
          training: {
            id: 'build-positive-experiences-training',
            title: 'Positive Experience Challenge',
            description: 'Plan and complete a positive activity each day for a week',
            duration: '1 week',
            steps: [
              'List 7 enjoyable activities',
              'Schedule one for each day',
              'Notice and savor positive emotions',
              'Reflect on the impact of positive experiences'
            ],
            reflection: 'How did building positive experiences affect your mood?'
          },
          completed: completedSkills.includes('build-positive-experiences')
        },
        {
          id: 'reduce-vulnerability',
          title: 'Reduce Vulnerability',
          description: 'Take care of your body and mind to prevent emotional crises',
          content: [
            'Practice PLEASE skills daily',
            'Get enough sleep, eat well, exercise',
            'Avoid mood-altering substances',
            'Practice self-care and stress management'
          ],
          worksheet: {
            id: 'reduce-vulnerability-worksheet',
            title: 'Vulnerability Checklist',
            description: 'Track your self-care habits to reduce vulnerability',
            fields: [
              {
                id: 'sleep',
                label: 'Sleep (hours)',
                type: 'number',
                placeholder: 'e.g., 7',
                required: true
              },
              {
                id: 'nutrition',
                label: 'Nutrition',
                type: 'text',
                placeholder: 'Describe meals and snacks'
              },
              {
                id: 'exercise',
                label: 'Exercise',
                type: 'text',
                placeholder: 'Type and duration'
              },
              {
                id: 'substances',
                label: 'Mood-altering substances',
                type: 'text',
                placeholder: 'Alcohol, drugs, etc.'
              },
              {
                id: 'stress-management',
                label: 'Stress management practiced?',
                type: 'select',
                options: ['Yes', 'No']
              }
            ]
          },
          training: {
            id: 'reduce-vulnerability-training',
            title: 'Self-Care Challenge',
            description: 'Practice all vulnerability-reducing habits for a week',
            duration: '1 week',
            steps: [
              'Track sleep, nutrition, exercise, and substances daily',
              'Practice one stress management technique each day',
              'Reflect on changes in mood and vulnerability'
            ],
            reflection: 'How did reducing vulnerability affect your emotional stability?'
          },
          completed: completedSkills.includes('reduce-vulnerability')
        },
        {
          id: 'increase-positive-emotions',
          title: 'Increase Positive Emotions',
          description: 'Intentionally create and savor positive emotions',
          content: [
            'Notice and savor positive moments',
            'Practice gratitude daily',
            'Engage in activities that bring joy',
            'Share positive experiences with others'
          ],
          worksheet: {
            id: 'increase-positive-emotions-worksheet',
            title: 'Positive Emotion Log',
            description: 'Track and increase positive emotions each day',
            fields: [
              {
                id: 'date',
                label: 'Date',
                type: 'text',
                placeholder: 'e.g., July 24',
                required: true
              },
              {
                id: 'positive-moment',
                label: 'Positive moment noticed',
                type: 'textarea',
                placeholder: 'Describe the moment'
              },
              {
                id: 'emotion',
                label: 'Emotion felt',
                type: 'text',
                placeholder: 'e.g., joy, gratitude'
              },
              {
                id: 'gratitude',
                label: 'Gratitude practiced?',
                type: 'select',
                options: ['Yes', 'No']
              }
            ]
          },
          training: {
            id: 'increase-positive-emotions-training',
            title: 'Positive Emotion Practice',
            description: 'Practice increasing positive emotions for a week',
            duration: '1 week',
            steps: [
              'Notice and savor at least one positive moment daily',
              'Practice gratitude each day',
              'Share a positive experience with someone else',
              'Reflect on changes in mood and relationships'
            ],
            reflection: 'How did increasing positive emotions affect your life?'
          },
          completed: completedSkills.includes('increase-positive-emotions')
        },
        {
          id: 'opposite-action',
          title: 'Opposite Action',
          description: 'Act opposite to your emotion when it doesn\'t fit the facts',
          content: [
            'Identify the emotion you\'re feeling',
            'Check if the emotion fits the facts of the situation',
            'If not, consider what the emotion wants you to do',
            'Do the opposite action all the way',
            'Notice how this affects your emotion'
          ],
          worksheet: {
            id: 'opposite-action-worksheet',
            title: 'Opposite Action Worksheet',
            description: 'Practice acting opposite to your emotion when it doesn\'t fit the facts.',
            fields: [
              {
                id: 'emotion',
                label: 'Emotion you felt',
                type: 'text',
                placeholder: 'e.g., anger, sadness, fear',
                required: true
              },
              {
                id: 'facts',
                label: 'Does the emotion fit the facts?',
                type: 'select',
                options: ['Yes', 'No'],
                required: true
              },
              {
                id: 'action-urge',
                label: 'What does the emotion urge you to do?',
                type: 'textarea',
                placeholder: 'Describe the urge or impulse',
                required: true
              },
              {
                id: 'opposite-action',
                label: 'Opposite action you tried',
                type: 'textarea',
                placeholder: 'Describe the opposite action you took',
                required: true
              },
              {
                id: 'result',
                label: 'Result/Reflection',
                type: 'textarea',
                placeholder: 'How did it affect your emotion?',
                required: false
              }
            ]
          },
          training: {
            id: 'opposite-action-training',
            title: 'Opposite Action Practice',
            description: 'Challenge yourself to act opposite to your emotion in a safe situation.',
            duration: '10 minutes',
            steps: [
              'Notice a strong emotion today',
              'Ask: Does this emotion fit the facts?',
              'If not, identify the action urge',
              'Choose a safe, small opposite action',
              'Reflect on how you felt before and after',
              'Repeat with different emotions during the week'
            ],
            reflection: 'What did you learn about your ability to change emotions by changing actions?'
          },
          completed: completedSkills.includes('opposite-action')
        }
      ]
    },
    {
      id: 'distress-tolerance',
      title: 'Distress Tolerance',
      description: 'Surviving crisis situations without making them worse',
      icon: Shield,
      color: 'bg-orange-50 border-orange-200',
      skills: [
        {
          id: 'tipp',
          title: 'TIPP',
          description: 'Quick ways to change your body chemistry in crisis',
          reading: [
            'TIPP skills are designed to help you quickly change your body chemistry and reduce extreme emotional arousal. These skills are based on biological science and are most effective when practiced regularly. Use TIPP in moments of crisis to help your body return to baseline and prevent impulsive actions.'
          ],
          content: [
            'Temperature - Use cold water on face/hands',
            'Intense exercise - Do jumping jacks or run',
            'Paced breathing - Exhale longer than inhale',
            'Paired muscle relaxation - Tense then relax muscles'
          ],
          worksheet: {
            id: 'tipp-worksheet',
            title: 'TIPP Skills Practice Log',
            description: 'Track your use of TIPP skills during a crisis moment.',
            fields: [
              {
                id: 'crisis-description',
                label: 'Describe the crisis moment',
                type: 'textarea',
                placeholder: 'What happened? What were you feeling?',
                required: true
              },
              {
                id: 'tipp-technique',
                label: 'TIPP technique used',
                type: 'select',
                options: ['Temperature', 'Intense exercise', 'Paced breathing', 'Paired muscle relaxation'],
                required: true
              },
              {
                id: 'how-used',
                label: 'How did you use the technique?',
                type: 'textarea',
                placeholder: 'Describe what you did (e.g., cold water, jumping jacks, breathing pattern)',
                required: true
              },
              {
                id: 'effect',
                label: 'Effect on your body/emotions',
                type: 'textarea',
                placeholder: 'How did you feel after using the skill?',
                required: false
              }
            ]
          },
          training: {
            id: 'tipp-training',
            title: 'TIPP Emergency Drill',
            description: 'Practice all four TIPP skills in a safe environment.',
            duration: '15 minutes',
            steps: [
              'Set a timer for 15 minutes',
              'Practice each TIPP skill for 3 minutes:',
              '1. Temperature: Hold ice or splash cold water',
              '2. Intense exercise: Do jumping jacks or run in place',
              '3. Paced breathing: Inhale for 4, exhale for 6',
              '4. Paired muscle relaxation: Tense and relax each muscle group',
              'Notice which skill works best for you',
              'Write down your observations'
            ],
            reflection: 'Which TIPP skill was most effective for you in reducing distress?'
          },
          completed: completedSkills.includes('tipp')
        },
        {
          id: 'accepts',
          title: 'ACCEPTS',
          description: 'Distraction techniques for getting through crisis',
          reading: [
            'ACCEPTS is a set of distraction skills to help you get through moments of intense distress without making things worse. These skills are not about solving the problem, but about surviving the moment until you can address the issue more skillfully.'
          ],
          content: [
            'Activities - Engage in something absorbing',
            'Contributing - Help others or volunteer',
            'Comparisons - Compare to worse times or others',
            'Emotions - Create different emotions (comedy, sad movies)',
            'Push away - Mentally push the situation away',
            'Thoughts - Count, puzzles, read',
            'Sensations - Hot shower, music, strong mint'
          ],
          worksheet: {
            id: 'accepts-worksheet',
            title: 'ACCEPTS Distraction Log',
            description: 'Track which ACCEPTS skills you used in a crisis.',
            fields: [
              {
                id: 'crisis',
                label: 'Crisis situation',
                type: 'textarea',
                placeholder: 'Describe the crisis moment',
                required: true
              },
              {
                id: 'accepts-skill',
                label: 'ACCEPTS skill used',
                type: 'select',
                options: ['Activities', 'Contributing', 'Comparisons', 'Emotions', 'Push away', 'Thoughts', 'Sensations'],
                required: true
              },
              {
                id: 'how-used',
                label: 'How did you use it?',
                type: 'textarea',
                placeholder: 'Describe what you did',
                required: true
              },
              {
                id: 'effect',
                label: 'Effect on distress',
                type: 'textarea',
                placeholder: 'How did it affect your distress?',
                required: false
              }
            ]
          },
          training: {
            id: 'accepts-training',
            title: 'ACCEPTS Practice',
            description: 'Practice using each ACCEPTS skill in a safe situation.',
            duration: '1 week',
            steps: [
              'Identify a crisis or distressing moment',
              'Choose one ACCEPTS skill to use',
              'Practice the skill and note the effect',
              'Try each skill at least once during the week',
              'Reflect on which skills work best for you'
            ],
            reflection: 'Which ACCEPTS skill was most helpful for you in managing distress?'
          },
          completed: completedSkills.includes('accepts')
        },
        {
          id: 'improves',
          title: 'IMPROVES',
          description: 'Coping skills for improving the moment in crisis',
          reading: [
            'IMPROVES skills are designed to help you make a difficult moment more bearable. By using imagery, meaning, prayer, relaxation, and other techniques, you can shift your perspective and reduce suffering in the midst of crisis.'
          ],
          content: [
            'Imagery - Visualize a peaceful place',
            'Meaning - Find meaning in the situation',
            'Prayer - Connect with something greater',
            'Relaxation - Use relaxation techniques',
            'One thing in the moment - Focus on the present',
            'Vacation - Take a brief break',
            'Encouragement - Cheerlead yourself'
          ],
          worksheet: {
            id: 'improves-worksheet',
            title: 'IMPROVES Coping Log',
            description: 'Track your use of IMPROVES skills in crisis.',
            fields: [
              {
                id: 'crisis',
                label: 'Crisis situation',
                type: 'textarea',
                placeholder: 'Describe the crisis moment',
                required: true
              },
              {
                id: 'improves-skill',
                label: 'IMPROVES skill used',
                type: 'select',
                options: ['Imagery', 'Meaning', 'Prayer', 'Relaxation', 'One thing in the moment', 'Vacation', 'Encouragement'],
                required: true
              },
              {
                id: 'how-used',
                label: 'How did you use it?',
                type: 'textarea',
                placeholder: 'Describe what you did',
                required: true
              },
              {
                id: 'effect',
                label: 'Effect on distress',
                type: 'textarea',
                placeholder: 'How did it affect your distress?',
                required: false
              }
            ]
          },
          training: {
            id: 'improves-training',
            title: 'IMPROVES Practice',
            description: 'Practice using each IMPROVES skill in a safe situation.',
            duration: '1 week',
            steps: [
              'Identify a crisis or distressing moment',
              'Choose one IMPROVES skill to use',
              'Practice the skill and note the effect',
              'Try each skill at least once during the week',
              'Reflect on which skills work best for you'
            ],
            reflection: 'Which IMPROVES skill was most helpful for you in managing distress?'
          },
          completed: completedSkills.includes('improves')
        },
        {
          id: 'radical-acceptance',
          title: 'Radical Acceptance',
          description: 'Accept reality as it is, without fighting or denying',
          reading: [
            'Radical Acceptance means fully accepting reality as it is, without trying to fight, deny, or avoid it. This skill is essential for reducing suffering and moving forward, even when things are painful or difficult.'
          ],
          content: [
            'Notice what you are resisting',
            'Acknowledge reality as it is',
            'Let go of fighting reality',
            'Practice acceptance in small steps',
            'Remind yourself: "It is what it is"'
          ],
          worksheet: {
            id: 'radical-acceptance-worksheet',
            title: 'Radical Acceptance Log',
            description: 'Practice accepting reality in difficult situations.',
            fields: [
              {
                id: 'situation',
                label: 'Situation',
                type: 'textarea',
                placeholder: 'Describe the situation',
                required: true
              },
              {
                id: 'resistance',
                label: 'What are you resisting?',
                type: 'textarea',
                placeholder: 'Describe what you wish was different',
                required: true
              },
              {
                id: 'acceptance-step',
                label: 'Step toward acceptance',
                type: 'textarea',
                placeholder: 'What can you accept right now?',
                required: true
              },
              {
                id: 'reflection',
                label: 'Reflection',
                type: 'textarea',
                placeholder: 'How did acceptance affect you?',
                required: false
              }
            ]
          },
          training: {
            id: 'radical-acceptance-training',
            title: 'Radical Acceptance Practice',
            description: 'Practice accepting reality in a safe situation.',
            duration: '10 minutes',
            steps: [
              'Notice a situation you are resisting',
              'Acknowledge reality as it is',
              'Practice letting go of fighting reality',
              'Reflect on how acceptance changes your experience'
            ],
            reflection: 'What did you learn about acceptance and suffering?'
          },
          completed: completedSkills.includes('radical-acceptance')
        },
        {
          id: 'self-soothing',
          title: 'Self-Soothing',
          description: 'Comfort yourself using your five senses',
          reading: [
            'Self-soothing skills help you comfort and calm yourself using your five senses. These skills are especially useful when you feel overwhelmed, anxious, or distressed.'
          ],
          content: [
            'Vision - Look at something beautiful',
            'Hearing - Listen to calming music',
            'Smell - Use a pleasant scent',
            'Taste - Eat or drink something soothing',
            'Touch - Use soft textures or warmth'
          ],
          worksheet: {
            id: 'self-soothing-worksheet',
            title: 'Self-Soothing Log',
            description: 'Track your use of self-soothing skills.',
            fields: [
              {
                id: 'sense',
                label: 'Sense used',
                type: 'select',
                options: ['Vision', 'Hearing', 'Smell', 'Taste', 'Touch'],
                required: true
              },
              {
                id: 'activity',
                label: 'Activity',
                type: 'textarea',
                placeholder: 'Describe what you did',
                required: true
              },
              {
                id: 'effect',
                label: 'Effect on distress',
                type: 'textarea',
                placeholder: 'How did it affect your distress?',
                required: false
              }
            ]
          },
          training: {
            id: 'self-soothing-training',
            title: 'Self-Soothing Practice',
            description: 'Practice using each self-soothing sense.',
            duration: '1 week',
            steps: [
              'Practice self-soothing with each sense at least once',
              'Notice which sense is most effective for you',
              'Reflect on how self-soothing changes your distress'
            ],
            reflection: 'Which self-soothing sense was most helpful for you?'
          },
          completed: completedSkills.includes('self-soothing')
        },
        {
          id: 'pros-and-cons',
          title: 'Pros and Cons',
          description: 'Weigh the pros and cons of tolerating distress vs. acting impulsively',
          reading: [
            'The Pros and Cons skill helps you weigh the benefits and drawbacks of tolerating distress versus acting impulsively. This skill is useful for making wise decisions in moments of crisis.'
          ],
          content: [
            'Describe the urge or crisis',
            'List pros and cons of acting on the urge',
            'List pros and cons of tolerating distress',
            'Decide which action is most skillful',
            'Reflect on the outcome'
          ],
          worksheet: {
            id: 'pros-and-cons-worksheet',
            title: 'Pros and Cons Worksheet',
            description: 'Practice weighing pros and cons in a crisis.',
            fields: [
              {
                id: 'crisis',
                label: 'Crisis situation',
                type: 'textarea',
                placeholder: 'Describe the crisis moment',
                required: true
              },
              {
                id: 'urge',
                label: 'Urge or impulse',
                type: 'textarea',
                placeholder: 'Describe the urge',
                required: true
              },
              {
                id: 'pros-acting',
                label: 'Pros of acting on urge',
                type: 'textarea',
                required: false
              },
              {
                id: 'cons-acting',
                label: 'Cons of acting on urge',
                type: 'textarea',
                required: false
              },
              {
                id: 'pros-tolerating',
                label: 'Pros of tolerating distress',
                type: 'textarea',
                required: false
              },
              {
                id: 'cons-tolerating',
                label: 'Cons of tolerating distress',
                type: 'textarea',
                required: false
              },
              {
                id: 'decision',
                label: 'Decision',
                type: 'textarea',
                required: false
              },
              {
                id: 'reflection',
                label: 'Reflection',
                type: 'textarea',
                required: false
              }
            ]
          },
          training: {
            id: 'pros-and-cons-training',
            title: 'Pros and Cons Practice',
            description: 'Practice weighing pros and cons in a safe situation.',
            duration: '10 minutes',
            steps: [
              'Notice an urge or crisis',
              'List pros and cons of acting on the urge',
              'List pros and cons of tolerating distress',
              'Decide which action is most skillful',
              'Reflect on the outcome'
            ],
            reflection: 'What did you learn about urges and skillful action?'
          },
          completed: completedSkills.includes('pros-and-cons')
        }
      ]
    },
    {
      id: 'interpersonal',
      title: 'Interpersonal Effectiveness',
      description: 'Building healthy relationships and communication',
      icon: Users,
      color: 'bg-blue-50 border-blue-200',
      skills: [
        {
          id: 'dear-man',
          title: 'DEAR MAN',
          description: 'Effective way to ask for what you need',
          reading: [
            'DEAR MAN is a DBT skill for assertively asking for what you want or need. It helps you communicate clearly and effectively, increasing the likelihood of getting your needs met while maintaining respect for yourself and others.'
          ],
          content: [
            'Describe the situation using facts',
            'Express your feelings about the situation',
            'Assert by asking clearly for what you want',
            'Reinforce by explaining benefits or consequences',
            'Mindful - Stay focused on your goal',
            'Appear confident - Use confident body language',
            'Negotiate - Be willing to compromise'
          ],
          worksheet: {
            id: 'dear-man-worksheet',
            title: 'DEAR MAN Worksheet',
            description: 'Practice asking for what you need using DEAR MAN.',
            fields: [
              {
                id: 'situation',
                label: 'Situation',
                type: 'textarea',
                placeholder: 'Describe the situation',
                required: true
              },
              {
                id: 'request',
                label: 'Request',
                type: 'textarea',
                placeholder: 'What are you asking for?',
                required: true
              },
              {
                id: 'assert',
                label: 'Assert',
                type: 'textarea',
                placeholder: 'How did you assert your needs?',
                required: false
              },
              {
                id: 'reinforce',
                label: 'Reinforce',
                type: 'textarea',
                placeholder: 'How did you reinforce your request?',
                required: false
              },
              {
                id: 'confidence',
                label: 'Confidence',
                type: 'select',
                options: ['Low', 'Medium', 'High'],
                required: false
              },
              {
                id: 'negotiation',
                label: 'Negotiation',
                type: 'textarea',
                placeholder: 'How did you negotiate?',
                required: false
              }
            ]
          },
          training: {
            id: 'dear-man-training',
            title: 'DEAR MAN Practice',
            description: 'Practice using DEAR MAN in a safe situation.',
            duration: '10 minutes',
            steps: [
              'Identify a situation where you need to ask for something',
              'Use DEAR MAN steps to make your request',
              'Reflect on the outcome and your feelings'
            ],
            reflection: 'What did you learn about assertiveness and communication?'
          },
          completed: completedSkills.includes('dear-man')
        },
        {
          id: 'give',
          title: 'GIVE',
          description: 'Skills for maintaining relationships and being gentle',
          reading: [
            'GIVE skills help you maintain healthy relationships by being gentle, interested, validating, and using an easy manner. These skills foster connection and trust.'
          ],
          content: [
            'Gentle - Be kind and respectful',
            'Interested - Listen and show interest',
            'Validate - Acknowledge others’ feelings',
            'Easy manner - Use humor and warmth'
          ],
          worksheet: {
            id: 'give-worksheet',
            title: 'GIVE Worksheet',
            description: 'Practice GIVE skills in a relationship.',
            fields: [
              {
                id: 'relationship',
                label: 'Relationship',
                type: 'text',
                placeholder: 'Who are you practicing with?',
                required: true
              },
              {
                id: 'gentle',
                label: 'Gentle',
                type: 'textarea',
                placeholder: 'How did you show gentleness?',
                required: false
              },
              {
                id: 'interested',
                label: 'Interested',
                type: 'textarea',
                placeholder: 'How did you show interest?',
                required: false
              },
              {
                id: 'validate',
                label: 'Validate',
                type: 'textarea',
                placeholder: 'How did you validate their feelings?',
                required: false
              },
              {
                id: 'easy-manner',
                label: 'Easy manner',
                type: 'textarea',
                placeholder: 'How did you use humor or warmth?',
                required: false
              }
            ]
          },
          training: {
            id: 'give-training',
            title: 'GIVE Practice',
            description: 'Practice GIVE skills in a safe relationship.',
            duration: '10 minutes',
            steps: [
              'Choose a relationship to practice GIVE skills',
              'Use each GIVE skill during a conversation',
              'Reflect on the outcome and your feelings'
            ],
            reflection: 'What did you learn about maintaining relationships?'
          },
          completed: completedSkills.includes('give')
        },
        {
          id: 'fast',
          title: 'FAST',
          description: 'Skills for maintaining self-respect in relationships',
          reading: [
            'FAST skills help you maintain your self-respect in relationships by being fair, apologizing only when necessary, sticking to your values, and being truthful.'
          ],
          content: [
            'Fair - Be fair to yourself and others',
            'Apologies (few) - Only apologize when necessary',
            'Stick to values - Stand by your beliefs',
            'Truthful - Be honest and authentic'
          ],
          worksheet: {
            id: 'fast-worksheet',
            title: 'FAST Worksheet',
            description: 'Practice FAST skills in a relationship.',
            fields: [
              {
                id: 'relationship',
                label: 'Relationship',
                type: 'text',
                placeholder: 'Who are you practicing with?',
                required: true
              },
              {
                id: 'fair',
                label: 'Fair',
                type: 'textarea',
                placeholder: 'How did you practice fairness?',
                required: false
              },
              {
                id: 'apologies',
                label: 'Apologies',
                type: 'textarea',
                placeholder: 'Did you apologize unnecessarily?',
                required: false
              },
              {
                id: 'values',
                label: 'Stick to values',
                type: 'textarea',
                placeholder: 'How did you stick to your values?',
                required: false
              },
              {
                id: 'truthful',
                label: 'Truthful',
                type: 'textarea',
                placeholder: 'How did you practice honesty?',
                required: false
              }
            ]
          },
          training: {
            id: 'fast-training',
            title: 'FAST Practice',
            description: 'Practice FAST skills in a safe relationship.',
            duration: '10 minutes',
            steps: [
              'Choose a relationship to practice FAST skills',
              'Use each FAST skill during a conversation',
              'Reflect on the outcome and your feelings'
            ],
            reflection: 'What did you learn about self-respect and boundaries?'
          },
          completed: completedSkills.includes('fast')
        }
      ]
    }
  ]

  const completeSkill = (skillId: string) => {
    if (!completedSkills.includes(skillId)) {
      setCompletedSkills([...completedSkills, skillId])
      setProgress({
        ...progress,
        skillsLearned: progress.skillsLearned + 1
      })
    }
  }

  const totalSkills = modules.reduce((acc, module) => acc + module.skills.length, 0)
  const completedCount = completedSkills.length
  const progressPercentage = (completedCount / totalSkills) * 100

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            DBT Skills Progress
          </CardTitle>
          <CardDescription>
            Learn evidence-based skills for emotional regulation and resilience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Overall Progress</span>
              <span className="text-sm text-muted-foreground">{completedCount} of {totalSkills} skills</span>
            </div>
            <Progress value={progressPercentage} className="w-full" />
          </div>
          <div className="mt-4 flex justify-end">
            <Dialog open={showMantras} onOpenChange={setShowMantras}>
              <DialogTrigger asChild>
                <Button variant="secondary" onClick={() => setShowMantras(true)}>
                  <Sparkle className="h-4 w-4 mr-2 text-accent" />
                  DBT Mantras
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Sparkle className="h-5 w-5 text-accent" />
                    DBT Mantras
                  </DialogTitle>
                  <DialogDescription>Quick reminders for DBT practice</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  {dbtMantras.map((mantra) => (
                    <div key={mantra.id} className="p-3 rounded-lg border bg-background">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">{mantra.category}</Badge>
                        <span className="text-xs text-muted-foreground">{mantra.description}</span>
                      </div>
                      <p className="text-base font-medium italic">"{mantra.text}"</p>
                    </div>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      {/* ...existing code for Tabs and skill dialogs... */}
    {/* End progress card block, continue with Tabs below */}

      <Tabs defaultValue="mindfulness" className="space-y-4">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full">
          {modules.map((module) => (
            <TabsTrigger key={module.id} value={module.id} className="flex items-center gap-2 text-xs">
              <module.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{module.title}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {modules.map((module) => (
          <TabsContent key={module.id} value={module.id} className="space-y-4">
            <Card className={module.color}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <module.icon className="h-5 w-5" />
                  {module.title}
                </CardTitle>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {module.skills.map((skill) => (
                <Card key={skill.id} className="relative">
                  {skill.completed && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-100 text-green-800 border-green-300">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">{skill.title}</CardTitle>
                    <CardDescription>{skill.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full" 
                          variant={skill.completed ? "outline" : "default"}
                          onClick={() => setSelectedSkill(skill)}
                        >
                          <Play className="h-4 w-4 mr-2" />
                          {skill.completed ? 'Review Skill' : 'Learn Skill'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <SkillDialogContent skill={skill} />
                      </DialogContent>
                    </Dialog>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}