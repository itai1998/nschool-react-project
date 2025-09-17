import '../scss/AppleList.scss'

interface AppleListProp {
  listTitle: string
  list: string[]
}

export default function AppleList({ listTitle, list }: AppleListProp) {
  return (
    <div className="appleListContainer">
      <h3 className="listTitle">{listTitle}</h3>
      <ul>
        {list.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}
