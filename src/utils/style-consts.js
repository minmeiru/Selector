export const colors = {
  positive: '#459df5',
  positiveHover: '#e6f7ff',
  gray: '#858e99',
  grayStreak: '#f9f9f9',
};

export const fontSizes = {
  small: '12px',
  base: '14px',
  big: '16px',
  large: '18px',
};

export const clearfix = `
  &:before {
    content: '';
    visibility: hidden;
    display: block;
    height: 0;
    zoom: 1;
    clear: both;
  }

  &:after {
    content: '';
    visibility: hidden;
    display: block;
    height: 0;
    zoom: 1;
    clear: both;
  }
`;
