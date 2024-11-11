function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <img src={index-logo.jpg} alt="Logo da Prefeitura de São Vicente" className="logo" />
        <h1>Prefeitura de São Vicente</h1>
        <h2>Conecta São Vicente - Portal da Zeladoria</h2>
      </header>


      <img src="template/index-logo.jpg" alt="logo da cidade">

      <p className="description">
        Aqui, em alguns cliques, você solicita o serviço para cuidar da nossa cidade, consulta o status e manda seu recado!
      </p>

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

      <div className="login-button-container">
        <a href="/login" className="login-button">
          Login
        </a>
      </div>
    </div>
  );
}


