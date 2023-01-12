import { ChangeEvent, FormEvent, useCallback, useState } from 'react'
import { Avatar, Box, Button, createTheme, CssBaseline, TextField, Typography } from '@mui/material'
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd'
import { Container, ThemeProvider } from '@mui/system'
import { Navigate, useNavigate } from 'react-router-dom'
import { postSignUp, type UserProp } from '@/api'
import isLogin from '@/utils/isLogin'

const SignUp = () => {
  const theme = createTheme()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPw, setUserPw] = useState('')
  const [userPwChk, setUserPwChk] = useState('')
  const [errTxt, setErrTxt] = useState({
    email: false,
    pw: false,
    pwChk: false,
  })

  // 이메일 입력
  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const REG_EMAIL = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i

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

  // 비밀번호 확인 입력
  const onChangePwChk = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUserPwChk(e.target.value)
      if (userPw !== e.target.value) {
        setErrTxt((state) => ({ ...state, pwChk: true }))
      } else {
        setErrTxt((state) => ({ ...state, pwChk: false }))
      }
    },
    [userPw]
  )

  // 회원가입
  const onSubmitSignUp = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      const obj: UserProp = { email: userEmail, password: userPwChk }
      e.preventDefault()
      if (userEmail !== '' && userPw !== '' && userPwChk !== '') {
        if (userEmail === '' || errTxt.email) {
          setErrTxt((state) => ({ ...state, email: true }))
          return
        }
        if (userPw === '' || errTxt.pw) {
          setErrTxt((state) => ({ ...state, pw: true }))
          return
        }
        if (userPwChk === '' || errTxt.pwChk) {
          setErrTxt((state) => ({ ...state, pwChk: true }))
          return
        }

        try {
          await postSignUp(obj)
          navigate('/login')
        } catch (err) {
          console.log('회원가입 오류', err)
        }
      }
    },
    [userEmail, userPw, userPwChk, errTxt]
  )

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
          <Box component="form" onSubmit={onSubmitSignUp} noValidate sx={{ mt: 1 }}>
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
            <TextField
              margin="normal"
              error={errTxt.pwChk}
              required
              fullWidth
              name="passwordChk"
              label="비밀번호 확인"
              type="password"
              id="passwordChk"
              autoComplete="off"
              value={userPwChk}
              onChange={onChangePwChk}
              helperText={errTxt.pwChk && '비밀번호가 다릅니다.'}
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
