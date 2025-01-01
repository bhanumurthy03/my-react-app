import logo from './logo.svg';
import './App.css';
import SideBySideGrid from './DocumentUpload';
import Table from './Table';


function App() {
  return (
    <div className="App">
      <header className="App-header">       
        <SideBySideGrid />
        <div className="table-container">
          <Table />
        </div>
      </header>
    </div>
  );
}

export default App;
