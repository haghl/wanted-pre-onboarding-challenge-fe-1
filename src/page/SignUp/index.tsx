import { useCallback } from 'react'
import { useFormik } from 'formik'
import { Navigate, useNavigate } from 'react-router-dom'

import { Container, ThemeProvider } from '@mui/system'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { Avatar, Box, Button, createTheme, CssBaseline, TextField, Typography } from '@mui/material'
import { toast } from 'react-toastify'

import UserApi from '@/api/user'
import isLogin from '@/utils/isLogin'
import { signUpValidationCheck } from '@/utils/validationChek'
import { ILoginProps } from '@/types/user'

const SignUp = () => {
  const theme = createTheme()
  const navigate = useNavigate()

  // 회원가입
  const onSubmitSignUp = useCallback(async (obj: ILoginProps) => {
    try {
      await UserApi.postSignUp(obj)
      toast('회원가입 성공')
      navigate('/login')
    } catch (err) {
      console.log('회원가입 오류', err)
      toast(`회원가입 오류 ${err}`)
    }
  }, [])

  // formik
  const signUpFormik = useFormik({
    initialValues: {
      email: '',
      password: '',
      passwordCheck: '',
    },
    validationSchema: signUpValidationCheck,
    onSubmit: (value) => {
      const params = { email: value.email, password: value.passwordCheck }
      onSubmitSignUp(params)
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
            <AssignmentIndIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            회원가입
          </Typography>
          <Box component="form" onSubmit={signUpFormik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              error={signUpFormik.touched.email && !!signUpFormik.errors.email}
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoFocus
              autoComplete="off"
              value={signUpFormik.values.email}
              onChange={signUpFormik.handleChange}
              helperText={signUpFormik.touched.email && signUpFormik.errors.email}
            />
            <TextField
              margin="normal"
              error={signUpFormik.touched.password && !!signUpFormik.errors.password}
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="off"
              value={signUpFormik.values.password}
              onChange={signUpFormik.handleChange}
              helperText={signUpFormik.touched.password && signUpFormik.errors.password}
            />
            <TextField
              margin="normal"
              error={signUpFormik.touched.passwordCheck && !!signUpFormik.errors.passwordCheck}
              required
              fullWidth
              name="passwordCheck"
              label="비밀번호 확인"
              type="password"
              id="passwordCheck"
              autoComplete="off"
              value={signUpFormik.values.passwordCheck}
              onChange={signUpFormik.handleChange}
              helperText={signUpFormik.touched.passwordCheck && signUpFormik.errors.passwordCheck}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              회원가입
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}

export default SignUp
