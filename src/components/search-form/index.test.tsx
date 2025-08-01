// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference types="vitest" />

import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { useForm, FormProvider } from 'react-hook-form'
import { vi } from 'vitest'
import SearchForm from '.'

const Wrapper = ({ children }: { children: React.ReactNode }) => {
  const methods = useForm({ defaultValues: { search: '' } })
  return <FormProvider {...methods}>{children}</FormProvider>
}

describe('SearchForm', () => {
  it('render input and button', () => {
    render(
      <Wrapper>
        <SearchForm suggestions={[]} onSearch={() => {}} onSuggest={() => {}} />
      </Wrapper>,
    )

    expect(
      screen.getByPlaceholderText('typing keyword here ...'),
    ).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('call onSearch when form is submitted', async () => {
    const onSearch = vi.fn()

    render(
      <Wrapper>
        <SearchForm suggestions={[]} onSearch={onSearch} onSuggest={() => {}} />
      </Wrapper>,
    )

    const input = screen.getByPlaceholderText('typing keyword here ...')
    const button = screen.getByTestId('submit-button')

    fireEvent.change(input, { target: { value: 'React' } })
    fireEvent.click(button)

    await new Promise((r) => setTimeout(r, 10))

    expect(onSearch).toHaveBeenCalledWith('React')
  })
})
