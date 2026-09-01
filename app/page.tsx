export default function Home() {
  return (
    <main className="container">
      <div className="topBar">
        <div className="coin">
          🪙 Gold Miner: 0
        </div>
      </div>

      <div className="miner">
        <div className="minerIcon">⛏️</div>

        <h1>CUBAN MINER</h1>

        <p>Mine gold and upgrade your tools</p>

        <button className="startBtn">
          START MINING
        </button>
      </div>
    </main>
  );
}
