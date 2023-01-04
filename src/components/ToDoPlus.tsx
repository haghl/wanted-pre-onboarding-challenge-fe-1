import { Modal, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'

interface ToDoPlusProps {
  open: boolean
  onClose: () => void
}

const ToDoPlus = ({ open, onClose }: ToDoPlusProps) => {
  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="ToDo 제목"
          name="title"
          autoFocus
          autoComplete="off"
          // value={userEmail}
          // onChange={onChangeEmail}
        />
        <TextField
          margin="normal"
          fullWidth
          id="title"
          label="ToDo 제목"
          name="title"
          autoComplete="off"
          // value={userEmail}
          // onChange={onChangeEmail}
        />
      </Box>
    </Modal>
  )
}

export default ToDoPlus
