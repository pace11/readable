type AutocompleteSuggestionsProps = {
  suggestions: string[]
  onSelect: (value: string) => void
}

export default function AutocompleteSuggestions({
  suggestions,
  onSelect,
}: AutocompleteSuggestionsProps) {
  return (
    <ul className="absolute z-10 mt-1 w-full max-h-48 overflow-y-auto bg-white border rounded shadow text-sm">
      {suggestions.map((suggestion, i) => (
        <li
          key={i}
          className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  )
}
