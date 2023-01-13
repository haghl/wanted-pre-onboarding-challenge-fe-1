import * as yup from 'yup'

const loginVali = {
  email: yup.string().email('이메일 형식을 확인해주세요.').required('이메일을 입력해주세요.'),
  password: yup.string().min(8, '비밀번호를 최소 8자 이상 입력해주세요.').required('비밀번호를 입력해주세요.'),
}

export const loginValidationCheck = yup.object(loginVali)

export const signValidationCheck = yup.object({
  ...loginVali,
  passwordCheck: yup
    .string()
    .oneOf([yup.ref('password'), null], '비밀번호가 다릅니다.')
    .required('비밀번호 확인을 입력해주세요.'),
})

export const todoValidationCheck = yup.object({
  title: yup.string().required('제목을 입력해주세요.'),
  contents: yup.string().required('내용을 입력해주세요.'),
})
