import React from 'react';
import type { ReactNode } from 'react';

/**
 * PageLayout - A shared layout wrapper for all micro-frontend pages.
 * 
 * This component ensures consistent layout behavior across all micro-frontends
 * (Team, Tickets, Settings, Analytics, Customers, etc.) by providing:
 * 
 * 1. Full height container that fills the parent (main from chatsupport-main)
 * 2. Flex column layout with proper overflow handling
 * 3. Header slot for page-specific headers
 * 4. Content area that fills remaining space
 * 5. CSS-based responsive breakpoints (no JavaScript layout detection)
 * 
 * Usage:
 * ```tsx
 * <PageLayout
 *   header={
 *     <PageHeader title="Page Title" actions={<Button>Action</Button>} />
 *   }
 * >
 *   <div>Page content here</div>
 * </PageLayout>
 * ```
 */

export interface PageLayoutProps {
  /** Page header section - typically contains title, subtitle, and action buttons */
  header?: ReactNode;
  /** Main content area */
  children: ReactNode;
  /** Optional additional class names for the outer container */
  className?: string;
  /** Optional additional class names for the content area */
  contentClassName?: string;
  /** Background color class - defaults to 'bg-gray-50' */
  bgColor?: string;
}

export const PageLayout: React.FC<PageLayoutProps> = ({
  header,
  children,
  className = '',
  contentClassName = '',
  bgColor = 'bg-gray-50'
}) => {
  return (
    <div className={`h-full flex flex-col overflow-hidden ${bgColor} ${className}`}>
      {/* Header Section - Fixed at top */}
      {header && (
        <div className="flex-shrink-0 bg-white border-b border-gray-200 sticky top-0 z-40">
          {header}
        </div>
      )}

      {/* Content Section - Fills remaining space with proper overflow */}
      <div className={`flex-1 min-h-0 overflow-hidden flex flex-col px-4 lg:px-6 py-4 ${contentClassName}`}>
        {children}
      </div>
    </div>
  );
};

/**
 * PageHeader - Standard header component for page layouts
 */
export interface PageHeaderProps {
  /** Main page title */
  title: string;
  /** Optional subtitle/description */
  subtitle?: string;
  /** Action buttons/controls on the right side */
  actions?: ReactNode;
  /** Additional content below title (e.g., tabs) */
  children?: ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  subtitle,
  actions,
  children
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-lg lg:text-2xl text-gray-900 truncate font-bold">{title}</h1>
          {subtitle && (
            <p className="hidden sm:block text-sm text-gray-500 mt-0.5">{subtitle}</p>
          )}
        </div>
        {actions && (
          <div className="flex items-center flex-shrink-0 gap-2 lg:gap-3 ml-4">
            {actions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

/**
 * PageContent - Container for page content with consistent styling
 */
export interface PageContentProps {
  children: ReactNode;
  /** Whether to wrap content in a card-style container */
  card?: boolean;
  /** Additional class names */
  className?: string;
}

export const PageContent: React.FC<PageContentProps> = ({
  children,
  card = true,
  className = ''
}) => {
  if (card) {
    return (
      <div className={`bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col min-h-0 overflow-hidden flex-1 ${className}`}>
        {children}
      </div>
    );
  }
  
  return (
    <div className={`flex flex-col min-h-0 overflow-hidden flex-1 ${className}`}>
      {children}
    </div>
  );
};

/**
 * ResponsiveView - Shows/hides content based on viewport size using CSS only
 * This is the key component that prevents layout issues during SPA navigation
 */
export interface ResponsiveViewProps {
  children: ReactNode;
  /** Show only on desktop (lg: 1024px and above) */
  desktop?: boolean;
  /** Show only on mobile (below lg: 1024px) */
  mobile?: boolean;
  /** Additional class names */
  className?: string;
}

export const ResponsiveView: React.FC<ResponsiveViewProps> = ({
  children,
  desktop = false,
  mobile = false,
  className = ''
}) => {
  // CSS-based responsive visibility
  const visibilityClass = desktop 
    ? 'hidden lg:flex lg:flex-col' 
    : mobile 
      ? 'flex flex-col lg:hidden' 
      : 'flex flex-col';

  return (
    <div className={`${visibilityClass} flex-1 min-h-0 overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default PageLayout;
