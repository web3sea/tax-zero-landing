'use client'

import { FC, useState } from 'react'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { FadeInView } from '@/components/feature/FadeInView'

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs: FC<ContactUsProps> = ({ slice }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    workEmail: '',
    phoneNumber: '',
    message: '',
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
  }

  // Helper function to determine field type based on label
  const getFieldType = (label: string): 'text' | 'email' | 'tel' | 'textarea' => {
    const lowerLabel = label.toLowerCase()
    if (lowerLabel.includes('email')) return 'email'
    if (lowerLabel.includes('phone')) return 'tel'
    if (lowerLabel.includes('help') || lowerLabel.includes('message')) return 'textarea'
    return 'text'
  }

  // Organize form fields into rows
  const formFields = slice.primary.form || []
  const firstRow = formFields.slice(0, 2) // First 2 fields (First Name, Last Name)
  const secondRow = formFields.slice(2, 4) // Next 2 fields (Work Email, Phone Number)
  const textareaField = formFields.find(
    (field) => getFieldType(field.label || '') === 'textarea'
  )
  const otherFields = formFields.filter(
    (field) => !firstRow.includes(field) && !secondRow.includes(field) && field !== textareaField
  )

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="bg-background py-20"
    >
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          {/* Header Section */}
          <div className="mb-12 text-center">
            <FadeInView delay={0.2} duration={0.8} y={30}>
              {slice.primary.title && (
                <h2 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight text-foreground lg:text-5xl">
                  {slice.primary.title.split('**').map((part, index) =>
                    index % 2 === 1 ? (
                      <strong key={index} className="text-primary">
                        {part}
                      </strong>
                    ) : (
                      <span key={index}>{part}</span>
                    )
                  )}
                </h2>
              )}
            </FadeInView>

            {slice.primary.description && (
              <FadeInView delay={0.4} duration={0.8} y={30}>
                <p className="font-sans text-lg leading-relaxed text-muted-foreground">
                  {slice.primary.description}
                </p>
              </FadeInView>
            )}
          </div>

          {/* Contact Form */}
          <FadeInView delay={0.6} duration={0.8} y={30}>
            <form
              onSubmit={handleSubmit}
              className="rounded-lg bg-white p-8 shadow-lg md:p-10"
            >
              {/* First Row: First Name & Last Name */}
              {firstRow.length > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {firstRow.map((field, index) => {
                    const fieldKey = index === 0 ? 'firstName' : 'lastName'
                    return (
                      <div key={index} className="space-y-3">
                        <Label
                          htmlFor={fieldKey}
                          className="text-sm font-bold uppercase tracking-wider text-foreground font-sans"
                        >
                          {field.label || ''}
                        </Label>
                        <Input
                          id={fieldKey}
                          type={getFieldType(field.label || '')}
                          placeholder={field.placeholder || ''}
                          value={formData[fieldKey as keyof typeof formData]}
                          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                          className="h-12 border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Second Row: Work Email & Phone Number */}
              {secondRow.length > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {secondRow.map((field, index) => {
                    const fieldKey = index === 0 ? 'workEmail' : 'phoneNumber'
                    return (
                      <div key={index} className="space-y-3">
                        <Label
                          htmlFor={fieldKey}
                          className="text-sm font-bold uppercase tracking-wider text-foreground font-sans"
                        >
                          {field.label || ''}
                        </Label>
                        <Input
                          id={fieldKey}
                          type={getFieldType(field.label || '')}
                          placeholder={field.placeholder || ''}
                          value={formData[fieldKey as keyof typeof formData]}
                          onChange={(e) => handleInputChange(fieldKey, e.target.value)}
                          className="h-12 border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Other fields (if any) */}
              {otherFields.length > 0 && (
                <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                  {otherFields.map((field, index) => {
                    const fieldKey = `field_${index}`
                    return (
                      <div key={index} className="space-y-3">
                        <Label
                          htmlFor={fieldKey}
                          className="text-sm font-bold uppercase tracking-wider text-foreground font-sans"
                        >
                          {field.label || ''}
                        </Label>
                        <Input
                          id={fieldKey}
                          type={getFieldType(field.label || '')}
                          placeholder={field.placeholder || ''}
                          className="h-12 border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                        />
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Textarea Field: How Can We Help */}
              {textareaField && (
                <div className="mb-8 space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-sm font-bold uppercase tracking-wider text-foreground font-sans"
                  >
                    {textareaField.label || ''}
                  </Label>
                  <Textarea
                    id="message"
                    placeholder={textareaField.placeholder || ''}
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                    className="min-h-[120px] resize-none border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                    rows={4}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="font-sans rounded-full bg-primary px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary/90"
                >
                  {slice.primary.button_text || 'Submit'}
                </Button>
              </div>
            </form>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
