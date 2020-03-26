import React, {useEffect, useState}from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api'

import './styles.css'

import logoImg from '../../assets/logo.svg';

export default function Profile() {

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId')
    const [ incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(() => {
        api.get('profile', {
            headers:{
                    authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data)
        })
    }, [ongId]);


    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId
                }
            });

            setIncidents(incidents.filter(i => i.id !== id));
        }catch(err) {
            alert("Erro ao deletar o caso");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/')
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ongName}</span>
                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button type="button">
                    <FiPower size={18} color="#e02041" onClick={handleLogout}/>
                </button>
            </header>

            <h1> Casos Cadastrados</h1>
            <ul>
                { incidents.map(i => 
                    (
                        <li key={i.id}>
                    <strong>Caso:</strong>
                    <p> {i.title}</p>

                    <strong>DESCRIÇAO: </strong>
                    <p>{i.description}</p>

                    <strong>VALOR: </strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(i.value)}</p>
                    
                    <button type="button" onClick={() => handleDeleteIncident(i.id)}>
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                    )
                )}
            </ul>
        </div>
    )
}