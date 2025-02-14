import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminDashboard.css';

export default function AdminDashboard({ handleLogout }) {
  // Postojeća lista klijenata
  const [clients, setClients] = useState([]);
  // Lista planova (koje kreiramo ili dobijamo sa servera)
  const [plans, setPlans] = useState([]);
  // Lista vežbi
  const [exercises, setExercises] = useState([]);
  
  // State za dodavanje treninga u plan
  const [selectedPlanForTraining, setSelectedPlanForTraining] = useState('');
  const [newTraining, setNewTraining] = useState({
    naziv_nedelje: '',
    trening_dan: '',
    vezba_naziv: '',
    tezina: '',
    broj_ponavljanja: ''
  });
  const [trainingMessage, setTrainingMessage] = useState('');
  
  // State za kreiranje novog plana
  const [newPlanName, setNewPlanName] = useState('');
  const [planMessage, setPlanMessage] = useState('');
  
  // State za dodelu plana klijentu
  const [selectedClientForPlan, setSelectedClientForPlan] = useState('');
  const [selectedPlanForAssignment, setSelectedPlanForAssignment] = useState('');
  const [assignMessage, setAssignMessage] = useState('');
  
  // State za dodelu plana ishrane klijentu
  const [selectedClientForMealPlan, setSelectedClientForMealPlan] = useState('');
  const [mealPlanLink, setMealPlanLink] = useState('');
  const [mealPlanMessage, setMealPlanMessage] = useState('');
  
  // State za kreiranje klijenta
  const [newClient, setNewClient] = useState({
    ime: '',
    prezime: '',
    email: '',
    lozinka: ''
  });
  const [clientMessage, setClientMessage] = useState('');
  
  // Učitaj sve klijente, planove i vežbe kada se komponenta mountuje
  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await axios.get('http://localhost:5000/api/admin/clients');
        setClients(clientsRes.data.clients);
        const plansRes = await axios.get('http://localhost:5000/api/admin/plans');
        setPlans(plansRes.data.plans);
        const exercisesRes = await axios.get('http://localhost:5000/api/admin/exercises');
        setExercises(exercisesRes.data.exercises);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // HANDLERS ZA DODAVANJE TRENINGA
  const handleTrainingInputChange = (e) => {
    setNewTraining({ ...newTraining, [e.target.name]: e.target.value });
  };

  const handleTrainingSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/add-training', {
        planId: selectedPlanForTraining,
        ...newTraining
      });
      setTrainingMessage('Trening je uspešno dodat!');
      setNewTraining({
        naziv_nedelje: '',
        trening_dan: '',
        vezba_naziv: '',
        tezina: '',
        broj_ponavljanja: ''
      });
    } catch (err) {
      console.error('Error adding training:', err);
      setTrainingMessage('Greška prilikom dodavanja treninga.');
    }
  };

  // HANDLER ZA KREIRANJE PLANA
  const handlePlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/create-plan', {
        naziv: newPlanName
      });
      setPlanMessage('Plan je uspešno kreiran!');
      setNewPlanName('');
      // Osveži listu planova
      const plansRes = await axios.get('http://localhost:5000/api/admin/plans');
      setPlans(plansRes.data.plans);
    } catch (err) {
      console.error('Error creating plan:', err);
      setPlanMessage('Greška prilikom kreiranja plana.');
    }
  };

  // HANDLER ZA DODELU PLANA KLIJENTU
  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/assign-plan', {
        clientId: selectedClientForPlan,
        planId: selectedPlanForAssignment
      });
      setAssignMessage('Plan je uspešno dodeljen klijentu!');
    } catch (err) {
      console.error('Error assigning plan:', err);
      setAssignMessage('Greška prilikom dodele plana.');
    }
  };

  // HANDLER ZA DODELU PLANA ISHRANE KLIJENTU
  const handleMealPlanSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/assign-meal-plan', {
        clientId: selectedClientForMealPlan,
        mealPlanLink: mealPlanLink
      });
      setMealPlanMessage('Plan ishrane je uspešno dodeljen klijentu!');
      setMealPlanLink('');
    } catch (err) {
      console.error('Error assigning meal plan:', err);
      setMealPlanMessage('Greška prilikom dodele plana ishrane.');
    }
  };

  // HANDLER ZA KREIRANJE KLIJENTA
  const handleClientInputChange = (e) => {
    setNewClient({ ...newClient, [e.target.name]: e.target.value });
  };

  const handleClientSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/create-client', newClient);
      setClientMessage('Klijent je uspešno kreiran!');
      setNewClient({ ime: '', prezime: '', email: '', password: '' });
      // Opcionalno, osveži listu klijenata
      const clientsRes = await axios.get('http://localhost:5000/api/admin/clients');
      setClients(clientsRes.data.clients);
    } catch (err) {
      console.error('Error creating client:', err);
      setClientMessage('Greška prilikom kreiranja klijenta.');
    }
  };

  return (
    <div className="admin-dashboard d-flex">
      <div className="dashb">
        <div className="left-panel">
          {/* Sekcija za dodavanje treninga u plan */}
          <div className="add-training-section">
            <h3>Dodaj novi trening u plan</h3>
            <form onSubmit={handleTrainingSubmit}>
              <div>
                <label>Izaberite plan: </label>
                <select
                  value={selectedPlanForTraining}
                  onChange={(e) => setSelectedPlanForTraining(e.target.value)}
                  required
                >
                  <option value="">--Izaberite plan--</option>
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.naziv}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Nedelja (broj): </label>
                <input
                  type="number"
                  name="naziv_nedelje"
                  value={newTraining.naziv_nedelje}
                  onChange={handleTrainingInputChange}
                  required
                />
              </div>
              <div>
                <label>Dan treninga: </label>
                <select
                  name="trening_dan"
                  value={newTraining.trening_dan}
                  onChange={handleTrainingInputChange}
                  required
                >
                  <option value="">--Izaberite dan--</option>
                  <option value="Ponedeljak">Ponedeljak</option>
                  <option value="Utorak">Utorak</option>
                  <option value="Sreda">Sreda</option>
                  <option value="Četvrtak">Četvrtak</option>
                  <option value="Petak">Petak</option>
                  <option value="Subota">Subota</option>
                  <option value="Nedelja">Nedelja</option>
                </select>
              </div>
              <div>
                <label>Naziv vežbe: </label>
                <select
                  name="vezba_naziv"
                  value={newTraining.vezba_naziv}
                  onChange={(e) =>
                    setNewTraining({ ...newTraining, vezba_naziv: e.target.value })
                  }
                  required
                >
                  <option value="">--Izaberite vežbu--</option>
                  {exercises.map((exercise) => (
                    <option key={exercise.id} value={exercise.id}>
                      {exercise.naziv}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Težina (kg): </label>
                <input
                  type="text"
                  name="tezina"
                  value={newTraining.tezina}
                  onChange={handleTrainingInputChange}
                  required
                />
              </div>
              <div>
                <label>Broj ponavljanja: </label>
                <input
                  type="text"
                  name="broj_ponavljanja"
                  value={newTraining.broj_ponavljanja}
                  onChange={handleTrainingInputChange}
                  required
                />
              </div>
              <button type="submit">Dodaj trening</button>
            </form>
            {trainingMessage && <p>{trainingMessage}</p>}
          </div>
          <div className="create-client-section">
            <h3>Kreiraj novog klijenta</h3>
            <form onSubmit={handleClientSubmit}>
              <div>
                <label>Ime: </label>
                <input
                  type="text"
                  name="ime"
                  value={newClient.ime}
                  onChange={handleClientInputChange}
                  required
                />
              </div>
              <div>
                <label>Prezime: </label>
                <input
                  type="text"
                  name="prezime"
                  value={newClient.prezime}
                  onChange={handleClientInputChange}
                  required
                />
              </div>
              <div>
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={newClient.email}
                  onChange={handleClientInputChange}
                  required
                />
              </div>
              <div>
                <label>Lozinka: </label>
                <input
                  type="password"
                  name="password"
                  value={newClient.password}
                  onChange={handleClientInputChange}
                  required
                />
              </div>
              <button type="submit">Kreiraj klijenta</button>
            </form>
            {clientMessage && <p>{clientMessage}</p>}
          </div>
        </div>

        <div className="right-panel">
          {/* Sekcija za kreiranje novog plana */}
          <div className="create-plan-section">
            <h3>Kreiraj novi plan</h3>
            <form onSubmit={handlePlanSubmit}>
              <div>
                <label>Naziv plana: </label>
                <input
                  type="text"
                  value={newPlanName}
                  onChange={(e) => setNewPlanName(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Kreiraj plan</button>
            </form>
            {planMessage && <p>{planMessage}</p>}
          </div>

          {/* Sekcija za dodelu plana klijentu */}
          <div className="assign-plan-section">
            <h3>Dodeli plan klijentu</h3>
            <form onSubmit={handleAssignSubmit}>
              <div>
                <label>Izaberite klijenta: </label>
                <select
                  value={selectedClientForPlan}
                  onChange={(e) => setSelectedClientForPlan(e.target.value)}
                  required
                >
                  <option value="">--Izaberite klijenta--</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.ime} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Izaberite plan: </label>
                <select
                  value={selectedPlanForAssignment}
                  onChange={(e) => setSelectedPlanForAssignment(e.target.value)}
                  required
                >
                  <option value="">--Izaberite plan--</option>
                  {plans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                      {plan.naziv}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit">Dodeli plan</button>
            </form>
            {assignMessage && <p>{assignMessage}</p>}
          </div>

          {/* Sekcija za dodelu plana ishrane klijentu */}
          <div className="assign-meal-plan-section">
            <h3>Dodeli plan ishrane klijentu</h3>
            <form onSubmit={handleMealPlanSubmit}>
              <div>
                <label>Izaberite klijenta: </label>
                <select
                  value={selectedClientForMealPlan}
                  onChange={(e) => setSelectedClientForMealPlan(e.target.value)}
                  required
                >
                  <option value="">--Izaberite klijenta--</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>
                      {client.ime} ({client.email})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label>Link plana ishrane: </label>
                <input
                  type="text"
                  value={mealPlanLink}
                  onChange={(e) => setMealPlanLink(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Dodeli plan ishrane</button>
            </form>
            {mealPlanMessage && <p>{mealPlanMessage}</p>}
          </div>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
}
