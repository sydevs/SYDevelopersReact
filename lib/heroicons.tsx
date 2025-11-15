import * as HeroiconsOutline from '@heroicons/react/24/outline'
import * as HeroiconsSolid from '@heroicons/react/24/solid'

type IconName = string

const iconNameToComponentName = (name: string): string => {
  // Convert kebab-case or lowercase to PascalCase
  // e.g., "code-bracket" -> "CodeBracket", "camera" -> "Camera"
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('') + 'Icon'
}

export function getHeroicon(name: IconName, variant: 'outline' | 'solid' = 'outline') {
  const componentName = iconNameToComponentName(name)
  const icons = variant === 'solid' ? HeroiconsSolid : HeroiconsOutline

  // Type assertion since we're dynamically accessing the icons
  const Icon = (icons as any)[componentName]

  if (!Icon) {
    console.warn(`Icon "${componentName}" not found in ${variant} variant`)
    return HeroiconsOutline.QuestionMarkCircleIcon // Fallback icon
  }

  return Icon
}

// Category color mappings using Tailwind's default palette
export const categoryColors = {
  Development: {
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:border-blue-400',
    icon: 'text-blue-500',
    badge: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  Marketing: {
    bg: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:border-orange-400',
    icon: 'text-orange-500',
    badge: 'bg-orange-100 text-orange-800 border-orange-300',
  },
  Content: {
    bg: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:border-green-400',
    icon: 'text-green-500',
    badge: 'bg-green-100 text-green-800 border-green-300',
  },
  Design: {
    bg: 'bg-purple-50',
    text: 'text-purple-700',
    border: 'border-purple-200',
    hover: 'hover:border-purple-400',
    icon: 'text-purple-500',
    badge: 'bg-purple-100 text-purple-800 border-purple-300',
  },
} as const

export type Category = keyof typeof categoryColors

export function getCategoryColors(category: string) {
  return categoryColors[category as Category] || {
    bg: 'bg-gray-50',
    text: 'text-gray-700',
    border: 'border-gray-200',
    hover: 'hover:border-gray-400',
    icon: 'text-gray-500',
    badge: 'bg-gray-100 text-gray-800 border-gray-300',
  }
}
