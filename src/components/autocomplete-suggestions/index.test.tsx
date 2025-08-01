// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import AutocompleteSuggestions from '.'

describe('AutocompleteSuggestions', () => {
  const suggestions = ['React', 'Redux', 'React Native']

  it('render component AutocompleteSuggestions', () => {
    render(
      <AutocompleteSuggestions suggestions={suggestions} onSelect={() => {}} />,
    )
    suggestions.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('onSelect when item is clicked', () => {
    const onSelect = vi.fn()
    render(
      <AutocompleteSuggestions suggestions={suggestions} onSelect={onSelect} />,
    )
    fireEvent.click(screen.getByText('React'))
    expect(onSelect).toHaveBeenCalledWith('React')
  })
})
