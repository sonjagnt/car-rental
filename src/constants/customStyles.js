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
    backgroundColor: 'var(--white)',
    borderRadius: '12px',
    border: '1px solid var(--inputs)',
    color: 'var(--gray)',
    overflow: 'hidden',
    zIndex: 15,
  }),
};
