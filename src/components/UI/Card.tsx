import styles from './Card.module.css';

const Card = (props: any) => {
  return <div className={styles.card}>{props.children}</div>;
};

export default Card;
