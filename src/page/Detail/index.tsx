import { CssBaseline, Typography } from '@mui/material'
import { Box } from '@mui/system'

const Detail = () => {
  return (
    <Box sx={{ width: '100%', maxWidth: 700, height: 700, margin: '100px auto 0', bgcolor: 'background.paper' }}>
      <CssBaseline />
      <Typography variant="h5" component="div">
        상세
      </Typography>
      <Typography variant="body2">내용</Typography>
    </Box>
  )
}

export default Detail
