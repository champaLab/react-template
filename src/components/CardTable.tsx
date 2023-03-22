import { Verified } from '@mui/icons-material'
import { Box, Tooltip, Typography } from '@mui/material'
import React from 'react'

interface Props {

}

const CardTable: React.FC<Props> = () => {
    return (
        <Box>
            <Box sx={{
                boxShadow: 10,
                p: 2,
                borderRadius: 2,
                position: "relative",
            }}>
                <Tooltip title="ໂຕະນີ້ຖືກຈອງແລ້ວ">
                    <Box sx={{
                        position: 'absolute',
                        right: 7,
                        top: 7,
                        color: "red",
                    }}>
                        <Verified />
                    </Box>
                </Tooltip>
                <Typography align='center' color="primary" variant='h1'>01</Typography>
                <Typography align='center' color="gray" variant='body1'>001</Typography>
            </Box>
        </Box>
    )
}

export default CardTable
