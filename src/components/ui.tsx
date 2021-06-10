import * as _colors from './_design/colors';
import { Heading as _heading, Text as _text } from './_design/typography';
import { Button as _button } from './_design/buttons';
import { ToggleBtn as _toggleBtn } from './_design/buttons';
import { btnCss as _btnCss } from './_design/button-css';
import { Buying as _buying, SmallCard as _smallcard } from './_design/buying-card';
import { Box as _box } from './_design/box';
import { Input as _input } from './_design/textInputs';
import { Tags as _tags } from './_design/tags';
import { Spacing as _spacing } from './_design/spacing';
import * as _dimmed from './_design/dimmed';

// Components
export const Heading = _heading;
export const Text = _text;
export const Button = _button;
export const Input = _input;
export const Box = _box;
export const Tags = _tags;
export const Buying = _buying;
export const SmallCard = _smallcard;


// Variable
export const Colors = _colors.Colors;
export const Gradient = _colors.Gradient;


// Media Query Breakpoints
export const breakpoints = [576, 769, 992, 1100]
export const min = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
);
export const max = breakpoints.map(
  bp => `@media (max-width: ${bp-1}px)`
);

// Styles
export const ToggleBtn = _toggleBtn;
export const BtnCss = _btnCss;
export const Dimmed = _dimmed.Dimmed;
export const DimmedOnlyMobile = _dimmed.DimmedOnlyMobile;

// Method
export const Spacing = _spacing;