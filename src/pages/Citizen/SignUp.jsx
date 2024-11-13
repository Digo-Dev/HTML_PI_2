import React, { useState } from 'react';
import axios from 'axios';
import BaseForm from '../../components/BaseForm/BaseForm';

function SignUp() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [senha, setSenha] = useState('');

  const handleSignUpSubmit = (e) => {
    axios.post('https://orlok.pythonanywhere.com/api/v1/citizen/', {
      nome: nome,
      email: email,
      telefone: telefone,
      senha: senha,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
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
        <input
          type="text"
          id="telefone"
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

    </BaseForm>
  );
}

export default SignUp;
