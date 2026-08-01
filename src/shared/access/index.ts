import type { Access, FieldAccess } from 'payload'

export const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin' || user.role === 'administrator'
}

export const isSuperAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin'
}

export const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false
  return ['super-admin', 'administrator', 'editor'].includes(user.role)
}

export const isAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin' || user.role === 'administrator'
}

export const isPublishedOrAdmin: Access = ({ req: { user }, data }) => {
  if (!user) return false
  if (user.role === 'super-admin' || user.role === 'administrator') return true
  return data?.status === 'published'
}

export const createdByField: FieldAccess = ({ req: { user }, value }) => {
  if (!user) return false
  if (user.role === 'super-admin' || user.role === 'administrator') return true
  return value === user.id
}
