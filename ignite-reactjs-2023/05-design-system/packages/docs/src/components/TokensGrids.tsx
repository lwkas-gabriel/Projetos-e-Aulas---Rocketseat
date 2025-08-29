import '../styles/tokens-grid.css' 

interface TokensGridProps {
    tokens: Record<string, string>;
    hasRemValue?: boolean;
}

export function TokensGrid({tokens, hasRemValue = false}: TokensGridProps){
    return (
        <table className='tokens-grid'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Value</th>
                    {hasRemValue && <th>Pixels</th>}
                </tr>
            </thead>

            <tbody>
                {Object.entries(tokens).map(([tokenName, tokenValue]) => {
                    return (
                        <tr key={tokenName}>
                            <td>{tokenName}</td>
                            <td>{tokenValue}</td>
                            {hasRemValue && (
                                <td>{Number(tokenValue.replace('rem', ''))*16} px</td>
                            )}
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}