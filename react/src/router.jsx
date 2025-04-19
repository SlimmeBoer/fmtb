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
import Admin_BBMCodeSettings from "./views/admin/Admin_BBMCodeSettings.jsx";
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
import Admin_GeneralSettings from "./views/admin/Admin_GeneralSettings.jsx";
import Admin_Logs from "./views/admin/Admin_Logs.jsx";
import Admin_Matrix from "./views/admin/Admin_Matrix.jsx";
import Admin_GISData from "./views/admin/Admin_GISData.jsx";
import BeheerderLayout from "./layouts/BeheerderLayout.jsx";
import Beheerder_OverzichtCollectief from "./views/beheerder/Beheerder_OverzichtCollectief.jsx";
import Beheerder_Dashboard from "./views/beheerder/Beheerder_Dashboard.jsx";
import Beheerder_OverzichtIndividueel from "./views/beheerder/Beheerder_OverzichtIndividueel.jsx";
import Beheerder_Matrix from "./views/beheerder/Beheerder_Matrix.jsx";
import Beheerder_KLWImporteren from "./views/beheerder/Beheerder_KLWImporteren.jsx";
import Beheerder_KLWData from "./views/beheerder/Beheerder_KLWData.jsx";
import Beheerder_GISImporteren from "./views/beheerder/Beheerder_GISImporteren.jsx";
import Beheerder_GISData from "./views/beheerder/Beheerder_GISData.jsx";
import Beheerder_BBMKPI from "./views/beheerder/Beheerder_BBMKPI.jsx";
import Beheerder_ScanGISANLb from "./views/beheerder/Beheerder_ScanGISANLb.jsx";
import Beheerder_Criteria from "./views/beheerder/Beheerder_Criteria.jsx";
import Beheerder_OverzichtTotaal from "./views/beheerder/Beheerder_OverzichtTotaal.jsx";
import Provincie_BBMKPI from "./views/provincie/Provincie_BBMKPI.jsx";
import Provincie_ScanGISANLb from "./views/provincie/Provincie_ScanGISANLb.jsx";
import Provincie_Criteria from "./views/provincie/Provincie_Criteria.jsx";
import Provincie_OverzichtTotaal from "./views/provincie/Provincie_OverzichtTotaal.jsx";
import Provincie_OverzichtIndividueel from "./views/provincie/Provincie_OverzichtIndividueel.jsx";
import ForgotPassword from "./views/guest/ForgotPassword.jsx";
import ResetPassword from "./views/guest/ResetPassword.jsx";
import Admin_RawData from "./views/admin/Admin_RawData.jsx";
import Bedrijf_Dashboard from "./views/bedrijf/Bedrijf_Dashboard.jsx";
import Admin_FAQ from "./views/admin/Admin_FAQ.jsx";
import Beheerder_FAQ from "./views/beheerder/Beheerder_FAQ.jsx";
import Admin_Deelnemerslijst from "./views/admin/Admin_Deelnemerslijst.jsx";
import Beheerder_Deelnemerslijst from "./views/beheerder/Beheerder_Deelnemerslijst.jsx";
import Collectief_Deelnemerslijst from "./views/collectief/Collectief_Deelnemerslijst.jsx";

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
                        path: '/admin/matrix',
                        element: <Admin_Matrix/>
                    },
                    {
                        path: '/admin/matrix/:id',
                        element: <Admin_Matrix/>
                    },
                    {
                        path: '/admin/faq',
                        element: <Admin_FAQ/>
                    },
                    {
                        path: '/admin/klw/importeren',
                        element: <Admin_KLWImporteren/>
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
                        element: <Admin_GISData />
                    },
                    {
                        path: '/admin/rawdata',
                        element: <Admin_RawData />
                    },
                    {
                        path: '/admin/settings/bbmcodes',
                        element: <Admin_BBMCodeSettings/>
                    },
                    {
                        path: '/admin/settings/general',
                        element: <Admin_GeneralSettings/>
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
                        path: '/admin/logs',
                        element: <Admin_Logs/>
                    },
                    {
                        path: '/admin/users',
                        element: <Admin_Users/>
                    },
                    {
                        path: '/admin/deelnemerslijst',
                        element: <Admin_Deelnemerslijst/>
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
                        element: <Bedrijf_Dashboard />,
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
                    {
                        path: '/provincie/dashboard',
                        element: <Provincie_Dashboard/>,
                    },
                    {
                        path: '/provincie/scores/totaal',
                        element: <Provincie_OverzichtTotaal/>,
                    },
                    {
                        path: '/provincie/scores/individueel',
                        element: <Provincie_OverzichtIndividueel/>,
                    },
                    {
                        path: '/provincie/scores/individueel/:id',
                        element: <Provincie_OverzichtIndividueel/>
                    },
                    {
                        path: '/provincie/settings/bbmkpis',
                        element: <Provincie_BBMKPI/>,
                    },
                    {
                        path: '/provincie/settings/scangisanlb',
                        element: <Provincie_ScanGISANLb/>,
                    },
                    {
                        path: '/provincie/settings/criteria',
                        element: <Provincie_Criteria/>,
                    },
                ],
            },
        ],
    },
    {
        element: <ProtectedRoute userRole="programmaleider"/>,
        children: [
            {
                element: <BeheerderLayout/>,
                children: [
                    {
                        path: '/beheerder',
                        element: <Beheerder_Dashboard/>,
                    },
                    {
                        path: '/beheerder/dashboard',
                        element: <Beheerder_Dashboard/>,
                    },
                    {
                        path: '/beheerder/scores/totaal',
                        element: <Beheerder_OverzichtTotaal/>,
                    },
                    {
                        path: '/beheerder/scores/collectief',
                        element: <Beheerder_OverzichtCollectief/>,
                    },
                    {
                        path: '/beheerder/scores/individueel',
                        element: <Beheerder_OverzichtIndividueel/>,
                    },
                    {
                        path: '/beheerder/scores/individueel/:id',
                        element: <Beheerder_OverzichtIndividueel/>
                    },
                    {
                        path: '/beheerder/matrix',
                        element: <Beheerder_Matrix/>,
                    },
                    {
                        path: '/beheerder/faq',
                        element: <Beheerder_FAQ/>
                    },
                    {
                        path: '/beheerder/matrix/:id',
                        element: <Beheerder_Matrix/>
                    },
                    {
                        path: '/beheerder/klw/importeren',
                        element: <Beheerder_KLWImporteren/>,
                    },
                    {
                        path: '/beheerder/klw/data',
                        element: <Beheerder_KLWData/>,
                    },
                    {
                        path: '/beheerder/gis/importeren',
                        element: <Beheerder_GISImporteren/>,
                    },
                    {
                        path: '/beheerder/gis/data',
                        element: <Beheerder_GISData/>,
                    },
                    {
                        path: '/beheerder/settings/bbmkpis',
                        element: <Beheerder_BBMKPI/>,
                    },
                    {
                        path: '/beheerder/settings/scangisanlb',
                        element: <Beheerder_ScanGISANLb/>,
                    },
                    {
                        path: '/beheerder/settings/criteria',
                        element: <Beheerder_Criteria/>,
                    },
                    {
                        path: '/beheerder/deelnemerslijst',
                        element: <Beheerder_Deelnemerslijst/>
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
                        path: '/collectief/scores/individueel/:id',
                        element: <Beheerder_OverzichtIndividueel/>
                    },
                    {
                        path: '/collectief/matrix',
                        element: <Collectief_Matrix/>,
                    },
                    {
                        path: '/collectief/matrix/:id',
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
                    {
                        path: '/collectief/deelnemerslijst',
                        element: <Collectief_Deelnemerslijst/>
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
            {
                path: '/wachtwoord-vergeten',
                element: <ForgotPassword/>
            },
            {
                path: '/reset-wachtwoord',
                element: <ResetPassword/>
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
