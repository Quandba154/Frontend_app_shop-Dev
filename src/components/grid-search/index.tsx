import { styled, InputBase } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Iconfi from "src/components/Icon"

interface TInputSearch { }

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.common.white,
    marginLeft: "0 !important",
    height: "38px",
    width: '100%',
    border: `1px solid ${theme.palette.customColors.borderColor}`,
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    height: "100%",
    '& .MuiInputBase-input': {
        width: '100%',
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    },
}));



const InputSearch = (props: TInputSearch) => {
    const { t } = useTranslation()

    return (
        <Search>
            <SearchIconWrapper>
                <Iconfi icon="material-symbols-light:search" />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
    )
}

export default InputSearch