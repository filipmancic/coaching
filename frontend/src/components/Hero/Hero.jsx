import React from 'react'
import "./Hero.css";
import { Link } from 'react-router-dom';
export default function Hero() {
  return (
    <div className='hero'>
    <section>
      <div className="col-md-6  d-flex hero-1">
        <h1>Treniraj <span>SA ČUPAVOM</span></h1>
        <p className="p-hero">
        Pomoći ću ti da iznemniš svoje navike iz korena i napraviš transformaciju svog života. Zavoli proces napretka uz mene i unapredi kvalitet života!
        </p>
        <Link to="/programi"><button className="button">Započnimo!</button></Link>
      </div>
      <div className="col-md-6 text-center">
      <div className="circle"></div>
      <img src="/img/vanjaa.png" alt="" className="vanja-hero-img" />
      </div>
    </section>
    <div className="gradient"></div>
    </div>
  )
}
