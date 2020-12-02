import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

// import local file
import NavBar from "./nav-link/NavBar";
import { navigationsUnAuthen, navigationsAuthentication } from "routes-main";
import NotificationCard from "./card-notification";
import "./style.css";

//import material ui
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
  displayInline: {
    display: "block",
  },
  backgorundHeader: {
    backgroundColor: "#374548",
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "block",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(3),
    width: "60%",
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "flex",
  },
}));

export default function PrimarySearchAppBar() {
  let listAva = [
    {
      name: "Minh Tới",
      src: "/assets/header/avatar/toi.jpg",
      status: "Đã bình luận Topic của bạn",
    },
    {
      name: "Hữu Thiện",
      src: "/assets/header/avatar/thien.jpg",
      status: 'Đã "like" một Topic của bạn',
    },
    {
      name: "Xuân Sang",
      src: "/assets/header/avatar/sang.jpg",
      status: 'Đã "like" một Topic của bạn',
    },
    {
      name: "Qúy Thương",
      src: "/assets/header/avatar/thuong.jpg",
      status: "Đã bình luận Topic của bạn",
    },
  ];

  const state = useSelector((state) => state);
  const classes = useStyles();

  const [anchorElProfile, setAnchorElProfile] = React.useState(null);
  const [anchorElNotification, setAnchorElNotification] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuProfileOpen = Boolean(anchorElProfile);
  const isMenuNotificationOpen = Boolean(anchorElNotification);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorElProfile(event.currentTarget); //pass position into
  };
  const handleNotificationMenuOpen = (event) => {
    setAnchorElNotification(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorElProfile(null);
    setAnchorElNotification(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenuProfile = (
    <Menu
      anchorEl={anchorElProfile} //Menu open at anchorElProfile position
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuProfileOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} className={classes.displayInline}>
        {!!state.login.data.id ? (
          <NavBar navigations={navigationsAuthentication} />
        ) : (
          <NavBar navigations={navigationsUnAuthen} />
        )}
      </MenuItem>
    </Menu>
  );
  const menuNotificationId = "primary-search-account-menu";
  const renderMenuNotification = (
    <Menu
      anchorEl={anchorElNotification}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuNotificationId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuNotificationOpen}
      onClose={handleMenuClose}
    >
      {listAva.map((item, index) => (
        <>
          <MenuItem onClick={handleMenuClose} key={index}>
            <NotificationCard {...item} />
          </MenuItem>
        </>
      ))}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.backgorundHeader}>
        <div className="container">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>

            <Typography className={classes.title} variant="h6">
              <NavLink className="name-header" to="/">
                URs
              </NavLink>
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={14} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-label="show notification about topics"
                aria-controls={menuNotificationId}
                aria-haspopup="true"
                onClick={handleNotificationMenuOpen}
                color="inherit"
              >
                <Badge badgeContent={4} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="user login"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen} //handle event passing position into state
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
          </Toolbar>
        </div>
      </AppBar>
      {renderMenuNotification}
      {renderMenuProfile}
    </div>
  );
}
