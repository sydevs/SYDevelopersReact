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
    <div className="w-full flex justify-start border-b gap-0">
      <button
        onClick={() => onSelectCategory(null)}
        className={`rounded-none border-b-2 px-4 py-3 cursor-pointer text-sm font-medium transition-colors ${
          selectedCategory === null
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
            className={`rounded-none border-b-2 px-4 py-3 cursor-pointer text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'border-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {category} ({count})
          </button>
        )
      })}
    </div>
  )
}
