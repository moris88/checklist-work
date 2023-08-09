/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form'
import useStore from '../../hooks/useStore'
import { Project, Task, User } from '../../types/global'
import { Button, Label, Select, TextInput, Textarea } from 'flowbite-react'
import Multiselect from '../Multiselect'
import { useEffect, useState } from 'react'

export const systemDefault: any[] = [
  {
    id: 1,
    userID: 9,
    projectID: 1,
    taskID: 1,
  },
]

interface FormTaskProps {
  defaultValues?: Task
}

const FormTask = ({ defaultValues }: FormTaskProps) => {
  const [values, setValues] = useState<Task>(
    defaultValues ?? {
      id: 0,
      title: '',
      description: null,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      assignee: null,
      projectID: null,
      deadline: new Date().toISOString().split('T')[0],
      priority: 'LOW',
      type: 'others',
      status: 'BACKLOG',
    }
  )
  const isEdit = defaultValues !== undefined
  const [members, setMembers] = useState<User[]>([])
  const { elements: listProjects } = useStore<Project>({
    key: 'project',
    defaultValues: [],
  })
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    values: values,
  })

  useEffect(() => {
    if (defaultValues) {
      setValues(defaultValues)
      const project = listProjects.filter(
        (project) => project.id === defaultValues.projectID
      )
      if (project.length > 0 && project[0].members !== null) {
        setMembers(project[0].members)
      } else {
        setMembers([])
      }
    }
  }, [defaultValues, listProjects])

  const onSubmit = (data: Task) => {
    console.log(data)
    window.location.href = '/tasks'
  }

  const handleChangeProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const project = listProjects.filter(
      (project) => project.id === +e.target.value
    )
    if (project.length > 0 && project[0].members !== null) {
      setMembers(project[0].members)
    } else {
      setMembers([])
    }
  }

  return (
    <form className="flex flex-col gap-2 p-4" onSubmit={handleSubmit(onSubmit)}>
      {errors.title?.message && (
        <Label className="font-bold text-red-500">
          {errors.title?.message}
        </Label>
      )}
      {errors.description?.message && (
        <Label className="font-bold text-red-500">
          {errors.description?.message}
        </Label>
      )}
      <Label className="font-bold">Name Task</Label>
      <TextInput
        className="font-medium"
        {...register('title', { required: 'Mandatory Title Task' })}
      />
      <Label className="font-bold">Description Task</Label>
      <Textarea className="font-medium" rows={4} {...register('description')} />
      <Label className="font-bold">Selected a Project</Label>
      <Select
        {...register('projectID', { required: 'Mandatory Project' })}
        onChange={handleChangeProject}
        disabled={isEdit}
      >
        <option value={''}>{'--NONE--'}</option>
        {listProjects.map((project) => (
          <option key={`option-project-${project.id}`} value={project.id}>
            {project.name}
          </option>
        ))}
      </Select>
      <Label className="font-bold">Selected Members Task</Label>
      <Controller
        control={control}
        name={'assignee'}
        defaultValue={[]}
        render={({ field: { value, onChange } }) => {
          return (
            <Multiselect
              options={members.map((user) => user.full_name)}
              disabled={members.length === 0}
              defaultValues={
                value
                  ?.filter((el) => el !== undefined)
                  .map((user) => user.full_name) ?? []
              }
              placeholder="Selected assigned"
              onChange={onChange}
            />
          )
        }}
      />
      <Label className="font-bold">Insert a Deadline Task</Label>
      <TextInput {...register('deadline')} type="date" />
      <Label className="font-bold">Selected a Status</Label>
      <Select {...register('status')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'BACKLOG'}>{'BACKLOG'}</option>
        <option value={'OPEN'}>{'OPEN'}</option>
        <option value={'IN PROGRESS'}>{'IN PROGRESS'}</option>
        <option value={'DONE'}>{'DONE'}</option>
        <option value={'DELETED'}>{'DELETED'}</option>
        <option value={'ARCHIVED'}>{'ARCHIVED'}</option>
        <option value={'CLOSED'}>{'CLOSED'}</option>
        <option value={'REOPENED'}>{'REOPENED'}</option>
        <option value={'PENDING'}>{'PENDING'}</option>
      </Select>
      <Label className="font-bold">Selected a Priority</Label>
      <Select {...register('priority')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'LOW'}>{'LOW'}</option>
        <option value={'MEDIUM'}>{'MEDIUM'}</option>
        <option value={'HIGH'}>{'HIGH'}</option>
        <option value={'URGENT'}>{'URGENT'}</option>
      </Select>
      <Label className="font-bold">Selected a Type</Label>
      <Select {...register('type')}>
        <option value={''}>{'--NONE--'}</option>
        <option value={'system integration'}>{'system integration'}</option>
        <option value={'widget'}>{'widget'}</option>
        <option value={'webservice'}>{'webservice'}</option>
        <option value={'serverless'}>{'serverless'}</option>
        <option value={'cf-deluge'}>{'cf-deluge'}</option>
        <option value={'configuration'}>{'configuration'}</option>
        <option value={'bug-fix'}>{'bug-fix'}</option>
        <option value={'call external'}>{'call external'}</option>
        <option value={'call internal'}>{'call internal'}</option>
        <option value={'others'}>{'others'}</option>
      </Select>
      <div className="flex justify-center w-full">
        <Button type="submit">SAVE</Button>
      </div>
    </form>
  )
}

export default FormTask