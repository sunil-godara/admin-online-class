import { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
// import { useSession } from "next-auth/react";
import styled from "@emotion/styled";
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText
} from "@mui/material";
import {
  Article,
  DashboardOutlined,
  Receipt,
  ReceiptLongOutlined,
  InventoryOutlined,
  PersonOutlineOutlined,
  SendTimeExtensionOutlined,
  SettingsOutlined,
  HelpCenter,
  GroupAdd,
  Group,
  AssignmentReturn,
  Summarize,
  Collections,
  Email,
  Shop2,
  Contrast,
  Store,
  AddBusiness,
  Star,
  BarChart,
  Public,
  Quiz,
  EastOutlined,
  ExpandLess,
  ExpandMore,
  RadioButtonUnchecked,
  StorefrontOutlined,
  MeetingRoomOutlined,
  CategoryOutlined
} from "@mui/icons-material";
import { isMenuSelected } from "@/utils/helpers";
import { adminMenuItems } from "@/utils/constants/common-constants";

export const icons = {
  Article,
  DashboardOutlined,
  Receipt,
  ReceiptLongOutlined,
  InventoryOutlined,
  PersonOutlineOutlined,
  SendTimeExtensionOutlined,
  SettingsOutlined,
  HelpCenter,
  GroupAdd,
  Group,
  AssignmentReturn,
  Summarize,
  Collections,
  Email,
  Shop2,
  Contrast,
  Store,
  AddBusiness,
  Star,
  BarChart,
  Public,
  Quiz,
  StorefrontOutlined,
  MeetingRoomOutlined,
  CategoryOutlined
};

export default function SideBar() {
  const router = useRouter();
  // const { data: session } = useSession();
  const [shrink, setShrink] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState([]);
  const [selectedSubMenuIndex, setSelectedSubMenuIndex] = useState(null);
  // const [menuItems, setMenuItems] = useState([]);
  const menuItems = adminMenuItems;

  const handleMenuClick = (event, id, path) => {
    event.stopPropagation();

    if (selectedIndex === id) {
      setSelectedIndex(null);
      setSelectedSubMenuIndex(null);
    } else {
      setSelectedIndex(id);
    }

    if (path) {
      router.push(path);
    }
  };

  const handleListItemClick = (event, id, path) => {
    event.stopPropagation();

    if (selectedSubMenuIndex === id) {
      setSelectedSubMenuIndex(null);
    } else {
      setSelectedSubMenuIndex(id);
    }

    if (path) {
      router.push(path);
    }
  };

  const handleClickOpen = () => {
    setShrink(!shrink);
  };

  useEffect(() => {
    const selectedMenuIds = isMenuSelected(adminMenuItems, router.asPath);
    setSelectedMenu(selectedMenuIds);
  }, [router.asPath]);

  // useEffect(() => {
  //   let user = session.user;

  //   let finalMenus = [];
  //   if (user.role_id === 1) {
  //     finalMenus = mainMenuItems;
  //   } else if (user.role_id === 2 || user.role_id === 3) {
  //     finalMenus = customerSupplierItems;
  //   } else {
  //     const permission_modules = user.permission_modules;
  //     finalMenus = filterMenus(mainMenuItems, permission_modules);
  //   }

  //   setMenuItems(finalMenus);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container shrink={shrink.toString()}>
      <LogoContainer shrink={shrink.toString()}>
        <Link
          href="/admin/dashboard"
          style={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          <Image
            src="/logo.png"
            alt="logo"
            height={60}
            width={shrink ? 44 : 51}
            priority
            unoptimized
          />
          <Image
            src="/companyName.png"
            alt="Dotsquares"
            height={33}
            width={130}
            priority
            unoptimized
          />
        </Link>
      </LogoContainer>
      <MuiIconButton onClick={handleClickOpen} shrink={shrink.toString()}>
        {shrink ? (
          <EastOutlined />
        ) : (
          <Image
            src="/menu-icon.png"
            alt="menu button"
            width={27}
            height={19}
            priority
            unoptimized
          />
        )}
      </MuiIconButton>
      <List component="nav" aria-labelledby="nested-list-subheader">
        {menuItems &&
          menuItems.length > 0 &&
          menuItems.map(({ label, path, icon, subMenu, id }, index) => {
            const Icon = icons[icon];
            return (
              <Fragment key={`menu-${index}`}>
                <MenuItem
                  selected={path === router.asPath}
                  onClick={event => {
                    handleMenuClick(event, id, path);
                  }}
                  title={label}
                  activestate={(
                    selectedMenu.includes(id) || selectedIndex === id
                  ).toString()}
                >
                  <ListItemIcon>
                    <Icon />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                  {subMenu &&
                    (selectedMenu.includes(id) || selectedIndex === id ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    ))}
                </MenuItem>
                {subMenu && (
                  <Collapse
                    in={selectedMenu.includes(id) || selectedIndex === id}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {subMenu.map(({ title, path, subSubMenu, id }, index) => {
                        return (
                          <Fragment key={`sub-submenu-${index}`}>
                            <SubmenuItem
                              selected={path === router.asPath}
                              onClick={event => {
                                handleListItemClick(event, id, path);
                              }}
                              sx={{ pl: 5 }}
                              activestate={(
                                selectedSubMenuIndex === id ||
                                selectedMenu.includes(id)
                              ).toString()}
                            >
                              <ListItemIcon>
                                <RadioButtonUnchecked fontSize="small" />
                              </ListItemIcon>
                              <ListItemText primary={title} />
                              {subSubMenu &&
                                (selectedSubMenuIndex === id ||
                                selectedMenu.includes(id) ? (
                                  <ExpandLess />
                                ) : (
                                  <ExpandMore />
                                ))}
                            </SubmenuItem>
                            {subSubMenu && (
                              <Collapse
                                in={
                                  selectedSubMenuIndex === id ||
                                  selectedMenu.includes(id)
                                }
                                timeout="auto"
                                unmountOnExit
                              >
                                <List component="div" disablePadding>
                                  {subSubMenu.map(
                                    ({ title, path, id }, index) => {
                                      return (
                                        <ListItemButton
                                          selected={path === router.asPath}
                                          onClick={event => {
                                            handleListItemClick(
                                              event,
                                              id,
                                              path
                                            );
                                          }}
                                          sx={{ pl: 5 }}
                                          key={`submenu-${index}`}
                                        >
                                          <ListItemIcon>
                                            <RadioButtonUnchecked fontSize="small" />
                                          </ListItemIcon>
                                          <ListItemText primary={title} />
                                        </ListItemButton>
                                      );
                                    }
                                  )}
                                </List>
                              </Collapse>
                            )}
                          </Fragment>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Fragment>
            );
          })}
      </List>
    </Container>
  );
}

const Container = styled.div`
  ${({ theme, shrink }) => `
    padding: ${shrink == "true" ? theme.spacing(3, 2, 2) : theme.spacing(3)} ;
    border-right: 1px solid ${theme.colors.palette.lightGrey};
    transition: 0.3s ease all;
    flex: 0 0 300px;
    transform: ${shrink == "false" ? "translate(-100%)" : "translate(0)"};
    max-width: calc(100vw - 50px);
    width: 300px;
    background: ${theme.colors.palette.white};
    position: relative;
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 99;
    top: 0;
    bottom: 0;

    @media (min-width: ${theme.breakpoints.values.md}px) {
      position: relative;
      transform: translate(0);
      flex: ${shrink == "true" ? "0 0 75px" : "0 0 300px"};
      max-width: 300px;

      .MuiListItemButton-root {
        > .MuiListItemText-root {
          display: ${shrink == "true" ? "none" : "block"};
        }
      }

      .MuiCollapse-root {
        .MuiButtonBase-root {
           &.Mui-selected {
            background-color: transparent;
           }
        }

        ${
          shrink == "true" &&
          `
        position: fixed;
        left: 100%;
        background: ${theme.colors.palette.white};
        filter: drop-shadow(0px 2px 8px rgba(0,0,0,0.32));
        border-radius: 10px;
        margin-top: -45px;
        width: 200px;
        padding: ${theme.spacing(1)};

        .MuiButtonBase-root {
          padding-left: ${theme.spacing(1)};
          margin-bottom: calc(${theme.spacing(1)} - 6px);

          .MuiTypography-root {
            font-size: 16px;
          }
        }

        &::before {
          content: "";
          display: block;
          position: absolute;
          top: 15px;
          left: -4px;
          width: 10px;
          height: 10px;
          background-color: ${theme.colors.palette.white};
          transform: translateY(-50%) rotate(232deg);
          z-index: 0;
        }`
        }

        .MuiListItemButton-root {
          > .MuiListItemText-root {
            display: block;
          }
        }
      }
    }

    @media (min-width: ${theme.breakpoints.values.lg}px) {
      flex: ${shrink == "true" ? "0 0 75px" : "0 0 300px"};
      max-width: 300px;
      padding: ${
        shrink == "true" ? theme.spacing(3, 2, 2) : theme.spacing(3, 4, 4)
      } ;
    }

    .MuiList-root {
      overflow: auto;
      flex: 1;

      &::-webkit-scrollbar {
        width: 0;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: transparent;
        outline: 0;
      }
    }

    .MuiListItemButton-root {
      height: 50px;
      border-radius: 10px;
      margin-bottom: ${theme.spacing(1)};

      .MuiTypography-root {
        font-size: 16px;

        @media (min-width: ${theme.breakpoints.values.lg}px) {
          font-size: 14px;
        }
      }

      .MuiListItemIcon-root .MuiSvgIcon-root, .MuiSvgIcon-root {
        color: ${theme.colors.palette.grayishBlue};
      }

      > .MuiSvgIcon-root{
        @media (min-width: ${theme.breakpoints.values.md}px) {
          display: ${shrink == "false" ? "none" : "block"};
        }
      }

      &.Mui-selected {
        .MuiTypography-root {
          color: ${theme.colors.palette.darkBlue}
        }

        .MuiListItemIcon-root, .MuiSvgIcon-root {
          color: ${theme.colors.palette.darkBlue}
        }
      }

      .MuiListItemIcon-root {
        min-width: 40px;

        @media (min-width: ${theme.breakpoints.values.md}px) {
         min-width: ${shrink == "true" ? "auto" : "40px"};
        }
      }
    }

    .MuiCollapse-vertical {
      .MuiListItemIcon-root {
        min-width: 25px;
      }

      .MuiTypography-root {
        color: ${theme.colors.palette.darkGrey}
      }

      .MuiListItemIcon-root {
        color: ${theme.colors.palette.darkGrey};

        .MuiSvgIcon-fontSizeSmall {
          font-size: 14px;
        }
      }
    }
  `}
`;

const MenuItem = styled(ListItemButton)`
  ${({ theme, activestate }) => `
    &.MuiButtonBase-root {
      ${
        activestate == "true" &&
        `background-color: rgba(0, 55, 150, 0.12);

        .MuiTypography-root {
          color: ${theme.colors.palette.darkBlue};
        }

        .MuiSvgIcon-root {
          color: ${theme.colors.palette.darkBlue};
         }

        .MuiListItemIcon-root {
          .MuiSvgIcon-root {
            color: ${theme.colors.palette.darkBlue};
           }
        }
       `
      }
    }
  `}
`;

const SubmenuItem = styled(ListItemButton)`
  ${({ theme, activestate }) => `
    &.MuiButtonBase-root {
      padding-left: 30px;
      ${
        activestate == "true" &&
        `background-color: rgb(166 189 228 / 12%);

        .MuiTypography-root {
          color: ${theme.colors.palette.darkBlue};
        }

        .MuiSvgIcon-root {
          color: ${theme.colors.palette.darkBlue};
         }

        .MuiListItemIcon-root {
          .MuiSvgIcon-root {
            color: ${theme.colors.palette.darkBlue};
           }
        }
       `
      }
    }
  `}
`;

const MuiIconButton = styled(IconButton)`
  ${({ theme, shrink }) => `
    &.MuiIconButton-root {
      width: 50px;
      height: 50px;
      color: ${theme.colors.palette.black};
      background: ${theme.colors.palette.white};
      border:  1px solid ${theme.colors.palette.lightGrey};
      position: absolute;
      top: 18px;
      right: ${shrink == "false" ? "-40px" : 0};
      transform: translateX(50%);
      filter: drop-shadow(8px 0px 25px ${theme.colors.palette.lightGrey});

      @media (min-width: ${theme.breakpoints.values.md}px) {
        top: 24px;
        right: 0;
      }
    }
  `}
`;

const LogoContainer = styled.div`
  ${({ theme, shrink }) => `
    margin-bottom: ${theme.spacing(4)};
    transition: 0.3s ease all;
    overflow: hidden;

    @media (min-width: ${theme.breakpoints.values.md}px) {
      width: ${shrink == "true" ? "40px" : "176px"};
    }
  `}
`;
