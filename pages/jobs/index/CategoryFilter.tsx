import { Users } from 'lucide-react'

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
      {/* Team tab - same styling as category tabs */}
      <button
        onClick={onToggleTeam}
        className={`flex items-center gap-1.5 rounded-none border-b-2 px-3 sm:px-4 py-3 cursor-pointer text-sm font-medium transition-colors shrink-0 ${
          showTeam
            ? 'border-primary'
            : 'border-transparent text-muted-foreground hover:text-foreground'
        }`}
      >
        <Users className="h-4 w-4" />
        <span>Team</span>
        <span className="hidden sm:inline">({totalVolunteers})</span>
      </button>
    </div>
  )
}
