import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { RootState } from '../../../store'
import { customTheme } from '../../../utils/theme'


type Route = {
    path: string
    name: string
    icon: any
    element?: any
}
type Props = {
    item: Route
}

const MenuSidebar = ({ item }: Props) => {
    const { drawer } = useSelector((state: RootState) => ({ ...state }))
    const path = useLocation()
    const pathname = path.pathname.split('-')[0]

    const active = {
        minHeight: 48,
        justifyContent: drawer.open ? "initial" : "center",
        px: 2.5,
        color: customTheme.palette.primary.main,
        backgroundColor: "#E8E8E8",
        "&:hover": {
            backgroundColor: "#E8E8E8",
        },
    };

    const unActive = {
        minHeight: 48,
        justifyContent: drawer.open ? "initial" : "center",
        px: 2.5,
        color: "#A0A0A0",
        "&:hover": {
            backgroundColor: "#E8E8E8",
        },
    };

    return (
        <Link to={item.path} >
            <ListItem disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                    sx={pathname === item.path ? active : unActive}
                >
                    <ListItemIcon
                        sx={{
                            minWidth: 0,
                            mr: drawer.open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}
                    >
                        {<item.icon sx={pathname === item.path ? { color: customTheme.palette.primary.main } : { color: "#A0A0A0" }} />}
                    </ListItemIcon>
                    <ListItemText primary={item.name} sx={{ opacity: drawer.open ? 1 : 0 }} />
                </ListItemButton>
            </ListItem>
        </Link>
    )
}

export default MenuSidebar