import type { FormHTMLAttributes } from 'react';

export type FormProps = FormHTMLAttributes<HTMLFormElement> & {
  method?: string;
  action?: string;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
  children?: React.ReactNode;
};
