import React from 'react'
import './TreningIshrana.css'

export default function TreningIshrana() {
  return (
    <div className='main ti z-auto'>
        <div className='col-md-6 d-flex switch'>
          <img src="img/trening-ishrana.png" alt="" className="trening-ishrana-img" />
        </div>
        <div className='col-md-6'>
            <h2 className='pos-rel'>2 + 2 = 4, dakle trening i ishrana</h2>
            <h3 className='pos-rel'>A je l’ mogu ja samo da dižem tegove?</h3>
            <p className='pos-rel'>Apsolutno možeš! Ukoliko si početnik i ishrana ti nije „toliko loša“, rezultati će svakako biti vidljivi, jer su treninzi intenzivni i prilagođeni tvom nivou utreniranosti. Imaš video objašnjenje svake vežbe, video poziv, mogućnost da mi pošalješ poruku, pa čak i da imamo trening mesečno (u zavisnosti od plana), tako da su rezultati neminovni.
<br/>
Međutim, nakon određenog vremena, napredak će se usporiti, i tada je poboljšanje ishrane pravi izbor za nastavak razvoja.</p>
            <h3 className='pos-rel'>Zdravo je i idealno</h3>
            <p className='pos-rel'>Zdrava ishrana nije toliko zahtevna i posle nekog vremena osetices koliko je tvoje telo zahvalno sto ga hranis kvalitetnim gorivom. Protein ce te najvise zasititi i pomoci ce ti da izgradis misice koji su ti bitni bilo da zelis da se ugojis ili da smrsas. Ugljeni hidrati ce ti dati energiju i drzace te na nogama, obavezno pre treninga! Zdrave masti ce ti drzati hormone u balansu. Dakle ne treba izbegavati ni proteine ni ugljene hidrate ni masti vec ih sve uklopiti u nas kalorijski unos koji cemo dobiti preko BMR. Možeš ga izračunati na linku ispod.
</p>
            <button className="button">Izračunaj BMI</button>
            <div className="half-circle"></div>
        </div>
    </div>
  )
}
