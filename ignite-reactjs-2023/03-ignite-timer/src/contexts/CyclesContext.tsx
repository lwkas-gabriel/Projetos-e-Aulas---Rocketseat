import { createContext, ReactNode, useState, useReducer } from "react";
import { NewCycleForm } from "../pages/Home/components/NewCycleForm";

interface CreateCycleData{
    task: string;
    minutesAmount: number;
}

interface Cycle{
    id: string;
    task: string;
    minutesAmount: number;
    start: Date;
    interruptedDate?: Date;
    finishedDate?: Date;
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
    const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
        if(action.type === 'ADD_NEW_CYCLE'){
            return [...state, action.payload.newCycle];
        }

        return state;
    }, []);
    const [activeCycleId, setActiveCycleId] = useState<string | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] = useState(0);
    const activeCycle = cycles.find(cycle => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: number){
        setAmountSecondsPassed(seconds);
    }

    function markCurrentCycleAsFinished(){
        // setCycles( state => 
        //     state.map((cycle) => {
        //       if(cycle.id === activeCycleId){
        //           return {...cycle, finishedDate: new Date() }
        //       } else{
        //           return cycle;
        //       }
        //   }),
        //   )
        dispatch({
            type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
            payload: {
                activeCycleId,
            },
        });
    }

    function createNewCycle(data: CreateCycleData){
        const newCycle: Cycle = {
            id: String(new Date().getTime()),
            task: data.task,
            minutesAmount: data.minutesAmount,
            start: new Date(),
        };
        dispatch({
            type: 'ADD_NEW_CYCLE',
            payload:{
                newCycle,
            },
        });

        //setCycles(state => [...cycles, newCycle]);
        setActiveCycleId(newCycle.id)
        setAmountSecondsPassed(0);
        //reset();
    }
    
    function interruptCurrentCycle(){
        //setActiveCycleId(null);
        dispatch({
            type: 'INTERRUPT_CURRENT_CYCLE',
            payload:{
                activeCycleId,
            },
        });


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

