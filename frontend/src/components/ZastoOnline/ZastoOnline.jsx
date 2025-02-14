import React from 'react'
import { Link } from 'react-router-dom'
import './ZastoOnline.css'
export default function ZastoOnline() {
  return (
    <div className='main'>
        <div className='col-md-6'>
            <h2 className='pos-rel'>Da vam Čupava objasni...</h2>
            <h3 className='pos-rel'>Zašto online mentorstvo?</h3>
            <p className='pos-rel'>Uz online mentorstvo, treniraš kada tebi odgovara. Nema više brige o tome da li trener ima slobodan termin – ti biraš svoj raspored. Svaka osoba je jedinstvena, zato je svaki trening dizajniran baš za tvoje telo i tvoj cilj, bilo da želiš povećati snagu, mišićnu masu ili smanjiti telesnu mast. Dobićeš plan koji je samo tvoj.
<br/>
Iako treniraš online, moja podrška je uvek uz tebe. Pratimo tvoj napredak, proveravamo izvođenje vežbi i motivišemo se na svakom koraku. Biraš najbližu teretanu i štediš vreme koje bi inače proveo na putu do trenera.
<br/>
Bez obzira gde se nalaziš – u Beogradu, drugoj državi, na moru ili selu – plan i ja smo uvek tu. Redovno pratimo napredak i prilagođavamo plan kako bismo postigli najbolje rezultate. Usput učiš kako da treniraš, šta da jedeš i kako da postaneš najbolja verzija sebe.</p>
            <h3 className='pos-rel'>Kako funkcioniše online mentorstvo?</h3>
            <p className='pos-rel'>Popuni prijavu (polja koja se odnose na tvoj izabrani plan).
Na email ti stiže uputstvo za uplatu.
Nakon provere uplate, izrađuje se plan baš za tebe.
Plan možeš da očekuješ u roku od 3 dana.
U zavisnosti od izabranog plana, pratimo napredak, prilagođavamo ga i savetujemo se.
Spremi se da daš sve od sebe i ostvariš sve svoje ciljeve!</p>
      <Link to="/blog"><button className="button">Pročitaj više</button></Link>
            <img src="/img/questionmark.webp" alt="" className="question-mark" />
        </div>
        <div className='col-md-6 d-flex jc'>
          <img src="img/phone2.png" alt="" className="phone-img" />
        </div>
    </div>
  )
}
