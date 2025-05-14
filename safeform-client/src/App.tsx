import LoginFormContainer from './LoginForm/LoginForm.container';
import RegisterFormContainer from './RegisterForm/RegisterForm.container';
import SafeFormContainer from './SafeForm/SafeForm.container';

function App() {
  return (
    <div className='app-container'>
      {/* <SafeFormContainer /> */}
      {/* <RegisterFormContainer /> */}
      <LoginFormContainer />
    </div>
  );
}

export default App;
