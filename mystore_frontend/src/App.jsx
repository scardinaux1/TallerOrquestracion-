import { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';
import './App.css';
import superstoreimg from './superstore.png';

export const App = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [responseData, setResponseData] = useState([]); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Realizar petición POST con los campos "name" y "description"
    fetch('http://localhost:4000/categories/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponseData([data]);
      })
      .catch((error) => console.error('Error:', error));
  };

  const allCategories = () => {
    fetch('http://localhost:4000/categories/', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setResponseData(data);
      })
      .catch((error) => console.error('Error:', error));
  }

  return (
    <div className="App">
      <img src={superstoreimg} alt="Super Store" className="imagen" />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa el nombre"
          />
        </Form.Group>

        <Form.Group controlId="formDescription">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ingresa la descripción"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Enviar
        </Button>

        <Button variant="secondary" onClick={allCategories} className="mt-1">
          Categorias
        </Button>
      </Form>
      
      {responseData.length > 0  && (
        <div className="table-responsive">
          <Table striped bordered hover className="mt-4">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
            {responseData.map((responseData) => (
                <tr key={responseData.id}>
                  <td>{responseData.id}</td>
                  <td>{responseData.name}</td>
                  <td>{responseData.description}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
};