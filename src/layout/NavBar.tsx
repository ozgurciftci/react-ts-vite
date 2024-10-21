import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import {FC} from "react";
import {styled} from "@mui/material";
import {Link} from "react-router-dom";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    boxShadow: 'none',
}));

const StyledLinkButton = styled(Button)(({ theme }) => {
    return ({
        color: theme.palette.common.white,
        '&:hover': {
            color: 'black',
            borderBottom: "1px solid black",
        }
    });
});

export const Navbar: FC = () => {
    return (
        <StyledAppBar position="fixed">
            <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Ozgur App
                </Typography>

                {/* Wrap Link around Button for navigation */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <StyledLinkButton>Home</StyledLinkButton>
                </Link>
                <Link to="/users-list" style={{ textDecoration: 'none' }}>
                    <StyledLinkButton>User List</StyledLinkButton>
                </Link>
                <Link to="/create-user" style={{ textDecoration: 'none' }}>
                    <StyledLinkButton>Add User</StyledLinkButton>
                </Link>
                <Link to="/deneme">
                    <StyledLinkButton>Deneme</StyledLinkButton>
                </Link>
                <Link to="/products">
                    <StyledLinkButton>Products</StyledLinkButton>
                </Link>
                <Link to="/login">
                    <StyledLinkButton>Login</StyledLinkButton>
                </Link>
            </Toolbar>
        </StyledAppBar>
    );
}
