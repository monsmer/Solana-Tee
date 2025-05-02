import React, { useEffect, useState } from 'react';

function App() {
  const [theme, setTheme] = useState(window.Telegram.WebApp.themeParams.bg_color);

  useEffect(() => {
      document.body.style.backgroundColor = window.Telegram.WebApp.themeParams.bg_color
      
      window.Telegram.WebApp.onEvent('themeChanged', () => {
          setTheme(window.Telegram.WebApp.themeParams.bg_color); // Update theme when changed
          document.body.style.backgroundColor = window.Telegram.WebApp.themeParams.bg_color;
      });
  }, []);

  return (
    <div className="App" style={{backgroundColor: theme, color: window.Telegram.WebApp.themeParams.text_color}}>
      <header className="App-header">
        <h1>Welcome to Solana-Tee Mini App!</h1>
        <p>This is a basic Telegram Mini App.</p>
      </header>
    </div>
  );
}

export default App;
