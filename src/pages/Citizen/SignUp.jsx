import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate
import BaseForm from '../../components/BaseForm/BaseForm';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('');
  const [showToast, setShowToast] = useState(false);

  const navigate = useNavigate(); // Inicializa o hook para navegação

  const handleSignUpSubmit = (e) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário

    axios.post('https://orlok.pythonanywhere.com/api/v1/citizen/', {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha,
    })
    .then((response) => {
      console.log(response.data);

      // Mensagem de sucesso
      setToastMessage('Cadastro realizado com sucesso! Redirecionando para o login...');
      setToastType('alert-success');
      setShowToast(true);

      // Redireciona para a página de login após 2.5 segundos
      setTimeout(() => {
        setShowToast(false); // Esconde o toast
        navigate('/HTML_PI_2/login'); // Redireciona para a página de login
      }, 3000); // 2.5 segundos
    })
    .catch((error) => {
      console.log(error);

      // Mensagem de erro
      setToastMessage(error.response ? error.response.data.response : 'Erro ao cadastrar. Tente novamente.');
      setToastType('alert-error');
      setShowToast(true);

      // Esconde o toast após 2.5 segundos
      setTimeout(() => setShowToast(false), 2500);
    });
  };

  return (
    <BaseForm onSubmit={handleSignUpSubmit}>
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite seu nome"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite seu email"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">Telefone</label>
        <InputMask
          mask="(99) 99999-9999"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          placeholder="Digite seu telefone"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="senha" className="block text-sm font-medium text-gray-700">Senha</label>
        <input
          type="password"
          id="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Digite sua senha"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      {showToast && (
        <div className="toast toast-center toast-middle">
          <div className={`alert ${toastType}`}>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </BaseForm>
  );
}

export default SignUp;
