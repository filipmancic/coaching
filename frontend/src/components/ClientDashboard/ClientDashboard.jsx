import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ClientDashboard.css";
import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

export default function ClientDashboard({ userData, handleLogout }) {
  const [groupedData, setGroupedData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ishrana, setIshrana] = useState();

  useEffect(() => {
    const fetchPlanData = async () => {
      try {
        const user_id = userData.id;
        const response = await axios.get('http://localhost:5000/api/user/plan', { headers: { user_id } });
        const response_ishrana = await axios.get('http://localhost:5000/api/user/ishrana', {headers: {user_id}});
        setIshrana(response_ishrana.data.data[0].plan_ishrane);
        const data = response.data.data;

        // Grupisanje podataka po nedeljama i danima sa tezinom i brojem ponavljanja
        const grouped = data.reduce((acc, trening) => {
          const { nedelja_naziv, trening_dan, vezba_opis, vezba_naziv, tezina, broj_ponavljanja } = trening;

          if (!acc[nedelja_naziv]) {
            acc[nedelja_naziv] = {}; // Svaka nedelja ima dane
          }

          if (!acc[nedelja_naziv][trening_dan]) {
            acc[nedelja_naziv][trening_dan] = []; // Svaki dan ima vežbe
          }

          acc[nedelja_naziv][trening_dan].push({ vezba_naziv, vezba_opis, tezina, broj_ponavljanja }); // Dodaj vežbu kao objekat
          return acc;
        }, {});

        setGroupedData(grouped);
      } catch (err) {
        console.error("Error fetching plan data:", err);
        setError(
          err.response?.data?.message || "Greška prilikom učitavanja plana."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlanData();
  }, [userData]);

  if (loading) {
    return <div>Učitavanje podataka...</div>;
  }

  if (error) {
    return <div>Greška: {error}</div>;
  }

  return (
    <div>

      <div className="client-dashboard">
        <div className="dash">
        <div className="welcome">
          <h2>Dobrodošli, {userData.ime}</h2>
          <h3>Pregled plana treninga</h3>
          <p>Email: {userData.email} </p>
          <p>Plan: {userData.id} </p>
          <button className="button" onClick={handleLogout}>Logout</button>
        </div>
        <div className="welcome welcome-ishrana">
        <h2>Plan ishrane</h2>
        <p>Svaki plan je posebno prilagodjen korisniku i njegovim potrebama. Klikom na dugme preuzmite plan ishrane.</p>
        <a href={ishrana} target="_blank"><button className="button">Preuzmi plan ishrane</button></a>
        </div>
        </div>
        
        <div className="plan-container">
          {Object.entries(groupedData).map(([nedelja, dani], index) => (
            <div key={index} className="nedelja">
              <h4 className="nedelja-title">Nedelja br. {nedelja}</h4>
              <div className="trenizi">
                {Object.entries(dani).map(([dan, vezbe], i) => (
                  <div key={i} className="trening-card">
                    <h5>{`${dan}`}</h5>
                    <p className="pregled">Pregled treninga:</p>
                    <ul>
                      <li><Link to="/">Zagrevanje</Link></li> 
                      {vezbe.map((vezba, j) => (
                        <li key={j}>
                          <a href={vezba.vezba_opis} target="_blank">{vezba.vezba_naziv}</a> - {vezba.tezina}, {vezba.broj_ponavljanja} ponavljanja
                        </li>
                      ))}
                    </ul>
                    <p className="info">*Klikom na vezbu pogledaj tehniku pravilnog izvodjenja i vise o njoj.</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
        <Footer/>
    </div>
  );
}
