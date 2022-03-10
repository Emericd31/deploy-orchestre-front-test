import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';

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