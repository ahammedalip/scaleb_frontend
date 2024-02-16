import { configureStore } from '@reduxjs/toolkit'

import slice from './Retailer/slice'

const store = configureStore({
    reducer:{
        retailer: slice
    }
})


export default store;