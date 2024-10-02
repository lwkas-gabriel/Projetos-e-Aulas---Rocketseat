import { HeadeContainer, HeaderContent, NewTransactionButton } from "./styles";

import logoImg from '../../assests/logo.svg'

export function Header(){
    return (
        <HeadeContainer>
            <HeaderContent>
                <img src={logoImg} alt="" />
                <NewTransactionButton>Nova transação</NewTransactionButton>
            </HeaderContent>
        </HeadeContainer>
    );
}