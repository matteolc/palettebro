import type { Meta, StoryFn as Story } from '@storybook/react';

import { cx } from '../../cx';
import { Badge, type BadgeProps, badgeVariants } from './Badge';

const meta: Meta<BadgeProps> = {
  title: 'Data Display/Badge',
  component: Badge,
  args: {
    children: 'Badge',
  },
  parameters: {
    docs: {
      page: null,
    },
  },
  argTypes: {},
};

export default meta;

export const ThemeColors: Story<BadgeProps> = (args) => {
  return (
    <div className="flex gap-4 flex-col justify-center items-start">
      <div className="flex gap-2 items-center">
        {['primary', 'secondary', 'accent'].map((color) => (
          <Badge key={color} variant={color as keyof typeof badgeVariants.variants.variant}>
            {color}
          </Badge>
        ))}
      </div>

      <div className="flex flex-wrap gap-4">
        {[
          'info',
          'success',
          'warning',
          'error',
        ].map((color) => (
          <Badge key={color} variant={color as keyof typeof badgeVariants.variants.variant}>
            {color}
          </Badge>
        ))}
      </div>
    </div>
  );
};
ThemeColors.args = {
};

export const Colors: Story<BadgeProps> = (args) => {
  return (
    <div className="flex flex-wrap gap-4">
      {Object.keys(badgeVariants.variants.color).map((color) => (
        <Badge
          brand="default"
          key={color}
          color={color as keyof typeof badgeVariants.variants.color}
        >
          {color}
        </Badge>
      ))}
    </div>
  );
};

export const Outline: Story<BadgeProps> = (args) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        {Object.keys(badgeVariants.variants.color).map((color) => (
          <Badge outline key={color} color={color as keyof typeof badgeVariants.variants.color}>{color}</Badge>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {[
          'info',
          'success',
          'warning',
          'error',
        ].map((color) => (
          <Badge outline key={color} variant={color as keyof typeof badgeVariants.variants.variant}>
            {color}
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 items-center">
        {[
          'primary',
          'secondary',
          'accent',
        ].map((color) => (
          <Badge outline key={color} variant={color as keyof typeof badgeVariants.variants.variant}>
            {color}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export const Sizes: Story<BadgeProps> = (args) => {
  return (
    <div className="flex gap-2 items-center">
      <Badge {...args}>
        <span className='text-4xl'>987,654</span>
      </Badge>
      <Badge {...args}>
        <span className='text-xl'>987,654</span>
      </Badge>
      <Badge {...args}>
        <span className='text-xs'>987,654</span>
      </Badge>
    </div>
  );
};
Sizes.args = {
  color: 'red',
  outline: true,
}


export const AnchorWithBadgeVariantsStyle: Story<BadgeProps> = (args) => {
  return (
    <div className="flex flex-wrap gap-4">
      <a
        href="#anchor"
        className={cx(badgeVariants({ variant: 'success' }), 'cursor-pointer')}
      >
        Anchor element
      </a>
    </div>
  );
};