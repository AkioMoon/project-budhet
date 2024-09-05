import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input } from "antd";

const LogIn = ({ user, setUser }) => {
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const logIn = async (values) => {
    const { email, password } = values;

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    return await fetch("api/account/login", requestOptions)
      .then((response) => {
        response.status === 200 &&
          setUser({ isAuthenticated: true, userName: "" });
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        if (typeof data !== "undefined" && typeof data.userName !== "undefined") {
          setUser({ isAuthenticated: true, userName: data.userName });
          navigate("/");
        }
        if (typeof data !== "undefined" && typeof data.error !== "undefined") {
          setErrorMessages(data.error);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderErrorMessage = () => 
    errorMessages.map((error, index) => <div key={index}>{error}</div>);

  return (
    <>
      {user.isAuthenticated ? (
        <h3>Пользователь {user.userName} успешно вошел в систему</h3>
      ) : (
        <>
          <h3>Вход</h3>
          <Form
            onFinish={logIn}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Пожалуйста, введите свой email!" },
              ]}
            >
              <Input placeholder="Логин" />
            </Form.Item>
            <Form.Item
              label="Пароль"
              name="password"
              rules={[
                { required: true, message: "Пожалуйста, введите свой пароль!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
              <Checkbox>Запомнить меня</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Войти
              </Button>
            </Form.Item>
            {renderErrorMessage()}
          </Form>
        </>
      )}
    </>
  );
};

export default LogIn;
