import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import { Button, Form, FormCheckbox, FormInput, FormTextarea, Stack } from '@ui'

const meta: Meta<typeof Form> = {
  title: 'Utils/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Form>

type TestForm = {
  title: string
  description: string
  privaci: boolean
}

const defaultValues = {
  title: '',
  description: '',
  privaci: true,
}

const schema = z.object({
  title: z
    .string({ required_error: 'Enter title' })
    .min(1, { message: 'Enter title' }),
  description: z
    .string({ required_error: 'Enter description' })
    .min(1, { message: 'Enter description' }),
  privaci: z.boolean({ required_error: 'Enter title' }),
})

function FormWithHooks() {
  const [output, setOutput] = useState<TestForm>(defaultValues)
  const formMethods = useForm<TestForm>({
    defaultValues,
    resolver: zodResolver(schema),
  })

  const handleSubmit = (data: TestForm) => setOutput(data)

  return (
    <Stack direction="row" gap={40} isWide>
      <Stack gap={20} style={{ width: '400px' }}>
        <div>Form</div>
        <Form id="testForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <Stack gap={20}>
            <FormInput name="title" label="Title" placeholder="Test title" />
            <FormTextarea
              name="description"
              label="Description"
              placeholder="Test description"
            />
            <FormCheckbox
              name="privaci"
              defaultChecked={defaultValues.privaci}
              label="Privaci"
            />
            <Button>Send</Button>
          </Stack>
        </Form>
      </Stack>
      <Stack gap={20} isWide>
        <div>Output</div>
        {JSON.stringify(output, null, 2)}
      </Stack>
    </Stack>
  )
}

export const Default: Story = {
  render: () => <FormWithHooks />,
}
