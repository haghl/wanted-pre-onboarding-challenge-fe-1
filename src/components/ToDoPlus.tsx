import { useCallback, useEffect, useState } from 'react'
import { useQueryClient } from 'react-query'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { Modal, TextField, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { RootState } from '@/store/store'
import TodoApi from '@/api/todo'
import { ToDoPlusProps } from '@/types/todo'
import useCreateTodo from '@/hook/mutation/useCreateTodo'
import useEditTodo from '@/hook/mutation/useEditTodo'

const ToDoPlus = ({ open, onClose, editType }: ToDoPlusProps) => {
  const headerType = useSelector((state: RootState) => state.headerSlice.headerType)
  const queryClient = useQueryClient()
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const { mutate: createTodo } = useCreateTodo()
  const { mutate: editTodo } = useEditTodo()

  // 클릭
  const onClickCreate = useCallback(() => {
    if (title !== '' && contents !== '') {
      createTodo({ title, content: contents })
      onClose(false)
    }
  }, [title, contents])

  // 수정하기
  const onClickEdit = useCallback(async () => {
    if (editType) {
      if (editType?.title !== title || editType?.content !== contents) {
        editTodo({ title, content: contents, id: editType.id })
        onClose(false)
      }
    }
  }, [title, contents])

  useEffect(() => {
    if (editType && headerType === 'edit') {
      setTitle(editType.title)
      setContents(editType.content)
    }
    return () => {
      queryClient.invalidateQueries(['getToDos'])
    }
  }, [])

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: '#fff',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField margin="normal" fullWidth id="title" label="ToDo 제목" name="title" autoFocus autoComplete="off" value={title} onChange={(e) => setTitle(e.target.value)} />
        <TextField margin="normal" fullWidth id="contents" label="ToDo 내용" name="contents" multiline autoComplete="off" value={contents} onChange={(e) => setContents(e.target.value)} />
        <Grid container justifyContent="center" alignItems="center">
          <Button variant="contained" onClick={headerType === 'plus' ? onClickCreate : onClickEdit}>
            {headerType === 'plus' ? '생성' : '수정'}
          </Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ToDoPlus
