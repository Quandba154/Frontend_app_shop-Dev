//** React */
import React, { Fragment, useEffect, useState, useMemo } from 'react';
//** Next.js */
import { NextPage } from 'next';
// ** MUI Imports */
import List from '@material-ui/core/List';
import { Box, Collapse, ListItemButton, ListItemIcon, ListItemText, ListItemTextProps, styled, Tooltip, useTheme } from '@mui/material';
// ** ICONIFY Imports */
import IconifyIcon from "src/components/Icon"

//**Config */
import { TVertical, VerticalItem } from 'src/configs/layout';
import { useRouter } from 'next/router';
import { PERMISSIONS } from 'src/configs/permission';
import { hexToRGBA } from 'src/utils/hex-to-rgba';

//* Hook
import { useAuth } from 'src/hooks/useAuth';






type TProps = {
    open: boolean;
}

type TListItem = {
    level: number;
    openItems: { [key: string]: boolean };
    items: any;
    setOpenItems: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>
    disabled: boolean;
    setActivePath: React.Dispatch<React.SetStateAction<string | null>>
    activePath: string | null
}
interface TListItemText extends ListItemTextProps {
    active: boolean
}

const StyleListItemText = styled(ListItemText)<TListItemText>(({ theme, active }) => ({
    ".MuiTypography-root.MuiTypography-body1.MuiListItemText-primary": {
        textOverflow: "ellipsis",
        overflow: "hidden",
        display: "block",
        width: "100%",
        color: active ? `${theme.palette.primary.main} !important` : `rgba(${theme.palette.customColors.main},0.78)`,
        fontWeight: active ? 600 : 400
    }
}))


const RecursiveListItems: NextPage<TListItem> = ({ items, level, openItems, setOpenItems, disabled, setActivePath, activePath }) => {

    const theme = useTheme()
    const router = useRouter()
    const handleClick = (title: string) => {
        if (!disabled) {
            setOpenItems((prev) => ({
                [title]: !openItems[title] // lấy tên key là giá trị của title  ví dun DashBoard  = true ,  chứ không phải "DashBoard"
            }))
        }
    };

    const handleSelectItem = (path: string) => {
        setActivePath(path);
        if (path) {
            router?.push(path)
        }
    }
    const isParentHaveChildActive = (item: TVertical): boolean => {
        if (!item.childrens) {
            return item.path === activePath
        }
        return item.childrens.some((item: TVertical) => isParentHaveChildActive(item))
    }

    return (
        <>
            {items?.map((item: any) => {
                const isParentActive = isParentHaveChildActive(item)

                return (
                    <React.Fragment key={item.title}>
                        <ListItemButton

                            style={{
                                display: "flex",
                                padding: `8px 10px 8px ${level * (level === 1 ? 28 : 20)}px`,
                                margin: "1px 0",
                                backgroundColor: ((activePath && item.path === activePath) || !!openItems[item.title] || isParentActive)
                                    ? `${hexToRGBA(theme.palette.primary.main, 0.08)} !important` : theme.palette.background.paper,

                            }}
                            onClick={
                                () => {
                                    if (item.childrens) {
                                        handleClick(item.title)
                                    }
                                    if (item.path) {
                                        handleSelectItem(item.path)
                                    }
                                }
                            }

                        >
                            <ListItemIcon>
                                <Box sx={{
                                    borderRadius: "8px",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                    height: "30px",
                                    width: "30px",
                                    backgroundColor:
                                        (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                                            ? `${theme.palette.primary.main} !important`
                                            : theme.palette.background.paper,
                                }}>
                                    <IconifyIcon
                                        icon={item.icon}
                                        style={{
                                            color:
                                                (activePath && item.path === activePath) || !!openItems[item.title] || isParentActive
                                                    ? `${theme.palette.customColors.lightPaperBg}`
                                                    : `rgba(${theme.palette.customColors.main},0.78)`
                                        }}
                                    />
                                </Box>

                            </ListItemIcon>
                            {!disabled &&
                                <Tooltip title={item?.title}>
                                    <StyleListItemText
                                        active={Boolean((activePath && item.path === activePath) || !!openItems[item.title] || isParentActive)}
                                        primary={item?.title}
                                    />
                                </Tooltip>}
                            {item?.childrens?.length > 0 && (
                                <>
                                    {openItems[item.title] ? (
                                        <IconifyIcon
                                            icon="ic:twotone-expand-less"
                                            style={{
                                                transform: "rotate(180deg)",
                                                color: !!openItems[item.title] || isParentActive ? `${theme.palette.primary.main}` : `rgba(${theme.palette.customColors.main},0.78)`,
                                            }}
                                        />
                                    ) : (
                                        <IconifyIcon icon="eva:arrow-ios-downward-fill" style={{
                                            transform: "rotate(180deg)",
                                            color: isParentActive ? `${theme.palette.primary.main}` : `rgba(${theme.palette.customColors.main},0.78)`,
                                        }} />
                                    )}
                                </>
                            )}

                        </ListItemButton>
                        {
                            item?.childrens && item?.childrens.length > 0 && (
                                <>
                                    <Collapse in={openItems[item.title]} timeout="auto" unmountOnExit>
                                        <RecursiveListItems items={item.childrens} level={level + 1} openItems={openItems} setOpenItems={setOpenItems} disabled={disabled} setActivePath={setActivePath} activePath={activePath} />
                                    </Collapse>
                                </>
                            )
                        }
                    </React.Fragment >
                )
            })}
        </>
    )
}

const ListVerticalLayout: NextPage<TProps> = ({ open }) => {

    const [openItems, setOpenItems] = useState<({ [key: string]: boolean })>({});

    const [activePath, setActivePath] = useState<null | string>("")

    const { user } = useAuth()

    const permissionUser = user?.role?.permissions
        ? user?.role?.permissions?.includes(PERMISSIONS.BASIC)
            ? [PERMISSIONS.DASHBOARD]
            : user?.role?.permissions
        : []

    const listVerticalItems = VerticalItem()

    const hasPermission = (item: any, permissionUser: string[]) => {
        return permissionUser.includes(item.permission) || !item.permission
    }

    const findParentActivePath = (items: TVertical[], activePath: string) => {
        // console.log("item", { items, activePath });
        for (const item of items) {
            if (item.path === activePath) {
                return item.title
            }
            if (item.childrens && item.childrens.length > 0) {
                const child: any = findParentActivePath(item.childrens, activePath)
                if (child) {
                    return item.title
                }
            }
        }
        return null
    }

    const router = useRouter()

    const formatMenuByPermission = (menu: any[], permissionUser: string[]) => {
        if (menu) {
            return menu.filter((item) => {
                if (hasPermission(item, permissionUser)) {
                    if (item.childrens && item.childrens.length > 0) {
                        item.childrens = formatMenuByPermission(item.childrens, permissionUser)
                    }
                    if (!item?.childrens?.length && !item.path) {
                        return false
                    }

                    return true
                }
                return false
            })
        }
        return []
    }


    const theme = useTheme()

    useEffect(() => {
        if (!open) {
            setOpenItems({});
        }
    }, [open])

    const memoFormatMenu = useMemo(() => {
        if (permissionUser.includes(PERMISSIONS.ADMIN)) {
            return listVerticalItems
        }
        return formatMenuByPermission(listVerticalItems, permissionUser)
    }, [listVerticalItems, permissionUser])


    useEffect(() => {
        if (router.asPath) {
            const parentTitle = findParentActivePath(memoFormatMenu, router.asPath)
            if (parentTitle) {
                setOpenItems({
                    [parentTitle]: true
                })
            }
            setActivePath(router.asPath)
        }
    }, [router.asPath])

    const handleToggleAll = () => {
        setOpenItems({});
    };




    return (
        <List
            style={{ width: '100%', display: "flex", flexDirection: "column", maxWidth: 360, backgroundColor: 'background.paper', padding: 0 }}
            component="nav"
            aria-labelledby="nested-list-subheader"

        >
            <RecursiveListItems disabled={!open} items={memoFormatMenu} level={1} openItems={openItems} setOpenItems={setOpenItems} activePath={activePath} setActivePath={setActivePath} />
        </List >
    )
}

export default ListVerticalLayout;