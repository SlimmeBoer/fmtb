import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axiosClient from "../../axios_client.js"; // Updated axios import
import { makeStyles } from '@mui/styles';
import { mean, std, quantileSeq, min, max } from 'mathjs'; // Import mathjs functions
import { CircularProgress, Box } from '@mui/material'; // Import CircularProgress and Box

// Styles
const useStyles = makeStyles({
    root: {
        '& .MuiDataGrid-columnHeaderTitle': {
            overflow: 'visible',
            whiteSpace: 'normal',
            textAlign: 'center',
        },
        '& .MuiDataGrid-columnHeader': {
            minHeight: '100px',  // Increase header height for better visibility
        },
    },
});

const CompanyDataGrid = ({ fields }) => {
    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);
    const [stats, setStats] = useState({});
    const [columnVisibilityModel, setColumnVisibilityModel] = useState({
        row_id: false,
    });
    const [filterModel, setFilterModel] = useState({
        items: [],
    });
    const [loading, setLoading] = useState(true); // Add loading state

    const classes = useStyles();

    useEffect(() => {
        const fieldNames = fields.map(field => field.fieldname);

        // Use axiosClient to fetch data
        axiosClient.get('/companies/fields', { params: { fields: fieldNames } })
            .then(response => {
                const data = response.data;

                // Generate columns dynamically
                const generatedColumns = [
                    {
                        field: 'row_id',
                        headerName: 'Row ID',
                        width: 90,  // Set a width of 90 for mapped fields
                    },
                    {
                        field: 'id',
                        headerName: 'ID',
                        width: 90,
                        filterable: true
                    },
                    {
                        field: 'name',
                        headerName: 'Bedrijf',
                        width: 200,
                        filterable: true
                    },
                    {
                        field: 'year',
                        headerName: 'Jaar',
                        width: 100,
                        filterable: true
                    },
                    ...fields.map(field => ({
                        field: field.fieldname,
                        headerName: field.headerName || field.fieldname.charAt(0).toUpperCase() + field.fieldname.slice(1),
                        width: 90,  // Set width of 90 for all fields
                        filterable: true,
                    }))
                ];

                setColumns(generatedColumns);
                setRows(data);
                calculateStatistics(data, fieldNames); // Calculate stats after fetching data
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            })
            .finally(() => {
                setLoading(false); // Set loading to false when data fetching is done
            });
    }, [fields]);

    // Function to calculate statistics
    const calculateStatistics = (data, fieldNames) => {
        const stats = {
            count: {},
            avg: {},
            stdDev: {},
            percentile25: {},
            percentile75: {},
            min: {},
            max: {}
        };

        fieldNames.forEach(field => {
            // Convert the values to numbers and filter out non-numeric values
            const values = data.map(row => {
                const value = parseFloat(row[field]);
                return !isNaN(value) && value !== 0 ? value : null; // Return null for non-numeric or zero values
            }).filter(value => value !== null); // Filter out null values

            if (values.length > 0) {
                stats.count[field] = values.length;
                stats.avg[field] = mean(values);
                stats.stdDev[field] = std(values);
                stats.percentile25[field] = quantileSeq(values, 0.25);
                stats.percentile75[field] = quantileSeq(values, 0.75);
                stats.min[field] = min(values);
                stats.max[field] = max(values);
            } else {
                // If no valid values, set stats to zero or appropriate default
                stats.count[field] = 0;
                stats.avg[field] = 0;
                stats.stdDev[field] = 0;
                stats.percentile25[field] = 0;
                stats.percentile75[field] = 0;
                stats.min[field] = 0;
                stats.max[field] = 0;
            }
        });

        setStats(stats);
    };

    // Prepare the stats rows for the statistics DataGrid only if stats are ready
    const statsRows = stats.count ? [
        { id: 'count', statistic: 'Aantal', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.count[field.fieldname] || 0])) },
        { id: 'avg', statistic: 'Gemiddelde', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.avg[field.fieldname] ? stats.avg[field.fieldname].toFixed(2) : 'N/A'])) },
        { id: 'stdDev', statistic: 'Standaarddeviatie', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.stdDev[field.fieldname] ? stats.stdDev[field.fieldname].toFixed(2) : 'N/A'])) },
        { id: 'percentile25', statistic: '25% Percentiel', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.percentile25[field.fieldname] ? stats.percentile25[field.fieldname].toFixed(2) : 'N/A'])) },
        { id: 'percentile75', statistic: '75% Percentiel', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.percentile75[field.fieldname] ? stats.percentile75[field.fieldname].toFixed(2) : 'N/A'])) },
        { id: 'min', statistic: 'Minimum', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.min[field.fieldname] ? stats.min[field.fieldname].toFixed(2) : 'N/A'])) },
        { id: 'max', statistic: 'Maximum', ...Object.fromEntries(fields.map(field => [field.fieldname, stats.max[field.fieldname] ? stats.max[field.fieldname].toFixed(2) : 'N/A'])) }
    ] : []; // Return an empty array if stats are not ready

    // Define columns for the statistics DataGrid
    const statsColumns = [
        { field: 'statistic', headerName: 'Statistic', width: 400 },
        ...fields.map(field => ({
            field: field.fieldname,
            headerName: field.headerName || field.fieldname.charAt(0).toUpperCase() + field.fieldname.slice(1),
            width: 90,  // Set width of 90 for all fields
        }))
    ];

    return (
        <div>
            {loading ? ( // Show CircularProgress when loading is true
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {/* Statistics DataGrid */}
                    <div style={{ marginBottom: '20px', height: 'auto' }}>
                        <DataGrid
                            rows={statsRows}
                            columns={statsColumns}
                            pageSize={10}
                            slots={{
                                columnHeaders: () => null,
                            }}
                            density="compact" // Set density to compact
                            disableSelectionOnClick
                            autoHeight // Make the height auto to fit content
                            hideFooter // Remove the footer, including column headers
                        />
                    </div>

                    {/* DataGrid */}
                    <div style={{ height: 900, width: '100%' }} className={classes.root}>
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[10, 20, 50]}
                            disableSelectionOnClick
                            density="compact" // Set density to compact
                            getRowId={(row) => row.row_id}
                            columnVisibilityModel={columnVisibilityModel}
                            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
                            filterModel={filterModel}
                            onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                        />
                    </div>
                </>
            )}
        </div>
    );
};

export default CompanyDataGrid;
