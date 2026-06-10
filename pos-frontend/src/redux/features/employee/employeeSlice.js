import { createSlice } from '@reduxjs/toolkit';
import { fetchEmployeesByBranch, createEmployee, deleteEmployee } from './employeeThunk';

const employeeSlice = createSlice({
    name: 'employee',
    initialState: {
        employees: [],
        loading: false,
        actionLoading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeesByBranch.pending, (state) => { state.loading = true; })
            .addCase(fetchEmployeesByBranch.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(createEmployee.pending, (state) => { state.actionLoading = true; })
            .addCase(createEmployee.fulfilled, (state, action) => {
                state.actionLoading = false;
                state.employees.push(action.payload);
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.employees = state.employees.filter(e => e.id !== action.payload);
            });
    }
});

export default employeeSlice.reducer;