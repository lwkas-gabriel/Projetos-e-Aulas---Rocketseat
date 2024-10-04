import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const newTransactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    //type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal(){
    const {register, handleSubmit, formState: {isSubmitting} } = useForm<NewTransactionFormInputs>({
        resolver: zodResolver(newTransactionFormSchema),
    });

    async function handleCreateNewTransaction(data: NewTransactionFormInputs){
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log(data);
    }

    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <Dialog.Title>Nova Transação</Dialog.Title>
                
                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input type="text" placeholder='Descrição' required {...register('description')}/>
                    <input type="number" placeholder='Preço' required {...register('price'), {valueAsNumber: true}}/>
                    <input type="text" placeholder='Categoria' required {...register('category')}/>

                    <TransactionType>
                        <TransactionTypeButton value='income' variant='income'>
                            <ArrowCircleUp />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton value='outcome' variant='outcome'>
                            <ArrowCircleDown />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type='submit' disabled={isSubmitting}>Cadastra</button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}