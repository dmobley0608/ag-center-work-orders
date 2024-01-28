import {configureStore} from '@reduxjs/toolkit'
import { quoteSlice } from './quoteSlice'

export default configureStore({
    reducer:{
       quote:quoteSlice.reducer 
    }
})