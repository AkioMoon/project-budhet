import React, { useEffect } from 'react';
import './Style.css';

const Income = ({ user, incomes, setIncomes, removeIncome }) => {
  useEffect(() => {
    const getIncomes = async () => {
      const requestOptions = {
        method: 'GET',
      };
      return await fetch("https://localhost:7074/api/incomes/", requestOptions)
        .then(response => response.json())
        .then(
          (data) => {
            console.log('Income Data:', data);
            setIncomes(data);
          },
          (error) => {
            console.log(error);
          }
        );
    };
    getIncomes();
  }, [setIncomes]);

  const deleteItem = async ({ incomeId }) => {
    const requestOptions = {
      method: 'DELETE',
    };
    return await fetch(`https://localhost:7074/api/incomes/${incomeId}`, requestOptions)
      .then((response) => {
        if (response.ok) {
          removeIncome(incomeId); // Вызываем removeIncome после успешного удаления
        }
      },
      (error) => console.log(error)
    );
  };

  return (
    <React.Fragment>
      <h3>Список доходов</h3>
      {incomes.map(({ incomeId, source, amount }) => (
        <div className="Income" key={incomeId} id={incomeId}>
          <strong>{incomeId}: {source}</strong>
          <div>Сумма: {amount}</div>
          {user.isAuthenticated ? (
            <button onClick={() => deleteItem({ incomeId })}>Удалить</button>
          ) : (
            <div>Удаление недоступно для гостей</div>
          )}
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
};

export default Income;