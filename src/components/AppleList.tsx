import styles from '../scss/AppleList.module.scss'

interface AppleListProp {
  listTitle: string
  list: string[]
}

export default function AppleList({ listTitle, list }: AppleListProp) {
  return (
    <div className={styles.appleListContainer}>
      <h3 className={styles.listTitle}>{listTitle}</h3>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
