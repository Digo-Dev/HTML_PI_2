import React, { useState } from 'react';
import axios from 'axios';
import BaseForm from '../../../components/BaseForm/BaseForm';

const EmployeeRegisterForm = () => {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('authToken'); 
    if (!token) {
      setError('Acesso negado. Faça login como administrador.');
      return;
    }

    try {
      const response = await axios.post(
        'https://orlok.pythonanywhere.com/api/v1/employee/',
        {
          nome,
          cargo,
          email,
          senha,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      console.log('Funcionário cadastrado com sucesso', response.data);
      
      // Limpa os campos do formulário após o envio
      setNome('');
      setCargo('');
      setEmail('');
      setSenha('');
      setError(null);

    } catch (error) {
      setError(error.response ? error.response.data.response : 'Erro na conexão com o servidor.');
    }
  };

  return (
    <BaseForm onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="cargo" className="block text-sm font-medium text-gray-700">Cargo</label>
        <input
          type="text"
          id="cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          placeholder="Digite o cargo do funcionário"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o e-mail"
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
          placeholder="Digite a senha"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}

    </BaseForm>
  );
};

export default EmployeeRegisterForm;
