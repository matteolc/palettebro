import type { Meta, StoryFn as Story } from '@storybook/react';
import { ColorPaletteContainer, ColorPaletteReference } from './ColorPaletteReference';

const meta: Meta<typeof ColorPaletteReference> = {
	title: 'ui/Colors',
	component: ColorPaletteReference,
	argTypes: {},
};

export default meta;

export const Default: Story<typeof ColorPaletteReference> = (args) => {
	return <ColorPaletteReference {...args} />;
};
Default.args = {
	colors: [
		'slate',
		'gray',
		'zinc',
		'neutral',
		'stone',
		'red',
		'orange',
		'amber',
		'yellow',
		'lime',
		'green',
		'emerald',
		'teal',
		'cyan',
		'sky',
		'blue',
		'indigo',
		'violet',
		'purple',
		'fuchsia',
		'pink',
		'rose',
	],
};

export const ThemeColors: Story<typeof ColorPaletteContainer> = (args) => {
	return (
		<ColorPaletteContainer {...args} />
	);
};
ThemeColors.args = {
	colors: ['info', 'success', 'warning', 'error', 'primary', 'secondary', 'accent', 'neutral']
};
