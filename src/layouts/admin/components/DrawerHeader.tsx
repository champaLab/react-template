import { Box, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'

interface Props {

}

const DrawerHeader: React.FC<Props> = () => {
    const { drawer } = useSelector((state: RootState) => ({ ...state }))
    return (
        <>
            {drawer.open ?
                <Box sx={{ mb: '1rem' }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: "1rem", mb: "1rem" }}>
                        <Box sx={{ width: "80px", }}>
                            <img src="/logo.png" alt="Logo" width="100%" />
                        </Box>
                    </Box>
                    <Typography align='center' variant='h6'>3 SAO</Typography>
                </Box>
                :
                <Box sx={{ height: "70px" }}></Box>
            }
        </>
    )
}

export default DrawerHeader
