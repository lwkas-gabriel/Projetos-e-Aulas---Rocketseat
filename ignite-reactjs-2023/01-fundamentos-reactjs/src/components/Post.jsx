import styles from './Post.module.css'

export function Post(props){
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img src="https://github.com/lwkas-gabriel.png" alt="" className={styles.avatar}/>
                    <div className={styles.authorInfo}>
                        <strong>Lucas Gabriel</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time title="10 de Fevereiro às 15:40" dataTime="2023-02-10 15:40">Publicado há 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>
                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>
                <p>👉 <a href="">jane.design/doctorcare</a></p>
                <p>
                    <a href="">#novoprojeto</a>{" "}
                    <a href="">#nlw</a>{" "}
                    <a href="">#rocketseat</a>{" "}
                </p>
            </div>
        </article>
    )
}