'use client'

import { FC, useState, useEffect } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'
import PrismicLink from '@/components/common/prismic-link'
import { Menu, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'
import WaitlistFormModal from '@/components/form/waitlist-form-modal'
import Link from 'next/link'

/**
 * Props for `Navbar`.
 */
export type NavbarProps = SliceComponentProps<Content.NavbarSlice>

/**
 * Component for "Navbar" Slices.
 */
const Navbar: FC<NavbarProps> = ({ slice }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }




  // const toggleMobileItem = (label: string) => {
  //   setExpandedMobileItem(expandedMobileItem === label ? null : label)
  // }

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Create navigation items from Prismic data
  const navigationItems = [
    // Pricing - simple link
    ...(slice.primary.pricing
      ? [
          {
            label: slice.primary.pricing.text || 'Pricing',
            link: slice.primary.pricing,
            hasDropdown: false,
            children: [] as Array<{ label: string; link: any }>,
          },
        ]
      : []),
    // Blog - simple link
    ...(slice.primary.blog
      ? [
          {
            label: slice.primary.blog.text || 'Blog',
            link: slice.primary.blog,
            hasDropdown: false,
            children: [] as Array<{ label: string; link: any }>,
          },
        ]
      : []),
    // About - dropdown with aboutgroup
    ...(slice.primary.aboutgroup && slice.primary.aboutgroup.length > 0
      ? [
          {
            label: 'About',
            link: slice.primary.aboutgroup[0]?.about_item || null,
            hasDropdown: true,
            children: slice.primary.aboutgroup.map((item) => ({
              label: item.about_item?.text || 'Link',
              link: item.about_item,
            })),
          },
        ]
      : []),
  ]

  return (
    <header
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sticky top-0 z-50 bg-background font-sans shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link href="/">
            <div className="flex items-center">
              <div className="flex items-center space-x-3">
                {slice.primary.logo?.url ? (
                  <PrismicNextImage
                    field={slice.primary.logo}
                    width={41}
                    height={28}
                    className="h-7 w-auto"
                  />
                ) : (
                  <div className="h-7 w-10 rounded-full bg-primary"></div>
                )}
              </div>
            </div>
          </Link>

          {/* Desktop Navigation + CTA Buttons (lg and above) */}
          <div className="hidden items-center space-x-8 lg:flex">
            {/* Navigation */}
            <nav className="flex items-center space-x-8 text-sm">
              {navigationItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.hasDropdown ? (
                    <div className="relative">
                      <button className="flex items-center space-x-1 text-foreground transition-colors duration-200 hover:text-primary">
                        <span>{item.label}</span>
                        <motion.div
                          animate={{
                            rotate: activeDropdown === item.label ? 180 : 0,
                          }}
                          transition={{
                            duration: 0.2,
                            ease: 'easeInOut',
                          }}
                        >
                          <ChevronDown className="h-4 w-4" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {activeDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -10, scale: 0.95 }}
                            transition={{
                              duration: 0.2,
                              ease: 'easeOut',
                            }}
                            className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg"
                          >
                            {item.children?.map((child, index) =>
                            (
                              <PrismicLink
                                key={index}
                                field={child.link}
                                className="block px-4 py-3 text-sm text-foreground transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-secondary"
                                fallbackText={child.label}
                              >
                                {child.label}
                              </PrismicLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <PrismicLink
                      field={item.link}
                      className="text-foreground transition-colors duration-200 hover:text-primary"
                      fallbackText={item.label}
                    >
                      {item.label}
                    </PrismicLink>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              <Button
                className="bg-primary text-primary-foreground transition-colors duration-200 hover:bg-accent"
                style={{ padding: '.5rem 2rem' }}
                onClick={() => setIsWaitlistOpen(true)}
              >
                {slice.primary.free_strategy_session?.text || 'Membership'}
              </Button>
              <WaitlistFormModal open={isWaitlistOpen} onOpenChange={setIsWaitlistOpen} />
            </div>
          </div>

          {/* Tablet View: Only Membership + Hamburger (md to lg) */}
          <div className="hidden items-center space-x-4 md:flex lg:hidden">
            <Button
              className="bg-primary text-primary-foreground transition-colors duration-200 hover:bg-accent"
              style={{ padding: '.5rem 2rem' }}
              onClick={() => setIsWaitlistOpen(true)}
            >
              {slice.primary.free_strategy_session?.text || 'Membership'}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          {/* Mobile Navigation (below md) */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>

      {/* Framer Motion Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.95 }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 shadow-lg backdrop-blur-xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-border p-6">
                <div className="flex items-center space-x-3">
                  {slice.primary.logo?.url ? (
                    <PrismicNextImage
                      field={slice.primary.logo}
                      width={41}
                      height={28}
                      className="h-7 w-auto"
                    />
                  ) : (
                    <div className="h-7 w-10 rounded bg-primary"></div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              {/* Mobile CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="space-y-4 px-6 py-6"
              >
                <Button
                  className="w-full rounded-full bg-primary py-3 text-primary-foreground hover:bg-accent"
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsWaitlistOpen(true)
                  }}
                >
                  {slice.primary.free_strategy_session?.text || 'Membership'}
                </Button>
                {slice.primary.login && (
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-full border-primary py-3 text-foreground hover:bg-secondary"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <PrismicLink field={slice.primary.login} fallbackText="Log in">
                      {slice.primary.login?.text}
                    </PrismicLink>
                  </Button>
                )}
              </motion.div>

              {/* Mobile Navigation Links */}
              {/* <motion.nav
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.2 }}
                className="max-h-[60vh] overflow-y-auto px-6 pb-6"
              >
                {navigationItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05, duration: 0.2 }}
                  >
                    {item.hasDropdown ? (
                      <div>
                        <button
                          className="flex w-full items-center justify-between border-b border-border py-4 font-medium text-foreground transition-colors hover:text-primary"
                          onClick={() => toggleMobileItem(item.label)}
                        >
                          <span>{item.label}</span>
                          <motion.div
                            animate={{
                              rotate: expandedMobileItem === item.label ? 180 : 0,
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="h-4 w-4" />
                          </motion.div>
                        </button>
                        <AnimatePresence>
                          {expandedMobileItem === item.label && item.children && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="ml-4 space-y-1 pb-2">
                                {item.children.map((child, childIndex) => (
                                  <PrismicLink
                                    key={childIndex}
                                    field={child.link}
                                    className="block py-2 text-sm text-foreground transition-colors hover:text-primary"
                                    fallbackText={child.label}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </PrismicLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <PrismicLink
                        field={item.link}
                        className="flex items-center justify-between border-b border-border py-4 font-medium text-foreground transition-colors hover:text-primary"
                        fallbackText={item.label}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                      </PrismicLink>
                    )}
                  </motion.div>
                ))}
              </motion.nav> */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
