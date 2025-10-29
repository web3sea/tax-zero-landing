'use client'

import { FC, useState, useEffect } from 'react'
import { Content } from '@prismicio/client'
import { SliceComponentProps } from '@prismicio/react'
import { PrismicNextImage, PrismicNextLink } from '@prismicio/next'
import { Menu, ChevronDown, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [expandedMobileItem, setExpandedMobileItem] = useState<string | null>(null)

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label)
  }

  const handleMouseLeave = () => {
    setActiveDropdown(null)
  }

  const toggleMobileItem = (label: string) => {
    setExpandedMobileItem(expandedMobileItem === label ? null : label)
  }

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
    {
      label: 'About',
      link: Array.isArray(slice.primary.about)
        ? slice.primary.about[0]
        : slice.primary.about || { url: '#about' },
      hasDropdown: Array.isArray(slice.primary.about) && slice.primary.about.length > 0,
      children: Array.isArray(slice.primary.about)
        ? slice.primary.about.map((item) => ({
            label: item.text || 'Link',
            link: item,
          }))
        : [],
    },
    {
      label: 'Membership',
      link: Array.isArray(slice.primary.membership)
        ? slice.primary.membership[0]
        : slice.primary.membership || { url: '#membership' },
      hasDropdown: Array.isArray(slice.primary.membership) && slice.primary.membership.length > 0,
      children: Array.isArray(slice.primary.membership)
        ? slice.primary.membership.map((item) => ({
            label: item.text || 'Link',
            link: item,
          }))
        : [],
    },
    {
      label: 'Pricing',
      link: slice.primary.pricing || { url: '#pricing' },
      hasDropdown: false,
    },
    {
      label: 'Services',
      link: Array.isArray(slice.primary.services)
        ? slice.primary.services[0]
        : slice.primary.services || { url: '#services' },
      hasDropdown: Array.isArray(slice.primary.services) && slice.primary.services.length > 0,
      children: Array.isArray(slice.primary.services)
        ? slice.primary.services.map((item) => ({
            label: item.text || 'Link',
            link: item,
          }))
        : [],
    },
    {
      label: 'Learn',
      link: Array.isArray(slice.primary.learn)
        ? slice.primary.learn[0]
        : slice.primary.learn || { url: '#learn' },
      hasDropdown: Array.isArray(slice.primary.learn) && slice.primary.learn.length > 0,
      children: Array.isArray(slice.primary.learn)
        ? slice.primary.learn.map((item) => ({
            label: item.text || 'Link',
            link: item,
          }))
        : [],
    },
    {
      label: 'Resources',
      link: Array.isArray(slice.primary.resources)
        ? slice.primary.resources[0]
        : slice.primary.resources || { url: '#resources' },
      hasDropdown: Array.isArray(slice.primary.resources) && slice.primary.resources.length > 0,
      children: Array.isArray(slice.primary.resources)
        ? slice.primary.resources.map((item) => ({
            label: item.text || 'Link',
            link: item,
          }))
        : [],
    },
  ]

  return (
    <header
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="sticky top-0 z-50 bg-white font-proxima shadow-sm"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
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
                <div className="h-7 w-10 rounded bg-design-accent"></div>
              )}
              <h1 className="hidden text-2xl font-bold text-design-primary lg:block">
                <span className="font-normal">Domain</span>
                <span className="ml-1 font-bold">Money</span>
              </h1>
            </div>
          </div>

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
                      <button className="flex items-center space-x-1 text-design-primary transition-colors duration-200 hover:text-design-primary-light">
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
                            className="absolute left-0 top-full z-50 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
                          >
                            {item.children?.map((child, index) => (
                              <PrismicNextLink
                                key={index}
                                field={child.link}
                                className="block px-4 py-3 text-sm text-design-primary transition-colors duration-150 first:rounded-t-lg last:rounded-b-lg hover:bg-design-card-bg"
                              >
                                {child.label}
                              </PrismicNextLink>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <PrismicNextLink
                      field={item.link}
                      className="text-design-primary transition-colors duration-200 hover:text-design-primary-light"
                    >
                      {item.label}
                    </PrismicNextLink>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="flex items-center space-x-4">
              {slice.primary.login && (
                <PrismicNextLink field={slice.primary.login}>
                  <Button
                    variant="outline"
                    className="border-design-primary text-design-primary transition-colors duration-200 hover:bg-design-card-bg"
                    style={{ padding: '.5rem 2rem' }}
                  >
                    Log in
                  </Button>
                </PrismicNextLink>
              )}
              {slice.primary.free_strategy_session && (
                <PrismicNextLink field={slice.primary.free_strategy_session}>
                  <Button
                    className="bg-design-accent text-white transition-colors duration-200 hover:bg-design-accent-dark"
                    style={{ padding: '.5rem 2rem' }}
                  >
                    Free Strategy Session
                  </Button>
                </PrismicNextLink>
              )}
            </div>
          </div>

          {/* Tablet View: Only Free Strategy Session + Hamburger (md to lg) */}
          <div className="hidden items-center space-x-4 md:flex lg:hidden">
            {slice.primary.free_strategy_session && (
              <PrismicNextLink field={slice.primary.free_strategy_session}>
                <Button
                  className="bg-design-accent text-white transition-colors duration-200 hover:bg-design-accent-dark"
                  style={{ padding: '.5rem 2rem' }}
                >
                  Free Strategy Session
                </Button>
              </PrismicNextLink>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-design-primary"
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
              className="text-design-primary"
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
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
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
              className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white/95 shadow-lg backdrop-blur-xl"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <div className="flex items-center space-x-3">
                  {slice.primary.logo?.url ? (
                    <PrismicNextImage
                      field={slice.primary.logo}
                      width={41}
                      height={28}
                      className="h-7 w-auto"
                    />
                  ) : (
                    <div className="h-7 w-10 rounded bg-design-accent"></div>
                  )}
                  <h1 className="text-2xl font-bold text-design-primary">
                    <span className="font-normal">Domain</span>
                    <span className="ml-1 font-bold">Money</span>
                  </h1>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-design-primary"
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
                {slice.primary.free_strategy_session && (
                  <PrismicNextLink field={slice.primary.free_strategy_session}>
                    <Button
                      className="w-full rounded-full bg-design-accent py-3 text-white hover:bg-design-accent-dark"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Free Strategy Session
                    </Button>
                  </PrismicNextLink>
                )}
                {slice.primary.login && (
                  <PrismicNextLink field={slice.primary.login}>
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-design-primary py-3 text-design-primary hover:bg-design-card-bg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Log in
                    </Button>
                  </PrismicNextLink>
                )}
              </motion.div>

              {/* Mobile Navigation Links */}
              <motion.nav
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
                          className="flex w-full items-center justify-between border-b border-gray-100 py-4 font-medium text-design-primary transition-colors hover:text-design-accent"
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
                                  <PrismicNextLink
                                    key={childIndex}
                                    field={child.link}
                                    className="block py-2 text-sm text-design-primary transition-colors hover:text-design-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                  >
                                    {child.label}
                                  </PrismicNextLink>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <PrismicNextLink
                        field={item.link}
                        className="flex items-center justify-between border-b border-gray-100 py-4 font-medium text-design-primary transition-colors hover:text-design-accent"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{item.label}</span>
                      </PrismicNextLink>
                    )}
                  </motion.div>
                ))}
              </motion.nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
