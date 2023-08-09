export type Status =
  | 'BACKLOG'
  | 'OPEN'
  | 'IN PROGRESS'
  | 'DONE'
  | 'DELETED'
  | 'ARCHIVED'
  | 'CLOSED'
  | 'REOPENED'
  | 'PENDING'

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'
export type Type =
  | 'system integration'
  | 'widget'
  | 'webservice'
  | 'serverless'
  | 'cf-deluge'
  | 'configuration'
  | 'bug-fix'
  | 'call external'
  | 'call internal'
  | 'others'
export type Service = 'Zoho' | 'Freshworks' | 'Hubspot' | 'Zendesk' | 'others'
export type SubService =
  | 'Zoho CRM'
  | 'Zoho Creator'
  | 'Zoho Desk'
  | 'Zoho Analitycs'
  | 'Freshdesk'
  | 'Freshservice'
  | 'FreshCaller'
  | 'Zendesk Support'
  | 'Zendesk Sell'
  | 'Zendesk Guide'
  | 'others'

export interface Task {
  id: number
  title: string
  description: string | null
  status: Status
  createdAt: string
  updatedAt: string
  priority: Priority | null
  deadline: string | null
  projectID: number | null
  assignee: User[] | null
  type: Type | null
}

export interface User {
  id: number
  first_name: string
  last_name: string
  full_name: string
  email: string
  role:
    | 'TECHNICAL LEADER'
    | 'SENIOR PROJECT MANAGER'
    | 'JUNIOR PROJECT MANAGER'
    | 'JUNIOR SOLUTION'
    | 'SENIOR SOLUTION'
    | 'JUNIOR DEVELOPER'
    | 'SENIOR DEVELOPER'
    | 'JUNIOR STAGE DEVELOPER'
    | 'NONE'
}

export interface Project {
  id: number
  name: string
  description: string | null
  createdAt: string
  updatedAt: string
  members: User[] | null
  service: Service | null
  subService: SubService | null
  state: 'OPENED' | 'ACTIVE' | 'CLOSED'
}

export interface AccessToken {
  token: string | null
  owner: { id: string; name: string } | null
  expiresAt: number | null
  createdAt: number | null
}

export interface LoginAccess {
  username: string
  password: string
}

export interface RegisterAccess {
  username: string
  password: string
  confirmPassword: string
}