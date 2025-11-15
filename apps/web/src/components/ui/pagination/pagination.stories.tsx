import type { Meta, StoryObj } from "@storybook/react-vite"
import * as React from "react"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"

const meta: Meta = {
  title: "components/ui/Pagination",
  component: Pagination,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Interactive: Story = {
  render: () => {
    function PaginationExample() {

      const [currentPage, setCurrentPage] = React.useState(2)
      const totalPages = 9

      const pages = [1, 2, 3, "...", 8, 9]

      return (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                as="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              />
            </PaginationItem>

            {pages.map((page, idx) => (
              <PaginationItem key={idx}>
                {page === "..." ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    as="button"
                    isActive={currentPage === page}
                    onClick={() => setCurrentPage(Number(page))}
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                as="button"
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )
    }
    return <PaginationExample />
  }
}