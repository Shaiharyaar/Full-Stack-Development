import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    searchAnecdotes(state, action) {
      return action.payload
    },
  },
})
export const { searchAnecdotes } = filterSlice.actions
export default filterSlice.reducer
