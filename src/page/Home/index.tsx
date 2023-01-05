import { useCallback, useEffect, useState } from 'react'
import { getToDoList } from '@/api'
import { AppBar, Box, Button, Container, CssBaseline, List, ListItem, ListItemText, Toolbar, Typography } from '@mui/material'
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import ToDoPlus from '@/components/ToDoPlus'

type TodoListProp = { title: string; content: string; id: string; createdAt: string; updatedAt: string }

const Home = () => {
  const navigate = useNavigate()
  const [todoList, setTodoList] = useState<TodoListProp[]>([])
  const [todoPlus, setTodoPlus] = useState(false)

  // 데이터 불러오기 함수
  const getList = useCallback(async () => {
    try {
      const res = await getToDoList()
      console.log('데이터', res.data.data)
    } catch (err) {
      console.log('목록 불러오기 실패', err)
    }
  }, [])

  // 마운트 시 데이터 불러오기
  useEffect(() => {
    getList()
  }, [])

  return (
    <>
      <Box sx={{ width: '100%', maxWidth: 700, height: 700, margin: '100px auto 0', bgcolor: 'background.paper' }}>
        <CssBaseline />
        <AppBar position="static" component="nav">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}>
              원동규의 TODO
            </Typography>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button color="inherit" onClick={() => setTodoPlus(true)}>
                생성
              </Button>
              <Button color="inherit" onClick={() => navigate('/login')}>
                Login
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
          <Box>
            <List dense={true} sx={{ width: '100%', margin: '5px auto 0', bgcolor: 'background.paper' }}>
              {todoList.length > 0 ? (
                todoList.map((x) => {
                  return (
                    <ListItem sx={{ width: '100%', height: 50 }}>
                      <ListItemText
                        primary="Single-line item"
                        // secondary={secondary ? 'Secondary text' : null}
                      />
                    </ListItem>
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
      <ToDoPlus open={todoPlus} onClose={() => setTodoPlus(false)} />
    </>
  )
}

export default Home
