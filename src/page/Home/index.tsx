import { useCallback, useEffect, useState } from 'react'
import { deleteTodo, getToDoList, TodoProp } from '@/api'
import { Accordion, AccordionDetails, AccordionSummary, AppBar, Box, Button, Container, CssBaseline, List, ListItem, ListItemText, Toolbar, Typography, Grid } from '@mui/material'
import moment from 'moment'
import ToDoPlus from '@/components/ToDoPlus'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useNavigate } from 'react-router-dom'

type TodoListProp = { title: string; content: string; id: string; createdAt: string; updatedAt: string }
type TodoType = 'plus' | 'edit'
export type EditProp = TodoProp & { id: string }

const Home = () => {
  const navigate = useNavigate()
  const [todoList, setTodoList] = useState<TodoListProp[]>([])
  const [todoPlus, setTodoPlus] = useState(false)
  const [todoType, setTodoType] = useState<TodoType>('plus')
  const [editTodoData, setEditTodoData] = useState<EditProp | null>()

  // 데이터 불러오기 함수
  const getList = useCallback(async () => {
    try {
      const res = await getToDoList()
      console.log('데이터', res.data.data)
      setTodoList(res.data.data.reverse())
    } catch (err) {
      console.log('목록 불러오기 실패', err)
    }
  }, [])

  // 수정
  const onClickEdit = useCallback((data: EditProp) => {
    setTodoType('edit')
    setEditTodoData(data)
    setTodoPlus(true)
  }, [])

  // 삭제하기
  const onClickDelete = useCallback(async (id: string) => {
    try {
      await deleteTodo(id)
      alert('삭제되었습니다.')
      getList()
    } catch (err) {
      console.log('수정 오류', err)
    }
  }, [])

  // 로그 아웃
  const onClickLogOut = useCallback(() => {
    localStorage.removeItem('accessToken')
    navigate('/login')
  }, [])

  // 마운트 시 데이터 불러오기
  useEffect(() => {
    if (!todoPlus) getList()
  }, [todoPlus])

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
              <Button
                color="inherit"
                onClick={() => {
                  setTodoType('plus')
                  setTodoPlus(true)
                }}
              >
                생성
              </Button>
              <Button color="inherit" onClick={onClickLogOut}>
                LogOut
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
        <Container component="main" sx={{ mb: 4 }}>
          <Box>
            <List dense={true} sx={{ width: '100%', margin: '5px auto 0', bgcolor: 'background.paper' }}>
              {todoList.length > 0 ? (
                todoList.map((x) => {
                  return (
                    <Accordion key={x.id} sx={{ width: '100%', minHeight: 50 }}>
                      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                        <Typography>{x.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>{x.content}</Typography>
                        <Typography>생성일 : {moment(x.createdAt).format('YYYY.MM.DD')}</Typography>
                        <Grid marginTop="30px" justifyContent="flex-end">
                          <Button onClick={() => onClickEdit({ title: x.title, content: x.content, id: x.id })}>수정</Button>
                          <Button onClick={() => onClickDelete(x.id)}>삭제</Button>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
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
      {todoPlus && <ToDoPlus open={todoPlus} type={todoType} onClose={() => setTodoPlus(false)} editType={editTodoData} />}
    </>
  )
}

export default Home
