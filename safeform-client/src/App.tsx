import { useState } from 'react';
import LoginFormContainer from './LoginForm/LoginForm.container';
import RegisterFormContainer from './RegisterForm/RegisterForm.container';
import SafeFormContainer from './SafeForm/SafeForm.container';

function App() {
  const [view, setView] = useState<'register' | 'login' | 'safeform'>('register');

  return (
    <div className='app-container'>
      <nav className="navigation">
        <button onClick={() => setView('register')}>Inscription</button>
        <button onClick={() => setView('login')}>Connexion</button>
        <button onClick={() => setView('safeform')}>SafeForm</button>
      </nav>

      {view === 'register' && <RegisterFormContainer />}
      {view === 'login' && <LoginFormContainer />}
      {view === 'safeform' && <SafeFormContainer />}

    </div>
  );
}

export default App;
