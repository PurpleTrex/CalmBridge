# CalmBridge: DBT Companion for PTSD Healing

CalmBridge is a trauma-informed mental health companion that provides evidence-based DBT tools to support individuals with PTSD in building resilience and finding peace through structured therapeutic practices.

**Experience Qualities**:
1. **Safe** - Every interaction feels secure, predictable, and non-triggering with clear user control
2. **Calming** - Visual design and interactions promote emotional regulation and grounding
3. **Empowering** - Tools build confidence and provide users with agency over their healing journey

**Complexity Level**: Light Application (multiple features with basic state)
- Provides comprehensive DBT tools while maintaining simplicity to avoid overwhelming users during vulnerable moments

## Essential Features

### Daily DBT Skills Practice
- **Functionality**: Structured lessons and exercises covering Mindfulness, Emotion Regulation, Distress Tolerance, and Interpersonal Effectiveness
- **Purpose**: Build foundational coping skills through evidence-based therapeutic practices
- **Trigger**: User selects daily practice from main dashboard or schedules reminders
- **Progression**: Choose module → Select skill → Guided practice → Reflection → Progress tracking
- **Success criteria**: User completes exercises and reports increased confidence in using skills

### Crisis Survival Tools
- **Functionality**: Immediate access to grounding techniques, breathing exercises, and emergency coping strategies
- **Purpose**: Provide rapid stabilization during panic, dissociation, or overwhelming emotions
- **Trigger**: Prominent "Crisis Help" button always visible or voice activation
- **Progression**: Crisis detected → Quick tool selection → Guided intervention → Safety check → Follow-up resources
- **Success criteria**: User reports feeling more grounded and safe after using tools

### Mood + Trigger Tracker
- **Functionality**: Log emotions, PTSD symptoms, triggers, and coping strategy effectiveness with visual analytics
- **Purpose**: Help users identify patterns and measure progress over time
- **Trigger**: Daily check-ins, post-crisis logging, or manual entry
- **Progression**: Open tracker → Rate mood/symptoms → Identify triggers → Note coping used → View insights
- **Success criteria**: Users gain self-awareness and can predict/prevent difficult episodes

### Guided Journaling
- **Functionality**: Trauma-informed prompts with privacy controls and emotional safety features
- **Purpose**: Safe exploration of thoughts and feelings to process experiences
- **Trigger**: Scheduled journaling time or prompted after difficult experiences
- **Progression**: Choose prompt → Write safely → Review options → Save/discard → Reflection insights
- **Success criteria**: Users feel heard and process emotions without re-traumatization

### Safe Space Mode
- **Functionality**: Customizable calming environment with music, visuals, and affirmations
- **Purpose**: Provide immediate comfort and grounding after flashbacks or nightmares
- **Trigger**: One-tap activation from anywhere in app or crisis situations
- **Progression**: Activate mode → Choose environment → Immersive experience → Gradual transition out
- **Success criteria**: Users feel calmer and more present after using the space

### Emergency Plan Toolkit
- **Functionality**: Personalized safety plan with coping steps, emergency contacts, and crisis resources
- **Purpose**: Ensure users have immediate access to help during mental health emergencies
- **Trigger**: Crisis button or proactive planning sessions
- **Progression**: Create plan → Emergency access → Follow steps → Contact support → Safety confirmation
- **Success criteria**: Users feel prepared and access help when needed

## Edge Case Handling
- **Offline Usage**: Core tools cached locally with sync when connected
- **Crisis Escalation**: Clear pathways to professional help and emergency services
- **Overwhelming Content**: Progressive disclosure with user-controlled pacing
- **Privacy Concerns**: Local storage with optional cloud backup and full data control
- **Accessibility Needs**: Screen reader support, high contrast options, and voice commands

## Design Direction
The design should feel like a warm, safe sanctuary - calming and nurturing without being clinical, with gentle curves, soft lighting effects, and nature-inspired elements that promote healing and growth.

## Color Selection
Analogous color scheme focused on healing and tranquility, using soft blues and greens reminiscent of peaceful natural environments.

- **Primary Color**: Soft sage green (oklch(0.75 0.08 150)) - represents growth, healing, and safety
- **Secondary Colors**: Warm cream (oklch(0.95 0.02 85)) for backgrounds and gentle lavender (oklch(0.82 0.06 290)) for accents
- **Accent Color**: Calming teal (oklch(0.65 0.12 180)) for important actions and progress indicators
- **Foreground/Background Pairings**: 
  - Background (Warm Cream): Dark charcoal text (oklch(0.25 0.01 240)) - Ratio 13.2:1 ✓
  - Primary (Sage Green): White text (oklch(1 0 0)) - Ratio 5.8:1 ✓
  - Accent (Calming Teal): White text (oklch(1 0 0)) - Ratio 4.9:1 ✓
  - Card backgrounds: Soft white (oklch(0.98 0.005 120)) with dark text - Ratio 15.1:1 ✓

## Font Selection
Typography should feel approachable and readable while maintaining professional credibility - Inter for its excellent readability and calming, human qualities.

- **Typographic Hierarchy**:
  - H1 (App Title): Inter Bold/32px/tight letter spacing
  - H2 (Section Headers): Inter SemiBold/24px/normal spacing
  - H3 (Tool Names): Inter Medium/18px/normal spacing
  - Body Text: Inter Regular/16px/relaxed line height
  - Small Text: Inter Regular/14px/normal spacing

## Animations
Gentle, therapeutic motion that feels like breathing - slow, predictable transitions that promote calm rather than excitement, with optional reduced motion for sensitivity.

- **Purposeful Meaning**: Breathing-like animations for stress relief, gentle fades that don't startle, growth-inspired transitions
- **Hierarchy of Movement**: Crisis tools get immediate response, daily tools have gentle reveals, progress gets celebratory but subtle motion

## Component Selection
- **Components**: Card for tool containers, Dialog for crisis interventions, Tabs for DBT modules, Progress for tracking, Button with gentle states, Input with validation for journaling
- **Customizations**: Breathing animation component, crisis floating action button, mood rating slider, safe space immersive container
- **States**: All interactive elements have soft hover states, focus indicators for accessibility, and gentle pressed feedback
- **Icon Selection**: Phosphor icons in duotone style for warmth - Heart for safe space, Shield for crisis tools, Calendar for tracking, BookOpen for journaling
- **Spacing**: Generous padding (p-6/p-8) for breathing room, consistent gaps (gap-4/gap-6) between related elements
- **Mobile**: Stack cards vertically, expand crisis button for easy thumb access, maintain tool accessibility with bottom navigation