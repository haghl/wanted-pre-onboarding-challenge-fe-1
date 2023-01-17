import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListItemButton, Box, Container, CssBaseline, List, ListItem, ListItemText } from '@mui/material'
import ToDoPlus from '@/components/ToDoPlus'
import TodoApi from '@/api/todo'

import { ITodoListProps } from '@/types/todo'
import Header from '@/layout/Header'

const Home = () => {
  const navigate = useNavigate()
  const [todoList, setTodoList] = useState<ITodoListProps[]>([])
  const [todoPlus, setTodoPlus] = useState(false)

  // 데이터 불러오기 함수
  const getList = useCallback(async () => {
    const res = await TodoApi.getToDoList()
    console.log('데이터', res.data.data)
    setTodoList(res.data.data.reverse())
  }, [])

  // 삭제하기
  const onClickDelete = useCallback(async (id: string) => {
    try {
      await TodoApi.deleteTodo(id)
      alert('삭제되었습니다.')
      getList()
    } catch (err) {
      console.log('수정 오류', err)
    }
  }, [])

  // 마운트 시 데이터 불러오기
  useEffect(() => {
    if (!todoPlus) {
      console.log('실행')

      getList()
    }
  }, [todoPlus])

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 700, height: 700, margin: '100px auto 0', bgcolor: 'background.paper' }}>
        <CssBaseline />
        <Header onClickBtn={() => setTodoPlus(true)} />
        <Container component="main" sx={{ mb: 4 }}>
          <Box>
            <List dense sx={{ width: '100%', margin: '5px auto 0', bgcolor: 'background.paper' }}>
              {todoList.length > 0 ? (
                todoList.map((x) => {
                  return (
                    <ListItemButton key={x.id} sx={{ width: '100%', minHeight: 50, borderBottom: '1px solid grey' }} onClick={() => navigate(`/${x.id}`)}>
                      <ListItemText primary={x.title} />
                    </ListItemButton>
                  )
                })
              ) : (
                <ListItem sx={{ width: '100%', height: 50 }}>
                  <ListItemText
                    primary="ToDo List가 없습니다."
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItem>
              )}
            </List>
          </Box>
        </Container>
      </Box>
      {todoPlus && <ToDoPlus open={todoPlus} onClose={() => setTodoPlus(false)} />}
    </>
  )
}

export default Home
