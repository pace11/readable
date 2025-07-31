import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon } from 'lucide-react'
import AutocompleteSuggestions from '../autocomplete-suggestions'
import { useFormContext } from 'react-hook-form'

type SearchFormProps = {
  suggestions: string[]
  onSearch: (search: string) => void
  onSuggest: (input: string) => void
}

export default function SearchForm({
  suggestions,
  onSearch,
  onSuggest,
}: SearchFormProps) {
  const form = useFormContext()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => onSearch(data.search))}>
        <div className="flex flex-row gap-3 relative w-full">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <div className="relative">
                    <Input
                      data-testid="search-input"
                      placeholder="typing keyword here ..."
                      {...field}
                      onChange={(e) => {
                        field.onChange(e)
                        onSuggest(e.target.value)
                      }}
                    />
                    {suggestions.length > 0 && (
                      <AutocompleteSuggestions
                        suggestions={suggestions}
                        onSelect={(suggestion) => {
                          form.setValue('search', suggestion)
                          onSearch(suggestion)
                        }}
                      />
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" data-testid="submit-button">
            <SearchIcon />
          </Button>
        </div>
      </form>
    </Form>
  )
}
