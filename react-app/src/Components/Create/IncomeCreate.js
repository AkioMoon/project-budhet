import React from 'react';

const IncomeCreate = ({ user, addIncome }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const { value } = e.target.elements.amount;
        const income = { amount: value };

        const createIncome = async () => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(income),
            };
            const response = await fetch("https://localhost:7074/api/incomes/", requestOptions);

            return await response.json()
                .then((data) => {
                    console.log(data);
                    if (response.ok) {
                        addIncome(data);
                        e.target.elements.amount.value = "";
                    }
                },
                (error) => console.log(error)
                );
        };

        createIncome();
    };

    return (
        <React.Fragment>
            <h3>Создание нового дохода</h3>
            {user.isAuthenticated ? ( // Проверяем, аутентифицирован пользователь или нет
                <form onSubmit={handleSubmit}>
                    <label>Сумма: </label>
                    <input type="text" name="amount" placeholder="Введите сумму:" required />
                    <button type="submit">Создать</button>
                </form>
            ) : (
                <div>Создание дохода доступно только для аутентифицированных пользователей.</div>
            )}
        </React.Fragment>
    );
};

export default IncomeCreate;