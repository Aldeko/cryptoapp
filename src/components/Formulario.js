import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Criptomoneda from './Criptomoneda'
import Error from './Error';

function Formulario({setMoneda, setCriptomoneda}){

    const [criptomonedas, setCripto] = useState ([]);
    const [monedaCotizar, setMonedaCotizar] = useState ('');
    const [criptoCotizar, setCriptoCotizar] = useState ('');
    const [error, setError] = useState (false);


    useEffect(()=> {
        const consultarAPI = async () =>{
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=15&tsym=USD';
            const resultado = await axios.get(url);
            
            setCripto(resultado.data.Data);
        }

        consultarAPI()
    },[])

    
    //Validar que el usuario llene ambos campos

    const cotizarMoneda = (e)=>{

        e.preventDefault();

        if(monedaCotizar === '' || criptoCotizar ===''){
            setError(true)
            return;
        }

        setError(false)

        setMoneda(monedaCotizar)
        setCriptomoneda(criptoCotizar)
    }

    const componente = (error) ? <Error mensaje="Ambos campos son obligatorios"/> : null;
    
    return(
        <form
        onSubmit={cotizarMoneda}
        >
            {componente}
            <div className="row">
                <label>Elige tu Moneda</label>
                <select 
                className="u-full-width"
                onChange={e => setMonedaCotizar(e.target.value)}
                >
                    <option value="">- Elige tu Moneda</option>
                    <option value="USD">Dolar Estadounidense</option>
                    <option value="MXN">Peso Mexicano</option>
                    <option value="GBP">Libra Esterlina</option>
                    <option value="EUR">Euro</option>
                </select>
            </div>

            <div className="row">
                <label>-Elige tu Criptomoneda</label>
                <select className="u-full-width">
                <option value="">-Elige tu Criptomoneda</option>   
                    {criptomonedas.map(criptomoneda=>(
                            <Criptomoneda
                                key={criptomoneda.CoinInfo.Id}
                                criptomoneda={criptomoneda}
                            />
                    ))}
                </select>
            </div>

            <input type="submit" className="button-primary u-full-width" value="calcular"></input>
        </form>
    )
}

export default Formulario