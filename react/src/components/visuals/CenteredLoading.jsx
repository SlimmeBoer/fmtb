import React from "react";
import { CircularProgress, Box } from "@mui/material";

const CenteredLoading = () => {
    return (
        <Box display="flex" justifyContent="center" width="100%" py={2} mt={2}>
            <CircularProgress />
        </Box>
    );
};

export default CenteredLoading;
