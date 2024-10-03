import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SeachForm } from "./components/SearchForm";
import { PriceHighlight, TransactionsContainer, TransactionsTable } from "./styles";

interface Transction{
    id: number,
    description: string,
    type: "income" | "outcome",
    price: number,
    category: string,
    createdAt: string
}

export function Transactions(){
    const [transactions, setTransactions] = useState<Transction[]>([]);

    async function loadTransaction(){
        const response = await fetch('http://localhost:3000/transactions');
        const data = await response.json();

        setTransactions(data);
    }

    useEffect(() => {
        loadTransaction();
    }, []);

    return (
        <div>
            <Header />
            <Summary />

            <TransactionsContainer>
                <SeachForm />
                <TransactionsTable>
                    <tbody>
                        {transactions.map((transaction) => {
                            return (
                                <tr key={transaction.id}>
                                    <td width="50%">{transaction.description}</td>
                                    <td>
                                        <PriceHighlight variant={transaction.type}>
                                            {transaction.price}
                                        </PriceHighlight>
                                    </td>
                                    <td>{transaction.category}</td>
                                    <td>{transaction.createdAt}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </TransactionsTable>
            </TransactionsContainer>
        </div>
    );
}