import React, { useState, useEffect } from 'react';
import ButtonCTA from '../ButtonCTA/ButtonCTA';
import ServiceModal from '../Modal/ServiceModal';

const ServiceList = () => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [newStatus, setNewStatus] = useState('');

    const fetchServices = async () => {
        try {
            const response = await fetch('https://orlok.pythonanywhere.com/api/v1/janitorial/', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar dados da API");
            }
            const data = await response.json();
            setServices(data);
        } catch (error) {
            console.error("Erro ao buscar dados da API:", error);
        }
    };

    // useEffect para chamar a função fetchServices quando o componente for montado
    useEffect(() => {
        fetchServices();
    }, []);

    const handleOpenModal = (service) => {
        setSelectedService(service);
        setNewStatus(service.status);
    };

    const handleStatusChange = (event) => {
        setNewStatus(event.target.value);
    };

    const handleUpdateStatus = (updatedService) => {
        // Atualiza o serviço com o novo status e data_prevista
        setServices((prevServices) =>
            prevServices.map((service) =>
                service.id === updatedService.id
                    ? { ...service, status: updatedService.status, data_prevista: updatedService.data_prevista }
                    : service
            )
        );
        // Fecha o modal após a atualização
        setSelectedService(null);
    };
    // Filtra serviços por status
    const servicesByStatus = (status) => {
        return services.filter((service) => service.status === status);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Serviços de Zeladoria</h2>

            {['pendente', 'Em andamento', 'Serviço Pausado', 'Finalizado'].map((status) => (
                <div key={status} className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">{status}</h3>
                    <div className="overflow-x-auto">
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Protocolo</th>
                                    <th>Serviço</th>
                                    <th>Rua</th>
                                    <th>Número</th>
                                    <th>Bairro</th>
                                    <th>Data da Solicitação</th>
                                    <th>Prazo</th>
                                    <th>Solicitante</th>
                                    <th>Detalhes</th>
                                </tr>
                            </thead>
                            <tbody>
                                {servicesByStatus(status).length > 0 ? (
                                    servicesByStatus(status).map((service, index) => (
                                        <tr key={index}>
                                            <td>{service.protocolo}</td>
                                            <td>{service.servico}</td>
                                            <td>{service.rua}</td>
                                            <td>{service.numero}</td>
                                            <td>{service.bairro}</td>
                                            <td>{service.data}</td>
                                            <td>
                                                {/* Verifica se a data_prevista está vazia e o status é Pendente */}
                                                {service.status === 'pendente' && !service.data_prevista
                                                    ? 'Não agendado'
                                                    : service.data_prevista}
                                            </td>
                                            <td>{service.user_name}</td>
                                            <td>
                                                <ButtonCTA
                                                    onClick={() => handleOpenModal(service)}
                                                >
                                                    Ver Detalhes
                                                </ButtonCTA>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="9" className="text-center text-gray-500">
                                            Nenhum serviço encontrado para este status.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>

                        <ServiceModal
                            service={selectedService}
                            newStatus={newStatus}
                            onClose={() => setSelectedService(null)}
                            onStatusChange={handleStatusChange}
                            onUpdateService={handleUpdateStatus}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceList;
