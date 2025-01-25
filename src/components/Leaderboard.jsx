import { useState, useEffect } from "react"
import { fetchScore } from '../utils/playerInfo'

function Leaderboard() {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getData() {
            try {
                const playerData = await fetchScore();
                setData(playerData);
            } catch(error) {
                console.error("Error fetching scores:", error);
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])

    if (loading) {
        return (<p>Loading leaderboard...</p>);
    }
 
    const topData = data.sort((a, b) => {
        if (b.score === a.score) {
            // Secondary sort by name (alphabetical order)
            return a.player.localeCompare(b.player);
        }
        // Primary sort by score (descending order)
        return b.score - a.score;
    }).slice(0, 5);

    const topEntries = topData.map((data, index) => (
        <tr className="leaderboard--entry" key={index}>
            <td>{index + 1}</td>
            <td>{data.player}</td>
            <td>{data.score}</td>
        </tr>))
    

    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Player</th>
                        <th>Score</th>
                    </tr>
                </thead>
                <tbody>{topEntries}</tbody>
            </table>
        </div>
    )
}

export default Leaderboard