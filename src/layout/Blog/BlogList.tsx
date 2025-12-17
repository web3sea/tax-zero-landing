import BlogCard from '@/layout/Blog/BlogCard'
import { createClient } from '@/prismicio'
import { Content } from '@prismicio/client'
import * as prismic from '@prismicio/client'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import Link from 'next/link'

interface BlogListProps {
  page?: number
  pageSize?: number
  tag?: string
}

export default async function BlogList({ page = 1, pageSize = 5, tag }: BlogListProps = {}) {
  const client = createClient()

  // Get all blogs first to filter out example and calculate correct pagination
  const allBlogsForPagination = tag
    ? (
        await client.getAllByTag(tag, {
          filters: [prismic.filter.at('document.type', 'blog_page_new')],
          orderings: [
            { field: 'my.blog_page_new.published_on', direction: 'desc' },
            { field: 'document.first_publication_date', direction: 'desc' },
          ],
        })
      ).filter((doc): doc is Content.BlogPageNewDocument => doc.uid !== 'example')
    : (
        (await client.getAllByType('blog_page_new', {
          orderings: [
            { field: 'my.blog_page_new.published_on', direction: 'desc' },
            { field: 'document.first_publication_date', direction: 'desc' },
          ],
        })) as Content.BlogPageNewDocument[]
      ).filter((doc) => doc.uid !== 'example')

  // Calculate pagination
  const totalResults = allBlogsForPagination.length
  const totalPages = Math.ceil(totalResults / pageSize)
  const startIndex = (page - 1) * pageSize
  const endIndex = startIndex + pageSize

  // Get current page blogs
  const blogList = allBlogsForPagination.slice(startIndex, endIndex)

  // Get all unique tags from all blog posts (use same data, no need to fetch again)
  const allTags = Array.from(
    new Set(
      ((await client.getAllByType('blog_page_new')) as Content.BlogPageNewDocument[])
        .filter((blog) => blog.uid !== 'example')
        .flatMap((blog) => blog.tags),
    ),
  ).filter(Boolean)

  if (!blogList || blogList.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12">
        <p className="text-center text-muted-foreground">No blog posts found.</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Tag Filter */}
      {allTags.length > 0 && (
        <div className="mb-8 flex flex-wrap items-center gap-2">
          <span className="font-sans text-sm font-medium text-foreground">Filter by tag:</span>

          {/* All Posts */}
          <Link
            href="/blog"
            className={`rounded-full px-4 py-2 font-sans text-sm transition-colors ${
              !tag
                ? 'bg-primary text-primary-foreground'
                : 'border border-border bg-background text-foreground hover:bg-muted'
            }`}
          >
            All
          </Link>

          {/* Tag Badges */}
          {allTags.map((tagItem) => (
            <Link
              key={tagItem}
              href={`/blog?tag=${tagItem}`}
              className={`rounded-full px-4 py-2 font-sans text-sm transition-colors ${
                tag === tagItem
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border bg-background text-foreground hover:bg-muted'
              }`}
            >
              {tagItem}
            </Link>
          ))}
        </div>
      )}

      {/* Blog List */}
      <div className="divide-y divide-border">
        {blogList.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>

      {/* Pagination Navigation */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {/* Previous Button */}
              <PaginationItem>
                <PaginationPrevious
                  href={page > 1 ? `/blog?page=${page - 1}${tag ? `&tag=${tag}` : ''}` : '#'}
                  className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {/* Page Numbers */}
              {(() => {
                const pages = []
                const currentPage = page

                // Always show first page
                pages.push(
                  <PaginationItem key={1}>
                    <PaginationLink
                      href={`/blog?page=1${tag ? `&tag=${tag}` : ''}`}
                      isActive={currentPage === 1}
                    >
                      1
                    </PaginationLink>
                  </PaginationItem>,
                )

                // Show ellipsis if current page is far from start
                if (currentPage > 3) {
                  pages.push(
                    <PaginationItem key="ellipsis-start">
                      <PaginationEllipsis />
                    </PaginationItem>,
                  )
                }

                // Show pages around current page
                for (
                  let i = Math.max(2, currentPage - 1);
                  i <= Math.min(totalPages - 1, currentPage + 1);
                  i++
                ) {
                  pages.push(
                    <PaginationItem key={i}>
                      <PaginationLink
                        href={`/blog?page=${i}${tag ? `&tag=${tag}` : ''}`}
                        isActive={currentPage === i}
                      >
                        {i}
                      </PaginationLink>
                    </PaginationItem>,
                  )
                }

                // Show ellipsis if current page is far from end
                if (currentPage < totalPages - 2) {
                  pages.push(
                    <PaginationItem key="ellipsis-end">
                      <PaginationEllipsis />
                    </PaginationItem>,
                  )
                }

                // Always show last page if more than 1 page
                if (totalPages > 1) {
                  pages.push(
                    <PaginationItem key={totalPages}>
                      <PaginationLink
                        href={`/blog?page=${totalPages}${tag ? `&tag=${tag}` : ''}`}
                        isActive={currentPage === totalPages}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>,
                  )
                }

                return pages
              })()}

              {/* Next Button */}
              <PaginationItem>
                <PaginationNext
                  href={
                    page < totalPages ? `/blog?page=${page + 1}${tag ? `&tag=${tag}` : ''}` : '#'
                  }
                  className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  )
}
