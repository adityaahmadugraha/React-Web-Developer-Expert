import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    receiveUsers: (_state, action) => action.payload,
  },
});

export const { receiveUsers } = usersSlice.actions;
export default usersSlice.reducer;
