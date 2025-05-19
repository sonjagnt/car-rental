export const customStyles = {
  control: baseStyles => ({
    ...baseStyles,
    padding: '6px 8px',
    borderRadius: '12px',
    minWidth: 204,
    border: 'none',
    borderColor: 'transparent',
    boxShadow: 'none',
    backgroundColor: 'var(--inputs)',
    outline: 'none',
  }),
  indicatorSeparator: base => ({
    ...base,
    display: 'none',
  }),
  dropdownIndicator: (base, { selectProps }) => ({
    ...base,
    transform: selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)',
    transition: 'transform 0.2s ease',
  }),
  placeholder: base => ({
    ...base,
    color: 'var(--main)',
    fontWeight: 500,
  }),
  menu: base => ({
    ...base,
    maxWidth: '204px',
    backgroundColor: 'var(--white)',
    borderRadius: '12px',
    border: '1px solid var(--inputs)',
    color: 'var(--gray)',
    overflow: 'hidden',
    zIndex: 15,
    padding: '14px 8px',
    maxHeight: '272px',
  }),
  option: (base, { isSelected }) => ({
    ...base,
    color: isSelected ? 'var(--main)' : 'inherit',
  }),

  menuList: base => ({
    ...base,
    fontWeight: 500,
    '::-webkit-scrollbar': {
      width: '8px',
      height: '128px',
    },
    '::-webkit-scrollbar-track': {
      background: 'transparent',
      paddingLeft: '8px',
    },
    '::-webkit-scrollbar-thumb': {
      backgroundColor: 'var(--gray-light)',
      borderRadius: '10px',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: 'var(--gray)',
    },
  }),
};

export const theme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary25: 'var(--white)',
    primary50: 'var(--badges)',
    primary: 'var(--white)',
  },
});
