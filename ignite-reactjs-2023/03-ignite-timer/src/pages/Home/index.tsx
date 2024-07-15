import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { HomeContainer,
         StartCountdownButton,
         StopCountdownButton} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createContext, useEffect, useState } from "react";
import { differenceInSeconds } from "date-fns";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
    startDate: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
}

interface CycleContextType {
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    amountSecondsPassed: number;
    markCurrentCycleAsFinished: () => void;
    setSecondsPassed: (seconds: number) => void;
}

export const CyclesContext = createContext({} as CycleContextType);

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(1, "O ciclo precisa ser de no mínimo 5 minutos")
        .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

//o uso da interface está certo, mas o diego mosstrou como fazer com o zod.
// interface NewCycleFormDate{
//     task: string;
//     minutesAmount: number;
// }

//Aqui eu estou inferindo o tipo de NewCycleFormDate usando o schema do zod lá em cima
type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>;

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm

    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished(){
        setCycles((state) =>
            state.map((cycle) => {
                if(cycle.id === activeCycleId){
                    return {...cycle, finishedDate: new Date() };
                } else {
                    return cycle;
                }
            }),
        )
    }

    function handleCreateNewCycle(data: NewCycleFormData){
        const id = String(new Date().getTime());
        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        };
        //sempre que um mudançá de estado dependeer do valor anterior, usar a notacão abaixo
        setCycles((state) => [...state, newCycle]);

        setActiveCycleId(id);
        setAmountSecondsPassed(0);

        //a função abaixo retorna os campos para o defaultValues definidos no resolver
        reset();
    }

    function handleInterruptCycle(){
        
        setCycles(state => state.map(cycle => {
            if(cycle.id === activeCycleId){
                return { ...cycle, interruptedDate: new Date()}
            }else{
                return cycle;
            }
        }),
        )
        setActiveCycleId(null);
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
                <CyclesContext.Provider
                    value={{ activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed }}>
                    <FormProvider {...newCycleForm}>
                        <NewCycleForm />
                    </FormProvider>
                    <Countdown />
                </CyclesContext.Provider>

                { activeCycle ?  (
                    <StopCountdownButton onClick={handleInterruptCycle} type="submit">
                        <HandPalm size={24} />
                        Interromper
                    </StopCountdownButton>
                ): (
                    <StartCountdownButton disabled={isSubmitDisabled} type="submit">
                        <Play size={24} />
                        Começar
                    </StartCountdownButton>
                )}
            </form>
        </HomeContainer>
    );
}