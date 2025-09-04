import '../scss/NavBar.scss'

export default function NavBar() {
  const navOptions = [
    'icon1',
    'icon2',
    'icon3',
    'icon4',
    'icon5',
    'icon6',
    'icon7',
    'icon8',
    'icon9',
    'icon10',
    'icon11',
    'icon12',
    'icon13',
  ]

  return (
    <div className="container">
      <div className="iconContain">
        {navOptions.map((icon) => (
          <button key={icon}>{icon}</button>
        ))}
      </div>
    </div>
  )
}
