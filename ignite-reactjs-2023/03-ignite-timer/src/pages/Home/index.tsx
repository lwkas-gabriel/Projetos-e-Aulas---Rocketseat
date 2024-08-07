import { HandPalm, Play } from "phosphor-react";
import { FormProvider, useForm } from "react-hook-form";
import { HomeContainer,
         StartCountdownButton,
         StopCountdownButton} from "./styles";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { useContext } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { CyclesContext } from "../../contexts/CyclesContext";

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
    const {activeCycle, createNewCycle, interruptCurrentCycle } = useContext(CyclesContext);

    const newCycleForm = useForm<NewCycleFormData>({
        resolver: zodResolver(newCycleFormValidationSchema),
        defaultValues: {
            task: "",
            minutesAmount: 0,
        }
    });

    const { handleSubmit, watch, reset } = newCycleForm;

    function handleCreateNewCycle(data: NewCycleFormData){
        createNewCycle(data);
        //a função abaixo retorna os campos para o defaultValues definidos no resolver
        reset();
    }

    const task = watch("task");
    const isSubmitDisabled = !task;

    return (
        <HomeContainer>
            <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">

                <FormProvider {...newCycleForm}>
                    <NewCycleForm />
                </FormProvider>
                <Countdown />

                { activeCycle ?  (
                    <StopCountdownButton onClick={interruptCurrentCycle} type="submit">
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