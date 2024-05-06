import {
  Tab,
  TabGroup,
  type TabGroupProps,
  TabList,
  type TabListProps,
  TabPanel,
  type TabPanelProps,
  TabPanels,
  type TabPanelsProps,
  type TabProps,
} from '@headlessui/react';
import { composeRenderProps } from 'react-aria-components';
import { twMerge } from 'tailwind-merge';
import { tv } from 'tailwind-variants';
import { composeTailwindRenderProps } from '../utils';

function _TabGroup({ ...props }: TabGroupProps) {
  return <TabGroup {...props} />;
}

interface _TabListProps extends TabListProps {
  className?: string;
  label?: string;
}

function _TabList({ className, label, ...props }: _TabListProps) {
  return (
    <div className="flex flex-col items-center gap-x-4 border-default border-b sm:flex-row">
      {label && <span className="p-2 text-app-subtle">{label}</span>}
      <TabList
        className={twMerge('flex items-center gap-x-2', className)}
        {...props}
      />
    </div>
  );
}

const tabStyles = tv({
  base: [
    'relative cursor-default border-transparent border-b-2 px-4 py-2 outline-none transition-colors',
  ],
  variants: {
    focus: {
      true: 'after:absolute after:inset-1 after:rounded-lg after:border after:border-ring',
    },
    hover: {
      true: 'border-ring',
    },
    selected: {
      true: 'border-focused text-selected',
    },
  },
});

interface _TabProps extends TabProps {
  className?: string;
}

function _Tab({ className, ...props }: _TabProps) {
  return (
    <Tab
      className={(renderProps) => tabStyles({ ...renderProps, className })}
      {...props}
    />
  );
}

function _TabPanels({ className, ...props }: TabPanelsProps) {
  return (
    <TabPanels
      {...props}
      className={composeTailwindRenderProps(className, 'mt-4')}
    />
  );
}

function _TabPanel({ ...props }: TabPanelProps) {
  return <TabPanel {...props} />;
}

export {
  _TabGroup as TabGroup,
  _TabList as TabList,
  _Tab as Tab,
  _TabPanels as TabPanels,
  _TabPanel as TabPanel,
};
