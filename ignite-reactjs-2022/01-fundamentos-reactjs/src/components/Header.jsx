//componentes sempre começam com letra maiuscula

import styles from "./Header.module.css";

export function Header(){
    return (
        <header className={styles.header}>
            <strong>Ignite Feed</strong>
        </header>
    );
}