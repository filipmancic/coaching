import React from 'react'
import './PitanjaIOdgovori.css'
import { Link } from 'react-router-dom'

export default function PitanjaIOdgovori() {
  return (
    <div className='pio'>
        <div className='pitanja'>
            <h3>Pitanja i odgovori</h3>
            <h5>Kako ja radim i zašto?</h5>
            <p>Od početka moje karijere, cilj mi je bio da barem jednu osobu učinim srećnijom i zdravijom. Uvek se pričalo o tome kako fizička aktivnost utiče na psihu, ali tek kada sam to videla na svom primeru i primerima svojih klijenata, postavila sam sebi cilj da osmeh, pre svega, bude merilo mog rada.
<br/>
To, naravno, uključuje moju maksimalnu posvećenost svakom klijentu u postizanju optimalnih rezultata. Broj na vagi nikada mi neće biti presudan – važan je osećaj kada se pogledate u ogledalo i budete zadovoljni onim što vidite.</p>
            <h5>Da li mogu da postignem isti rezultat kućnim treninzima?</h5>
            <p>Možeš da napraviš mali napredak, ali nakon određenog vremena progres će se usporiti, pa ćeš morati da nabaviš tegove ili da improvizuješ, recimo stavljanjem balona s vodom u ranac. 😆 Ipak, najbolji rezultati dolaze iz teretane, gde su ti dostupni tegovi i gde uvek možeš da napreduješ.</p>
            <h5>Kako merimo napredak?</h5>
            <p>Pre svega, kroz osećaj koji imaš kada se pogledaš u ogledalo i kroz lakše obavljanje svakodnevnih aktivnosti. Pored toga, slike i merenja obima tela će nam pokazati tvoj napredak. Ako si već napredniji vežbač, posle estetskih promena videćemo napredak i u kilažama koje su ti bile izazov mesecima.</p>
            <div className="buttons">
            <Link to="/o-meni"><button className="button">Procitaj vise o meni</button></Link>
                <Link to="/blog"><button className="button b2">Moj blog</button></Link>
            </div>
        </div>
        <div className='d-flex'>
        <img src="/img/splash.png" alt="" className="splash" />
        <img src="/img/vanja-qa.png" alt="" className="vanja-splash" />
        </div>
    </div>
  )
}
