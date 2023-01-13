import { useCallback } from 'react'
import { Container, ThemeProvider } from '@mui/system'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'
import { Avatar, Box, Button, createTheme, CssBaseline, Grid, Link, TextField, Typography } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import isLogin from '@/utils/isLogin'
import { ILoginProps } from '@/types/user'
import { loginValidationCheck } from '@/utils/validationChek'
import UserApi from '@/api/user'

const Login = () => {
  const theme = createTheme()
  const navigate = useNavigate()

  // 로그인
  const onSubmitLogin = useCallback(async (obj: ILoginProps) => {
    try {
      const res = await UserApi.postLogin(obj)
      console.log('로그인 성공', res.data)
      localStorage.setItem('accessToken', res.data.token)

      navigate('/')
    } catch (err) {
      console.log('로그인 오류', err)
    }
  }, [])

  // formik
  const loginFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginValidationCheck,
    onSubmit: (value) => {
      onSubmitLogin(value)
    },
  })

  if (isLogin) return <Navigate to="/" />

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
          <Box component="form" onSubmit={loginFormik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={loginFormik.touched.email && !!loginFormik.errors.email}
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoFocus
              autoComplete="off"
              value={loginFormik.values.email}
              onChange={loginFormik.handleChange}
              helperText={loginFormik.touched.email && loginFormik.errors.email}
            />
            <TextField
              margin="normal"
              error={loginFormik.touched.password && !!loginFormik.errors.password}
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="off"
              value={loginFormik.values.password}
              onChange={loginFormik.handleChange}
              helperText={loginFormik.touched.password && loginFormik.errors.password}
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
