import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Phone, 
  Plus, 
  Shield, 
  UserPlus,
  PencilSimple,
  Trash,
  Warning,
  Heart,
  CheckCircle
} from '@phosphor-icons/react'

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  notes?: string
  priority: number
}

interface SafetyPlan {
  warningsigns: string[]
  copingStrategies: string[]
  distractionActivities: string[]
  supportPeople: string[]
  professionalContacts: string[]
  safeEnvironment: string
  lethalMeansRestriction: string
}

export function EmergencyPlan() {
  const [contacts, setContacts] = useState<EmergencyContact[]>([])
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan>({
    warningsigns: [],
    copingStrategies: [],
    distractionActivities: [],
    supportPeople: [],
    professionalContacts: [],
    safeEnvironment: '',
    lethalMeansRestriction: ''
  })

  const [showAddContact, setShowAddContact] = useState(false)
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null)
  const [showEditPlan, setShowEditPlan] = useState(false)
  
  // Form states
  const [contactForm, setContactForm] = useState({
    name: '',
    relationship: '',
    phone: '',
    notes: ''
  })

  const crisisResources = [
    {
      name: '988 Suicide & Crisis Lifeline',
      number: '988',
      description: '24/7 crisis support',
      type: 'crisis'
    },
    {
      name: 'Crisis Text Line',
      number: 'Text HOME to 741741',
      description: 'Free, 24/7 crisis support via text',
      type: 'crisis'
    },
    {
      name: 'PTSD National Helpline',
      number: '1-800-273-8255',
      description: 'PTSD-specific support',
      type: 'support'
    },
    {
      name: 'Emergency Services',
      number: '911',
      description: 'Immediate emergency help',
      type: 'emergency'
    }
  ]

  const addContact = () => {
    if (!contactForm.name || !contactForm.phone) return

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      name: contactForm.name,
      relationship: contactForm.relationship,
      phone: contactForm.phone,
      notes: contactForm.notes,
      priority: contacts.length + 1
    }

    setContacts([...contacts, newContact])
    setContactForm({ name: '', relationship: '', phone: '', notes: '' })
    setShowAddContact(false)
  }

  const updateContact = () => {
    if (!editingContact || !contactForm.name || !contactForm.phone) return

    setContacts(contacts.map(contact => 
      contact.id === editingContact.id 
        ? { ...contact, ...contactForm }
        : contact
    ))
    setEditingContact(null)
    setContactForm({ name: '', relationship: '', phone: '', notes: '' })
  }

  const deleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const startEditContact = (contact: EmergencyContact) => {
    setContactForm({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      notes: contact.notes || ''
    })
    setEditingContact(contact)
    setShowAddContact(true)
  }

  const callContact = (phone: string) => {
    window.open(`tel:${phone}`, '_self')
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Emergency Safety Plan
          </CardTitle>
          <CardDescription>
            Your personalized plan for staying safe during mental health crises
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Crisis Resources */}
      <Card className="bg-red-50 border-red-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-900">
            <Warning className="h-5 w-5" />
            Immediate Crisis Resources
          </CardTitle>
          <CardDescription className="text-red-800">
            Available 24/7 - No appointment needed
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {crisisResources.map((resource) => (
              <div key={resource.name} className="bg-white rounded-lg p-4 border border-red-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium text-red-900">{resource.name}</h3>
                    <p className="text-sm text-red-800 mb-2">{resource.description}</p>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        resource.type === 'emergency' ? 'border-red-500 text-red-700' :
                        resource.type === 'crisis' ? 'border-orange-500 text-orange-700' :
                        'border-blue-500 text-blue-700'
                      }`}
                    >
                      {resource.type}
                    </Badge>
                  </div>
                  <Button 
                    onClick={() => callContact(resource.number)}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
                <div className="mt-3 text-lg font-bold text-red-900">
                  {resource.number}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Personal Emergency Contacts */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Personal Emergency Contacts
          </CardTitle>
          <CardDescription>
            People you trust who can provide support during difficult times
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {contacts.length > 0 && (
              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                        <p className="text-sm font-mono">{contact.phone}</p>
                        {contact.notes && (
                          <p className="text-sm text-muted-foreground mt-1">{contact.notes}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => callContact(contact.phone)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => startEditContact(contact)}
                          variant="outline"
                          size="sm"
                        >
                          <PencilSimple className="h-4 w-4" />
                        </Button>
                        <Button
                          onClick={() => deleteContact(contact.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {showAddContact && (
              <Card className="border-primary/20">
                <CardHeader>
                  <CardTitle className="text-lg">
                    {editingContact ? 'Edit Contact' : 'Add New Contact'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contact-name">Name *</Label>
                      <Input
                        id="contact-name"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-relationship">Relationship</Label>
                      <Input
                        id="contact-relationship"
                        value={contactForm.relationship}
                        onChange={(e) => setContactForm({ ...contactForm, relationship: e.target.value })}
                        placeholder="Friend, family, therapist..."
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-phone">Phone Number *</Label>
                    <Input
                      id="contact-phone"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="contact-notes">Notes</Label>
                    <Textarea
                      id="contact-notes"
                      value={contactForm.notes}
                      onChange={(e) => setContactForm({ ...contactForm, notes: e.target.value })}
                      placeholder="Best times to call, special instructions..."
                      rows={2}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      onClick={editingContact ? updateContact : addContact}
                      disabled={!contactForm.name || !contactForm.phone}
                      className="flex-1"
                    >
                      {editingContact ? 'Update Contact' : 'Add Contact'}
                    </Button>
                    <Button 
                      onClick={() => {
                        setShowAddContact(false)
                        setEditingContact(null)
                        setContactForm({ name: '', relationship: '', phone: '', notes: '' })
                      }} 
                      variant="outline"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {!showAddContact && (
              <Button onClick={() => setShowAddContact(true)} variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Add Emergency Contact
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Safety Plan Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-primary" />
            Personal Safety Steps
          </CardTitle>
          <CardDescription>
            Your plan for recognizing warning signs and staying safe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Warning className="h-4 w-4 text-orange-500" />
                  Warning Signs I Notice
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Difficulty sleeping or nightmares</p>
                  <p>• Increased irritability or anger</p>
                  <p>• Avoiding people or activities</p>
                  <p>• Feeling hopeless or disconnected</p>
                  <p>• Increase in flashbacks or intrusive thoughts</p>
                </div>
              </div>

              <div>
                <h3 className="font-medium mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4 text-primary" />
                  Coping Strategies That Help
                </h3>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>• Deep breathing exercises</p>
                  <p>• Grounding techniques (5-4-3-2-1)</p>
                  <p>• Calling a trusted friend</p>
                  <p>• Using my Safe Space in the app</p>
                  <p>• Going for a walk or light exercise</p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="bg-primary/5 p-4 rounded-lg">
              <h3 className="font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                If I'm in Crisis, I Will:
              </h3>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>1. Use crisis survival tools (TIPP, grounding techniques)</p>
                <p>2. Call or text a support person from my emergency contacts</p>
                <p>3. Remove access to means of self-harm if needed</p>
                <p>4. Go to a safe place (emergency room, crisis center, trusted friend)</p>
                <p>5. Call 988 or 911 if I'm in immediate danger</p>
              </div>
            </div>

            <Button 
              onClick={() => setShowEditPlan(true)} 
              variant="outline" 
              className="w-full"
            >
              <PencilSimple className="h-4 w-4 mr-2" />
              Customize My Safety Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}