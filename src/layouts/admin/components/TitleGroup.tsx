import { Box, Typography } from '@mui/material'
import React from 'react'

interface Props {
    group: string
}

const TitleGroup: React.FC<Props> = ({ group }) => {
    return (
        <Box>
            <Typography noWrap
                component="div"
                sx={{
                    ml: 1,
                    mt: 3,
                    pt: 3,
                    color: '#A2A2A2',
                    borderTop: '1px solid #ddd',
                }}>{group}</Typography>
        </Box>
    )
}

export default TitleGroup
