import { Button, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react'

export default function Deletebtn() {
    return (
        <div>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    )
}
