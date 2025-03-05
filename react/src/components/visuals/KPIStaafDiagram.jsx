import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

export default function KPIStaafDiagram(props) {

    return (
        <BarChart
            borderRadius={8}
            xAxis={[{ scaleType: 'band', data: Object.keys(props.data),
                colorMap: {
                    type: 'piecewise',
                    thresholds: [50,100,150,200],
                    colors: ['#cce7c9', '#8bca84 ', '#5bb450', '#46923c', '#276221'],
                }}]}
            series={[{ data: Object.values(props.data) }]}
            width={500}
            height={400}
            barLabel="value"
        />
    );
}
