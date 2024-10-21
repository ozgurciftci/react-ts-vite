import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/useUserContext.ts';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Container, Box, tableCellClasses, styled
} from '@mui/material';
import Typography from "@mui/material/Typography";
import {Theme} from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }: {theme: Theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export const UserTable = () => {
    const { users } = useUserContext();
    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/edit-user/${id}`);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',  // Centers the table horizontally
                alignItems: 'center',      // Centers the content vertically if needed
                minHeight: '100vh',        // Ensures full viewport height
                padding: '20px',
                backgroundColor: '#f9f9f9',  // Add some background to visually separate
            }}
        >
            <Container maxWidth="md">
                {/* Table Title */}
                <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
                    Users
                </Typography>

                {/* Table Container */}
                <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="left"><strong>First Name</strong></StyledTableCell>
                                <StyledTableCell align="left"><strong>Last Name</strong></StyledTableCell>
                                <StyledTableCell align="left"><strong>Email</strong></StyledTableCell>
                                <StyledTableCell align="left"><strong>Phone</strong></StyledTableCell>
                                <StyledTableCell align="center"><strong>Actions</strong></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id} hover>
                                    <TableCell align="left">{user.firstName}</TableCell>
                                    <TableCell align="left">{user.lastName}</TableCell>
                                    <TableCell align="left">{user.email}</TableCell>
                                    <TableCell align="left">{user.phone}</TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            onClick={() => handleEdit(user.id)}
                                            sx={{ padding: '5px 15px' }}
                                        >
                                            Edit
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </Box>
    );
};
