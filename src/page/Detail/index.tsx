import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { Button, CssBaseline, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TodoApi from '@/api/todo'
import { ITodoListProps } from '@/types/todo'
import Header from '@/layout/Header'
import headerSlice from '@/store/Slices/Header'
import ToDoPlus from '@/components/ToDoPlus'

const Detail = () => {
  const navigate = useNavigate()
  const detailId = useParams().id
  const dispatch = useDispatch()
  const [detailData, setDetailData] = useState<ITodoListProps>()
  const [todoPlus, setTodoPlus] = useState(false)

  // 데이터 불러오기
  const getDetailData = async () => {
    if (detailId) {
      const response = await TodoApi.getToDoDetail(detailId)
      console.log(response.data.data)
      setDetailData(response.data.data)
    }
  }

  // 삭제하기
  const onClickDelete = useCallback(async () => {
    try {
      if (detailId) {
        await TodoApi.deleteTodo(detailId)
        toast('삭제되었습니다.')
        navigate('/', { replace: true })
      }
    } catch (err) {
      console.log('수정 오류', err)
    }
  }, [])

  useEffect(() => {
    dispatch(headerSlice.actions.setChangeHeaderType('edit'))
    getDetailData()

    return () => {
      dispatch(headerSlice.actions.setChangeHeaderType('plus'))
    }
  }, [])

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 700, height: 700, margin: '100px auto 0', bgcolor: 'background.paper' }}>
        <CssBaseline />
        <Header onClickBtn={() => setTodoPlus(true)} />
        <Grid container justifyContent="space-between" sx={{ marginTop: '20px', paddingBottom: '10px' }}>
          <Typography variant="h5" component="div">
            {detailData?.title}
          </Typography>
          <Button variant="contained" onClick={onClickDelete}>
            삭제
          </Button>
        </Grid>
        <Divider />
        <Typography variant="body2" sx={{ padding: '15px' }}>
          {detailData?.content}
        </Typography>
      </Box>

      {todoPlus && (
        <ToDoPlus
          open={todoPlus}
          onClose={() => {
            setTodoPlus(false)
            getDetailData()
          }}
          editType={detailData}
        />
      )}
    </>
  )
}

export default Detail
