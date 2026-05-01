import { useEffect, useState } from "react"

export default function Cards() {
  const [data, setData] = useState([])

  useEffect(() => {
    fetch("http://localhost:8000/cards")
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <div>
      <h1>Análise de Cartões</h1>

      {data.map((match) => (
        <div key={match.id}>
          {match.home_team} vs {match.away_team}
          <br />
          Cartões previstos: {match.predicted_cards}
        </div>
      ))}
    </div>
  )
}