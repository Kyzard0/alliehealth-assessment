import { Box, Modal, Typography } from "@mui/material";
import { useUsersContext } from "../../contexts/UsersContext";
import dayjs from "dayjs";

type Props = {
  open: boolean;
  handleClose: () => void;
};

const DetailsUserModal = ({ open, handleClose }: Props) => {
  const { selectedUser } = useUsersContext();
  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1,
          }}
        >
          <Typography variant="h5" sx={{ paddingBottom: '16px' }}>
            Details
          </Typography>
          <Typography>
            {selectedUser?.first_name}
          </Typography>
          <Typography>
            {selectedUser?.last_name}
          </Typography>
          <Typography>
            {selectedUser?.email}
          </Typography>
          <Typography>
            {dayjs(selectedUser?.date_of_birth).format('MM/DD/YYYY')}
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
};

export default DetailsUserModal;
