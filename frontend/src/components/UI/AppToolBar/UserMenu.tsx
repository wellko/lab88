import React, {useState} from 'react';
import {User} from '../../../types';
import {Button, CircularProgress, Menu, MenuItem} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {logoutApi} from "../../../features/Users/UsersThunks";
import {selectLogOut} from "../../../features/Users/UsersSlice";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const logOut = useAppSelector(selectLogOut);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                color="inherit"
            >
                Hello, {user.username}
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={() => {
                    navigate('/newPost');
                }}>create new post</MenuItem>
                <MenuItem disabled={logOut} onClick={async () => {
                    await dispatch(logoutApi());
                    navigate('/');
                }}>{logOut? <CircularProgress color="success" />:  'LogOut'}</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;