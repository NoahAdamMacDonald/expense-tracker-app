# Noah MacDonald

# Simply Budget Expo App
a basic budgeting app built with expo,
allows users to create a budget limit and add expenses.

# Start
1. npm install
2. Android: npm run android

# Pages
1. /tabs/index.tsx  : home screen for app
2. /tabs/budget.tsx : budgeting screen for app
3. add-expense.tsx  : expense creation

# components/constants
1. theme.ts : holds the styling for the app, currently only supports light theme
2. expensesContext.tsx : holds the expense/budgeting app context and methods for adding expenses and setting budgets.
3. parallax-scroll-view.tsx : contains the global header and styling for the Simply Budget logo

# Future Plans
1. Dark mode support
2. adding Favicon and custom icons for app brand
3. Cleaning up old left over code from previous planned stages.
4. Adding support to edit expenses
5. Adding support for multiple budgets, budget by category
6. Add filtering for expense list, currently only lists by most recent