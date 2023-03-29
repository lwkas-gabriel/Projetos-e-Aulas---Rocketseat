import { HandPalm, Play } from 'phosphor-react'
import { createContext, useEffect, useState } from 'react';
import { differenceInSeconds } from 'date-fns';
import * as zod from 'zod';
import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';


interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CyclesContextType{
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
}

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

export const CyclesContext = createContext({} as CyclesContextType);

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const {handleSubmit, watch, reset} = newCycleForm;

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished(){
        setCycles( state => 
            state.map((cycle) => {
              if(cycle.id === activeCycleId){
                  return {...cycle, finishedDate: new Date() }
              } else{
                  return cycle;
              }
          }),
          )
    }

    function handleCreateNewCycle(data: NewCycleFormData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            start: new Date(),
        };

        setCycles(state => [...cycles, newCycle]);
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0);
        reset();
    }
    
    function handleInterruptCycle(){
        setActiveCycleId(null);

        setCycles((state) => 
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, interruptedDate: new Date()}
                } else{
                    return cycle;
                }
                }),
        );
    }

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider value={{activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed}}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>
                {
                    activeCycle ? (
                        <StopCountdownButton onClick={handleInterruptCycle} type="button">
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