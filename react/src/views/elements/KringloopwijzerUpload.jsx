// Import necessary dependencies
import React, {useState} from 'react';
import {Button, Container, Grid, InputLabel, Typography, TextField, Avatar, OutlinedInput} from '@mui/material';
import {CheckCircleOutline as SuccessIcon, ErrorOutline as FailureIcon} from '@mui/icons-material';

export default function KringloopwijzerUpload(props) {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(null);
    const [uploadMessage, setUploadMessage] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Handle file upload logic here
        if (!selectedFile) {
            // Add your file upload logic here
            setUploadStatus('failure');
            setUploadMessage('Geen bestand geselecteerd');
        } else {
            setUploadStatus('success');
            setUploadMessage('Bestand geselecteerd');
        }
    };

    return (
        <Grid container spacing={2} alignItems="left">
            <Grid item xs={4}>
                <InputLabel htmlFor="fileInput">Upload bestand van {props.year}:</InputLabel>
            </Grid>
            <Grid item xs={4}>
                <OutlinedInput
                    type="file"
                    id="fileInput"
                    onChange={handleFileChange}
                    fullWidth
                    inputProps={{
                        style: {padding: '10px'},
                        accept: '.xml' // Specify accepted file types
                    }}
                    notched={false}
                />
            </Grid>
            <Grid item xs={4}>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleUpload}
                    fullWidth
                >
                    Upload
                </Button>
            </Grid>
            <Grid item xs={12} sx={{pb: 3}}>
                {uploadStatus === 'success' && (
                    <Typography
                        variant="subtitle1"
                        sx={{
                            color: 'green',
                            padding: '8px',
                            borderRadius: '4px',
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar sx={{backgroundColor: 'white', color: 'green', marginRight: '8px'}}>
                            <SuccessIcon/>
                        </Avatar>
                        {uploadMessage}
                    </Typography>
                )}
                {uploadStatus === 'failure' && (
                    <Typography
                        variant="subtitle1"
                        sx={{color: 'red', padding: '8px', borderRadius: '4px', display: 'flex', alignItems: 'center'}}
                    >
                        <Avatar sx={{backgroundColor: 'white', color: 'red', marginRight: '8px'}}>
                            <FailureIcon/>
                        </Avatar>
                        {uploadMessage}
                    </Typography>
                )}
            </Grid>
        </Grid>

    );
};
