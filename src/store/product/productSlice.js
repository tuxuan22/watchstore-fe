import { createSlice } from '@reduxjs/toolkit'
import { getNewProducts } from './asyncActions'

export const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: null,
        errorMessage: '',

    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getNewProducts.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true
        })

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(getNewProducts.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin product vào store
            state.isLoading = false
            state.products = action.payload
        })

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(getNewProducts.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false
            state.errorMessage = action.payload.message
        })
    },
})

export const { } = productSlice.actions
export default productSlice.reducer    