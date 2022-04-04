import './App.css';
import NavBar from './components/layout/NavBar/NavBar';
import { useQuery } from '@apollo/client';
import { GET_FEATURED } from './api/api';

function App() {
  const { data, loading, error } = useQuery(GET_FEATURED);

  // console.log(data);

  // const { featuredBeans } = data;

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <div className="App">
      <NavBar />
      {data?.featuredBeans.map((coffee) => (
        <li key={coffee.id}>
          <h3>{coffee.roaster}</h3>
          <h2>{coffee.name}</h2>
        </li>
      ))}
    </div>
  );
}

export default App;
