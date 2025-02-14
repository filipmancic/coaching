import React from 'react'
import './Kontakt.css'
import Footer from '../../components/Footer/Footer'
export default function Kontakt() {
  return (
    <div>
    <div className='kontakt'>
      <div className='kontakt-card d-flex'>
        <div className="card-text">
          <h1>Kontakt</h1>
          <p>Vanja Selmovic</p>
          <p className='mt'>Email</p>
          <p>cupavitrener@gmail.com</p>
          <p className='mt'>Broj telefona</p>
          <p>061 123 4567</p>
          <p className='mt'>Mozete me kontaktirati i putem drustvenih mreza</p>
          <span className='icons'>
          <img src="/img/ig.png" alt="" className="ig" />
          <img src="/img/ytt.png" alt="" className="ytt" />
          <img src="/img/tt.png" alt="" className="tt" />
        </span>
        <p className='mt'>Vidimo se na treningu! ;)</p>
        </div>
        <img src="/img/vanjasplashh.png" alt="" />
        
      </div>

    </div>
      <Footer/>
    </div>
  )
}
