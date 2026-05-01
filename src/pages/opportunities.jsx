import { useEffect, useState } from "react"
import Link from "next/link"

export default function Opportunities(){

  const [data,setData] = useState([])
  const [filteredData,setFilteredData] = useState([])

  const [dateFilter,setDateFilter] = useState("today")
  const [leagueFilter,setLeagueFilter] = useState("all")
  const [marketFilter,setMarketFilter] = useState("all")

  const [leagues,setLeagues] = useState([])
  const [markets,setMarkets] = useState([])

  useEffect(()=>{

    fetch("http://localhost:8000/opportunities")
      .then(res=>res.json())
      .then(json=>{

        let opportunities = []

        if(Array.isArray(json)){
          opportunities = json
        }else if(json.data){
          opportunities = json.data
        }

        setData(opportunities)

        const uniqueLeagues = [...new Set(opportunities.map(o=>o.league))]
        const uniqueMarkets = [...new Set(opportunities.map(o=>o.market))]

        setLeagues(uniqueLeagues)
        setMarkets(uniqueMarkets)

      })
      .catch(()=>setData([]))

  },[])

  useEffect(()=>{

    let filtered = [...data]

    const today = new Date()
    const tomorrow = new Date()
    tomorrow.setDate(today.getDate()+1)

    const formatDate = (d)=>d.toISOString().split("T")[0]

    if(dateFilter==="today"){
      filtered = filtered.filter(m=>m.match_date?.startsWith(formatDate(today)))
    }

    if(dateFilter==="tomorrow"){
      filtered = filtered.filter(m=>m.match_date?.startsWith(formatDate(tomorrow)))
    }

    if(leagueFilter!=="all"){
      filtered = filtered.filter(m=>m.league===leagueFilter)
    }

    if(marketFilter!=="all"){
      filtered = filtered.filter(m=>m.market===marketFilter)
    }

    setFilteredData(filtered)

  },[data,dateFilter,leagueFilter,marketFilter])


  const normalizeProbability = (p)=>{

    if(!p) return 0

    if(p>1 && p<=100) return p
    if(p<=1) return p*100

    return p/100

  }


  const formatMatchDate = (date)=>{

    if(!date) return ""

    const d = new Date(date)

    const day = d.toLocaleDateString("pt-BR")
    const time = d.toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})

    return `${day} ${time}`

  }


  return(

    <div className="page-container">

      <div className="top-menu">

        <div className="logo">FutAnalysis</div>

        <div className="menu-links">
          <Link href="/prediction">Prediction</Link>
          <Link href="/opportunities" className="active">Opportunities</Link>
        </div>

      </div>

      <div className="filters-container">

        <div className="filter">
          <label>Data</label>
          <select value={dateFilter} onChange={(e)=>setDateFilter(e.target.value)}>
            <option value="today">Hoje</option>
            <option value="tomorrow">Amanhã</option>
            <option value="all">Todos</option>
          </select>
        </div>

        <div className="filter">
          <label>Liga</label>
          <select value={leagueFilter} onChange={(e)=>setLeagueFilter(e.target.value)}>
            <option value="all">Todas</option>
            {leagues.map((l,i)=><option key={i}>{l}</option>)}
          </select>
        </div>

        <div className="filter">
          <label>Mercado</label>
          <select value={marketFilter} onChange={(e)=>setMarketFilter(e.target.value)}>
            <option value="all">Todos</option>
            {markets.map((m,i)=><option key={i}>{m}</option>)}
          </select>
        </div>

      </div>


      <div className="cards-grid">

      {filteredData.map((item,i)=>{

        const probability = normalizeProbability(item.probability)

        return(

          <div className="match-card" key={i}>

            <div className="card-header">
              <span>{item.league}</span>
            </div>

            {/* DATA + HORA */}

            <div style={{fontSize:"12px",opacity:"0.7",marginBottom:"6px"}}>
              {formatMatchDate(item.match_date || item.date)}
            </div>

            <div className="teams">
              <div>{item.home_team}</div>
              <div className="vs">VS</div>
              <div>{item.away_team}</div>
            </div>

            <div className="market">
              {item.market}
            </div>

            <div className="probability">

              <div className="bar">
                <div
                  className="fill"
                  style={{width:`${probability}%`}}
                />
              </div>

              <div style={{marginTop:"6px"}}>
                {probability.toFixed(1)}%
              </div>

            </div>

          </div>

        )

      })}

      </div>

    </div>

  )

}