import axios from 'axios';
import { useState, useEffect } from 'react';

const ServiceModal = ({ service, newStatus, onClose, onStatusChange, onUpdateService }) => {
    const [scheduledDate, setScheduledDate] = useState(service?.agendamento || '');
    const [status, setStatus] = useState(newStatus); // Controle separado do status

    // Atualiza o status e a data quando o service mudar
    useEffect(() => {
        if (service) {
            if (!service.agendamento) {
                setStatus('Em andamento');
            } else if (service.status === 'Em andamento') {
                setStatus('Serviço Pausado');
            } else {
                setStatus(service.status); // Caso contrário, mantemos o status original
            }
            setScheduledDate(service.agendamento || ''); // Atualiza a data prevista
        }
    }, [service]);

    if (!service) return null; // Garante que o service esteja definido antes de renderizar o modal

    const handleUpdateStatus = async () => {
        const token = localStorage.getItem('authToken'); // Recupera o token do localStorage

        try {
            // Dados mínimos que sempre serão enviados
            const updateData = {
                status: status, // Usa o status controlado do select
                data_prevista: scheduledDate, // Usa a data sem formatação
            };

            // Adiciona os campos adicionais apenas se o status for "Serviço Pausado" ou "Finalizado"
            if (status === 'Serviço Pausado') {
                updateData.data_pausa = new Date().toISOString().split('T')[0]; // Data de pausa
            }

            if (status === 'Finalizado') {
                updateData.data_finalizacao = new Date().toISOString().split('T')[0]; // Data de finalização
            }

            // Faz a requisição PUT com os dados para atualizar o status
            const response = await axios.put(
                `https://orlok.pythonanywhere.com/api/v1/janitorial/schedule/${service.id}`,
                updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Adiciona o token no cabeçalho
                    },
                }
            );

            // Atualiza o status e a data prevista no componente pai
            onUpdateService({
                ...service,
                status: updateData.status,
                data_prevista: updateData.data_prevista, // Atualiza data prevista com a nova data
            });
            // Chama o onStatusChange caso o componente pai precise saber do novo status
            onStatusChange(updateData.status);

            onClose();
        } catch (error) {
            console.error("Erro ao atualizar o status do serviço:", error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="modal-box p-6 rounded-lg shadow-lg">
                <h2 className="font-bold text-lg">Detalhes do Serviço</h2>
                <p>Protocolo: {service.protocolo}</p>
                <p>Serviço: {service.servico}</p>
                <p>Rua: {service.rua}</p>
                <p>Número: {service.numero}</p>
                <p>Bairro: {service.bairro}</p>
                <p>Data da Solicitação: {service.data}</p>
                <p>Prazo: {service.data_prevista}</p>
                <p>Solicitante: {service.user_name}</p>
                <p>Telefone: {service.user_phone}</p>


                <div className="mt-4">
                    <h3 className="font-bold">Anexo:</h3>
                    {service.anexo ? (
                        <img
                            src={`https://orlok.pythonanywhere.com//api/v1/uploads/anexo/${service.anexo}`}
                            alt="Anexo do serviço"
                            className="w-full h-auto mt-2 rounded-lg"
                        />
                    ) : (
                        <p className="text-gray-500">Sem foto adicionada</p>
                    )}
                </div>

                <div className="mt-4">
                    <label className="label">
                        <span className="label-text">Data prevista para realizar o serviço</span>
                    </label>
                    <input
                        type="date"
                        id="data_prevista"
                        className="input input-bordered w-full"
                        value={scheduledDate}
                        onChange={(e) => setScheduledDate(e.target.value)} // Atualiza a data
                    />
                </div>

                <div className="mt-4">
                    <label className="label">
                        <span className="label-text">Alterar Status</span>
                    </label>
                    <select
                        className="select select-bordered w-full"
                        value={status}  // Usa o estado "status"
                        onChange={(e) => {
                            setStatus(e.target.value); // Atualiza o estado de "status"
                            onStatusChange(e.target.value); // Atualiza o status no componente pai, se necessário
                        }}
                    >
                        <option value="Pendente">Pendente</option>
                        <option value="Em andamento">Em andamento</option>
                        <option value="Serviço Pausado">Serviço Pausado</option>
                        <option value="Finalizado">Finalizado</option>
                    </select>
                </div>

                <div className="modal-action mt-4 flex justify-end space-x-2">
                    <button className="btn btn-success" onClick={handleUpdateStatus}>
                        Atualizar Status
                    </button>
                    <button className="btn" onClick={onClose}>
                        Fechar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceModal;
