import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/guest/Login.jsx";
import NotFound from "./views/guest/NotFound.jsx";
import AdminLayout from "./layouts/AdminLayout.jsx";
import GuestLayout from "./layouts/GuestLayout.jsx";
import Admin_Dashboard from "./views/admin/Admin_Dashboard.jsx";
import Admin_KLWImporteren from "./views/admin/Admin_KLWImporteren.jsx";
import Admin_OverzichtCollectief from "./views/admin/Admin_OverzichtCollectief.jsx";
import Admin_OverzichtIndividueel from "./views/admin/Admin_OverzichtIndividueel.jsx";
import Admin_KLWData from "./views/admin/Admin_KLWData.jsx";
import Admin_GISImporteren from "./views/admin/Admin_GISImporteren.jsx";
import GISData from "./views/admin/Admin_GISData.jsx";
import Admin_BBMCodeSettings from "./views/admin/Admin_BBMCodeSettings.jsx";
import Admin_ImporteerMBPSMA from "./views/admin/Admin_ImporteerMBPSMA.jsx";
import Admin_BBMKPISettings from "./views/admin/Admin_BBMKPISettings.jsx";
import Admin_BBMGISSettings from "./views/admin/Admin_BBMGISSettings.jsx";
import Admin_BBMANLbSettings from "./views/admin/Admin_BBMANLbSettings.jsx";
import Admin_Users from "./views/admin/Admin_Users.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import BedrijfLayout from "./layouts/BedrijfLayout.jsx";
import BedrijfDashboard from "./views/bedrijf/Bedrijf_Dashboard.jsx";
import Unauthorized from "./views/guest/Unauthorized.jsx";
import ProvincieLayout from "./layouts/ProvincieLayout.jsx";
import Provincie_Dashboard from "./views/provincie/Provincie_Dashboard.jsx";
import Collectief_Dashboard from "./views/collectief/Collectief_Dashboard.jsx";
import CollectiefLayout from "./layouts/CollectiefLayout.jsx";
import Admin_OverzichtTotaal from "./views/admin/Admin_OverzichtTotaal.jsx";
import Collectief_OverzichtCollectief from "./views/collectief/Collectief_OverzichtCollectief.jsx";
import Collectief_OverzichtIndividueel from "./views/collectief/Collectief_OverzichtIndividueel.jsx";
import Collectief_KLWImporteren from "./views/collectief/Collectief_KLWImporteren.jsx";
import Collectief_GISImporteren from "./views/collectief/Collectief_GISImporteren.jsx";
import Collectief_BBMKPI from "./views/collectief/Collectief_BBMKPI.jsx";
import Collectief_ScanGISANLb from "./views/collectief/Collectief_ScanGISANLb.jsx";
import Collectief_Criteria from "./views/collectief/Collectief_Criteria.jsx";
import Collectief_Matrix from "./views/collectief/Collectief_Matrix.jsx";
import Collectief_GISData from "./views/collectief/Collectief_GISData.jsx";
import Collectief_KLWData from "./views/collectief/Collectief_KLWData.jsx";

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
                        element: <Admin_Dashboard/>
                    },
                    {
                        path: '/admin/overzicht/totaal',
                        element: <Admin_OverzichtTotaal/>
                    },
                    {
                        path: '/admin/overzicht/collectief',
                        element: <Admin_OverzichtCollectief/>
                    },
                    {
                        path: '/admin/overzicht/collectief/:id',
                        element: <Admin_OverzichtCollectief/>
                    },
                    {
                        path: '/admin/overzicht/individueel',
                        element: <Admin_OverzichtIndividueel/>
                    },
                    {
                        path: '/admin/overzicht/individueel/:id',
                        element: <Admin_OverzichtIndividueel/>
                    },
                    {
                        path: '/admin/klw/importeren',
                        element: <Admin_KLWImporteren/>
                    },
                    {
                        path: '/admin/klw/importeermbpsma',
                        element: <Admin_ImporteerMBPSMA/>
                    },
                    {
                        path: '/admin/klw/data',
                        element: <Admin_KLWData/>
                    },
                    {
                        path: '/admin/gis/importeren',
                        element: <Admin_GISImporteren/>
                    },
                    {
                        path: '/admin/gis/data',
                        element: <GISData/>
                    },
                    {
                        path: '/admin/settings/bbmcodes',
                        element: <Admin_BBMCodeSettings/>
                    },
                    {
                        path: '/admin/settings/bbmkpis',
                        element: <Admin_BBMKPISettings/>
                    },
                    {
                        path: '/admin/settings/scangis',
                        element: <Admin_BBMGISSettings/>
                    },
                    {
                        path: '/admin/settings/anlb',
                        element: <Admin_BBMANLbSettings/>
                    },
                    {
                        path: '/admin/users',
                        element: <Admin_Users/>
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
                        element: <Provincie_Dashboard/>,
                    },
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
                        element: <Collectief_Dashboard/>,
                    },
                    {
                        path: '/collectief/dashboard',
                        element: <Collectief_Dashboard/>,
                    },
                    {
                        path: '/collectief/scores/collectief',
                        element: <Collectief_OverzichtCollectief/>,
                    },
                    {
                        path: '/collectief/scores/individueel',
                        element: <Collectief_OverzichtIndividueel/>,
                    },
                    {
                        path: '/collectief/matrix',
                        element: <Collectief_Matrix/>,
                    },
                    {
                        path: '/collectief/klw/importeren',
                        element: <Collectief_KLWImporteren/>,
                    },
                    {
                        path: '/collectief/klw/data',
                        element: <Collectief_KLWData/>,
                    },
                    {
                        path: '/collectief/gis/importeren',
                        element: <Collectief_GISImporteren/>,
                    },
                    {
                        path: '/collectief/gis/data',
                        element: <Collectief_GISData/>,
                    },
                    {
                        path: '/collectief/settings/bbmkpis',
                        element: <Collectief_BBMKPI/>,
                    },
                    {
                        path: '/collectief/settings/scangisanlb',
                        element: <Collectief_ScanGISANLb/>,
                    },
                    {
                        path: '/collectief/settings/criteria',
                        element: <Collectief_Criteria/>,
                    },
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
