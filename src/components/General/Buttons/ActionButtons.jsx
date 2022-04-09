import * as React from 'react';
import { GreenButton, RedButton } from '../StyledComponents/StyledButtons';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ActionButtons(props) {
    return (
        <div className="actionButtons">
            <GreenButton className="button" onClick={() => props.functionEdit()}><EditIcon /></GreenButton>
            <RedButton className="button" onClick={() => props.functionDelete()}><DeleteIcon /></RedButton>
        </div>
    )
}