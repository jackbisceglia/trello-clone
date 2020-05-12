import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import Typography from '@material-ui/core/Typography';

export default function Navbar() {
    return (
        <div>
            <AppBar position='static' color='primary'>
                <ToolBar>
                    <Typography variant="h6">
                        Jack's Trello Clone 
                    </Typography>
                </ToolBar>
            </AppBar>
        </div>
    )
}
