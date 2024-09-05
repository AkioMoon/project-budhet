import React, { useEffect } from 'react';
import './Style.css';

const CategoryExpenses = ({ categoriesExpenses, setCategoriesExpenses }) => {
  useEffect(() => {
    const getCategoriesExpenses = async () => {
      const requestOptions = {
        method: 'GET',
      };
      try {
        const response = await fetch("https://localhost:7074/api/categoryexpenses/", requestOptions);
        const data = await response.json();
        console.log('Category Expenses Data:', data);
        setCategoriesExpenses(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesExpenses();
  }, [setCategoriesExpenses]);

  return (
    <React.Fragment>

<h3>Список категорий расходов</h3>
      {categoriesExpenses.map(({ categoryExpenseId, name }) => (
        <div className="CategoryExpense" key={categoryExpenseId} id={categoryExpenseId}>
          <strong>{categoryExpenseId}: {name}</strong>
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
};

export default CategoryExpenses;