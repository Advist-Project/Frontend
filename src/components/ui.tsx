import { Heading, Text } from './_design/typography';
import { Button } from './_design/buttons';
import { Input } from './_design/textInputs';
import { Buying } from './_design/buying';
import * as _colors from './_design/colors';
import { Box as _box } from './_design/box';
import { Spacing as _spacing } from './_design/spacing';

// Typography
export const Typography = {
  'Heading': Heading,
  'Text': Text
}

export const DesignButton = {
  'Button' : Button
}

export const TextInputs = {
  'Input' : Input
}

export const BuyProduct = {
  'Buying' : Buying
}

export const Colors = _colors.Colors;
export const Gradient = _colors.Gradient;
export const Box = _box;
export const Spacing = _spacing;