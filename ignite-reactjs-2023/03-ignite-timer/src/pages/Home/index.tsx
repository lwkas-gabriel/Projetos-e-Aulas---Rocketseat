import { HandPalm, Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import zod from 'zod'
import { differenceInSeconds } from 'date-fns';

import { HomeContainer, StartCountdownButton, StopCountdownButton } from './styles';
import { NewCycleForm } from './components/NewCycleForm';
import { Countdown } from './components/Countdown';


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
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: '',
            minutesAmount: 0,
        }
    });

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const totalSeconds = activeCycle ? activeCycle.minutesAmount*60 : 0;

    useEffect(()=>{
        let interval: number;
        if(activeCycle){
            interval = setInterval(()=>{
                const secondsDifference = differenceInSeconds(new Date(), activeCycle.start)

                if(secondsDifference>=totalSeconds){
                    setCycles( state => state.map((cycle) => {
                        if(cycle.id === activeCycleId){
                            return {...cycle, finishedDate: new Date() }
                        } else{
                            return cycle;
                        }
                    }),
                    )
                    setAmountSecondsPassed(totalSeconds);
                    clearInterval(interval);
                }else{
                    setAmountSecondsPassed(secondsDifference)
                }
            }, 1000)
        }

        return () => {
            clearInterval(interval);
        }
    },[activeCycle, totalSeconds, activeCycleId])

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

    const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0;

    const minutesAmount = Math.floor(totalSeconds / 60);
    const secondsAmount = currentSeconds % 60;

    const minutes = String(minutesAmount).padStart(2, '0');
    const seconds = String(secondsAmount).padStart(2, '0');

    useEffect(()=>{
        if(activeCycle)
            document.title = `${minutes}:${seconds}`
    },[minutes, seconds, activeCycle])

    const task = watch('task');
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <NewCycleForm />
                <Countdown />

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