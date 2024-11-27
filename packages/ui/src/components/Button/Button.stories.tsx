import type { Meta, StoryFn as Story } from '@storybook/react';

import { cx } from '../../cx';
import { Button, type ButtonProps, buttonVariants } from './Button';

const meta: Meta<ButtonProps> = {
  title: 'ui/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'radio',
      options: [...Object.keys(buttonVariants.variants.variant)],
    },
  },
};

export default meta;

export const ThemeColors: Story<ButtonProps> = (args) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {['primary', 'secondary', 'accent'].map((variant) => (
          <Button
            key={variant}
          {...args}
          variant={variant as ButtonProps['variant']}
        >
          {variant}
          </Button>
        ))}
      </div>

    <div className="flex flex-wrap gap-4">
      {['success', 'error', 'warning', 'info'].map((variant) => (
        <Button
          key={variant}
          solid
          {...args}
          variant={variant as ButtonProps['variant']}
        >
          {variant}
        </Button>
        ))}
      </div>
    </div>
  );
};
ThemeColors.args = {
  children: 'Brand',
};

export const Colors: Story<ButtonProps> = (args) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.keys(buttonVariants.variants.color).map((color) => (
        <Button key={color} {...args} color={color as ButtonProps['color']}>
          {color}
        </Button>
      ))}
    </div>
  );
};
Colors.args = {
  solid: true,
  children: 'Primary',
};

export const Plain: Story<ButtonProps> = (args) => {
  return <Button plain {...args} />;
};
Plain.args = {
  solid: false,
  children: 'Plain',
};

export const Outline: Story<ButtonProps> = (args) => {
  return <Button outline {...args} />;
};
Outline.args = {
  solid: false,
  children: 'Outline',
};

export const Block: Story<ButtonProps> = (args) => {
  return <Button {...args} />;
};
Block.args = {
  color: 'indigo',
  block: true,
  children: 'Block',
};

export const Disabled: Story<ButtonProps> = (args) => {
  return <Button {...args} />;
};
Disabled.args = {
  children: 'Disabled',
  color: 'indigo',
  disabled: true,
};

export const AsChildAnchor: Story<ButtonProps> = (args) => {
  return (
    <Button {...args}>
      <a href="#api-reference-button">API Reference</a>
    </Button>
  );
};

export const AnchorWithBadgeVariantsStyle: Story<ButtonProps> = (args) => {
  return (
    <div className="flex flex-wrap gap-4">
      <a className={cx(buttonVariants({ variant: 'secondary' }))} href="#api-reference-button">
        Anchor element
      </a>
    </div>
  );
};
