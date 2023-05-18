import { createContext, ReactNode, useState, useReducer } from "react";
import { Cycle, cyclesReducer } from '../reducers/cycles/reducers';
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface CyclesContextType{
    cycles: Cycle[];
    activeCycle: Cycle | undefined;
    activeCycleId: string | null;
    markCurrentCycleAsFinished: () => void;
    amountSecondsPassed: number;
    setSecondsPassed: (seconds: number) => void;
    createNewCycle: (data: CreateCycleData) => void;
    interruptCurrentCycle: () => void;
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps{
    children: ReactNode;
} 

export function CyclesContextProvider({ children }: CyclesContextProviderProps){
    const [cyclesState, dispatch] = useReducer(cyclesReducer,
    {
        cycles: [],
        activeCycleId: null,
    });

    //const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);

    const { cycles, activeCycleId } = cyclesState;
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished(){
        dispatch(markCurrentCycleAsFinishedAction());
    }

    function createNewCycle(data: CreateCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            start: new Date(),
        };
        dispatch(addNewCycleAction(newCycle));

        //setCycles(state => [...cycles, newCycle]);
        //setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0);
        //reset();
    }
    
    function interruptCurrentCycle(){
        dispatch(interruptCurrentCycleAction());


        // setCycles((state) => 
        //     state.map((cycle) => {
        //         if(cycle.id === activeCycleId){
        //             return {...cycle, interruptedDate: new Date()}
        //         } else{
        //             return cycle;
        //         }
        //         }),
        // );
    }

    return (
        <CyclesContext.Provider 
            value={{
                cycles,
                activeCycle,
                activeCycleId, 
                markCurrentCycleAsFinished, 
                amountSecondsPassed, 
                setSecondsPassed,
                createNewCycle,
                interruptCurrentCycle}}
        >
            {children}
        </CyclesContext.Provider>
    )
}

