import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { CssBaseline, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import TodoApi from '@/api/todo'
import { ITodoListProps } from '@/types/todo'
import Header from '@/layout/Header'
import headerSlice from '@/store/Slices/Header'

const Detail = () => {
  const detailId = useParams().id
  const dispatch = useDispatch()
  const [detailData, setDetailData] = useState<ITodoListProps>()

  useEffect(() => {
    const getDetailData = async () => {
      if (detailId) {
        const response = await TodoApi.getToDoDetail(detailId)
        console.log(response.data.data)
        setDetailData(response.data.data)
      }
    }
    dispatch(headerSlice.actions.setChangeHeaderType('edit'))
    getDetailData()

    return () => {
      dispatch(headerSlice.actions.setChangeHeaderType('plus'))
    }
  }, [])

  return (
    <Box sx={{ width: '100%', maxWidth: 700, height: 700, margin: '100px auto 0', bgcolor: 'background.paper' }}>
      <CssBaseline />
      <Header onClickBtn={() => console.log('hi')} />
      <Typography variant="h5" component="div" sx={{ marginTop: '20px', paddingBottom: '10px' }}>
        {detailData?.title}
      </Typography>
      <Divider />
      <Typography variant="body2" sx={{ padding: '15px' }}>
        {detailData?.content}
      </Typography>
    </Box>
  )
}

export default Detail
