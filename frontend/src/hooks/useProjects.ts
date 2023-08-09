import React from 'react'
import { Project } from '../types/global'

const VITE_SERVER_URL = (import.meta.env.VITE_SERVER_URL as string) ?? ''

const useProject = () => {
  const [projects, setProjects] = React.useState<Project[]>([])
  const [loading, setLoading] = React.useState<boolean>(true)
  const [error, setError] = React.useState<any>(null)

  const token = React.useMemo(() => {
    const data = localStorage.getItem('access_token')
    if (data) {
      const parsed = JSON.parse(data)
      return parsed.token
    }
    return null
  }, [])

  React.useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${VITE_SERVER_URL}/projects`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }).then((d) => d.json())
        setProjects(response as Project[])
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [token])

  return {
    projects,
    loading,
    error,
  }
}

export default useProject
