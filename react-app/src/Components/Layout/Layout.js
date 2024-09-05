import React from "react";
import { Outlet, Link } from "react-router-dom";
import { Layout as LayoutAntd, Menu } from "antd";

const { Header, Content, Footer } = LayoutAntd;

const items = [
  {
    label: <Link to="/">Главная</Link>,
    key: "1",
  },
  {
    label: <Link to="/income">Доходы</Link>,
    key: "2",
  },
  {
    label: <Link to="/expenses">Расходы</Link>,
    key: "3",
  },
  {
    label: <Link to="/login">Вход</Link>,
    key: "4",
  },
  {
    label: <Link to="/register">Регистрация</Link>,
    key: "5",
  },
  {
    label: <Link to="/logoff">Выход</Link>,
    key: "6",
  },
];

const Layout = ({ user }) => {
  const userGreeting = user.isAuthenticated 
    ? <h4>Пользователь: {user.userName}</h4> 
    : <h4>Пользователь: Гость</h4>;

  return (
    <LayoutAntd>
      <Header style={{ position: "sticky", top: 0, zIndex: 1, width: "100%" }}>
        <div style={{ float: "right", color: "rgba(255, 255, 255, 0.65)" }}>
          {userGreeting}
        </div>
        <Menu theme="dark" mode="horizontal" items={items.filter(item => 
          user.isAuthenticated || !item.key.includes("4") && !item.key.includes("5")
        )} />
      </Header>
      <Content className="site-layout" style={{ padding: "0 50px" }}>
        <Outlet />
      </Content>
      <Footer style={{ textAlign: "center" }}>Blogging ©2023</Footer>
    </LayoutAntd>
  );
};

export default Layout;