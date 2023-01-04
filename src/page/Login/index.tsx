import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Avatar, Box, Button, createTheme, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { Container, ThemeProvider } from '@mui/system'
import { postLogin, UserProp } from '@/api'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const theme = createTheme()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPw, setUserPw] = useState('')
  const [errTxt, setErrTxt] = useState({
    email: false,
    pw: false,
  })

  // 이메일 입력
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const REG_EMAIL = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/

    setUserEmail(e.target.value)
    if (!REG_EMAIL.test(e.target.value) && e.target.value !== '') {
      setErrTxt((state) => ({ ...state, email: true }))
    } else {
      setErrTxt((state) => ({ ...state, email: false }))
    }
  }, [])

  // 비밀번호 입력
  const onChangePw = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const REG_PW = /^[a-zA-Z0-9!#@]{8,}$/

    setUserPw(e.target.value)
    if (!REG_PW.test(e.target.value) && e.target.value !== '') {
      setErrTxt((state) => ({ ...state, pw: true }))
    } else {
      setErrTxt((state) => ({ ...state, pw: false }))
    }
  }, [])

  // 로그인
  const onSubmitLogin = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      const obj: UserProp = { email: userEmail, password: userPw }
      e.preventDefault()
      if (userEmail !== '' && userPw !== '') {
        if (userEmail === '' || errTxt.email) {
          setErrTxt((state) => ({ ...state, email: true }))
          return
        }
        if (userPw === '' || errTxt.pw) {
          setErrTxt((state) => ({ ...state, pw: true }))
          return
        }

        try {
          const res = await postLogin(obj)
          console.log('로그인 성공', res.data)
          localStorage.setItem('accessToken', res.data.token)

          navigate('/')
        } catch (err) {
          console.log('로그인 오류', err)
        }
      }
    },
    [userEmail, userPw, errTxt]
  )

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            로그인
          </Typography>
          <Box component="form" onSubmit={onSubmitLogin} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={errTxt.email}
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoFocus
              autoComplete="off"
              value={userEmail}
              onChange={onChangeEmail}
              helperText={errTxt.email && '이메일을 확인해주세요.'}
            />
            <TextField
              margin="normal"
              error={errTxt.pw}
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="off"
              value={userPw}
              onChange={onChangePw}
              helperText={errTxt.pw && '비밀번호를 확인해주세요.'}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              로그인
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  회원가입
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default Login
