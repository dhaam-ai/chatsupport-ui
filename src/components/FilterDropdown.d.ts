type FilterDropdownProps = {
    onApplyFilters?: (filters: {
        status: string[];
        priority: string[];
        category: any[];
    }) => void;
    onClearFilters?: () => void;
    statuses?: string[];
    priorities?: Array<{
        value: string | number;
        label: string;
    }>;
    categories?: Array<{
        value: number;
        label: string;
    }>;
    activeTab?: string;
};
declare const FilterDropdown: ({ onApplyFilters, onClearFilters, statuses, priorities, categories, activeTab }: FilterDropdownProps) => import("react/jsx-runtime").JSX.Element;
export default FilterDropdown;
