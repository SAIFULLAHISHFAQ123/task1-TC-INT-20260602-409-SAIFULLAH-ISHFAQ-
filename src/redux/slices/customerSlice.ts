import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Customer } from '../../types';

interface CustomerPageState {
  searchQuery: string;
  sortBy: keyof Customer;
  sortOrder: 'asc' | 'desc';
  page: number;
  pageSize: number;
  selectedCustomer: Customer | null;
}

const initialState: CustomerPageState = {
  searchQuery: '',
  sortBy: 'name',
  sortOrder: 'asc',
  page: 1,
  pageSize: 10,
  selectedCustomer: null
};

export const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.page = 1; // Reset to page 1 on new searches
    },
    setSort: (state, action: PayloadAction<{ sortBy: keyof Customer; sortOrder: 'asc' | 'desc' }>) => {
      state.sortBy = action.payload.sortBy;
      state.sortOrder = action.payload.sortOrder;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.page = 1;
    },
    setSelectedCustomer: (state, action: PayloadAction<Customer | null>) => {
      state.selectedCustomer = action.payload;
    },
    resetCustomerPageState: () => {
      return initialState;
    }
  }
});

export const {
  setSearchQuery,
  setSort,
  setPage,
  setPageSize,
  setSelectedCustomer,
  resetCustomerPageState
} = customerSlice.actions;

export default customerSlice.reducer;
