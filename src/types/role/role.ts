export type TParamGetAllRoles = {
  limit?: number
  page?: number
  search?: string
  order?: string
}

export type TParamCreateRole = {
  name: string
}

export type TParamEditRole = {
  name: string
  id: string
  permissions?: string[]
}

export type TParamDeleteRole = {
  name: string
  id: string
}
