import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from './page'

describe('Page', () => {
  it('renders a logo', () => {
    render(<Page />)

    const logo = screen.getByText(/evo place/i)

    expect(logo).toBeInTheDocument()
  })
})
