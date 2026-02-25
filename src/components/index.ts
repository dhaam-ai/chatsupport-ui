
// Components barrel export
export { default as AgentTable } from './AgentTable';
export type { AgentTableProps, Agent } from './AgentTable';

export { default as ReusableTable } from './ReusableTable';
export type { GenericTableProps, TableColumn, TableRow } from './ReusableTable';

export { default as ResponsiveAgentTable } from './ResponsiveAgentTable';
export type { ResponsiveCardTableProps, ResponsiveItem } from './ResponsiveAgentTable';
export { default as ResponsiveCardTable } from './ResponsiveAgentTable';

export { default as FilterDropdown } from './FilterDropdown';
export type { FilterDropdownProps } from './FilterDropdown';

export { default as CustomDropDown } from './CustomDropDown';

// Layout Components - Shared across all micro-frontends
export { 
  PageLayout, 
  PageHeader, 
  PageContent, 
  ResponsiveView 
} from './PageLayout';
export type { 
  PageLayoutProps, 
  PageHeaderProps, 
  PageContentProps, 
  ResponsiveViewProps 
} from './PageLayout';
