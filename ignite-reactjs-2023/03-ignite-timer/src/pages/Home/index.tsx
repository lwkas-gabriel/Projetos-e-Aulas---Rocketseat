import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'

import { HomeContainer, FormContainer, CountdownContainer, Separator, StartCountdownButton, MinutesAmountInput, TaskInput } from './styles';

//a bibliotec zod tem uma boa integração com typescript

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

export function Home(){
    const { register, handleSubmit, watch, formState, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data:any){
        reset();
    }

    const task = watch('task');
    //const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <FormContainer>
                    <label htmlFor="task">Vou trabalhar em</label>
                    <TaskInput id="task"
                     list="task-suggestions"
                     placeholder='Dê um nome para o seu projeto'
                     {...register('task', {valueAsNumber: true})}
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

                <StartCountdownButton disabled={task===''} type="submit">
                    <Play size={24}/>
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}