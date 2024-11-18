import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./redux/counterSlice";

import darkmodeSlice from "./redux/darkmodeSlice";
import userReducer from "./redux/userSlice"

import videoReducer from './redux/videoSlice'
export const store=configureStore({
    reducer:{
        counter:counterReducer,
        newSubscribers:userReducer,
        darkmode:darkmodeSlice,
        videos:videoReducer,
    },
})