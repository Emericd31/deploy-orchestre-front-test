import { Button } from "@mui/material";
import { alpha, styled } from '@mui/material/styles';
import { green } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

export const GreenButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#00AF06",
  '&:hover': {
    backgroundColor: "#009205",
  },
}));

export const RedButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#FF0000",
  '&:hover': {
    backgroundColor: "#A40000",
  },
}));

export const GrayButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#707070",
  '&:hover': {
    backgroundColor: "#504F4F",
  },
}));

export const OrangeButton = styled(Button)(({ theme }) => ({
  color: "white",
  backgroundColor: "#FF9100",
  '&:hover': {
      backgroundColor: "#C16F02",
  },
}));

export const GreenSwitch = styled(Switch)(({ theme }) => ({
  '& .MuiSwitch-switchBase.Mui-checked': {
    color: green[600],
    '&:hover': {
      backgroundColor: alpha(green[600], theme.palette.action.hoverOpacity),
    },
  },
  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
    backgroundColor: green[600],
  },
}));