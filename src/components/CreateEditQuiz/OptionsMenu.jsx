// Importing necessary dependencies and components
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';

// OptionsMenu Component
// Represents a menu with options (Add option and Delete) for a question in the quiz form.

// Props:
// - onClickAddOption: Callback function for handling the "Add option" action.
// - onClickDelete: Callback function for handling the "Delete" action.

export default function OptionsMenu({ onClickAddOption, onClickDelete }) {
    // State to manage the anchor element for the menu
    const [anchorEl, setAnchorEl] = useState(null);

    // Boolean flag to determine if the menu is open
    const open = Boolean(anchorEl);

    return (
        <div>
            {/* IconButton triggering the menu */}
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
            {/* Menu component */}
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
            >
                {/* MenuItem for "Add option" */}
                <MenuItem onClick={() => { setAnchorEl(null); onClickAddOption(); }}>
                    {/* Button for better accessibility */}
                    Add option
                </MenuItem>
                {/* MenuItem for "Delete" */}
                <MenuItem onClick={() => { setAnchorEl(null); onClickDelete(); }}>
                    {/* Button for better accessibility */}
                    Delete
                </MenuItem>
            </Menu>
        </div>
    );
}
