import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { User, useUsersContext } from "../../contexts/UsersContext";
import dayjs from "dayjs";
import { IconButton, Tooltip } from "@mui/material";
import ArticleIcon from '@mui/icons-material/Article';

const TableHeaderCell = (props: Record<any, any>) => (
  <TableCell
    sx={{
      fontWeight: "bold",
    }}
    {...props}
  />
);

type Props = {
  users: User[];
};

const UsersTable = ({ users }: Props) => {
  const { toggleDetailsUserModal, setSelectedUser } = useUsersContext();

  const handleDetailsClick = (user: User) => {
    toggleDetailsUserModal();
    setSelectedUser(user);
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell align="right">Email</TableHeaderCell>
            <TableHeaderCell align="right">Day of Birth</TableHeaderCell>
            <TableHeaderCell align="right"></TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow
              key={user.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {`${user.first_name} ${user.last_name}`}
              </TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.date_of_birth ? dayjs(user.date_of_birth).format('MM/DD/YYYY') : '-'}</TableCell>
              <TableCell align="right">
                <Tooltip title="Details">
                  <IconButton onClick={() => handleDetailsClick(user)}>
                    <ArticleIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
  ;

export default UsersTable;
