// src/App.js

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardMobile from './DashboardMobile';
import Login from './Login';
import Cadastro from './Cadastro';
import CriarTicket from './CriarTicket';
import Planos from './Planos';
import PlanoDetalhes from './PlanoDetalhes';
import Financeiro from './Financeiro';
import MinhaFatura from './MinhaFatura';
import Duvidas from './Duvidas';
import Perfil from './Perfil';
import Footer from './Footer';
import Home from './Home';
import Header from './Header'; // Importa o Header
import MeuWifi from './MeuWiFi';
import TodosOsDispositivos from './TodosOsDispositivos';
import TodosHosts from './TodosHosts';
import ConsentPopup from './ConsentPopup'; // Importa o Popup de consentimento
import PrivacyPolicy from './PrivacyPolicy';  // Importando a página de privacidade

import './App.css';

function App() {
  const [dadosCliente, setDadosCliente] = useState(null);
  const [footerValue, setFooterValue] = useState(0);
  const [primaryColor, setPrimaryColor] = useState('#28a745');
  const [headerIconColor, setHeaderIconColor] = useState('#28a745');
  const [footerIconColor, setFooterIconColor] = useState('#28a745');
  const [modulosPermitidos, setModulosPermitidos] = useState([]);
  const [hasConsented, setHasConsented] = useState(false); // Novo estado para controle do consentimento

  const modulesTableId = 'msafdyz6sew21f1';
  const colorsTableId = 'mn37trxp7ai1efw';
  const token = 'ZqFzoCRvPCyzSRAIKPMbnOaLwR6laivSdxcpXiA5';
  const baseUrl = 'https://nocodb.nexusnerds.com.br/api/v2/tables/';

  useEffect(() => {
    const fetchAppSettings = async () => {
      try {
        const response = await fetch(`${baseUrl}${colorsTableId}/records`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'xc-token': token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Configurações de cores:', data);
          if (data.list.length > 0) {
            const settingsData = data.list[0];
            setPrimaryColor(settingsData.primaryColor || '#28a745');
            setHeaderIconColor(settingsData.headerIconColor || '#28a745');
            setFooterIconColor(settingsData.footerIconColor || '#28a745');
            document.documentElement.style.setProperty('--primary-color', settingsData.primaryColor || '#28a745');
            document.documentElement.style.setProperty('--header-icon-color', settingsData.headerIconColor || '#28a745');
            document.documentElement.style.setProperty('--footer-icon-color', settingsData.footerIconColor || '#28a745');
          }
        } else {
          console.error('Erro ao buscar as configurações do app:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar as configurações do app:', error);
      }
    };

    const fetchModulosPermitidos = async () => {
      try {
        const response = await fetch(`${baseUrl}${modulesTableId}/records`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'xc-token': token,
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.list.length > 0) {
            const modulos = data.list[0];
            const novosModulosPermitidos = [];
            if (modulos.Modulo_Novidades) novosModulosPermitidos.push('Modulo_Novidades');
            if (modulos.Modulo_AcessoRapido) novosModulosPermitidos.push('Modulo_AcessoRapido');
            if (modulos.Modulo_Destaques) novosModulosPermitidos.push('Modulo_Destaques');
            if (modulos.Modulo_PrecisaSuporte) novosModulosPermitidos.push('Modulo_PrecisaSuporte');
            setModulosPermitidos(novosModulosPermitidos);
          }
        } else {
          console.error('Erro ao buscar os módulos permitidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar os módulos permitidos:', error);
      }
    };

    fetchAppSettings();
    fetchModulosPermitidos();

    const savedDadosCliente = localStorage.getItem('dadosCliente');
    if (savedDadosCliente) {
      setDadosCliente(JSON.parse(savedDadosCliente));
    }

    // Verifica o consentimento do usuário ao carregar o app
    const consent = localStorage.getItem('userConsent');
    if (consent === 'true') {
      setHasConsented(true);
    }
  }, []);

  useEffect(() => {
    // Função para verificar o consentimento no localStorage a cada 1 segundo
    const interval = setInterval(() => {
      const consent = localStorage.getItem('userConsent');
      if (consent === 'true') {
        setHasConsented(true);  // Se o consentimento foi dado, não mostrar o popup
      }
    }, 1000); // A cada 1000ms (1 segundo)

    // Limpeza do intervalo quando o componente for desmontado
    return () => clearInterval(interval);
  }, []);  // O efeito é executado apenas uma vez, quando o componente é montado

  const handleConsent = (consent) => {
    setHasConsented(consent);  // Atualiza o estado com base no consentimento
  };


  const handleFooterChange = (newValue) => {
    setFooterValue(newValue);
  };

  return (
    <Router>
      <div className="app-container">
      {!hasConsented && <ConsentPopup onConsent={handleConsent} />} {/* Exibe o popup se não houver consentimento */}

        {dadosCliente && <Header dadosCliente={dadosCliente} />}
        <Routes>
          <Route path="/" element={<Login onLogin={setDadosCliente} />} />
          <Route path="/home" element={<Home dadosCliente={dadosCliente} />} />
          <Route path="/dashboard" element={<DashboardMobile dados={dadosCliente} />} />
          <Route path="/cadastro" element={<Cadastro dados={dadosCliente} />} />
          <Route path="/detalhes" element={<CriarTicket dadosCliente={dadosCliente} />} />
          <Route path="/planos" element={<Planos />} />
          <Route path="/planos/:id" element={<PlanoDetalhes />} />
          <Route path="/financeiro" element={<Financeiro dados={dadosCliente} />} />
          <Route path="/MinhaFatura" element={<MinhaFatura dados={dadosCliente} />} />
          <Route path="/wifi" element={<MeuWifi dados={dadosCliente} />} />
          <Route path="/duvidas" element={<Duvidas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/dispositivos/:frequencia" element={<TodosOsDispositivos />} />
          <Route path="/dispositivos/ethernet" element={<TodosOsDispositivos frequencia="ethernet" />} />
          <Route path="/privacidade" element={<PrivacyPolicy />} />  {/* Rota para a Política de Privacidade */}
          <Route path="/todos-hosts" element={<TodosHosts />} />
        </Routes>
        {dadosCliente && (
          <Footer
            value={footerValue}
            onChange={handleFooterChange}
            setDados={setDadosCliente}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
