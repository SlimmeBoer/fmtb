import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/guest/auth/Login.jsx";
import NotFound from "./views/guest/NotFound.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Dashboard from "./views/admin/overview/Dashboard.jsx";
import KLWImporteren from "./views/admin/klw/KLWImporteren.jsx";
import OverzichtTotaal from "./views/admin/overview/OverzichtTotaal.jsx";
import OverzichtCollectief from "./views/admin/overview/OverzichtCollectief.jsx";
import OverzichtIndividueel from "./views/admin/overview/OverzichtIndividueel.jsx";
import KLWData from "./views/admin/klw/KLWData.jsx";
import GISImporteren from "./views/admin/gis/GISImporteren.jsx";
import GISData from "./views/admin/gis/GISData.jsx";
import BBMCodeSettings from "./views/admin/settings/BBMCodeSettings.jsx";
import ImporteerMBPSMA from "./views/admin/klw/ImporteerMBPSMA.jsx";
import BBMKPISettings from "./views/admin/settings/BBMKPISettings.jsx";
import BBMGISSettings from "./views/admin/settings/BBMGISSettings.jsx";
import BBMANLbSettings from "./views/admin/settings/BBMANLbSettings.jsx";
import Users from "./views/admin/users/Users.jsx";
import ManagementData from "./views/admin/overview/ManagementData.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BedrijfLayout from "./layouts/BedrijfLayout.jsx";
import BedrijfDashboard from "./views/bedrijf/BedrijfDashboard.jsx";
import Unauthorized from "./views/guest/Unauthorized.jsx";
import ProvincieLayout from "./layouts/ProvincieLayout.jsx";
import ProvincieDashboard from "./views/provincie/ProvincieDashboard.jsx";

function CollectiefLayout() {
    return null;
}

const router = createBrowserRouter([
    {

        element: <ProtectedRoute userRole="admin"/>,
        children: [
            {
                element: <AdminLayout/>,
                children: [
                    {
                        path: '/admin/',
                        element: <Navigate to="/admin/dashboard"/>
                    },
                    {
                        path: '/admin/dashboard',
                        element: <Dashboard/>
                    },
                    {
                        path: '/admin/overzicht/totaal',
                        element: <OverzichtTotaal/>
                    },
                    {
                        path: '/admin/overzicht/collectief',
                        element: <OverzichtCollectief/>
                    },
                    {
                        path: '/admin/overzicht/collectief/:id',
                        element: <OverzichtCollectief/>
                    },
                    {
                        path: '/admin/overzicht/individueel',
                        element: <OverzichtIndividueel/>
                    },
                    {
                        path: '/admin/overzicht/managementdata',
                        element: <ManagementData/>
                    },
                    {
                        path: '/admin/overzicht/individueel/:id',
                        element: <OverzichtIndividueel/>
                    },
                    {
                        path: '/admin/klw/importeren',
                        element: <KLWImporteren/>
                    },
                    {
                        path: '/admin/klw/importeermbpsma',
                        element: <ImporteerMBPSMA/>
                    },
                    {
                        path: '/admin/klw/data',
                        element: <KLWData/>
                    },
                    {
                        path: '/admin/gis/importeren',
                        element: <GISImporteren/>
                    },
                    {
                        path: '/admin/gis/data',
                        element: <GISData/>
                    },
                    {
                        path: '/admin/settings/bbmcodes',
                        element: <BBMCodeSettings/>
                    },
                    {
                        path: '/admin/settings/bbmkpis',
                        element: <BBMKPISettings/>
                    },
                    {
                        path: '/admin/settings/scangis',
                        element: <BBMGISSettings/>
                    },
                    {
                        path: '/admin/settings/anlb',
                        element: <BBMANLbSettings/>
                    },
                    {
                        path: '/admin/users',
                        element: <Users/>
                    },
                ]
            },
        ],
    },
    {
        element: <ProtectedRoute userRole="bedrijf"/>,
        children: [
            {
                element: <BedrijfLayout/>,
                children: [
                    {
                        path: '/bedrijf',
                        element: <BedrijfDashboard/>,
                    },
                    // Voeg hier meer user-routes toe
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute userRole="provincie"/>,
        children: [
            {
                element: <ProvincieLayout/>,
                children: [
                    {
                        path: '/provincie',
                        element: <ProvincieDashboard/>,
                    },
                    // Voeg hier meer user-routes toe
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute userRole="collectief"/>,
        children: [
            {
                element: <CollectiefLayout/>,
                children: [
                    {
                        path: '/collectief',
                        element: <ProvincieDashboard/>,
                    },
                    // Voeg hier meer user-routes toe
                ],
            },
        ],
    },
    {
        element: <GuestLayout/>,
        children: [
            {
                path: '/',
                element: <Login/>
            },
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
    {
        path: '/unauthorized',
        element: <Unauthorized/>,
    },


]);

export default router;
