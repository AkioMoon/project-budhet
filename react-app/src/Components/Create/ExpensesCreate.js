import React from 'react';

const ExpensesCreate = ({ addExpenses, user }) => {
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!user.isAuthenticated) {
            alert('Создание расходов доступно только для аутентифицированных пользователей.');
            return; // Завершаем выполнение, если пользователь не аутентифицирован
        }

        const { value: amount } = e.target.elements.amount; // Получаем значение суммы
        const { value: category } = e.target.elements.category || { value: '' }; // Получаем значение категории (если нужно)
        
        const expense = { amount, category }; // Создаем объект расхода

        const createExpenses = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense)
            }
            const response = await fetch("https://localhost:7074/api/expenses/", requestOptions); // Используйте правильный URL для создания расхода

            return await response.json()
                .then((data) => {
                    console.log(data);
                    if (response.ok) {
                        addExpenses(data); // Вызываем функцию для добавления расхода
                        e.target.elements.amount.value = ""; // Очищаем поле ввода суммы
                        e.target.elements.category.value = ""; // Очищаем поле ввода категории (если используется)
                    }
                },
                (error) => console.log(error));
        }
        createExpenses();
    }

    return (
        <React.Fragment>
            <h3>Создание нового расхода</h3>
            <form onSubmit={handleSubmit}>
                <label>Сумма: </label>
                <input type="number" name="amount" placeholder="Введите сумму:" required />
                {/* Если вы хотите добавить категорию, раскомментируйте следующий код */}
                {/* <label>Категория: </label>
                <input type="text" name="category" placeholder="Введите категорию:" /> */}
                <button type="submit">Создать</button>
            </form>
        </React.Fragment>
    );
}

export default ExpensesCreate;