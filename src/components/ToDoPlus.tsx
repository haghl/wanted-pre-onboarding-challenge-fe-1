import { useCallback, useEffect, useState } from 'react'
import { postCreateToDo, postEditToDo } from '@/api'
import { Modal, TextField, Button, Grid } from '@mui/material'
import { Box } from '@mui/system'
import { EditProp } from '@/page/Home'

interface ToDoPlusProps {
  open: boolean
  onClose: (bool: boolean) => void
  type: 'plus' | 'edit'
  editType?: EditProp | null
}

const ToDoPlus = ({ open, onClose, type, editType }: ToDoPlusProps) => {
  const [todoType, setTodoType] = useState(type)
  const [title, setTitle] = useState('')
  const [contents, setContents] = useState('')
  const [editData, setEditData] = useState(editType)

  // 클릭
  const onClickCreate = useCallback(async () => {
    if (title !== '' && contents !== '') {
      try {
        await postCreateToDo({ title, content: contents })
        onClose(false)
      } catch (err) {
        console.log('생성 오류', err)
      }
    }
  }, [title, contents])

  // 수정하기
  const onClickEdit = useCallback(async () => {
    if (editData?.title !== title || editData?.content !== contents) {
      try {
        await postEditToDo({ title, content: contents }, editData!.id)
        onClose(false)
      } catch (err) {
        console.log('수정 오류', err)
      }
    }
  }, [title, contents])

  useEffect(() => {
    if (editData && type === 'edit') {
      console.log(editData)

      setTitle(editData?.title)
      setContents(editData?.content)
    }

    return () => {
      setTodoType('plus')
      setEditData(undefined)
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
          <Button variant="contained" onClick={todoType === 'plus' ? onClickCreate : onClickEdit}>
            {todoType === 'plus' ? '생성' : '수정'}
          </Button>
        </Grid>
      </Box>
    </Modal>
  )
}

export default ToDoPlus
