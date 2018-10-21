import React, { Component } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core';

class MyAppBar extends Component{
    render(){
        return(
            <div>
                <AppBar position='static'>
                    <Toolbar>
                        <Typography variant='headline'>
                            Torrid
                        </Typography>
                    </Toolbar>

                </AppBar>
            </div>
        );
    }
}
export default MyAppBar;