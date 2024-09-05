import React, { useState } from 'react';
import ReactDOM from "react-dom/client";

import Income from './Components/Budhet/Income'
import CategoryIncome from './Components/Budhet/CategoryIncome'
import Expenses from './Components/Budhet/Expenses'
import CategoryExpenses from './Components/Budhet/CategoryExpenses'

import ExpensesCreate from './Components/Create/ExpensesCreate';
import IncomeCreate from './Components/Create/IncomeCreate';

import Layout from "./Components/Layout/Layout"
import LogIn from "./Components/LogIn/LogIn"
import LogOff from "./Components/LogOff/LogOff"
import Register from "./Components/Register/Register"; 

const CategoryIncome = ({ categories }) => {
    return (
        <div className="CategoryIncome">
            <h2>Категории доходов</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

const CategoryExpenses = ({ categories }) => {
    return (
        <div className="CategoryExpenses">
            <h2>Категории расходов</h2>
            <ul>
                {categories.map((category, index) => (
                    <li key={index}>{category}</li>
                ))}
            </ul>
        </div>
    );
};

const Income = ({ incomes }) => {
    return (
        <div className="Income">
            <h2>Доходы</h2>
            <ul>
                {incomes.map((income, index) => (
                    <li key={index}>{income}
                     {income}
                     <button onClick={() => removeIncome(index)}>Удалить</button> 
                    </li>
                ))}
            </ul>
        </div>
    );
};

const Expenses = ({ expenses }) => {
    return (
        <div className="Expense">
            <h2>Расходы</h2>
            <ul>
                {expenses.map((expense, index) => (
                    <li key={index}>{expenses}
                     {expenses}
                     <button onClick={() => removeExpenses(index)}>Удалить</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

const App = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [expenseCategories, setExpenseCategories] = useState([]);

    const addIncome = (income) => setIncomes([...incomes, income]); // Функция для добавления дохода
    const removeIncome = (removeIndex) => setIncomes(incomes.filter((_,index) => index!== removeIndex));
    const addExpenses = (expenses) => setExpenses([...expenses, expense]); // Функция для добавления расхода
    const removeExpenses = (removeIndex) => setExpenses(expenses.filter((_, index) => index !== removeIndex));

    const [user, setUser] = React.useState({ isAuthenticated: false, userName: "" });
    useEffect(() => {
        const getUser = async () => {
        return await fetch("api/account/isauthenticated")
        .then((response) => {
        response.status === 401 &&
        setUser({ isAuthenticated: false, userName: "" })
        return response.json()
        })
        .then(
        (data) => {
        if (
        typeof data !== "undefined" &&
        typeof data.userName !== "undefined"
        ) {
        setUser({ isAuthenticated: true, userName: data.userName })
        }
        },
        (error) => {
        console.log(error)
        }
        )
        }
        getUser()
        }, [setUser])

        return (
            <BrowserRouter>
            <Routes>
            <Route path="/" element={<Layout user={user} />}>
            <Route index element={<h3>Главная страница</h3>} />
            
            <Route path="/income" element={
            <>
            <IncomeCreate user={user} addIncome={addIncome} />
            <IncomeList 
                user={user}
                incomes={incomes}
                setIncomes={setIncomes}
                removeIncome={removeIncome}
            />
            </>
            } />
            
            <Route path="/expenses" element={
            <>
            <ExpenseCreate user={user} addExpense={addExpense} />
            <ExpenseList 
                user={user}
                expenses={expenses}
                setExpenses={setExpenses}
                removeExpense={removeExpense}
            />
            </>
            } />
            
            <Route path="/login" element={<LogIn user={user} setUser={setUser} />} />
            <Route path="/logoff" element={<LogOff setUser={setUser} />} />
            <Route path="/register" element={<Register setUser={setUser} />} />
            <Route path="*" element={<h3>404</h3>} />
            <Route path="/" element={<Home />} />
            </Route>
            </Routes>
            </BrowserRouter>
            
    )
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);