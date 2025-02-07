// src/components/PrivacyPolicy.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleAceitar = () => {
    // Aqui você pode chamar a função de consentimento para registrar que o usuário aceitou
    localStorage.setItem('userConsent', 'true');
    navigate('/'); // Redireciona o usuário para a página inicial ou para onde desejar
  };

  return (
    <div style={styles.container}>
      <h2>Política de Privacidade – Max Fibra</h2>
      <p>A Max Fibra, provedor de internet da região de Viana, está comprometida em proteger a privacidade dos usuários do aplicativo. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações pessoais dos usuários que acessam o aplicativo da Max Fibra para gerenciar seus dados, incluindo informações financeiras de faturas em aberto e alterações de senha de Wi-Fi.</p>
      <h3>Coleta de Informações</h3>
      <p>
        Ao utilizar o aplicativo da Max Fibra, podemos coletar as seguintes informações:
        <ul>
          <li><strong>Dados Pessoais</strong>: Informações como nome, endereço, número de telefone, e-mail e CPF, que são necessárias para identificar e fornecer serviços aos usuários.</li>
          <li><strong>Dados Financeiros</strong>: Informações relacionadas às faturas em aberto, incluindo valores, datas de vencimento e histórico de pagamentos.</li>
          <li><strong>Dados de Conexão</strong>: Informações relacionadas ao serviço de internet, como o status da conexão, endereço IP e informações do roteador para a mudança de senha de Wi-Fi.</li>
          <li><strong>Dados de Uso</strong>: Informações sobre como você utiliza o aplicativo, como páginas visitadas, tempo de uso e interações com os recursos do aplicativo.</li>
          <li><strong>Dados de Imagem</strong>: O aplicativo pode acessar imagens armazenadas no dispositivo para fins de personalização ou funcionalidade do usuário. No entanto, nenhuma imagem é carregada ou enviada para servidores externos sem consentimento explícito do usuário.</li>
        </ul>
      </p>
      <h3>Uso das Informações</h3>
      <p>As informações coletadas são utilizadas para:</p>
      <ul>
        <li>Fornecer e melhorar os serviços oferecidos pelo aplicativo.</li>
        <li>Perguntar aos usuários sobre suas faturas em aberto e gerenciar suas contas.</li>
        <li>Facilitar a alteração de configurações do serviço, como mudança de senha do Wi-Fi.</li>
        <li>Enviar notificações e atualizações relacionadas ao serviço e à conta do usuário.</li>
        <li>Cumprir obrigações legais e regulatórias.</li>
      </ul>
      <h3>Segurança das Informações</h3>
      <p>A Max Fibra implementa medidas de segurança adequadas para proteger as informações dos usuários contra acesso não autorizado, alteração, divulgação ou destruição...</p>
      <h3>Alterações na Política de Privacidade</h3>
      <p>A Max Fibra pode atualizar esta Política de Privacidade periodicamente. Os usuários serão notificados de quaisquer mudanças significativas...</p>
      <h3>Contato</h3>
      <p>Se você tiver dúvidas ou preocupações sobre esta Política de Privacidade ou sobre o uso de suas informações pessoais, entre em contato conosco através do e-mail: <a href="mailto:contato@grupomaxltda.com.br">contato@grupomaxltda.com.br</a></p>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    lineHeight: '1.6',
  },
  buttons: {
    marginTop: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#0ecf00',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PrivacyPolicy;
