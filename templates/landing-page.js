import React from 'react';
import ReactDOM from 'react-dom';
import './style.css' from css;

ReactDOM.StrictMode(
  <React.StrictMode>
    <LandingPage />
  </React.StrictMode>,
  document.getElementById('root')

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <img src={index-logo.jpg} alt="Logo da Prefeitura de São Vicente" className="logo" />
        <h1>Prefeitura de São Vicente</h1>
        <h2>Conecta São Vicente - Portal da Zeladoria</h2>
      </header>

      <p className="description">
        Aqui, em alguns cliques, você solicita o serviço para cuidar da nossa cidade, consulta o status e manda seu recado!
      </p>

      {/* botão p conhecer os serviços da prefeitura, acham q fica ok fazer isso ou escreve sobre cada serviço? */}
      <p className="info-link">
        <a
          href="https://www.saovicente.sp.gov.br/categoria/301"
          target="_blank"
          rel="noopener noreferrer"
          className="service-button"
        >
          Clique aqui para conhecer os serviços que esta página pode conectar você à prefeitura
        </a>
      </p>

      {/* botão de login */}
      <div className="login-button-container">
        <a href="/login" className="login-button">
          Login
        </a>
      </div>
    </div>
  );
}

export default LandingPage;
