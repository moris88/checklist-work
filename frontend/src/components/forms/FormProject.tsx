/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import useStore from '../../hooks/useStore'
import { Project, User } from '../../types/global'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import Multiselect from '../Multiselect'
import { users } from '../../utils/users'
import { useEffect, useState } from 'react'

export const systemDefault: any[] = [
  {
    id: 1,
    userID: 9,
    projectID: 1,
    taskID: 1,
  },
]

interface FormProjectProps {
  defaultValues?: Project
}

const FormProject = ({ defaultValues }: FormProjectProps) => {
  const [values, setValues] = useState<Project>(
    defaultValues ?? {
      id: 0,
      name: '',
      description: null,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      members: null,
      service: null,
      subService: null,
      state: 'OPENED',
    }
  )
  const { elements: members } = useStore<any>({
    key: 'user',
    defaultValues: users,
  })
  const { elements: systems, addElement: addSystem } = useStore<any>({
    key: 'system',
    defaultValues: systemDefault,
  })
  const { addElement } = useStore<any>({
    key: 'project',
    defaultValues: [],
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Project>({
    values: values,
  })

  useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
    }
  }, [defaultValues])

  const onSubmit = handleSubmit((data) => {
    const [system] = systems
    const dataMembers = data.members as unknown as string[]
    if (dataMembers !== null) {
      const newMember: User[] = []
      dataMembers.forEach((el) => {
        const member = members.filter((member) => member.full_name === el)
        newMember.push(member[0])
      })
      data.members = newMember
    }
    data.id = system.projectID
    addSystem({ ...system, projectID: system.projectID + 1 })
    addElement(data)
    window.location.href = '/projects'
  })

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={onSubmit}>
      {errors.name?.message && (
        <Label className="font-bold text-red-500">{errors.name?.message}</Label>
      )}
      <Label className="font-bold">Name Project</Label>
      <TextInput
        className="font-medium"
        {...register('name', { required: 'Mandatory Name Project' })}
      />
      <Label className="font-bold">Description Project</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Select Members Project</Label>
      <Controller
        control={control}
        name={'members'}
        defaultValue={defaultValues?.members ?? []}
        render={({ field: { value, onChange } }) => {
          return (
            <Multiselect
              options={users.map((user) => user.full_name)}
              defaultValues={
                value
                  ?.filter((el) => el !== undefined)
                  .map((user) => user.full_name) ?? []
              }
              placeholder="Selected a member"
              onChange={onChange}
            />
          )
        }}
      />
      <Label className="font-bold">Selected a service</Label>
      <Select {...register('service')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'Zoho'}>{'Zoho'}</option>
        <option value={'Freshworks'}>{'Freshworks'}</option>
        <option value={'Hubspot'}>{'Hubspot'}</option>
        <option value={'Zendesk'}>{'Zendesk'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <Label className="font-bold">Selected a sub-service</Label>
      <Select {...register('subService')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'Zoho CRM'}>{'Zoho CRM'}</option>
        <option value={'Zoho Creator'}>{'Zoho Creator'}</option>
        <option value={'Zoho Desk'}>{'Zoho Desk'}</option>
        <option value={'Zoho Analitycs'}>{'Zoho Analitycs'}</option>
        <option value={'Freshdesk'}>{'Freshdesk'}</option>
        <option value={'Freshservice'}>{'Freshservice'}</option>
        <option value={'FreshCaller'}>{'FreshCaller'}</option>
        <option value={'Zendesk Support'}>{'Zendesk Support'}</option>
        <option value={'Zendesk Sell'}>{'Zendesk Sell'}</option>
        <option value={'Zendesk Guide'}>{'Zendesk Guide'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <Label className="font-bold">Selected a state</Label>
      <Select {...register('state')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'OPENED'}>{'OPENED'}</option>
        <option value={'ACTIVE'}>{'ACTIVE'}</option>
        <option value={'CLOSED'}>{'CLOSED'}</option>
      </Select>
      <div className="flex justify-center w-full">
        <Button type="submit">SAVE</Button>
      </div>
    </form>
  )
}

export default FormProject
