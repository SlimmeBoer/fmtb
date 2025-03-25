import * as React from 'react';
import PropTypes from 'prop-types';
import {styled, useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {PieChart} from "@mui/x-charts/PieChart";
import {useDrawingArea} from "@mui/x-charts/hooks";
import Card from "@mui/material/Card";

const StyledText = styled('text', {
    shouldForwardProp: (prop) => prop !== 'variant',
})(({theme}) => ({
    textAnchor: 'middle',
    dominantBaseline: 'central',
    fill: (theme.vars || theme).palette.text.secondary,
    variants: [
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontSize: theme.typography.h5.fontSize,
            },
        },
        {
            props: ({variant}) => variant !== 'primary',
            style: {
                fontSize: theme.typography.body2.fontSize,
            },
        },
        {
            props: {
                variant: 'primary',
            },
            style: {
                fontWeight: theme.typography.h5.fontWeight,
            },
        },
        {
            props: ({variant}) => variant !== 'primary',
            style: {
                fontWeight: theme.typography.body2.fontWeight,
            },
        },
    ],
}));

function PieCenterLabel({primaryText, secondaryText}) {
    const {width, height, left, top} = useDrawingArea();
    const primaryY = top + height / 2 - 10;
    const secondaryY = primaryY + 24;

    return (
        <React.Fragment>
            <StyledText variant="primary" x={left + width / 2} y={primaryY}>
                {primaryText}
            </StyledText>
            <StyledText variant="secondary" x={left + width / 2} y={secondaryY}>
                 / {secondaryText}
            </StyledText>
        </React.Fragment>
    );
}

PieCenterLabel.propTypes = {
    primaryText: PropTypes.string.isRequired,
    secondaryText: PropTypes.string.isRequired,
};

function CompletionGauge({main_label, total, total_label, complete, complete_label}) {

    const colors = [
        '#006900',
        '#dddddd'
    ];

    const data = [
        {label: complete_label, value: complete},
        {label: total_label, value: total - complete},
    ];
    return (
        <Card variant="outlined">
                <PieChart
                    colors={colors}
                    margin={{
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                    }}
                    series={[
                        {
                            data,
                            innerRadius: 50,
                            outerRadius: 80,
                            paddingAngle: 0,
                            highlightScope: {faded: 'global', highlighted: 'item'},
                        },
                    ]}
                    height={200}
                    width={200}
                    slotProps={{
                        legend: {hidden: true},
                    }}
                >
                    <PieCenterLabel primaryText={complete} secondaryText={total}/>
                </PieChart>
            <Box sx={{mt:0, ml: 6 }}>
                <Typography variant="h6">
                    {main_label}
                </Typography>
                <Typography sx={{mt: 2}} variant="body2">
                    {complete_label}: <strong>{complete}</strong><br/>
                    {total_label}: <strong>{total}</strong>
                </Typography>
            </Box>
        </Card>
    );
}

CompletionGauge.propTypes = {
    year: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    complete: PropTypes.number.isRequired,
};

export default CompletionGauge;
