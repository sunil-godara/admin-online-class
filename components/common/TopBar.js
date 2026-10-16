import * as React from "react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Avatar,
  // Badge,
  Divider,
  FormControl,
  IconButton,
  // Input,
  // InputAdornment,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography
} from "@mui/material";
import {
  ExpandMore,
  Logout,
  AccountCircle,
  PersonAdd,
  // Search,
  Settings,
  Lock
} from "@mui/icons-material";
import { logoutUser } from "@/utils/api/common";
import { profileMenus } from "@/utils/constants/common-constants";
import { capitalizeFirstLetter } from "@/utils/helpers";

export const icons = {
  Logout,
  AccountCircle,
  PersonAdd,
  Settings,
  Lock
};

export default function TopBar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { data: session } = useSession();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    await logoutUser({ token: session.user.token });
    await signOut({ redirect: false });
    router.push("/admin/login");
  };

  return (
    <Container>
      <SearchControl>
        {/* <Input
          id="input-with-icon-adornment"
          variant="outlined"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          }
        /> */}
      </SearchControl>
      <RightBar>
        {/* <Notification>
          <Badge variant="dot" color="primary">
            <NotificationsOutlined color="action" />
          </Badge>
          <Typography component="span">
            <strong>2</strong> New alerts
          </Typography>
        </Notification> */}
        <AccountTooltip>
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            disableRipple
          >
            <Avatar
              sx={{ width: 50, height: 50 }}
              alt="Mani Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <Typography component="span">
              {session && session.user
                ? capitalizeFirstLetter(session.user.name)
                : ""}
            </Typography>
            <ExpandMore />
          </IconButton>
        </AccountTooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0
                }
              }
            }
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {profileMenus.slice(0, 2).map(({ label, icon, path }) => {
            const Icon = icons[icon];
            return (
              <MenuItem key={label} onClick={() => router.push(path)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {label}
              </MenuItem>
            );
          })}
          <Divider />
          {profileMenus.slice(2, 4).map(({ label, icon, path }) => {
            const Icon = icons[icon];
            return (
              <MenuItem key={label} onClick={() => router.push(path)}>
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                {label}
              </MenuItem>
            );
          })}

          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </RightBar>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2, 2, 2, 6)};
    padding-left: calc(${theme.spacing(6)} + 16px);
    padding-top: calc(${theme.spacing(3)} - 5px);
    padding-bottom: calc(${theme.spacing(3)} - 5px);
    background: ${theme.colors.palette.white};
    border-bottom: 1px solid ${theme.colors.palette.lightGrey};
    display: flex;
    justify-content: space-between;

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      padding: ${theme.spacing(4, 4, 4, 5)};
    }
  `}
`;

const SearchControl = styled(FormControl)`
  ${({ theme }) => `
    max-width: 170px;
    width: 100%;
    color: ${theme.colors.palette.black};

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      max-width: 300px;
    }

    @media (min-width: ${theme.breakpoints.values.xl}px) {
      max-width: 400px;
    }

    .MuiInputBase-root {
      height: 50px;
      padding: ${theme.spacing(0, 2)};
      border-radius: 25px;
      border: 1px solid ${theme.colors.palette.grey};

      &:after, &:before {
        display: none
      }
    }
  `}
`;

const RightBar = styled.div`
  display: flex;
  align-items: center;
`;

// const Notification = styled.div`
//   ${({ theme }) => `
//     height: 50px;
//     display: flex;
//     align-items: center;
//     padding: 0 ${theme.spacing(2)};
//     border-right: 1px solid ${theme.colors.palette.grey};
//     margin-right: ${theme.spacing(2)};

//     .MuiTypography-root {
//       display: none;
//     }

//     @media (min-width: ${theme.breakpoints.values.lg}px) {
//       .MuiTypography-root {
//         display: block;
//       }
//     }

//     @media (min-width: ${theme.breakpoints.values.xl}px) {
//       max-width: 400px;
//       padding: 0 ${theme.spacing(4)};
//       margin-right: ${theme.spacing(2)};
//     }

//     strong {
//       color: ${theme.colors.palette.darkRed};
//       font-weight: 400;
//     }

//     .MuiBadge-root {
//       @media (min-width: ${theme.breakpoints.values.md}px) {
//         margin-right: ${theme.spacing(2)};
//       }

//       .MuiSvgIcon-root {
//         color: ${theme.colors.palette.black};
//       }

//       .MuiBadge-badge {
//         background: ${theme.colors.palette.darkRed};
//       }
//     }
//   `}
// `;

const AccountTooltip = styled(Tooltip)`
  ${({ theme }) => `
    &.MuiIconButton-root {
      margin: -5px;
    }

    .MuiTypography-root {
      display: none;
    }

    @media (min-width: ${theme.breakpoints.values.md}px) {
      .MuiTypography-root {
        display: block;
      }
    }

    .MuiSvgIcon-root {
      color: ${theme.colors.palette.black};

      @media (min-width: ${theme.breakpoints.values.md}px) {
        margin-left: ${theme.spacing(1)};
      }
    }

    .MuiAvatar-root {
      margin-right: ${theme.spacing(1)}
    }
  `}
`;
