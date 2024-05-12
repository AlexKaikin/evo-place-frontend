import { SyntheticEvent, useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Icon,
  Typography,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from '@ui'

const meta: Meta<typeof Accordion> = {
  title: 'Surfaces/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ width: '600px' }}>
        <Story />
      </div>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof Accordion>

export const Single: Story = {
  render: () => {
    return (
      <div>
        <Accordion>
          <AccordionSummary
            id="panel001d-header"
            aria-controls="panel001d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  },
}

export const Basic: Story = {
  render: () => {
    return (
      <div>
        <Accordion>
          <AccordionSummary
            id="panel01d-header"
            aria-controls="panel01d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 1</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            id="panel02d-header"
            aria-controls="panel02d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 2</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            id="panel03d-header"
            aria-controls="panel03d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 3</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  },
}

export const Controlled: Story = {
  render: function Render() {
    const [expanded, setExpanded] = useState<string | false>(false)
    const handleChange =
      (panel: string) => (_: SyntheticEvent, newExpanded: boolean) => {
        setExpanded(newExpanded ? panel : false)
      }
    return (
      <div>
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
        >
          <AccordionSummary
            id="panel1d-header"
            aria-controls="panel1d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 1</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 1</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
        >
          <AccordionSummary
            id="panel2d-header"
            aria-controls="panel2d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 2</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 2</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          disabled
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
        >
          <AccordionSummary
            id="panel3d-header"
            aria-controls="panel3d-content"
            expandIcon={<Icon name="BsChevronDown" />}
          >
            <Typography variant="text">Title 3</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="text">Description 3</Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    )
  },
}
