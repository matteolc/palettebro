import type React from 'react';
import { forwardRef } from 'react';

import { type VariantProps, tv } from 'tailwind-variants';
import { cx } from '../../cx';
import type { IComponentBaseProps } from '../../types';

const mockupLineVariants = tv({
  variants: {
    status: {
      info: 'bg-info text-info-content',
      success: 'bg-success text-success-content',
      warning: 'bg-warning text-warning-content',
      error: 'bg-error text-error-content',
    },
  },
});

export type CodeMockupLineProps = React.HTMLAttributes<HTMLPreElement> &
  IComponentBaseProps & {
    dataPrefix?: string | boolean;
    status?: VariantProps<typeof mockupLineVariants>['status'];
    innerProps?: React.HTMLAttributes<HTMLElement>;
    innerRef?: React.Ref<HTMLElement>;
  };

export const CodeMockupLine = forwardRef<HTMLPreElement, CodeMockupLineProps>(
  (
    {
      dataPrefix,
      dataTheme,
      status,
      className,
      children,
      innerProps,
      innerRef,
      ...props
    },
    ref,
  ): JSX.Element => {
    const allProps = {
      ...props,
      ...(dataPrefix !== false && { 'data-prefix': dataPrefix || '>' }),
    } as Record<string, any>;

    return (
      <pre
        {...allProps}
        className={cx(mockupLineVariants({ status }), className)}
        data-theme={dataTheme}
        ref={ref}
      >
        <code {...innerProps} ref={innerRef}>
          {children}
        </code>
      </pre>
    );
  },
);

CodeMockupLine.displayName = 'CodeMockup.Line';
