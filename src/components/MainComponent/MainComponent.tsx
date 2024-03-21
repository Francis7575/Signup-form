import Form from '../Form/Form'
import styles from './MainComponent.module.css'

const MainComponent = () => {
    return (
        <div className={styles.flexContainer}>
            <section className={styles.leftContainer}>
                <h1 className={styles.heading}>
                    Learn to code by watching others
                </h1>
                <p className={styles.paragraph}>
                    See how experienced developers solve problems in real-time. Watching scripted
                    tutorials is great, but understanding how developers think is invaluable.
                </p>
            </section>
            <Form />
        </div>
    )
}

export default MainComponent