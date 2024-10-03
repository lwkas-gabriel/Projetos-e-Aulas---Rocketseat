import * as Dialog from '@radix-ui/react-dialog'
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';

export function NewTransactionModal(){
    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <Dialog.Title>Nova Transação</Dialog.Title>
                
                <form action="">
                    <input type="text" placeholder='Descrição' required/>
                    <input type="number" placeholder='Preço' required/>
                    <input type="text" placeholder='Categoria' required/>

                    <TransactionType>
                        <TransactionTypeButton variant='income'>
                            <ArrowCircleUp />
                            Entrada
                        </TransactionTypeButton>

                        <TransactionTypeButton variant='outcome'>
                            <ArrowCircleDown />
                            Saída
                        </TransactionTypeButton>
                    </TransactionType>

                    <button type='submit'>Cadastra</button>
                </form>
            </Content>
        </Dialog.Portal>
    );
}