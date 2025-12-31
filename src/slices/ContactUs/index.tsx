'use client'

import { FC, useMemo, useState } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { FadeInView } from '@/components/feature/FadeInView'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { formatPhoneNumber, isValidPhoneNumber } from '@/utils/formater'

/**
 * Props for `ContactUs`.
 */
export type ContactUsProps = SliceComponentProps<Content.ContactUsSlice>

const schema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  workEmail: yup.string().trim().email('Invalid email address').required('Email is required'),
  phoneNumber: yup
    .string()
    .trim()
    .test('phone-format', 'Please enter a valid phone number', (value) => {
      if (!value || value.trim() === '') return true // Optional field
      return isValidPhoneNumber(value)
    })
    .optional(),
  message: yup.string().trim().required('Message is required'),
})

/**
 * Component for "ContactUs" Slices.
 */
const ContactUs: FC<ContactUsProps> = ({ slice }) => {
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(
      () => ({
        firstName: '',
        lastName: '',
        workEmail: '',
        phoneNumber: '',
        message: '',
      }),
      [],
    ),
  })

  const handleSubmit = async (values: yup.InferType<typeof schema>) => {
    try {
      setSubmitting(true)
      
      // Format phone number before sending
      const formattedValues = {
        ...values,
        phoneNumber: values.phoneNumber ? formatPhoneNumber(values.phoneNumber) : undefined,
      }
      
      const res = await fetch('/api/brevo/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formattedValues),
      })
      const data = await res.json()

      if (!res.ok) {
        toast.error('Failed to send message', {
          description: data?.error || 'Please try again later',
        })
        return
      }

      toast.success('Message sent successfully', {
        description: 'We will get back to you soon',
      })
      form.reset()
    } catch (error) {
      toast.error('Failed to send message', {
        description: (error as { message?: string })?.message || 'Please try again later',
      })
      console.error(error)
    } finally {
      setSubmitting(false)
    }
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
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="rounded-lg bg-white p-8 shadow-lg md:p-10"
              >
                {/* First Row: First Name & Last Name */}
                {firstRow.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {firstRow.map((field, index) => {
                      const fieldKey = index === 0 ? 'firstName' : 'lastName'
                      return (
                        <FormField
                          key={index}
                          control={form.control}
                          name={fieldKey as 'firstName' | 'lastName'}
                          render={({ field: formField }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground font-sans">
                                {field.label || ''}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type={getFieldType(field.label || '')}
                                  placeholder={field.placeholder || ''}
                                  className="h-12 border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                                  {...formField}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )
                    })}
                  </div>
                )}

                {/* Second Row: Work Email & Phone Number */}
                {secondRow.length > 0 && (
                  <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-2">
                    {secondRow.map((field, index) => {
                      const fieldKey = index === 0 ? 'workEmail' : 'phoneNumber'
                      const isPhoneField = fieldKey === 'phoneNumber'
                      
                      return (
                        <FormField
                          key={index}
                          control={form.control}
                          name={fieldKey as 'workEmail' | 'phoneNumber'}
                          render={({ field: formField }) => (
                            <FormItem className="space-y-3">
                              <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground font-sans">
                                {field.label || ''}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type={getFieldType(field.label || '')}
                                  placeholder={field.placeholder || ''}
                                  className="h-12 border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                                  {...formField}
                                  onChange={(e) => {
                                    formField.onChange(e.target.value)
                                  }}
                                  onBlur={(e) => {
                                    if (isPhoneField && e.target.value) {
                                      // Format phone number when user leaves the field
                                      const formatted = formatPhoneNumber(e.target.value)
                                      // Only update if formatted is different and valid
                                      if (formatted && formatted !== e.target.value && isValidPhoneNumber(formatted)) {
                                        formField.onChange(formatted)
                                      }
                                    }
                                    formField.onBlur()
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
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
                          <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground font-sans">
                            {field.label || ''}
                          </FormLabel>
                          <Input
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
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="mb-8 space-y-3">
                        <FormLabel className="text-sm font-bold uppercase tracking-wider text-foreground font-sans">
                          {textareaField.label || ''}
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={textareaField.placeholder || ''}
                            className="min-h-[120px] resize-none border-border bg-secondary font-sans text-base placeholder:text-muted-foreground/60"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="font-sans rounded-full bg-primary px-8 py-6 text-base font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                  >
                    {submitting ? 'Sending...' : slice.primary.button_text || 'Submit'}
                  </Button>
                </div>
              </form>
            </Form>
          </FadeInView>
        </div>
      </div>
    </section>
  )
}

export default ContactUs
