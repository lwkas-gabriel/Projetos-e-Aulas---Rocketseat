import { Play } from "phosphor-react";
import { FormContainer, HomeContainer, CountdownContainer, Separator, StartCountdownButton, TasKInput, MinutesAmountInput } from "./styles";

export function Home(){
    return (
        <HomeContainer>
            <form action="">
                <FormContainer>
                    <label htmlFor="">Vou trabalhar em</label>
                    <TasKInput
                        id="task"
                        placeholder="Dê um nome para o seu projeto"
                    />

                    <label htmlFor="">durante</label>
                    <MinutesAmountInput
                        type="number"
                        id="minutesAmount"
                        placeholder="00"
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

                <StartCountdownButton disabled type="submit">
                    <Play />
                    Começar
                </StartCountdownButton>
            </form>
        </HomeContainer>
    );
}