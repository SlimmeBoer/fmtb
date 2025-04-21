// src/components/GisRecordsDialog.jsx
import React from 'react';
import {
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
} from '@mui/material';
import {useTranslation} from "react-i18next";
import PercentageChip from "../visuals/PercentageChip.jsx";
import {showYearMonths} from "../../helpers/YearMonths.js";
const TrendDisplay = ({oldresult, newresult}) => {

        const {t} = useTranslation();

        return (
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{width: '1000px'}}>&nbsp;</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{t("kpi_table.trend_result")} <br />{Number(oldresult.final_year) -2 } - {oldresult.final_year}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{t("kpi_table.trend_points")} <br />{Number(oldresult.final_year) -2 } - {oldresult.final_year}</TableCell>
                        <TableCell sx={{width: '150px'}}>&nbsp;</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{t("kpi_table.trend_result")} <br />{newresult.year1.year} - {newresult.year3.year}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{t("kpi_table.trend_points")} <br />{newresult.year1.year} - {newresult.year3.year}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow >
                        <TableCell sx={{width: '500px'}}>{t("kpis.1a")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi1a)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={2}>{oldresult.score_kpi1}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi1a} refvalue={oldresult.result_kpi1a} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi1a}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={2}>{newresult.score.kpi1b}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.1b")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi1b)}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi1b} refvalue={oldresult.result_kpi1b} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi1b}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell sx={{width: '500px'}}>{t("kpis.2")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi2)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi2}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi2} refvalue={oldresult.result_kpi2} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi2}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi2}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.3")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi3)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi3}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi3} refvalue={oldresult.result_kpi3} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi3}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi3}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.4")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi4)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi4}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi4} refvalue={oldresult.result_kpi4} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi4}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi4}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.5")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi5)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi5}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi5} refvalue={oldresult.result_kpi5} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi5}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi5}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell sx={{width: '500px'}}>{t("kpis.1a")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi6a)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={4}>{oldresult.score_kpi6}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi6a} refvalue={oldresult.result_kpi6a} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi6a}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={4}>{newresult.score.kpi6b}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.6b")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi6b)}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi6b} refvalue={oldresult.result_kpi6b} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi6b}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.6c")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi6c)}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi6c} refvalue={oldresult.result_kpi6c} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi6c}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.6d")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi6d)}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi6d} refvalue={oldresult.result_kpi6d} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi6d}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.7")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi7)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi7}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi7} refvalue={oldresult.result_kpi7} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi7}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi7}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.8")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.result_kpi8}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi8}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.score.kpi8} refvalue={oldresult.score_kpi8} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi8}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi8}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.9")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi9)}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi9}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi9} refvalue={oldresult.result_kpi9} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi9}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi9}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.10")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(oldresult.result_kpi10 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi10}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi10} refvalue={oldresult.result_kpi10} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(newresult.avg.kpi10 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi10}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.11")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(oldresult.result_kpi11 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi11}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi11} refvalue={oldresult.result_kpi11} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(newresult.avg.kpi11 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi11}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.12")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(oldresult.result_kpi12 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi12}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi12} refvalue={oldresult.result_kpi12} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(newresult.avg.kpi12 * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi12}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell sx={{width: '500px'}}>{t("kpis.13a")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(oldresult.result_kpi13a * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={2}>{oldresult.score_kpi13}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi13a} refvalue={oldresult.result_kpi13a} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{parseFloat(newresult.avg.kpi13a * 100).toFixed(1)}%</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center" rowSpan={2}>{newresult.score.kpi13b}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.13b")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{Math.round(oldresult.result_kpi13b)}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi13b} refvalue={oldresult.result_kpi13b} lowerBetter={true} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi13b}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.14")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{showYearMonths(Math.round(oldresult.result_kpi14))}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi14}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.avg.kpi14} refvalue={oldresult.result_kpi14} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{showYearMonths(Math.round(newresult.avg.kpi14))}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi14}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>{t("kpis.15")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.result_kpi15}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.score_kpi15}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.score.kpi15} refvalue={oldresult.score_kpi15} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.avg.kpi15}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.score.kpi15}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>&nbsp;</TableCell>
                        <TableCell sx={{width: '200px'}} align="center">{t("kpi_table.trend_points")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{oldresult.total_score}</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.total.score} refvalue={oldresult.total_score} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px'}} align="center">{t("kpi_table.trend_points")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">{newresult.total.score}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sx={{width: '500px'}}>&nbsp;</TableCell>
                        <TableCell sx={{width: '200px'}} align="center">{t("kpi_table.trend_money")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">€{oldresult.total_money},-</TableCell>
                        <TableCell sx={{width: '150px'}} align="center"><PercentageChip ownvalue={newresult.total.money} refvalue={oldresult.total_money} lowerBetter={false} /></TableCell>
                        <TableCell sx={{width: '200px'}} align="center">{t("kpi_table.trend_money")}</TableCell>
                        <TableCell sx={{width: '200px', border: 1}} align="center">€{newresult.total.money},-</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        )
    }
;

export default TrendDisplay;
