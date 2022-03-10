import * as React from 'react';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import { styled } from '@mui/material/styles';
import { setPresence } from '../../../GraphQL/mutations/EventMutations';
import { getMyPresence } from '../../../GraphQL/queries/EventQueries';

const RedButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#FF0000",
    '&:hover': {
        backgroundColor: "#A40000",
    },
}));

const GrayButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#707070",
    '&:hover': {
        backgroundColor: "#504F4F",
    },
}));

const GreenButton = styled(Button)(({ theme }) => ({
    color: "white",
    backgroundColor: "#00AF06",
    '&:hover': {
        backgroundColor: "#009205",
    },
}));

export default function SplitButton(props) {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const [selectedIndex, setSelectedIndex] = React.useState(0);

    const handleButtonClicked = (eventId, presence) => {
        setPresence(parseInt(eventId), presence).then((res) => {
            if (res.setPresence.statusCode !== 200) {
                console.log("Une erreur s'est produite !");
            }
        })
    }

    useEffect(() => {
        getMyPresence(parseInt(props.eventId)).then((res) => {
            if (res.myPresence !== null) {
                switch (res.myPresence.presence) {
                    case "ABSENT":
                        setSelectedIndex(2);
                        break;
                    case "PRESENT":
                        setSelectedIndex(1);
                        break;
                    case "NONRENSEIGNE":
                        setSelectedIndex(0);
                        break;
                    default:
                        break;
                }
            }
        })
    }, [])

    const options = [
        <GrayButton onClick={() => handleButtonClicked(props.eventId, "NONRENSEIGNE")} variant="contained" style={{ padding: "0px", margin: "0px", height: "100%", width: "100px" }} color="inherit"><ManageAccountsIcon />{ !open ? <ArrowDropDownIcon style={{ marginLeft: "10px" }} /> : ""}</GrayButton>,
        <GreenButton onClick={() => handleButtonClicked(props.eventId, "PRESENT")} variant="contained" style={{ padding: "0px", margin: "0px", height: "100%", width: "100px" }} color="success"><PersonAddIcon />{ !open ? <ArrowDropDownIcon  style={{ marginLeft: "10px" }} /> : ""}</GreenButton>,
        <RedButton onClick={() => handleButtonClicked(props.eventId, "ABSENT")} variant="contained" style={{ padding: "0px", margin: "0px", height: "100%", width: "100px" }} color="success"><PersonRemoveIcon />{ !open ? <ArrowDropDownIcon  style={{ marginLeft: "10px" }} /> : ""}</RedButton>
    ];

    const handleClick = () => {
        setOpen(true);
    };

    const handleMenuItemClick = (event, index) => {
        setSelectedIndex(index);
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    return (
        <React.Fragment>
            <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
                <div onClick={handleClick}
                    style={{
                        padding: "0px",
                        margin: "0px"
                    }}>{options[selectedIndex]}</div>
            </ButtonGroup>
            <Popper
                style={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === 'bottom' ? 'center top' : 'center bottom',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList id="split-button-menu">
                                    {options.map((option, index) => (
                                        <MenuItem
                                            style={{
                                                padding: "0px",
                                                margin: "10px"
                                            }}
                                            key={index}
                                            selected={index === selectedIndex}
                                            onClick={(event) => handleMenuItemClick(event, index)}
                                        >
                                            {option}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </React.Fragment>
    );
}