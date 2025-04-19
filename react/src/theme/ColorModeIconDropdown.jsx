import * as React from 'react';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightModeOutlined';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {useColorScheme} from '@mui/material/styles';
import {useTranslation} from "react-i18next";
import {Tooltip} from "@mui/material";

export default function ColorModeIconDropdown() {
    const {mode, systemMode, setMode} = useColorScheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const {t} = useTranslation();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMode = (targetMode) => () => {
        setMode(targetMode);
        handleClose();
    };
    if (!mode) {
        return (
            <Box
                data-screenshot="toggle-mode"
                sx={(theme) => ({
                    verticalAlign: 'bottom',
                    display: 'inline-flex',
                    width: '2.25rem',
                    height: '2.25rem',
                    borderRadius: (theme.vars || theme).shape.borderRadius,
                    border: '1px solid',
                    borderColor: (theme.vars || theme).palette.divider,
                })}
            />
        );
    }
    const resolvedMode = systemMode || mode;
    const icon = {
        light: <LightModeIcon/>,
        dark: <DarkModeIcon/>,
    }[resolvedMode];
    return (
        <React.Fragment>
            <Tooltip title={t("tooltips.light_mode")}>
                <IconButton
                    data-screenshot="toggle-mode"
                    onClick={handleClick}
                    disableRipple
                    size="small"
                    aria-controls={open ? 'color-scheme-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {icon}
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        variant: 'outlined',
                        sx: {
                            my: '4px',
                        },
                    },
                }}
                transformOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
            >
                <MenuItem selected={mode === 'system'} onClick={handleMode('system')}>
                    {t("color_mode.system")}
                </MenuItem>
                <MenuItem selected={mode === 'light'} onClick={handleMode('light')}>
                    {t("color_mode.light")}
                </MenuItem>
                <MenuItem selected={mode === 'dark'} onClick={handleMode('dark')}>
                    {t("color_mode.dark")}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}
