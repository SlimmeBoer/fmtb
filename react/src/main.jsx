import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {RouterProvider} from "react-router-dom";
import router from "./router.jsx";
import {ContextProvider} from "./contexts/ContextProvider.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './i18n';
import {library} from '@fortawesome/fontawesome-svg-core'
import {fas} from '@fortawesome/free-solid-svg-icons'
import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "@mui/material/styles";

// This exports the whole icon packs for Brand and Solid.
library.add(fas)

const myTheme = createTheme({

})

ReactDOM.createRoot(document.getElementById('root')).render(
    <ThemeProvider theme={myTheme}>
        <React.StrictMode>
            <ContextProvider>
                <RouterProvider router={router}/>
            </ContextProvider>
        </React.StrictMode>
    </ThemeProvider>,
)
