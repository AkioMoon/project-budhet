import React, { useEffect } from 'react';
import './Style.css';

const CategoryIncome = ({ categoriesIncome, setCategoriesIncome }) => {
  useEffect(() => {
    const getCategoriesIncome = async () => {
      const requestOptions = {
        method: 'GET',
      };
      try {
        const response = await fetch("https://localhost:7074/api/categoryincome/", requestOptions);
        const data = await response.json();
        console.log('Category Income Data:', data);
        setCategoriesIncome(data);
      } catch (error) {
        console.log(error);
      }
    };
    getCategoriesIncome();
  }, [setCategoriesIncome]);

  return (
    <React.Fragment>
      <h3>Список категорий доходов</h3>
      {categoriesIncome.map(({ categoryIncomeId, name }) => (
        <div className="CategoryIncome" key={categoryIncomeId} id={categoryIncomeId}>
          <strong>{categoryIncomeId}: {name}</strong>
          <hr />
        </div>
      ))}
    </React.Fragment>
  );
};

export default CategoryIncome;
