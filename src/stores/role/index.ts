// ** Redux Imports
import { Dispatch } from 'redux'
import { createSlice } from '@reduxjs/toolkit'
// ** Axios Imports
import axios from 'axios'
import { createRoleAsync, getAllRolesAsync } from './action'

interface DataParams {
  q: string
  role: string
  status: string
  currentPlan: string
}

interface Redux {
  getState: any
  dispatch: Dispatch<any>
}

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: '',
  TypeError: '',

  // isSuccessUpdateMe: true,
  // isErrorUpdateMe: false,
  // messageUpdateMe: '',
  // isSuccessChangePassword: true,
  // isErrorChangePassword: false,
  // messageChangePassword: '',

  isSuccessCreateEdit: false,
  isErrorCreateEdit: false,
  messageCreateEdit: '',

  isSuccessDelete: false,
  isErrorDelete: false,
  messageDelete: '',

  roles: {
    data: [],
    total: 0
  }
}

export const roleSlice = createSlice({
  name: 'role', // action
  initialState,
  reducers: {
    resetInitialState: state => {
      state.isLoading = false
      state.isSuccess = true
      state.isError = false
      state.message = ''
      state.TypeError = ''
      state.isSuccessCreateEdit = false
      state.isErrorCreateEdit = true
      state.messageCreateEdit = ''

      state.isSuccessDelete = false
      state.isErrorDelete = true
      state.messageDelete = ''
    }
  },
  extraReducers: builder => {
    // **get all roles
    builder.addCase(getAllRolesAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(getAllRolesAsync.fulfilled, (state, action) => {
      console.log('action', { action })
      state.isLoading = false
      state.roles.data = action.payload.data.roles
      state.roles.total = action.payload.data.totalCount
    })
    builder.addCase(getAllRolesAsync.rejected, (state, action) => {
      state.isLoading = false
      state.roles.data = []
      state.roles.total = 0
    })

    // **create role
    builder.addCase(createRoleAsync.pending, (state, action) => {
      state.isLoading = true
    })
    builder.addCase(createRoleAsync.fulfilled, (state, action) => {
      // console.log('action', { action })
      state.isLoading = false
      state.isSuccessCreateEdit = !!action.payload?.data._id
      state.isErrorCreateEdit = !action.payload?.data?._id
      state.messageCreateEdit = action.payload?.message
      state.TypeError = action.payload?.typeError
    })
    // builder.addCase(createRoleAsync.rejected, (state, action: any) => {
    //   state.isLoading = false
    //   state.isSuccessCreateEdit = false
    //   state.isErrorCreateEdit = true

    //   state.messageCreateEdit = action.payload?.data.message
    //   state.TypeError = action.payload?.data?.typeError
    // })
  }
})

export const { resetInitialState } = roleSlice.actions
export default roleSlice.reducer
