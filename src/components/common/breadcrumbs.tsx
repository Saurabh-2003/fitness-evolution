'use client'

import { HomeIcon } from 'lucide-react'

import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const BreadCrumbs: React.FC = () => {
  const pathname = usePathname()

  // Split the pathname to get each part of the route
  const pathParts = pathname ? pathname.split('/').filter((part) => part !== '') : []

  // Generate breadcrumbs dynamically based on the current route
  const breadcrumbs = pathParts.map((part, index) => {
    // Capitalize the first letter of each part
    const label = part.replace('%20', ' ').charAt(0).toUpperCase() + part.slice(1)
    // Construct the href for the Link component
    const href = `/${pathParts.slice(0, index + 1).join('/')}`

    return { label, href }
  })
  return (
    <Breadcrumb className="text-xs px-4">
      <BreadcrumbList className="flex items-center w-auto px-0">
        <BreadcrumbItem>
          <BreadcrumbLink href="/">
            <span className="flex flex-row justify-center items-center">
              <HomeIcon className="h-4 w-4 mr-1" />
              Home
            </span>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {breadcrumbs.map((crumb, index) => (
          <BreadcrumbItem key={crumb.href}>
            <BreadcrumbLink href={crumb?.href}>
              <span className="flex max-w-60 truncate flex-row justify-center items-center">
                <span className="flex flex-row">{index >= 0 && <ChevronRightIcon className="h-5 w-5" />}</span>
                {decodeURIComponent(crumb.label)}
              </span>
            </BreadcrumbLink>
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default BreadCrumbs

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}
