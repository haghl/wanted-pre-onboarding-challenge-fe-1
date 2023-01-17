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
    navigate('/login', { replace: true })
  }, [])

  useEffect(() => {
    console.log(headerType)
  }, [headerType])

  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Box component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
          <Typography variant="h6" sx={{ width: 'fit-content', cursor: 'pointer' }} onClick={() => navigate('/')}>
            원동규의 TODO
          </Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Button color="inherit" onClick={onClickBtn}>
            {headerType === 'plus' ? '생성' : '수정'}
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
