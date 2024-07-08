import { Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { FormContainer,
         HomeContainer,
         CountdownContainer,
         Separator,
         StartCountdownButton, 
         TasKInput, 
         MinutesAmountInput } from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useState } from "react";

const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, "Informe a tarefa"),
    minutesAmount: zod
        .number()
        .min(5, "O ciclo precisa ser de no mínimo 5 minutos")
        .max(60, "O ciclo precisa ser de no máximo 60 minutos"),
});

//o uso da interface está certo, mas o diego mosstrou como fazer com o zod.
// interface NewCycleFormDate{
//     task: string;
//     minutesAmount: number;
// }

//Aqui eu estou inferindo o tipo de NewCycleFormDate usando o schema do zod lá em cima
type NewCycleFormDate = zod.infer<typeof newCycleFormValidationSchema>;

interface Cycle {
    id: string;
    task: string;
    minutesAmount: number;
}

export function Home(){
    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);

    const { register, handleSubmit, watch, reset  } = useForm<NewCycleFormDate>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    });

    function handleCreateNewCycle(data: NewCycleFormDate){
        const id = String(new Date().getTime());

        const newCycle: Cycle = {
            id,
            task: data.task,
            minutesAmount: data.minutesAmount
        };
        //sempre que um mudançá de estado dependeer do valor anterior, usar a notacão abaixo
        setCycles((state) => [...state, newCycle]);

        setActiveCycleId(id);

        //a função abaixo retorna os campos para o defaultValues definidos no resolver
        reset();
    }

    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)}>
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <TasKInput
                        id="task"
                        list="task-suggestions"
                        placeholder="Dê um nome para o seu projeto"
                        {...register("task")}
                    />

                    <datalist id="task-suggestions">
                        <option value="Projeto 1" />
                        <option value="Projeto 2" />
                        <option value="Projeto 3" />
                        <option value="Maçã" />
                    </datalist>

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
                        step={5}
                        min={5}
                        max={60}
                        {...register("minutesAmount", { valueAsDate: true })}
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
                    <Play />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}