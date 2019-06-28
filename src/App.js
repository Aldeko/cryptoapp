import React, {useState, useEffect} from 'react';
import imagen from './cryptomonedas.png';
import Formulario from './components/Formulario';
import axios from 'axios';


function App() {
  
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('')
  
  useEffect(()=>{
    const cotizarCriptomoneda = async () =>{
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${criptomoneda}&tsyms=${moneda}`;

        const resultado = await axios.get(url)

        console.log(resultado)
    }
  },[criptomoneda, moneda])


  return (
    <div className="container">
      <div className="row">
        <div className="one-half column">
          <img src={imagen} alt="imagen criptomonedas" className="logotipo"/>
        </div>
        <div className="one-half column">
          <h1>Cotiza criptomonedas al instante</h1>

          <Formulario
            setMoneda={setMoneda}
            setCriptomoneda={setCriptomoneda}
          />
        </div>
      </div>
     
    </div>
  );
}

export default App;
