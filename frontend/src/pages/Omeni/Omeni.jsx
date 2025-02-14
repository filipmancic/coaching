import React from 'react'
import './Omeni.css'
import Footer from '../../components/Footer/Footer'
export default function Omeni() {
  return (
    <div className='o-meni'>
      <section className="omeni-section">
        <span>
        <h1>Obožavam da treniram i da pomažem ljudima</h1>
        <h2>Vanja Selmović</h2>
        </span>
        <img src="/img/hello.jpg" alt="Čupavi Trener" />
      </section>
      <img src="/img/splash2.png" alt="" className="splashh" />
      <div className="big-container">
      <div className='container'>
      <h3>O meni</h3>
      <p>Većina vas me zna kao Čupavi Trener, a neko me možda još uvek ne poznaje. Zato želim zvanično da vam se predstavim. Ja sam Vanja Selmović. Od malena sam bila veoma živahno i nestašno dete, i verujem da me upravo takvo odrastanje povuklo u ovaj svet – svet fitnesa.</p>
      </div>
      <div className="next">
        <img src="/img/img.jpg" alt="" />
        <div className='next-text'>
        <h3>Moji počeci</h3>
        <p>Bavila sam se gimnastikom i odbojkom, i ta ljubav i dalje traje, ali sada u rekreativnom obliku. U teretanu sam prvi put kročila sa 13–14 godina i odmah se zaljubila u pokret. Svaki put kada bih preskočila trening, osećala bih se prazno. Tada sam shvatila da je fitnes moj poziv. <br/>
            Kada mi je trenerka predložila da počnem da radim kod nje, morala sam da odbijem jer sam tada još uvek bila dete i imala školske obaveze. Krenula sam u srednju školu, ali su usledile prepreke – bolest, pandemija… Ipak, nisam odustala. Nastavila sam da treniram kod kuće, koristeći par tegova, ranac pun knjiga, balone s vodom i sve što mi je bilo dostupno. U međuvremenu, počela sam da učim sve što mogu o teretani i fitnesu.
        </p>
        </div>
      </div>
      <div className="d-flex">
        <div className="p1">
        <h3>Profesionalni razvoj</h3>
        <p>Kada je 2021. godine teretana ponovo počela da radi, moja trenerka mi je ponovo pružila priliku – da radim i kao grupni i kao personalni trener. Neizmerno sam joj zahvalna, jer mi je omogućila da radim ono što volim i da svoju strast nastavim da negujem.
        Paralelno sa radom, završavala sam srednju školu i usavršavala se. Stekla sam NASM sertifikat za personalnog trenera, kao i mnoge druge sertifikate, a planiram da nastavim sa učenjem kako bih mogla pomoći što većem broju ljudi.
        </p>
        </div>
        <div className="p2">
        <h3>Moj cilj</h3>
        <p>Bavim se fitnesom već četiri godine i moj cilj ostaje isti – da svi zavolimo rad na sebi, teretanu i zdrav način života. Želim da shvatimo da je zdravlje, kako fizičko tako i mentalno, najvažnije. Trening ne treba da bude obaveza, već zabava i način da se osećamo bolje.
         <br/><br/> <span>
          Fizički izgled nije važan bez sreće – to je poruka koju želim da prenesem svima.
          </span>
        </p>
        </div>
      </div>
      <div className="d-flex vid">
      <iframe title="Video" src="https://www.youtube.com/embed/ddYYJXLJBNc?si=X1K3fnnJ-MpLPNiD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <img className='yt' src="/img/yt.png" alt="" />
      <img className='yt2' src="/img/yt-mob.png" alt="" />
      </div>
      </div>
      <Footer/>
    </div>
  )
}
