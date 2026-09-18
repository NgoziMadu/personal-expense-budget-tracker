// I am building a personal-expense-budget-tracker
const  transactions = [];
let monthlyBudget = 150000


function addTransaction( id, type, category, description, amount, date) {
 
//  Transaction Id Input Validation   
    if (typeof id !== "number" || id <= 0) {
        console.log("Invalid transaction ID.")
        return;
    }

//  Transaction Amount Input Validation
    
    if (typeof amount !== "number" || amount <= 0) {
        console.log("Invalid transaction amount.");
        return;
    }
//  Type Input Validation
    if (type !== "income" && type !== "expense") {
        console.log("transaction type must be income or expense.")
        return;

    }
//  Date Input Validation
    const transactionDate = new Date(date);

    if (isNaN(transactionDate.getTime())) {
        console.log("Invalid transaction date.");
        return;
    }

 //  Duplicate Id Input Validation

    const existingTransaction = transactions.find(function(transaction) {
        return transaction.id === id;
    });

    if (existingTransaction) {
        console.log("Transaction ID already exists.")
        return;
    }



    const transaction = {
        id: id,
        type: type,
        category: category,
        description: description,
        amount: amount,
        date: date

    };
    transactions.push(transaction)   
}

   addTransaction(
    1,
    "expense",
    "Food",
    "Lunch",
    4500,
    "2026-09-05"
);

addTransaction(
    2,
    "expense",
    "Transport",
    "Uber",
    8000,
    "2026-09-06"
);

addTransaction(
    3,
    "income",
    "Salary",
    "Monthly Salary",
    300000,
    "2026-09-07"
);

addTransaction(
    4,
    "income",
    "Freelance",
    "Website Project",
    500000,
    "2026-09-07"
);

addTransaction(
    5,
    "expense",
    "Food",
    "Groceries",
    25000,
    "2026-09-07" 
);

addTransaction(
    6,
    "expense",
    "Bills",
    "Electricity",
    18000,
    "2026-09-07" 
);

addTransaction(
    7,
    "expense",
    "Personal Care",
    "saloon",
    15000,
    "2026-09-05"
);

addTransaction(
    8,
    "income",
    "Business",
    "Phone Sale",
    220000,
    "2026-09-07"
);

addTransaction(
    9,
    "expense",
    "Shopping",
    "Clothes",
    40000,
    "2026-09-05"
);

addTransaction(
    10,
    "expense",
    "Food",
    "Dinner",
    12000,
    "2026-09-07"
);



console.log(transactions);

// To remove an object in an array 

function removeTransaction(id) {
    const index = transactions.findIndex((transaction) => transaction.id === id);
    if (index === -1) {
        console.log("Transaction ID is not found");
        return;
     
    }

    transactions.splice(index, 1);
}

// TO display all transactions

function displayAllTransactions() {
    console.log(transactions);
}
displayAllTransactions();

// To display income transactions

function displayIncomeTransactions() {

    const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
    return incomeTransactions;

}

console.log(displayIncomeTransactions());

// Display expense transactions

function displayExpenseTransactions() {
    const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
    return expenseTransactions;
}

console.log(displayExpenseTransactions());

// Calculate total income

function calculateTotalIncome() {
    const incomeTransactions = transactions.filter((transaction) => transaction.type === "income");
    const totalIncome = incomeTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    return totalIncome;
}

// Calculate total expense

function calculateTotalExpenses() {
    const expenseTransactions = transactions.filter((transaction) => transaction.type === "expense");
    const totalExpenses = expenseTransactions.reduce((total, transaction) => total + transaction.amount, 0);
    return totalExpenses;
}


// Calculate the current balance: Balance = Total Income - Total Expenses.

function calculateCurrentBalance() {
    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const currentBalance = totalIncome - totalExpenses;

    return currentBalance;
}

console.log(calculateCurrentBalance()); 

// Calculate how much was spent in a particular category.

function calculateCategoryExpenses(category) {
    const categoryExpenses = transactions.filter(function(transaction) {
        return transaction.type === "expense" && transaction.category === category;
    });
    const totalSpent = categoryExpenses.reduce(function(total, transaction) {
        return total + transaction.amount;
    }, 0);

    return totalSpent;
}

console.log(calculateCategoryExpenses("Food"));

//  Find the highest expense.

function findHighestExpense() {
    const expenseTransactions = transactions.filter(function(transaction) {
        return transaction.type === "expense";

    }
);

if (expenseTransactions.length === 0) {
    return null;
}

const highestExpense = expenseTransactions.reduce(function(highest, transaction) {
    if(transaction.amount > highest.amount) {
        return transaction;
    }
    else {
        return highest;
    }
});

return highestExpense;
}

console.log(findHighestExpense());

// find the lowest expense

function findLowestExpense() {
    const expenseTransactions = transactions.filter(function(transaction) {
        return transaction.type === "expense";
    });

    if (expenseTransactions.length === 0) {
        return null;
    }

    const lowestExpense = expenseTransactions.reduce(function(lowest, transaction) {
        if(transaction.amount < lowest.amount) {
            return transaction;
        }
        else {
            return lowest;
        }
    });

    return lowestExpense;
}

console.log(findLowestExpense());

// Calculate average expense

function calculateAverageExpense() {
    const expenseTransactions= transactions.filter(function(transaction) {
        return transaction.type === "expense";
    });

    if (expenseTransactions.length === 0) {
        return 0;
    }

 // we are usibng the function up there called calculateTotalExpenses to get the total expenses and then divide it by the number of expense transactions to get the average expense.

    const totalExpenses = calculateTotalExpenses();
    const averageExpense = totalExpenses / expenseTransactions.length;
    return averageExpense;
}

console.log(calculateAverageExpense());

// Find transactions made between two dates

function getTransactionsBetweenDates(startDate, endDate) {
    const start = new Date (startDate);
    const end = new Date (endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.log ("Invalid date.");
        return[];

    }

    if (start > end) {
    console.log("Start date cannot be later than end date.");
    return [];
}

    const transactionsBetweenDates = transactions.filter(function(transaction) {
        const transactionDate = new Date(transaction.date);

        return transactionDate >= start && transactionDate <= end;
    }
);
    return transactionsBetweenDates;
}

console.log(getTransactionsBetweenDates("2026-09-06", "2026-09-08"));

//  Display transactions from the current month.
 function getcurrentMonthTransactions() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const currentMonthTransactions = transactions.filter(function(transaction) {
        const transactionDate = new Date (transaction.date);
        return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear;
 
 
    });
    return currentMonthTransactions;
 }

 console.log(getcurrentMonthTransactions());

//  Search transactions by description.

function TransactionsByDescription(searchTerm) {

    if (typeof searchTerm !== "string" || searchTerm.trim() === "") {
        return [];
    }

    const cleanSearchTerm = searchTerm.trim().toLowerCase();
    const matchingTransactions = transactions.filter(function(transaction) {
        return transaction.description.toLowerCase().includes(cleanSearchTerm);
     
});

    return matchingTransactions;

}

   console.log(TransactionsByDescription("  Lunch "));



//  Create a monthly financial report.

function monthlyReport () {

    const totalIncome = calculateTotalIncome();
    const totalExpenses = calculateTotalExpenses();
    const currentBalance = calculateCurrentBalance();
    const highestExpense = findHighestExpense();
    const lowestExpense = findLowestExpense();
    const averageExpense = calculateAverageExpense();
    const totalTransactions = transactions.length;
     
     const report = `
     -------SEPTEMBER REPORT-------
     Total Income: ${totalIncome.toLocaleString()}
     Total Expenses: ${totalExpenses.toLocaleString()}
     Balance: ${currentBalance.toLocaleString()}

     Highest Expense: 
     ${highestExpense.description} - #${highestExpense.amount.toLocaleString()}

     Lowest Expense: ${lowestExpense.description} - #${lowestExpense.amount.toLocaleString()}

     Average Expense: #${averageExpense.toLocaleString()}

     Total Transactions: ${totalTransactions}
     `;
     return report;
    }

    console.log(monthlyReport());

    // Budget Feature

    function budgetReport() {
        const amountSpent = calculateTotalExpenses();
        const budgetUsed = (amountSpent / monthlyBudget) * 100;
        const remainingBudget = monthlyBudget - amountSpent;
        
        const formattedBudgetUsed = budgetUsed.toFixed(2);
        if (budgetUsed > 100){
            console.log ("warning: monthly budget exceeded.");
        }

        else if (budgetUsed  > 80) {
            console.log("warning: you have used more than 80% of your monthly budget.")
        }

        const report = `
        -------MONTHLY BUDGET REPORT-------
        Monthly Budget: #${monthlyBudget.toLocaleString()}
        Amount Spent: #${amountSpent.toLocaleString()}
        Budget Used: ${formattedBudgetUsed}%
        Remaining Budget: ₦${remainingBudget.toLocaleString()}

        `;

      return report;

    }

    console.log(budgetReport());

    // Timers

    const timer = setInterval(function() {
      console.log("Current Balance:", calculateCurrentBalance());
      console.log(budgetReport());    
      
    }, 10000);

    setTimeout(function() {
        clearInterval(timer);
        console.log("Budget timer stopped.")
    }, 35000);

    /*Hoisting : Javascript lets you call a function before the line where the function is declared without given an error.
    this is possible  to prevent  errors  through javascript scanning or processing function declaration  first before  it starts excuting codes line by line */

    showProjectMessage();

      function showProjectMessage() {
      console.log("Personal Expense Budget Tracker.");
    }

   

  

    
   
