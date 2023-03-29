import { HandPalm, Play } from 'phosphor-react'
import { createContext, useContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import * as zod from 'zod';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import { CyclesContext } from '../../contexts/CyclesContext';

//a biblioteca zod tem uma boa integração com typescript

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(5).max(60),
})


//os dois métodos de integração funcionam e estão certos
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function Home(){

    const { activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext)

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const {handleSubmit, watch, /*reset*/} = newCycleForm;

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(createNewCycle)} action="">
                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={interruptCurrentCycle} type="button">
                            <HandPalm size={24}/>
                            Interromper
                        </StopCountdownButton>
                    ) : (
                        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                            <Play size={24}/>
                            Começar
                        </StartCountdownButton>
                    )
                }
            </form>
        </HomeContainer>
    );
}