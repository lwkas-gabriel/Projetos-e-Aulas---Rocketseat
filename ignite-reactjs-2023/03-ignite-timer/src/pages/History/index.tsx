import { useContext } from "react";
import { HistoryContainer, HistoryList, Status } from "./styles";
import { CyclesContext } from "../../contexts/CyclesContext";

export function History(){
    const { cycles } = useContext(CyclesContext);

    return (
        <HistoryContainer>
            <h1>Meu Histórico</h1>
            <HistoryList>
                <table>
                    <thead>
                        <tr>
                            <th>Tarefa</th>
                            <th>Duração</th>
                            <th>Início</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Tarefa</td>
                            <td>20 minutos</td>
                            <td>Há 2 meses</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>
                        <tr>
                            <td>Tarefa 2</td>
                            <td>40 minutos</td>
                            <td>Há 1 mês</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>
                        <tr>
                            <td>Tarefa 3</td>
                            <td>15 minutos</td>
                            <td>Há 2 meses</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>
                        <tr>
                            <td>Tarefa 4</td>
                            <td>10 minutos</td>
                            <td>Há 4 meses</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>
                        <tr>
                            <td>Tarefa 5</td>
                            <td>5 minutos</td>
                            <td>Há 5 minutos</td>
                            <Status statusColor="green">Concluído</Status>
                        </tr>
                    </tbody>
                </table>
            </HistoryList>
        </HistoryContainer>
    );
}