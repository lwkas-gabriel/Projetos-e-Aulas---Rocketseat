import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, MinutesAmountInput, TaskInput } from './styles';

//a biblioteca zod tem uma boa integração com typescript

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
})

// interface NewCycleFormData{
//     task: string
//     minutesAmount: number
// }


//os dois métodos de integração funcionam e estão certos
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle{
    id: string;
    task: string;
    minutesAmout: number;
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmout: data.minutesAmount,
        };

        setCycles(state => [...cycles, newCycle]);
        setActiveCycleId(newCycle.id)
        reset();
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    console.log(activeCycle)

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput
                     id="task"
                     list="task-suggestions"
                     placeholder='Dê um nome para o seu projeto'
                     {...register('task')}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1"/>
                        <option value="Projeto 2"/>
                        <option value="Projeto 3"/>
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput 
                        type="number" 
                        id="minutesAmount" 
                        placeholder='00'
                        step={5}
                        min={5}
                        max={60}
                        {...register('minutesAmount', {valueAsNumber: true})}
                    />

                    <span>minutos.</span>
                </FormContainer>
            

                <CountdownContainer>
                    <span>0</span>
                    <span>0</span>
                    <Separator>:</Separator>
                    <span>0</span>
                    <span>0</span>
                </CountdownContainer>

                <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}