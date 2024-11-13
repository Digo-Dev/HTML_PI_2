import React, { useState } from 'react';
import BaseForm from '../../../components/BaseForm/BaseForm';
import axios from 'axios';

const AddNewService = ({ onSubmit }) => {
  const [nome, setNome] = useState('');
  const [desc, setDesc] = useState('');
  const [prazo, setPrazo] = useState('');
  const [error, setError] = useState('');

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem('authToken'); 
    if (!token) {
      setError('Acesso negado. Faça login como administrador.');
      return;
    }

    try {
      const response = await axios.post(
        'https://orlok.pythonanywhere.com/api/v1/service/',
        {
          nome,
          desc,
          prazo
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
          },
        }
      );
      console.log('Cadastro com sucesso', response.data)

    } catch (error) {
      setError(error.response ? error.response.data.response : 'Erro na conexão com o servidor.');
    } 
  };

  return (
    <BaseForm onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Digite o nome do serviço"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Digite a descrição do serviço"
          className="textarea textarea-bordered w-full mt-1"
          rows="4"
          required
        ></textarea>
      </div>

      <div>
        <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Prazo para realização(dias)</label>
        <input
          type="number"
          id="prazo"
          value={prazo}
          onChange={(e) => setPrazo(e.target.value)}
          placeholder="Digite o prazo em dias"
          className="input input-bordered w-full mt-1"
          required
        />
      </div>

      {error && <p className="text-red-500">{error}</p>}
    </BaseForm>
  );
};

export default AddNewService;
