// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import CardNews from '.'

describe('CardNews', () => {
  const props = {
    id: '1',
    title: 'Sample Title',
    author: 'By Author',
    publishedDate: '2024-07-31',
    shortDescription: 'A short summary.',
    webUrl: 'https://example.com',
  }

  it('render title and author', () => {
    render(<CardNews {...props} />)
    expect(screen.getByText(props.title)).toBeInTheDocument()
    expect(screen.getByText(props.author)).toBeInTheDocument()
  })

  it('has link to full article', () => {
    render(<CardNews {...props} />)
    const link = screen.getAllByTestId('read-more-link')[0]
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent('Read more')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    expect(link).toHaveAttribute('href', props.webUrl)
  })
})
