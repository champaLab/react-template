import { Typography } from '@mui/material'
import React from 'react'

interface Props {
    group: string
}

const TitleGroup: React.FC<Props> = ({ group }) => {
    return (
        <Typography noWrap
            component="div"
            sx={{
                ml: 1,
                mt: 3,
                pt: 1,
                color: '#A2A2A2',
                borderTop: '1px solid #ddd',
            }}>{group}</Typography>
    )
}

export default TitleGroup
