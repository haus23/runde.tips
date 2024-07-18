// Provider
import * as Provider from './ui-provider';

// React Aria Wrappers
import * as Button from './button/button';
import * as Card from './card/card';
import * as Collapsible from './collapsible/collapsible';
import * as Divider from './divider/divider';
import * as Form from './form';
import * as Hoverbox from './hoverbox/hoverbox';
import * as Link from './link/link';
import * as DataTable from './table/data-table';
import * as Table from './table/table';
import * as Tabs from './tabs/tabs';

// App Components
import * as Icon from './icon/icon';

export default {
  ...Provider,
  ...Button,
  ...Card,
  ...Collapsible,
  ...DataTable,
  ...Divider,
  ...Form,
  ...Hoverbox,
  ...Link,
  ...Table,
  ...Tabs,
  ...Icon,
};
