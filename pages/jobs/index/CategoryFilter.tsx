import { Badge } from '@/components/ui/badge'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory: string | null
  onSelectCategory: (category: string | null) => void
  getCategoryCount: (category: string | null) => number
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
  getCategoryCount,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelectCategory(null)}
        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
          selectedCategory === null
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted hover:bg-muted/80 text-foreground'
        }`}
      >
        All Jobs
        <Badge
          variant="secondary"
          className={`ml-2 text-xs ${
            selectedCategory === null ? 'bg-primary-foreground/20 text-primary-foreground' : ''
          }`}
        >
          {getCategoryCount(null)}
        </Badge>
      </button>
      {categories.map((category) => {
        const count = getCategoryCount(category)
        if (count === 0) return null
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors cursor-pointer ${
              selectedCategory === category
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-muted/80 text-foreground'
            }`}
          >
            {category}
            <Badge
              variant="secondary"
              className={`ml-2 text-xs ${
                selectedCategory === category ? 'bg-primary-foreground/20 text-primary-foreground' : ''
              }`}
            >
              {count}
            </Badge>
          </button>
        )
      })}
    </div>
  )
}

