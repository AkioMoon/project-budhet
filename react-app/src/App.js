import React, { useState } from 'react';

function App() {
  const [user, setUser] = useState({
    isAuthenticated: false,
    userName: "",
    userRole: "", // "user" or "admin"
  });

  const loginAsUser = () => {
    setUser({
      isAuthenticated: true,
      userName: "JohnDoe",
      userRole: "user",
    });
  };

  const loginAsAdmin = () => {
    setUser({
      isAuthenticated: true,
      userName: "AdminGuy",
      userRole: "admin",
    });
  };

  const logout = () => {
    setUser({
      isAuthenticated: false,
      userName: "",
      userRole: "",
    });
  };

  return (
    <div>
      {!user.isAuthenticated ? (
        <div>
          <button onClick={loginAsUser}>Login as User</button>
          <button onClick={loginAsAdmin}>Login as Admin</button>
        </div>
      ) : (
        <div>
          <p>Welcome, {user.userName}!</p>
          {user.userRole === "admin" ? (
            <div>
              <p>У вас есть права админа.</p>
              {/* Admin-specific components */}
            </div>
          ) : (
            <div>
              <p>Вы пользователь.</p>
              {/* User-specific components */}
            </div>
          )}
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}

export default App;
