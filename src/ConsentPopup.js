// src/components/ConsentPopup.js

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConsentPopup = ({ onConsent }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(true);

  useEffect(() => {
    // Verifica se o consentimento já foi dado
    const consent = localStorage.getItem('userConsent');
    if (consent === 'true') {
      setIsPopupVisible(false); // Se já foi aceito, o popup não será mostrado
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem('userConsent', 'true');  // Grava o consentimento no localStorage
    setIsPopupVisible(false);  // Esconde o popup
    onConsent(true);  // Informa ao App que o consentimento foi dado
  };

  const handleLerMais = () => {
    setIsPopupVisible(false);  // Esconde o popup quando "Ler Mais" é clicado
  };

  return (
    isPopupVisible && ( // Renderiza o popup apenas se estiver visível
      <div style={styles.overlay}>
        <div style={styles.popup}>
          <h2>Política de Privacidade</h2>
          <p>
            Este app coleta, transmite e armazena dados pessoais dos usuários, como informações de imagem, para ativar funcionalidades essenciais, como a personalização da interface do usuário e a gestão de dados de perfil.
            Esses dados são coletados para oferecer uma experiência personalizada e otimizada dentro do app.
          </p>
          <p>
            Ao continuar, você concorda que suas informações pessoais possam ser utilizadas para os fins descritos acima, incluindo a coleta e o armazenamento de dados de imagem para possibilitar o funcionamento adequado dos recursos.
          </p>
          <p>
            O consentimento é necessário para que o app funcione corretamente, e você pode revogar seu consentimento a qualquer momento. Sem o consentimento, algumas funcionalidades podem não estar disponíveis.
          </p>
          <p>
            Para mais informações, você pode revisar a nossa <Link to="/privacidade" style={styles.link} onClick={handleLerMais}>Política de Privacidade</Link>.
          </p>
          <div style={styles.buttons}>
            <button style={styles.button} onClick={handleConsent}>
              Aceitar
            </button>
            <Link to="/privacidade" style={styles.readMoreButton} onClick={handleLerMais}>
              Ler Mais
            </Link>
          </div>
        </div>
      </div>
    )
  );
};

// Estilos inline para o popup
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  popup: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
  },
  buttons: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0ecf00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  link: {
    color: '#007bff',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  readMoreButton: {
    padding: '10px 20px',
    backgroundColor: '#0c5e06',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    marginLeft: '10px',
  },
};

export default ConsentPopup;
