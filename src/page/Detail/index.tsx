import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Button, CssBaseline, Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { ITodoListProps } from '@/types/todo'
import Header from '@/layout/Header'
import headerSlice from '@/store/Slices/Header'
import ToDoPlus from '@/components/ToDoPlus'
import useGetToDoDetail from '@/hook/query/useGetToDoDetail'
import useDeleteTodo from '@/hook/mutation/useDeleteTodo'

const Detail = () => {
  const { id: detailId } = useParams()
  const id = detailId || 'undefined'
  const dispatch = useDispatch()
  const [detailData, setDetailData] = useState<ITodoListProps>()
  const [todoPlus, setTodoPlus] = useState(false)
  const { isLoading, data } = useGetToDoDetail(id)
  const { mutate: deleteDetail } = useDeleteTodo()

  // 삭제하기
  const onClickDelete = useCallback(() => {
    deleteDetail(id)
  }, [])

  useEffect(() => {
    dispatch(headerSlice.actions.setChangeHeaderType('edit'))

    return () => {
      dispatch(headerSlice.actions.setChangeHeaderType('plus'))
    }
  }, [])

  useEffect(() => {
    if (data) setDetailData(data.data.data)
  }, [data])

  if (isLoading) return <div>로딩중...</div>

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
          }}
          editType={detailData}
        />
      )}
    </>
  )
}

export default Detail
