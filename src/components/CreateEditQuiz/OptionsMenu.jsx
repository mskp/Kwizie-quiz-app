import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { Button } from '@mui/material';

export default function OptionsMenu({ onClickAddOption, onClickDelete }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <div>
            <IconButton
                type='button'
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={(e) => setAnchorEl(e.currentTarget)}
                style={{ color: "inherit" }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => { setAnchorEl(null); onClickAddOption(); }}>
                    {/* <Button>Add option</Button> */}
                    Add option
                </MenuItem>
                <MenuItem onClick={() => { setAnchorEl(null); onClickDelete(); }}>
                    {/* <Button>Delete</Button> */}
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}