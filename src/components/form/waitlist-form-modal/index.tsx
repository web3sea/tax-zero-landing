'use client'

import { memo, useMemo, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

export interface WaitlistFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  listId?: number
}

const schema = yup.object({
  firstName: yup.string().trim().required('First name is required'),
  lastName: yup.string().trim().required('Last name is required'),
  email: yup.string().trim().email('Invalid email').required('Email is required'),
})

function WaitlistFormModal({ open, onOpenChange, listId }: WaitlistFormModalProps) {
  const [submitting, setSubmitting] = useState(false)

  const form = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    defaultValues: useMemo(() => ({ firstName: '', lastName: '', email: '' }), []),
  })

  const onSubmit = async (values: yup.InferType<typeof schema>) => {
    try {
      setSubmitting(true)
      const res = await fetch('/api/brevo/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, listId }),
      })
      const data = await res.json()
      toast.success('You are on the waitlist', {
        description: 'You will be the first to know when we launch',
      })
      if (!res.ok) {
        toast.error('Failed to subscribe', { description: data?.error || 'Failed to subscribe' })
        throw new Error(data?.error || 'Failed to subscribe')
      }
      onOpenChange(false)
      form.reset()
    } catch (error) {
      toast.error('Failed to subscribe', {
        description: (error as { message?: string })?.message || 'Failed to subscribe',
      })
      console.error(error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl p-8 font-sans sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="font-sans text-2xl md:text-3xl">Join the waitlist</DialogTitle>
          <DialogDescription className="font-sans text-base">
            Be the first to know when we launch
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-base">First Name</FormLabel>
                    <FormControl>
                      <Input className="h-11 text-base" placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-sans text-base">Last Name</FormLabel>
                    <FormControl>
                      <Input className="h-11 text-base" placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-sans text-base">Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-11 text-base"
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="h-11 bg-primary px-6 text-base text-white hover:opacity-90"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default memo(WaitlistFormModal, isEqual)
