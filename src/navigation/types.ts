export type ProfileStackParamList = {
  ProfileDetail: undefined;
  EditProfile: undefined;
  Notifications: undefined;
  Security: undefined;
  Help: undefined;
  HelpCenter: undefined;
  FAQ: undefined;
  UserGuide: undefined;
  Developer: undefined;
}; 

export type MainTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  AddTransaction: undefined;
  Budget: undefined;
  More: undefined;
  Goals: undefined;
  Reports: undefined;
  Profile: undefined;
};

export type TransactionsStackParamList = {
  TransactionsList: { forceRefresh?: boolean; timestamp?: number } | undefined;
  AddTransaction: undefined;
  EditTransaction: { transactionId: string };
  TransactionDetail: { transactionId: string };
};

export type AnalyticsStackParamList = {
  AnalyticsDashboard: undefined;
};

export type GoalsStackParamList = {
  Goals: undefined;
  AddGoal: undefined;
  EditGoal: { goalId: string };
  GoalDetail: { goalId: string };
};

export type BudgetStackParamList = {
  BudgetList: undefined;
  AddBudget: undefined;
  EditBudget: { budgetId: string };
  BudgetDetail: { budgetId: string };
};

export type ReportsStackParamList = {
  ReportsOverview: undefined;
  CategoryDetail: undefined;
  MonthlyReport: {
    month: string;
    year: string;
  };
};