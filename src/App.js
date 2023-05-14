import './App.css';
import Router from './router';
import BackGroundOne from './components/Animations/background/style1/bgani_one'

function App() {
  return (
    <div className="App">
        <BackGroundOne />
        <div className='screens'>
          <Router />
        </div>
    </div>
  );
}

export default App;
