
import { configureStore } from "@reduxjs/toolkit";
import rootRuducer from "./rootReducers";


const store = configureStore({
    reducer: rootRuducer,
    middleware: getDefaultMiddleware => {
        return getDefaultMiddleware({
            serializableCheck: false
        })
    },
    devTools: true

})


export default store;

