import { Users } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  getCategoryCount: (category: string | null) => number
  showTeam: boolean
  onToggleTeam: () => void
  totalVolunteers: number
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  getCategoryCount,
  showTeam,
  onToggleTeam,
  totalVolunteers,
}: CategoryFilterProps) {
  return (
    <div className="w-full flex items-center border-b gap-2">
      {/* Scrollable category tabs */}
      <div className="flex-1 overflow-x-auto scrollbar-hide min-w-0">
        <div className="flex whitespace-nowrap">
          <button
            onClick={() => onSelectCategory(null)}
            className={`rounded-none border-b-2 px-3 sm:px-4 py-3 cursor-pointer text-sm font-medium transition-colors shrink-0 ${
              selectedCategory === null && !showTeam
                ? 'border-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            All Jobs ({getCategoryCount(null)})
          </button>
          {categories.map((category) => {
            const count = getCategoryCount(category)
            if (count === 0) return null
            return (
              <button
                key={category}
                onClick={() => onSelectCategory(category)}
                className={`rounded-none border-b-2 px-3 sm:px-4 py-3 cursor-pointer text-sm font-medium transition-colors shrink-0 ${
                  selectedCategory === category && !showTeam
                    ? 'border-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>
      </div>
      {/* Fixed team button */}
      <Button
        variant="outline"
        className={`gap-2 cursor-pointer shrink-0 ${showTeam ? 'bg-accent' : 'bg-inherit'}`}
        onClick={onToggleTeam}
      >
        <Users className="h-4 w-4" />
        <span className="hidden sm:inline">Meet the Team</span>
        <span className="text-xs text-muted-foreground hidden md:inline">
          ({totalVolunteers})
        </span>
      </Button>
    </div>
  )
}
