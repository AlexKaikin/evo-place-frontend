import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'

jest.mock('next/navigation', () => ({
  useRouter() {
    return { prefetch: () => null }
  },
}))

describe('Page', () => {
  it('render title', () => {
    render(<Page />)
    const title = screen.getByText(/International community/i)
    expect(title).toBeInTheDocument()
  })
})
