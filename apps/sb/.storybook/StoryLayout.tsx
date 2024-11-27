import Highlight, { defaultProps } from 'prism-react-renderer';
import theme from 'prism-react-renderer/themes/nightOwl';
import React, { type ReactNode, useEffect, useMemo } from 'react';

import { CodeMockup } from '@repo/ui/CodeMockup';
import Theme from '@repo/ui/Theme';
import { useGlobalTheme } from './theming';

type Props = {
  children: ReactNode | ReactNode[];
  title: string;
  description: string;
  source: string;
};

const StoryLayout = ({ children, title, description, source }: Props) => {
  const globalTheme = useGlobalTheme();

  useEffect(() => {
    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', globalTheme);
  }, [globalTheme]);

  const Code = () =>
    useMemo(
      () => (
        <Highlight {...defaultProps} theme={theme} code={source} language="jsx">
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre slot="html">
              {tokens.map((line, i) => (
                <div key={line.toString()} {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span
                      key={token.toString()}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </div>
              ))}
            </pre>
          )}
        </Highlight>
      ),
      [source],
    );

  return (
    <Theme dataTheme={globalTheme} className="w-full min-h-full h-dvh p-8 bg-base-100">
      <div className="w-full h-full my-4">
        <h1 className="text-4xl text-base-content font-bold">{title}</h1>
        <p className="text-base-content">{description}</p>
        <div className="my-4">
          <div
            className="preview border-base-300 bg-base-100 rounded-se-box rounded-b-box
                            flex min-h-[6rem] min-w-[18rem] flex-wrap items-center justify-start gap-2
                            overflow-x-hidden overflow-y-hidden border bg-cover bg-top p-4"
          >
            {children}
          </div>
        </div>
        <CodeMockup className="w-full mb-8">
          <Code />
        </CodeMockup>
      </div>
    </Theme>
  );
};

export default StoryLayout;
