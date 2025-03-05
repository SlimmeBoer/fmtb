import * as React from 'react';
import Typography from '@mui/material/Typography';
import {useTranslation} from "react-i18next";

export default function Copyright() {

    const { t } = useTranslation();

    return (
        <React.Fragment>
            <Typography sx={{pt: 10}} variant="body2" color="text.secondary" align="center">
                {'© '}
                {new Date().getFullYear()}
                {t('about.copyright')}
            </Typography>
        </React.Fragment>
    );
}
