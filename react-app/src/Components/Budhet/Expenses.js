import React, { useEffect } from 'react';
import './Style.css';

const Expenses = ({ expenses, setExpenses, removeExpenses, user }) => {
  useEffect(() => {
    const getExpenses = async () => {
      const requestOptions = {
        method: 'GET',
      };
      try {
        const response = await fetch("https://localhost:7074/api/expenses/", requestOptions);
        const data = await response.json();
        console.log('Expenses Data:', data);
        setExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getExpenses();
  }, [setExpenses]);

  const deleteItem = async ({ expenseId }) => {
    const requestOptions = {
      method: 'DELETE',
    };
    try {
      const response = await fetch(`https://localhost:7074/api/expenses/${expenseId}`, requestOptions);
      if (response.ok) {
        removeExpenses(expenseId); // Вызываем removeExpenses после успешного удаления
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <h3>Список расходов</h3>
      {expenses.map(({ expenseId, category, amount }) => (
        <div className="Expense" key={expenseId} id={expenseId}>
          <strong>{expenseId}: {category}</strong>
          <div>Сумма: {amount}</div>
          {user.isAuthenticated ? ( // Проверяем, аутентифицирован пользователь или нет
            <button onClick={() => deleteItem({ expenseId })}>Удалить</button>
          ) : (
            <div>Удаление доступно только для аутентифицированных пользователей.</div>
          )}
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Expenses;
