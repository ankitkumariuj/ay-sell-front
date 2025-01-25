import React, { useState } from 'react'

const Faq = () => {

    const[icon, setIcon] = useState('fa-plus')
  const[icons, setIcons] = useState('fa-plus')
  const[icones, setIcones] = useState('fa-plus')
  const[iconses, setIconses] = useState('fa-plus')

    const sd=()=>{
        const x = document.getElementById('show');
       
        if (x.style.display === 'block') {
          x.style.display = 'none';
         setIcon('fa-plus');
          
        } else {
          x.style.display = 'block';
          setIcon('fa-minus');
         
        }
      }
    
      const sdy=()=>{
        const y = document.getElementById('showtwo');
        if (y.style.display === 'block') {
        
          y.style.display = 'none'; 
          setIcons('fa-plus');
        } else {
          y.style.display = 'block';
          setIcons('fa-minus');
        }
      }
    
      const sdz=()=>{
        const z = document.getElementById('showthree');
        if (z.style.display === 'block') {
        
          z.style.display = 'none'; 
          setIcones('fa-plus');
        } else {
          z.style.display = 'block';
          setIcones('fa-minus');
        }
      }
    
      const sdw=()=>{
        const w = document.getElementById('showfour');
        if (w.style.display === 'block') {
        
          w.style.display = 'none'; 
          setIconses('fa-plus');
        } else {
          w.style.display = 'block';
          setIconses('fa-minus');
        }
      }

  return (
    <div>
       <section id="faqs"   className="faq_wrapper mb-5">
      <div   className="container">
      <div   className="row4">
        <div   className="col-12 text-center mb-5">
          <p   className="faq_subtitle">We're here to help</p>
          <h2   className="faq_title">Frequently asked questions</h2>
          </div>
          </div>
          <div   className="row2">
            <div   className="col-sm-12 col-lg-7 mb-5 mb-lg-0">
     
                <div   className="accordion-item"><h2   className="accordion-header" id="headingTwo">
                  <button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">1. Can I buy a car online? <i   className={`fa ${icon}`} onClick={sd} ></i></button></h2>
                  <div id="collapseTwo"   className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div   className="accordion-body" id='show'>Yes, you can. Ay-sell is pleased to offer online car buying! Start your vehicle search right here on our Inventory page. Without ever leaving home, you can shop for your next vehicle and get pre-approved all on our site. Contact us if you are interested in a vehicle, and we'll bring it to you for a test drive.
                   </div></div></div>
                   <div   className="accordion-item"><h2   className="accordion-header" id="headingThree"><button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">2. How many cars are currently available at Ay-sell? <i   className={`fa ${icons}`} onClick={sdy}></i></button></h2>
                   <div id="collapseThree"   className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div   className="accordion-body" id='showtwo'>We offer an extensive selection of top-tier car brands available in bulk quantities. You can effortlessly find the car you desire by either using the search bar or by navigating to the 'Cars' section in our menu.                                       
                       </div></div></div><div   className="accordion-item"><h2   className="accordion-header" id="headingFour">
                        <button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">3. Do you offer express service? <i   className={`fa ${icones}`} onClick={sdz}></i></button></h2>
                        <div id="collapseFour"   className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
                          <div   className="accordion-body" id='showthree'>Yes. If you're in need of a quick check or procedure, we encourage you to take advantage of our express  we can take care of it for you quickly and accurately.</div></div></div>
                          <div   className="accordion-item"><h2   className="accordion-header" id="headingFive"><button   className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">4. How many brands are available at Ay-sell? <i   className={`fa ${iconses}`} onClick={sdw}></i></button></h2>
                          <div id="collapseFive"   className="accordion-collapse collapse" aria-labelledby="headingFive" data-bs-parent="#accordionExample">
                            <div   className="accordion-body" id='showfour'>We offer a wide array of premium car brands and accessories for your exploration. You can access these options by navigating to the 'Brands' section.
                              </div>
                              </div>
                              </div>
                              </div>
                         <center> </center> 
                              </div>
                          <div   className="col-sm-12 col-lg-4">
                          </div>
                          </div>
                          
    </section>
    </div>
  )
}

export default Faq
