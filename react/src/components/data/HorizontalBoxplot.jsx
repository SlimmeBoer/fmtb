import React from 'react';
import Plot from 'react-plotly.js';

const HorizontalBoxPlot = ({ data1, data2, data3 }) => {
    return (
        <Plot
            data={[
                {
                    x: Object.values(data3),
                    name: 'Jaar 2023',
                    type: 'box',
                    boxpoints: 'all',
                    jitter: 0.8,
                    pointpos: 2,
                    orientation: 'h',
                },
                {
                    x: Object.values(data2),
                    name: 'Jaar 2022',
                    type: 'box',
                    boxpoints: 'all',
                    jitter: 0.8,
                    pointpos: 2,
                    orientation: 'h',
                },
                {
                    x: Object.values(data1),
                    name: 'Jaar 2021',
                    type: 'box',
                    boxpoints: 'all',
                    jitter: 0.8,
                    pointpos: 2,
                    orientation: 'h',
                },
            ]}
            layout={{
                autosize: true,
                width: 500,
                height: 400,
                paper_bgcolor: 'rgba(0,0,0,0)',
                plot_bgcolor: 'rgba(0,0,0,0)',
            }}
        />
    );
};

export default HorizontalBoxPlot;
