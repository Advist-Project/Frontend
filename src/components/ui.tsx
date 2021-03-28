import * as _colors from './_design/colors';
import { Heading, Text } from './_design/typography';
import { Button as _button } from './_design/buttons';
import { Box as _box } from './_design/box';
import { Spacing as _spacing } from './_design/spacing';

// Components
export const Typography = {
  'Heading': Heading,
  'Text': Text
}
export const Button = _button;
export const Box = _box;

// Variable
export const Colors = _colors.Colors;
export const Gradient = _colors.Gradient;

// Method
export const Spacing = _spacing;