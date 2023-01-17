import { useCallback, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '@/store/store'

interface IHeaderProps {
  onClickBtn: () => void
}

const Header = ({ onClickBtn }: IHeaderProps) => {
  const navigate = useNavigate()
  const headerType = useSelector((state: RootState) => state.headerSlice.headerType)

  // 로그 아웃
  const onClickLogOut = useCallback(() => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }, [])

  useEffect(() => {
    console.log(headerType)
  }, [headerType])

  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          원동규의 TODO
        </Typography>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" onClick={onClickBtn}>
            생성
          </Button>

          <Button color="inherit" onClick={onClickLogOut}>
            LogOut
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header
