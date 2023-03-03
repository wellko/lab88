import React, {useState} from 'react';
import {User} from '../../../types';
import {Button, Menu, MenuItem} from '@mui/material';
import {useAppDispatch} from "../../../app/hooks";
import {useNavigate} from "react-router-dom";
import {logoutApi} from "../../../features/Users/UsersThunks";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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
                <MenuItem onClick={async () => {
                    await dispatch(logoutApi());
                    navigate('/');
                }}>Log Out</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;