/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { Meta, StoryObj } from '@storybook/react'
import {
  Button,
  Form,
  FormCheckbox,
  FormFieldErrors,
  FormInput,
  FormRadioButton,
  FormTextarea,
  IconButton,
  Stack,
} from '@ui'

const meta: Meta<typeof Form> = {
  title: 'Utils/Form',
  component: Form,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Form>

type RegisterForm = {
  login: string
  email: string
  password: string
  confirmPassword: string
  privacy: boolean
}

const registerDefaultValues = {
  login: 'title',
  email: 'email@mail.com',
  password: 'password',
  confirmPassword: 'password',
  privacy: true,
}

const registerSchema = z
  .object({
    login: z
      .string({ required_error: 'Enter login' })
      .min(1, { message: 'Enter login' }),
    email: z
      .string({ required_error: 'Enter email' })
      .min(1, { message: 'Enter email' })
      .email('Email format is no valid'),
    password: z
      .string()
      .min(6, { message: 'Password must be atleast 6 characters' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm Password is required' }),
    privacy: z.literal(true, {
      errorMap: () => ({ message: 'You must accept Terms and Conditions' }),
    }),
  })
  .refine(data => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Password don't match",
  })

function RegisterFormWithHooks() {
  const [output, setOutput] = useState<RegisterForm>(registerDefaultValues)
  const formMethods = useForm<RegisterForm>({
    defaultValues: registerDefaultValues,
    resolver: zodResolver(registerSchema),
    mode: 'onTouched',
  })
  const {
    formState: { errors },
  } = formMethods

  const handleSubmit = (data: RegisterForm) => setOutput(data)

  return (
    <Stack direction="row" gap={40} isWide>
      <Stack gap={20} style={{ width: '400px' }}>
        <div>Form</div>
        <Form id="testForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <Stack gap={40}>
            <FormInput name="login" label="Login" placeholder="Login" />
            <FormInput name="email" label="Email" placeholder="Email" />
            <FormInput
              name="password"
              label="Password"
              placeholder="Test title"
            />
            <FormInput
              name="confirmPassword"
              label="Confirm password"
              placeholder="Test title"
            />
            <FormCheckbox
              name="privacy"
              defaultChecked={registerDefaultValues.privacy}
              label="Accept Terms & Conditions"
            />
            <Button>Send</Button>
          </Stack>
        </Form>
      </Stack>
      <Stack gap={20} isWide>
        <div>Output</div>
        {JSON.stringify(output, null, 2)}

        <div>Errors</div>
        {JSON.stringify(errors, null, 2)}
      </Stack>
    </Stack>
  )
}

export const Default: Story = {
  render: () => <RegisterFormWithHooks />,
}

type ReviewForm = {
  title: string
  description: string
  starsArray: { value: string; active: boolean }[]
  stars: string
}

const reviewDefaultValues = {
  title: 'title',
  description: 'description',
  starsArray: [
    { value: '1', active: true },
    { value: '2', active: false },
    { value: '3', active: true },
    { value: '4', active: false },
    { value: '5', active: true },
  ],
  stars: '',
}

const reviewSchema = z.object({
  title: z
    .string({ required_error: 'Enter title' })
    .min(1, { message: 'Enter title' }),
  description: z
    .string({ required_error: 'Enter description' })
    .min(1, { message: 'Enter description' }),
  starsArray: z.array(z.object({ value: z.string(), active: z.boolean() })),
  stars: z.string().refine(value => value.length, {
    path: ['starsRefine'],
    message: 'Required',
  }),
})

function ReviewFormWithHooks() {
  const [output, setOutput] = useState<ReviewForm>(reviewDefaultValues)
  const formMethods = useForm<ReviewForm>({
    defaultValues: reviewDefaultValues,
    resolver: zodResolver(reviewSchema),
    mode: 'onTouched',
  })
  const {
    control,
    formState: { errors },
  } = formMethods
  const { fields } = useFieldArray({ name: 'starsArray', control })

  const handleSubmit = (data: ReviewForm) => setOutput(data)

  return (
    <Stack direction="row" gap={40} isWide>
      <Stack gap={20} style={{ width: '400px' }}>
        <div>Form</div>
        <Form id="reviewForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <Stack gap={40}>
            <FormInput name="title" label="Title" placeholder="Test title" />
            <FormTextarea
              name="description"
              label="Description"
              placeholder="Test description"
            />
            <Stack direction="row" gap={10}>
              {fields.map((field, i) => (
                <FormCheckbox
                  key={field.id}
                  name={`starsArray.${i}.active`}
                  label={field.value}
                  defaultChecked={field.active}
                />
              ))}
            </Stack>
            <Stack direction="column">
              <Stack direction="row" gap={10}>
                {['1', '2', '3', '4', '5'].map(star => (
                  <FormRadioButton
                    key={star}
                    name={`stars`}
                    label={star}
                    value={star}
                  />
                ))}
              </Stack>
              {(errors?.stars as any)?.starsRefine ? (
                <FormFieldErrors error={(errors?.stars as any)?.starsRefine} />
              ) : null}
            </Stack>
            <Button>Send</Button>
          </Stack>
        </Form>
      </Stack>
      <Stack gap={20} isWide>
        <div>Output</div>
        {JSON.stringify(output, null, 2)}

        <div>Errors</div>
        {JSON.stringify(errors, null, 2)}
      </Stack>
    </Stack>
  )
}

export const Review: Story = {
  render: () => <ReviewFormWithHooks />,
}

type TasksForm = {
  tasks: { value: string; active: boolean }[]
}

const tasksDefaultValues = {
  tasks: [
    { value: 'value 1', active: false },
    { value: 'value 2', active: false },
    { value: 'value 3', active: false },
    { value: 'value 4', active: false },
    { value: 'value 5', active: false },
  ],
}

const tasksSchema = z.object({
  tasks: z
    .array(
      z.object({
        value: z.string().min(1, { message: 'Enter value' }),
        active: z.boolean(),
      })
    )
    .refine(tasks => tasks.find(task => task.active), {
      path: ['tasksRefine'],
      message: 'Required check',
    }),
})

function TasksFormWithHooks() {
  const [output, setOutput] = useState<TasksForm>(tasksDefaultValues)
  const formMethods = useForm<TasksForm>({
    defaultValues: tasksDefaultValues,
    resolver: zodResolver(tasksSchema),
    mode: 'onTouched',
  })
  const {
    control,
    formState: { errors },
  } = formMethods
  const { fields, append, remove } = useFieldArray({ name: 'tasks', control })

  const handleSubmit = (data: TasksForm) => setOutput(data)

  return (
    <Stack direction="row" gap={40} isWide>
      <Stack gap={20} style={{ width: '400px' }}>
        <div>Form</div>
        <Form id="tasksForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <Stack gap={20}>
            <Stack direction="column" gap={10}>
              {fields.map((field, index) => (
                <Stack key={field.id} direction="row" gap={10}>
                  <FormInput name={`tasks.${index}.value`} />
                  <FormCheckbox
                    key={field.id}
                    name={`tasks.${index}.active`}
                    defaultChecked={field.active}
                  />
                  {index > 0 ? (
                    <IconButton icon="BsX" onClick={() => remove(index)} />
                  ) : (
                    <div style={{ width: '40px' }}></div>
                  )}
                </Stack>
              ))}
              {(errors?.tasks as any)?.tasksRefine ? (
                <FormFieldErrors error={(errors?.tasks as any)?.tasksRefine} />
              ) : null}
              <Button
                variant="outlined"
                type="button"
                onClick={() => append({ value: '', active: false })}
              >
                Add more
              </Button>
            </Stack>

            <Button>Send</Button>
          </Stack>
        </Form>
      </Stack>
      <Stack gap={20} isWide>
        <div>Output</div>
        {JSON.stringify(output, null, 2)}

        <div>Errors</div>
        {JSON.stringify(errors, null, 2)}
      </Stack>
    </Stack>
  )
}

export const Tasks: Story = {
  render: () => <TasksFormWithHooks />,
}

type someForm = {
  age: number
  date: Date
}

const someDefaultValues = {
  age: 0,
  date: new Date(),
}

const someSchema = z.object({
  age: z.coerce.number({
    required_error: 'Enter number',
    invalid_type_error: 'Enter number',
  }),
  date: z.coerce.date(),
})

function SomeFormWithHooks() {
  const [output, setOutput] = useState<someForm>(someDefaultValues)
  const formMethods = useForm<someForm>({
    defaultValues: someDefaultValues,
    resolver: zodResolver(someSchema),
    mode: 'onTouched',
  })

  const {
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = formMethods

  const handleSubmit = (data: someForm) => setOutput(data)

  return (
    <Stack direction="row" gap={40} isWide>
      <Stack gap={20} style={{ width: '400px' }}>
        <div>Form</div>
        <Form id="someForm" formMethods={formMethods} onSubmit={handleSubmit}>
          <Stack gap={20}>
            <FormInput type="number" name="age" />
            <FormInput type="date" name="date" />
            <Button disabled={isSubmitting}>Send</Button>
            {isDirty && (
              <Button color="secondary" type="button" onClick={() => reset()}>
                Reset
              </Button>
            )}
          </Stack>
        </Form>
      </Stack>
      <Stack gap={20} isWide>
        <div>Output</div>
        {JSON.stringify(output, null, 2)}

        <div>Errors</div>
        {JSON.stringify(errors, null, 2)}
      </Stack>
    </Stack>
  )
}

export const Some: Story = {
  render: () => <SomeFormWithHooks />,
}
