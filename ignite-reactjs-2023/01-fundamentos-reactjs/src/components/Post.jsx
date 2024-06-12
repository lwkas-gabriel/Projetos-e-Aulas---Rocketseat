import styles from "./Post.modules.css";

export function Post(){
    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <img className={styles.avatar} src="https://github.com/lwkas-gabriel" />
                    <div className={styles.authorInfo}>
                        <strong>Lucas Gabriel</strong>
                        <span>Web Developer</span>
                    </div>
                </div>

                <time title="12 de junho às 20:35h" dateTime="2024-06-12 20:34:00">Publicado há 1h</time>
            </header>

            <div className={styles.content}>
                <p>Fala galeraa 👋</p>

                <p>Acabei de subir mais um projeto no meu portifa. É um projeto que fiz no NLW Return, evento da Rocketseat. O nome do projeto é DoctorCare 🚀</p>

                <p>👉 <a href="#">jane.design/doctorcare</a></p>

                <p><a href="#">#novoprojeto #nlw #rocketseat</a></p>
            </div>
        </article>
    );
}