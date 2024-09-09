import * as React from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
import {useTranslation} from "react-i18next";


export default function BasicTable() {

    const {t} = useTranslation();

    return (
        <TableContainer sx={{p: 5}}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>{t('overzicht.kpi')}</StyledTableCell>
                        <StyledTableCell align="right">{t('overzicht.year1')}</StyledTableCell>
                        <StyledTableCell align="right">{t('overzicht.year2')}</StyledTableCell>
                        <StyledTableCell align="right">{t('overzicht.year3')}</StyledTableCell>
                        <StyledTableCell align="right">{t('overzicht.mean')} </StyledTableCell>
                        <StyledTableCell align="right">{t('overzicht.score')}</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi1')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">130</StyledTableCell>
                        <StyledTableCell align="right">114</StyledTableCell>
                        <StyledTableCell align="right">92.7</StyledTableCell>
                        <StyledTableCell align="right">100</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi2')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">-25</StyledTableCell>
                        <StyledTableCell align="right">16</StyledTableCell>
                        <StyledTableCell align="right">-1</StyledTableCell>
                        <StyledTableCell align="right">150</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi3')}
                        </StyledTableCell>
                        <StyledTableCell align="right">51</StyledTableCell>
                        <StyledTableCell align="right">45</StyledTableCell>
                        <StyledTableCell align="right">41</StyledTableCell>
                        <StyledTableCell align="right">45,7</StyledTableCell>
                        <StyledTableCell align="right">300</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi4')}
                        </StyledTableCell>
                        <StyledTableCell align="right">1776</StyledTableCell>
                        <StyledTableCell align="right">1440</StyledTableCell>
                        <StyledTableCell align="right">1629</StyledTableCell>
                        <StyledTableCell align="right">1615</StyledTableCell>
                        <StyledTableCell align="right">0</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi5')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">130</StyledTableCell>
                        <StyledTableCell align="right">114</StyledTableCell>
                        <StyledTableCell align="right">92.7</StyledTableCell>
                        <StyledTableCell align="right">100</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi6')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">-25</StyledTableCell>
                        <StyledTableCell align="right">16</StyledTableCell>
                        <StyledTableCell align="right">-1</StyledTableCell>
                        <StyledTableCell align="right">150</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi7')}
                        </StyledTableCell>
                        <StyledTableCell align="right">51</StyledTableCell>
                        <StyledTableCell align="right">45</StyledTableCell>
                        <StyledTableCell align="right">41</StyledTableCell>
                        <StyledTableCell align="right">45,7</StyledTableCell>
                        <StyledTableCell align="right">300</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi8')}
                        </StyledTableCell>
                        <StyledTableCell align="right">1776</StyledTableCell>
                        <StyledTableCell align="right">1440</StyledTableCell>
                        <StyledTableCell align="right">1629</StyledTableCell>
                        <StyledTableCell align="right">1615</StyledTableCell>
                        <StyledTableCell align="right">0</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi9')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">130</StyledTableCell>
                        <StyledTableCell align="right">114</StyledTableCell>
                        <StyledTableCell align="right">92.7</StyledTableCell>
                        <StyledTableCell align="right">100</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi10')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">-25</StyledTableCell>
                        <StyledTableCell align="right">16</StyledTableCell>
                        <StyledTableCell align="right">-1</StyledTableCell>
                        <StyledTableCell align="right">150</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi11')}
                        </StyledTableCell>
                        <StyledTableCell align="right">51</StyledTableCell>
                        <StyledTableCell align="right">45</StyledTableCell>
                        <StyledTableCell align="right">41</StyledTableCell>
                        <StyledTableCell align="right">45,7</StyledTableCell>
                        <StyledTableCell align="right">300</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi12')}
                        </StyledTableCell>
                        <StyledTableCell align="right">1776</StyledTableCell>
                        <StyledTableCell align="right">1440</StyledTableCell>
                        <StyledTableCell align="right">1629</StyledTableCell>
                        <StyledTableCell align="right">1615</StyledTableCell>
                        <StyledTableCell align="right">0</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi13')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">130</StyledTableCell>
                        <StyledTableCell align="right">114</StyledTableCell>
                        <StyledTableCell align="right">92.7</StyledTableCell>
                        <StyledTableCell align="right">100</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi14')}
                        </StyledTableCell>
                        <StyledTableCell align="right">34</StyledTableCell>
                        <StyledTableCell align="right">-25</StyledTableCell>
                        <StyledTableCell align="right">16</StyledTableCell>
                        <StyledTableCell align="right">-1</StyledTableCell>
                        <StyledTableCell align="right">150</StyledTableCell>
                    </StyledTableRow>
                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.kpi15')}
                        </StyledTableCell>
                        <StyledTableCell align="right">51</StyledTableCell>
                        <StyledTableCell align="right">45</StyledTableCell>
                        <StyledTableCell align="right">41</StyledTableCell>
                        <StyledTableCell align="right">45,7</StyledTableCell>
                        <StyledTableCell align="right">300</StyledTableCell>
                    </StyledTableRow>

                    <StyledTableRow>
                        <StyledTableCell component="th" scope="row">
                            {t('overzicht.totaal')}
                        </StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right"></StyledTableCell>
                        <StyledTableCell align="right">2500</StyledTableCell>
                    </StyledTableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
        ;
}
