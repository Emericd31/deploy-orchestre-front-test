import "./LanguageSelector.css";
import React, { useContext, useState } from "react";
import { languageOptions } from "../../../languages/Languages";
import { AppContext } from "../../../Context";
import { Button, Menu, MenuItem } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function LanguageSelector() {
  const { userLanguage, userLanguageChange } = useContext(AppContext);
  const [anchorEl, setAnchorEl] = useState(null);

  const getKeyByValue = (object, value) => {
    return Object.keys(object).find((key) => object[key] === value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (event) => {
    let language = getKeyByValue(languageOptions, event.target.innerText);
    userLanguageChange(language);
    handleClose();
  };

  return (
    <div>
      <div>
        <Button
          id={"change-language-button"}
          color="inherit"
          onClick={handleClick}
        >
          <img
            className="flag"
            src={`/flags/${userLanguage}.png`}
            alt={userLanguage}
            width="25px"
          />
          {userLanguage} <ArrowDropDownIcon />
        </Button>
        <Menu
          id="language-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          {Object.entries(languageOptions).map(([id, name]) => (
            <MenuItem key={id} onClick={handleLanguageChange}>
              <img
                className="flag"
                src={`/flags/${id}.png`}
                alt={id}
                width="25px"
              />
              {name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    </div>
  );
}
