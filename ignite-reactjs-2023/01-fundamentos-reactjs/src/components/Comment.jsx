import { ThumbsUp, Trash } from "phosphor-react";
import styles from "./Comment.module.css";

export function Comment(){
    return (
        <div className={styles.comment}>
            <img src="https://github.com/lwkas-gabriel.png" />

            <div className={styles.commentBox}>
                <div className={styles.commentContent}>
                    <header>
                        <div className={styles.authorAndTime}>
                            <strong>Lucas Gabriel</strong>
                            <time title="12 de junho às 20:35h" dateTime="2024-06-12 20:34:00">Cerca de 1h atrás</time>
                        </div>
                        <button title="deletar comentário">
                            <Trash size={20}/>
                        </button>
                    </header>
                    <p>Muito bom Devon, parabéns!!</p>
                </div>
            </div>
            
            <footer>
                <button>
                    <ThumbsUp />
                    Aplaudir <span>20</span>
                </button>
            </footer>
        </div>
    );
}