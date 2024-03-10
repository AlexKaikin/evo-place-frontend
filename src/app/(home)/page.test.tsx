import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('next/navigation', () => ({
  ...require('next-router-mock'),
  useSearchParams: () => jest.fn(),
}))

describe('Page', () => {
  it('render title', () => {
    render(<Page />)
    const title = screen.getByText(/International community/i)
    expect(title).toBeInTheDocument()
  })
})
