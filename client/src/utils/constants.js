export const balanceInfo = [
    {
        header: "Balance",
        // info: balance,
        add: false,
    },
    {
        header: "Ingresos",
        // info: incomes,
        add: true,
        // modal: onOpenIncomeModal,
    },
    {
        header: "Gastos",
        // info: expenses,
        add: true,
        // modal: onOpenExpenseModal,
    },
]

export const filterButtons = [
    {
        key: 'incomeFilterButton',
        text: "Ingresos",
        hover: { backgroundColor: "green.200" },
        // click: filterInfo(originalInfo, 'income')
    },
    {
        key: 'clearFiltersButton',
        text: "Ver todo",
        hover: { backgroundColor: "gray.200" },
        // click: setVisibleInfo(originalInfo)
    },
    {
        key: 'expenseFilterButton',
        text: "Gastos",
        hover: { backgroundColor: "pink.200" },
        // click: filterInfo(originalInfo, 'expense')
    },
]