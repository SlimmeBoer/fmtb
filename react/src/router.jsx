import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/auth/Login.jsx";
import NotFound from "./views/admin/NotFound.jsx";
import UserLayout from "./components/layouts/UserLayout.jsx";
import GuestLayout from "./components/layouts/GuestLayout.jsx";
import Dashboard from "./views/overview/Dashboard.jsx";
import KLWImporteren from "./views/klw/KLWImporteren.jsx";
import OverzichtTotaal from "./views/overview/OverzichtTotaal.jsx";
import OverzichtCollectief from "./views/overview/OverzichtCollectief.jsx";
import OverzichtIndividueel from "./views/overview/OverzichtIndividueel.jsx";
import KLWData from "./views/klw/KLWData.jsx";
import GISImporteren from "./views/gis/GISImporteren.jsx";
import GISData from "./views/gis/GISData.jsx";
import BBMCodeSettings from "./views/settings/BBMCodeSettings.jsx";
import ImporteerMBPSMA from "./views/klw/ImporteerMBPSMA.jsx";
import BBMKPISettings from "./views/settings/BBMKPISettings.jsx";
import BBMGISSettings from "./views/settings/BBMGISSettings.jsx";
import BBMANLbSettings from "./views/settings/BBMANLbSettings.jsx";
import Users from "./views/users/Users.jsx";
import Roles from "./views/users/Roles.jsx";
import ManagementData from "./views/overview/ManagementData.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <UserLayout/>,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard"/>
            },
            {
                path: '/dashboard',
                element: <Dashboard/>
            },
            {
                path: '/overzicht/totaal',
                element: <OverzichtTotaal/>
            },
            {
                path: '/overzicht/collectief',
                element: <OverzichtCollectief/>
            },
            {
                path: '/overzicht/collectief/:id',
                element: <OverzichtCollectief/>
            },
            {
                path: '/overzicht/individueel',
                element: <OverzichtIndividueel />
            },
            {
                path: '/overzicht/managementdata',
                element: <ManagementData/>
            },
            {
                path: '/overzicht/individueel/:id',
                element: <OverzichtIndividueel />
            },
            {
                path: '/klw/importeren',
                element: <KLWImporteren/>
            },
            {
                path: '/klw/importeermbpsma',
                element: <ImporteerMBPSMA/>
            },
            {
                path: '/klw/data',
                element: <KLWData/>
            },
            {
                path: '/gis/importeren',
                element: <GISImporteren/>
            },
            {
                path: '/gis/data',
                element: <GISData/>
            },
            {
                path: '/settings/bbmcodes',
                element: <BBMCodeSettings/>
            },
            {
                path: '/settings/bbmkpis',
                element: <BBMKPISettings/>
            },
            {
                path: '/settings/scangis',
                element: <BBMGISSettings/>
            },
            {
                path: '/settings/anlb',
                element: <BBMANLbSettings/>
            },
            {
                path: '/users',
                element: <Users/>
            },
            {
                path: '/roles',
                element: <Roles/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: '/login',
                element: <Login/>
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>
    },


])

export default router;
