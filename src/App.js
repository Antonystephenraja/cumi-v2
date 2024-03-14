import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Outlet } from 'react-router-dom';
import { ModeProvider } from './components/ModeContext';
import Navbar from './components/Navbar';

function App() {

  return (
    <ModeProvider>
      <div className="flex">
        <div>
          <Sidebar/>
        </div>
        <div className='basis-[100%] bg-[#edf8fc] max-h-full'>
          {/* <Navbar/> */}
          <div>
            <Outlet>
            </Outlet>
          </div>
        </div>
      </div>
    </ModeProvider>
  );
}

export default App;