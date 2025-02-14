import React from 'react'
import './Programi.css'
import { Link } from 'react-router-dom'
export default function Programi() {
  return (
    <div className="programi">
      <h2>Istaknuti programi</h2>
      <div className='cards card-sect'>
      <div className="card special">
          <h4>Student</h4>
          <h6>75€</h6>
          <h5>3 treninga nedeljno</h5>
          <div className="break"></div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Video objasnjenja vezbi</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Personalizovano za tvoj cilj</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Ebook sa 100 recepata</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Pracenje napretka na nedeljnom nivou</p>
          </div>
          <a href="" target='_blank'><button className="button">Kupi program</button></a>
        </div>
        <div className="card">
          <h4>Classic</h4>
          <h6>120€</h6>
          <h5>3 treninga nedeljno</h5>
          <div className="break"></div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Video objasnjenja vezbi</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Pracenje napretka na nedeljnom nivou</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Ebook sa 100 recepata</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Provera izvodjenja vezbi preko Whatsapp-a</p>
          </div>
          <a href="" target='_blank'><button className="button">Kupi program</button></a>
        </div>
        <div className="card">
          <h4>Premium</h4>
          <h6>200€</h6>
          <h5>4 treninga nedeljno</h5>
          <div className="break"></div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Video objasnjenja vezbi</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Pracenje napretka na nedeljnom nivou</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Plan ishrane + Ebook sa 100 recepata</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>Dostupna sam ti na Whatsapp-u svaki dan</p>
          </div>
          <div className="stavka">
            <img src="/img/check.png" alt="" className="tick" />
            <p>1 trening po tvom izboru uzivo sa mnom</p>
          </div>
          <a href="" target='_blank'><button className="button">Kupi program</button></a>
        </div>
      </div>
      <Link to='/programi'><button className="button">Pogledaj kompletnu ponudu programa</button></Link>
    </div>
  )
}
 