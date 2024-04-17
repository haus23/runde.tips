import clsx from 'clsx';
import {
  Tab,
  TabList,
  type TabListProps,
  TabPanel,
  type TabPanelProps,
  type TabProps,
  Tabs,
  type TabsProps,
  composeRenderProps,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

function _Tabs({ ...props }: TabsProps) {
  return <Tabs {...props} />;
}

interface _TabListProps<T> extends TabListProps<T> {
  className?: string;
  label?: string;
}

function _TabList<T extends object>({
  className,
  label,
  ...props
}: _TabListProps<T>) {
  return (
    <div className="flex flex-col items-center gap-x-4 border-default border-b sm:flex-row">
      {label && <span className="p-2 text-app-subtle">{label}</span>}
      <TabList
        className={clsx('flex items-center gap-x-2', className)}
        {...props}
      />
    </div>
  );
}

interface _TabProps extends TabProps {
  className?: string;
}

const tabStyles = tv({
  base: [
    'relative cursor-default border-transparent border-b-2 px-4 py-2 outline-none transition-colors',
  ],
  variants: {
    isFocusVisible: {
      true: 'after:absolute after:inset-1 after:rounded-lg after:border after:border-ring',
    },
    isHovered: {
      true: 'border-ring',
    },
    isSelected: {
      true: 'border-focused text-selected',
    },
  },
});

function _Tab({ className, ...props }: _TabProps) {
  return (
    <Tab
      className={composeRenderProps(className, (className, renderProps) =>
        tabStyles({ ...renderProps, className }),
      )}
      {...props}
    />
  );
}

interface _TabPanelProps extends TabPanelProps {
  className?: string;
}

function _TabPanel({ className, ...props }: _TabPanelProps) {
  return <TabPanel className={clsx('mt-4', className)} {...props} />;
}

export {
  _Tabs as Tabs,
  _TabList as TabList,
  _Tab as Tab,
  _TabPanel as TabPanel,
};
