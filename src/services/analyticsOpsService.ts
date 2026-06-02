import analyticsOpsServiceDefault, { analyticsOpsService as _analyticsOpsService } from './analyticsOpsServiceStub';

// Minimal AnalyticsCard type expected by UI components
export interface AnalyticsCard {
  title: string;
  value?: string | number;
  trend?: 'up' | 'down' | 'flat' | null;
  delta?: string | number;
  helper?: string;
}

// Re-export the stubbed service under the expected name
export const analyticsOpsService = _analyticsOpsService ?? analyticsOpsServiceDefault;
export default analyticsOpsService;
