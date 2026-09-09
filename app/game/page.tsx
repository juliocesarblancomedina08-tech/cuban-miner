"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { useRouter } from "next/navigation";

type MineData = {
  name: string;
  mineral: string;
  unlockPrice: number;
  managerPrice: number;
  baseIncome: number;
};

const MINES: MineData[] = [
  {
    name: "CARBÓN",
    mineral: "carbón",
    unlockPrice: 0,
    managerPrice: 500,
    baseIncome: 1,
  },
  {
    name: "COBRE",
    mineral: "cobre",
    unlockPrice: 250,
    managerPrice: 1200,
    baseIncome: 3,
  },
  {
    name: "HIERRO",
    mineral: "hierro",
    unlockPrice: 750,
    managerPrice: 3500,
    baseIncome: 8,
  },
  {
    name: "ORO",
    mineral: "oro",
    unlockPrice: 2000,
    managerPrice: 9000,
    baseIncome: 20,
  },
];

export default function GamePage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("MINERO");

  const [coins, setCoins] =
    useState(100);

  const [unlockedMines, setUnlockedMines] =
    useState(1);

  const [selectedMine, setSelectedMine] =
    useState(0);

  const [managerOwned, setManagerOwned] =
    useState<boolean[]>(
      [false, false, false, false]
    );

  const [pickaxeLevel, setPickaxeLevel] =
    useState<number[]>(
      [1, 1, 1, 1]
    );

  const [mineLevel, setMineLevel] =
    useState<number[]>(
      [1, 1, 1, 1]
    );

  const [minerWorking, setMinerWorking] =
    useState<boolean[]>(
      [false, false, false, false]
    );

  const [minerals, setMinerals] =
    useState<number[]>(
      [0, 0, 0, 0]
    );

  const [message, setMessage] =
    useState("");

  useEffect(() => {
    const telegramUser =
      window.Telegram?.WebApp
        ?.initDataUnsafe?.user;

    if (telegramUser) {
      const name =
        telegramUser.username ||
        telegramUser.first_name;

      if (name) {
        setUsername(name);
        localStorage.setItem(
          "username",
          name
        );
      }

      window.Telegram?.WebApp?.ready?.();
      window.Telegram?.WebApp?.expand?.();

      return;
    }

    const saved =
      localStorage.getItem("username") ||
      localStorage.getItem("userName") ||
      localStorage.getItem(
        "telegram_username"
      );

    if (saved) {
      setUsername(saved);
    }
  }, []);

  const notify = (text: string) => {
    setMessage(text);

    setTimeout(() => {
      setMessage("");
    }, 2200);
  };

  const unlockMine = (index: number) => {
    if (index <= 0) return;

    if (index < unlockedMines) {
      return;
    }

    const price =
      MINES[index].unlockPrice;

    if (coins < price) {
      notify(
        `❌ Necesitas ${price} 🪙`
      );
      return;
    }

    setCoins(
      (value) => value - price
    );

    setUnlockedMines(
      index + 1
    );

    setSelectedMine(index);

    notify(
      `🔓 ${MINES[index].name} desbloqueada`
    );
  };

  const buyManager = () => {
    const mine = MINES[selectedMine];

    if (
      selectedMine >= unlockedMines
    ) {
      notify(
        "🔒 Primero desbloquea esta mina"
      );
      return;
    }

    if (
      managerOwned[selectedMine]
    ) {
      notify(
        "👑 El jefe ya está contratado"
      );
      return;
    }

    if (coins < mine.managerPrice) {
      notify(
        `❌ Necesitas ${mine.managerPrice} 🪙`
      );
      return;
    }

    setCoins(
      (value) =>
        value - mine.managerPrice
    );

    setManagerOwned(
      (old) => {
        const next = [...old];
        next[selectedMine] = true;
        return next;
      }
    );

    notify(
      `👑 Jefe contratado en ${mine.name}`
    );
  };

  const upgradeMine = () => {
    if (
      selectedMine >= unlockedMines
    ) {
      notify(
        "🔒 Mina bloqueada"
      );
      return;
    }

    const level =
      mineLevel[selectedMine];

    const price =
      100 * level;

    if (coins < price) {
      notify(
        `❌ Necesitas ${price} 🪙`
      );
      return;
    }

    setCoins(
      (value) => value - price
    );

    setMineLevel(
      (old) => {
        const next = [...old];
        next[selectedMine] =
          level + 1;
        return next;
      }
    );

    notify(
      `⬆️ Mina mejorada a nivel ${
        level + 1
      }`
    );
  };

  const upgradePickaxe = () => {
    if (
      selectedMine >= unlockedMines
    ) {
      notify(
        "🔒 Mina bloqueada"
      );
      return;
    }

    const level =
      pickaxeLevel[selectedMine];

    const price =
      75 * level;

    if (coins < price) {
      notify(
        `❌ Necesitas ${price} 🪙`
      );
      return;
    }

    setCoins(
      (value) => value - price
    );

    setPickaxeLevel(
      (old) => {
        const next = [...old];
        next[selectedMine] =
          level + 1;
        return next;
      }
    );

    notify(
      `⛏️ Pico mejorado a nivel ${
        level + 1
      }`
    );
  };

  const startManualMining = (
    index: number
  ) => {
    if (index >= unlockedMines) {
      notify(
        "🔒 Esta mina está bloqueada"
      );
      return;
    }

    setSelectedMine(index);

    setMinerWorking(
      (old) => {
        const next = [...old];
        next[index] = true;
        return next;
      }
    );
  };

  useEffect(() => {
    const timer =
      setInterval(() => {

        managerOwned.forEach(
          (hasManager, index) => {

            if (!hasManager) return;

            if (
              index >= unlockedMines
            ) {
              return;
            }

            const amount =
              MINES[index].baseIncome *
              mineLevel[index] *
              pickaxeLevel[index];

            setMinerals(
              (old) => {
                const next = [...old];

                next[index] += amount;

                return next;
              }
            );

            setCoins(
              (value) =>
                value + amount
            );

            setMinerWorking(
              (old) => {
                const next = [...old];
                next[index] = true;
                return next;
              }
            );
          }
        );

      }, 3000);

    return () =>
      clearInterval(timer);

  }, [
    managerOwned,
    unlockedMines,
    mineLevel,
    pickaxeLevel,
  ]);

  const selected =
    MINES[selectedMine];

  const selectedManager =
    managerOwned[selectedMine];

  const selectedPickaxe =
    pickaxeLevel[selectedMine];

  const selectedMineLevel =
    mineLevel[selectedMine];

  const selectedMinerals =
    minerals[selectedMine];

  const managerPrice =
    selected.managerPrice;

  const mineUpgradePrice =
    100 * selectedMineLevel;

  const pickaxeUpgradePrice =
    75 * selectedPickaxe;

  function Miner3D({
    working,
    pickaxeLevel,
  }: {
    working: boolean;
    pickaxeLevel: number;
  }) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
      const time = state.clock.getElapsedTime();

      if (working) {
        const cycle = time * 4;
        const hit = Math.sin(cycle);

        if (group.current) {
  group.current.rotation.z =
    hit > 0 ? hit * 0.08 : 0;

  group.current.position.y =
    Math.abs(hit) * 0.025;
        }
        
      if (group.current) {
  group.current.rotation.z =
    Math.sin(time * 1.5) * 0.015;

  group.current.position.y =
    Math.sin(time * 1.5) * 0.01;
      }
      
      }
    });

    const pickaxeLength =
      0.72 + pickaxeLevel * 0.035;

    return (
  <group ref={group}>

        {/* SOMBRA */}
        <mesh
          position={[0, 0.03, 0]}
          rotation={[
            -Math.PI / 2,
            0,
            0,
          ]}
        >
          <circleGeometry
            args={[0.32, 32]}
          />
          <meshBasicMaterial
            transparent
            opacity={0.35}
          />
        </mesh>

        {/* BOTAS */}
        <RoundedBox
          args={[
            0.18,
            0.16,
            0.25,
          ]}
          radius={0.035}
          position={[-0.12, 0.2, 0]}
        >
          <meshStandardMaterial
            color="#20252a"
            roughness={0.8}
          />
        </RoundedBox>

        <RoundedBox
          args={[
            0.18,
            0.16,
            0.25,
          ]}
          radius={0.035}
          position={[0.12, 0.2, 0]}
        >
          <meshStandardMaterial
            color="#20252a"
            roughness={0.8}
          />
        </RoundedBox>

        {/* PIERNAS */}
        <RoundedBox
          args={[
            0.16,
            0.35,
            0.16,
          ]}
          radius={0.035}
          position={[-0.12, 0.42, 0]}
        >
          <meshStandardMaterial
            color="#263b4c"
            roughness={0.8}
          />
        </RoundedBox>

        <RoundedBox
          args={[
            0.16,
            0.35,
            0.16,
          ]}
          radius={0.035}
          position={[0.12, 0.42, 0]}
        >
          <meshStandardMaterial
            color="#263b4c"
            roughness={0.8}
          />
        </RoundedBox>

        {/* CUERPO */}
        <RoundedBox
          args={[
            0.48,
            0.48,
            0.28,
          ]}
          radius={0.08}
          position={[0, 0.78, 0]}
        >
          <meshStandardMaterial
            color="#d98b25"
            roughness={0.75}
          />
        </RoundedBox>

        {/* CHALECO */}
        <RoundedBox
          args={[
            0.36,
            0.32,
            0.3,
          ]}
          radius={0.05}
          position={[0, 0.81, 0.15]}
        >
          <meshStandardMaterial
            color="#f2a52e"
            roughness={0.7}
          />
        </RoundedBox>

        {/* CABEZA */}
        <mesh
          position={[0, 1.17, 0]}
        >
          <sphereGeometry
            args={[0.25, 24, 24]}
          />

          <meshStandardMaterial
            color="#d99a6c"
            roughness={0.8}
          />
        </mesh>

        {/* OREJAS */}
        <mesh
          position={[-0.245, 1.17, 0]}
        >
          <sphereGeometry
            args={[0.055, 16, 16]}
          />

          <meshStandardMaterial
            color="#d99a6c"
          />
        </mesh>

        <mesh
          position={[0.245, 1.17, 0]}
        >
          <sphereGeometry
            args={[0.055, 16, 16]}
          />

          <meshStandardMaterial
            color="#d99a6c"
          />
        </mesh>

        {/* CASCO */}
        <mesh
          position={[0, 1.38, 0]}
        >
          <sphereGeometry
            args={[
              0.29,
              24,
              16,
              0,
              Math.PI * 2,
              0,
              Math.PI / 2,
            ]}
          />

          <meshStandardMaterial
            color="#f4b52d"
            roughness={0.65}
          />
        </mesh>

        {/* VISERA DEL CASCO */}
        <RoundedBox
          args={[
            0.42,
            0.055,
            0.18,
          ]}
          radius={0.025}
          position={[
            0,
            1.29,
            0.14,
          ]}
        >
          <meshStandardMaterial
            color="#e5a322"
            roughness={0.7}
          />
        </RoundedBox>

        {/* LÁMPARA */}
        <mesh
          position={[
            0,
            1.39,
            0.265,
          ]}
        >
          <sphereGeometry
            args={[0.055, 16, 16]}
          />

          <meshStandardMaterial
            color="#fff1a3"
            emissive="#fff1a3"
            emissiveIntensity={2}
          />
        </mesh>

        {/* OJOS */}
        <mesh
          position={[
            -0.09,
            1.19,
            0.23,
          ]}
        >
          <sphereGeometry
            args={[0.025, 12, 12]}
          />

          <meshStandardMaterial
            color="#111"
          />
        </mesh>

        <mesh
          position={[
            0.09,
            1.19,
            0.23,
          ]}
        >
          <sphereGeometry
            args={[0.025, 12, 12]}
          />

          <meshStandardMaterial
            color="#111"
          />
        </mesh>

        {/* BRAZO IZQUIERDO */}
        <RoundedBox
          args={[
            0.14,
            0.38,
            0.14,
          ]}
          radius={0.04}
          position={[
            -0.31,
            0.77,
            0,
          ]}
          rotation={[
            0,
            0,
            working
              ? -0.7
              : -0.15,
          ]}
        >
          <meshStandardMaterial
            color="#d99a6c"
          />
        </RoundedBox>

        {/* BRAZO DERECHO */}
        <RoundedBox
          args={[
            0.14,
            0.38,
            0.14,
          ]}
          radius={0.04}
          position={[
            0.31,
            0.77,
            0,
          ]}
          rotation={[
            0,
            0,
            working
              ? 0.7
              : 0.15,
          ]}
        >
          <meshStandardMaterial
            color="#d99a6c"
          />
        </RoundedBox>

        {/* PICO */}
        <group
          position={[
            0,
            0.95,
            0.16,
          ]}
          rotation={[
            0,
            0,
            working
              ? -0.8
              : -0.25,
          ]}
        >

          <RoundedBox
            args={[
              0.055,
              pickaxeLength,
              0.055,
            ]}
            radius={0.02}
            position={[
              0,
              -0.15,
              0,
            ]}
          >
            <meshStandardMaterial
              color="#704524"
              roughness={0.8}
            />
          </RoundedBox>

          <mesh
            position={[
              0,
              pickaxeLength / 2 -
                0.12,
              0,
            ]}
            rotation={[
              0,
              0,
              Math.PI / 2,
            ]}
          >
            <boxGeometry
              args={[
                0.42,
                0.07,
                0.07,
              ]}
            />

            <meshStandardMaterial
              color="#72777b"
              metalness={0.8}
              roughness={0.35}
            />
          </mesh>

        </group>

      </group>
    );
          }

  function Manager3D({
    active,
  }: {
    active: boolean;
  }) {
    const group = useMemo(
      () => new THREE.Group(),
      []
    );

    useFrame((state) => {
      const time =
        state.clock.getElapsedTime();

      if (active) {
        group.position.y =
          Math.sin(time * 2) * 0.025;
      } else {
        group.position.y =
          Math.sin(time) * 0.01;
      }
    });

    return (
      <group ref={group}>

        {/* SOMBRA */}
        <mesh
          position={[0, 0.02, 0]}
          rotation={[
            -Math.PI / 2,
            0,
            0,
          ]}
        >
          <circleGeometry
            args={[0.3, 24]}
          />

          <meshBasicMaterial
            transparent
            opacity={0.3}
          />
        </mesh>

        {/* BOTAS */}
        <RoundedBox
          args={[
            0.2,
            0.18,
            0.28,
          ]}
          radius={0.04}
          position={[
            -0.12,
            0.2,
            0,
          ]}
        >
          <meshStandardMaterial
            color="#20242a"
          />
        </RoundedBox>

        <RoundedBox
          args={[
            0.2,
            0.18,
            0.28,
          ]}
          radius={0.04}
          position={[
            0.12,
            0.2,
            0,
          ]}
        >
          <meshStandardMaterial
            color="#20242a"
          />
        </RoundedBox>

        {/* PIERNAS */}
        <RoundedBox
          args={[
            0.17,
            0.35,
            0.17,
          ]}
          radius={0.04}
          position={[
            -0.12,
            0.45,
            0,
          ]}
        >
          <meshStandardMaterial
            color="#26313b"
          />
        </RoundedBox>

        <RoundedBox
          args={[
            0.17,
            0.35,
            0.17,
          ]}
          radius={0.04}
          position={[
            0.12,
            0.45,
            0,
          ]}
        >
          <meshStandardMaterial
            color="#26313b"
          />
        </RoundedBox>

        {/* CUERPO */}
        <RoundedBox
          args={[
            0.52,
            0.48,
            0.3,
          ]}
          radius={0.08}
          position={[
            0,
            0.78,
            0,
          ]}
        >
          <meshStandardMaterial
            color="#263b52"
          />
        </RoundedBox>

        {/* CHAQUETA */}
        <RoundedBox
          args={[
            0.38,
            0.34,
            0.32,
          ]}
          radius={0.05}
          position={[
            0,
            0.82,
            0.16,
          ]}
        >
          <meshStandardMaterial
            color="#344f69"
          />
        </RoundedBox>

        {/* CABEZA */}
        <mesh
          position={[
            0,
            1.18,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              0.25,
              24,
              24,
            ]}
          />

          <meshStandardMaterial
            color="#d99a6c"
            roughness={0.8}
          />
        </mesh>

        {/* CABELLO */}
        <mesh
          position={[
            0,
            1.33,
            -0.02,
          ]}
        >
          <sphereGeometry
            args={[
              0.255,
              20,
              16,
            ]}
          />

          <meshStandardMaterial
            color="#3b271d"
            roughness={1}
          />
        </mesh>

        {/* CASCO DEL JEFE */}
        <mesh
          position={[
            0,
            1.39,
            0,
          ]}
        >
          <sphereGeometry
            args={[
              0.29,
              24,
              16,
              0,
              Math.PI * 2,
              0,
              Math.PI / 2,
            ]}
          />

          <meshStandardMaterial
            color="#e5b52e"
            metalness={0.05}
            roughness={0.55}
          />
        </mesh>

        {/* VISERA */}
        <RoundedBox
          args={[
            0.43,
            0.055,
            0.17,
          ]}
          radius={0.025}
          position={[
            0,
            1.30,
            0.14,
          ]}
        >
          <meshStandardMaterial
            color="#c8951f"
          />
        </RoundedBox>

        {/* LÁMPARA */}
        <mesh
          position={[
            0,
            1.40,
            0.27,
          ]}
        >
          <sphereGeometry
            args={[
              0.055,
              16,
              16,
            ]}
          />

          <meshStandardMaterial
            color="#fff0a0"
            emissive="#fff0a0"
            emissiveIntensity={
              active ? 3 : 1
            }
          />
        </mesh>

        {/* OJOS */}
        <mesh
          position={[
            -0.09,
            1.18,
            0.23,
          ]}
        >
          <sphereGeometry
            args={[
              0.025,
              12,
              12,
            ]}
          />

          <meshStandardMaterial
            color="#111"
          />
        </mesh>

        <mesh
          position={[
            0.09,
            1.18,
            0.23,
          ]}
        >
          <sphereGeometry
            args={[
              0.025,
              12,
              12,
            ]}
          />

          <meshStandardMaterial
            color="#111"
          />
        </mesh>

        {/* BRAZO IZQUIERDO */}
        <RoundedBox
          args={[
            0.14,
            0.38,
            0.14,
          ]}
          radius={0.04}
          position={[
            -0.31,
            0.77,
            0,
          ]}
          rotation={[
            0,
            0,
            -0.15,
          ]}
        >
          <meshStandardMaterial
            color="#d99a6c"
          />
        </RoundedBox>

        {/* BRAZO DERECHO */}
        <RoundedBox
          args={[
            0.14,
            0.38,
            0.14,
          ]}
          radius={0.04}
          position={[
            0.31,
            0.77,
            0,
          ]}
          rotation={[
            0,
            0,
            0.15,
          ]}
        >
          <meshStandardMaterial
            color="#d99a6c"
          />
        </RoundedBox>

        {/* CARPETA DEL JEFE */}
        <RoundedBox
          args={[
            0.28,
            0.36,
            0.055,
          ]}
          radius={0.02}
          position={[
            0.32,
            0.72,
            0.16,
          ]}
          rotation={[
            0,
            0,
            -0.2,
          ]}
        >
          <meshStandardMaterial
            color="#8b572a"
          />
        </RoundedBox>

      </group>
    );
  }

  const managerStatus =
    selectedManager
      ? "ACTIVO"
      : "SIN CONTRATAR";

  const managerButtonText =
    selectedManager
      ? "👑 JEFE CONTRATADO"
      : `👑 CONTRATAR JEFE · ${managerPrice} 🪙`;

  const mineStatus =
    selectedMine < unlockedMines
      ? "ACTIVA"
      : "BLOQUEADA";

  const currentIncome =
    selected.baseIncome *
    selectedMineLevel *
    selectedPickaxe;

  const totalMinerals =
    minerals.reduce(
      (sum, value) => sum + value,
      0
    );

  const totalManagers =
    managerOwned.filter(Boolean).length;

  const totalMineLevels =
    mineLevel.reduce(
      (sum, value) => sum + value,
      0
    );

  return (
    <main className="game-page">

      {/* HEADER */}
      <header className="top-header">

        <button
          className="profile-top"
          onClick={() => router.push("/profile")}
        >
          <div className="avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="user-info">
            <strong>
              @{username}
            </strong>

            <span>
              ⛏️ MINERO
            </span>
          </div>
        </button>

        <div className="coin-box">
          <span>🪙</span>
          <strong>{coins}</strong>
        </div>

      </header>

      {message && (
        <div className="game-message">
          {message}
        </div>
      )}

      {/* MUNDO */}
      <section className="mine-world-3d">

        {/* SUPERFICIE */}
        <div className="surface-3d">

          <div className="surface-sky">
            <div className="moon-3d" />
          </div>

          <div className="mountains-3d">
            <div />
            <div />
            <div />
          </div>

          <div className="surface-ground">

            <div className="mine-sign">
              🇨🇺 CUBAN-MINER
            </div>

            {/* ASCENSOR */}
            <div className="surface-elevator">
              <div className="elevator-roof" />
              <div className="elevator-door">
                <span>🛗</span>
              </div>
            </div>

            {/* ALMACÉN */}
            <div className="warehouse-3d">

              <div className="warehouse-roof" />

              <div className="warehouse-front">
                <strong>
                  ALMACÉN
                </strong>

                <div className="warehouse-door" />

                <span>
                  🪨 {totalMinerals}
                </span>
              </div>

            </div>

            {/* SUPERVISOR GENERAL */}
            <div className="surface-manager">

              <div className="manager-badge">
                SUPERVISOR
              </div>

              <Canvas
                camera={{
                  position: [
                    0,
                    1.4,
                    4
                  ],
                  fov: 35
                }}
              >
                <ambientLight intensity={1.8} />

                <directionalLight
                  position={[
                    2,
                    4,
                    3
                  ]}
                  intensity={3}
                />

                <Manager3D
                  active={
                    totalManagers > 0
                  }
                />

                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  enableRotate={false}
                />
              </Canvas>

              <small>
                JEFE DE MINA
              </small>

            </div>

          </div>

        </div>

        {/* SUBTERRÁNEO */}
        <div className="underground-3d">

          <div className="rock-ceiling-3d">
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>

          {/* ELEVADOR */}
          <div
            className="vertical-elevator"
            style={{
              height:
                `${unlockedMines * 190}px`
            }}
          >

            <div className="elevator-track left" />
            <div className="elevator-track right" />

            <div
              className="elevator-cabin-3d"
              style={{
                top:
                  `${selectedMine * 190}px`
              }}
            >
              🛗
            </div>

          </div>

          {/* MINAS */}
          <div className="mine-list">

            {MINES.map(
              (mine, index) => {

                const unlocked =
                  index <
                  unlockedMines;

                const working =
                  minerWorking[index];

                return (
                  <div
                    key={mine.name}
                    className={`mine-room ${
                      unlocked
                        ? "mine-room-open"
                        : "mine-room-locked"
                    } ${
                      selectedMine === index
                        ? "mine-room-selected"
                        : ""
                    }`}
                    onClick={() =>
                      unlocked &&
                      startManualMining(index)
                    }
                  >

                    {/* CABECERA */}
                    <div className="mine-room-header">

                      <div>
                        <small>
                          NIVEL {index + 1}
                        </small>

                        <h2>
                          {mine.name}
                        </h2>
                      </div>

                      <div className="mine-header-right">

                        {unlocked ? (
                          <span className="active-status">
                            ● ACTIVA
                          </span>
                        ) : (
                          <span className="locked-status">
                            🔒 BLOQUEADA
                          </span>
                        )}

                      </div>

                    </div>

                    {unlocked ? (
                      <>

                        {/* ESCENA 3D */}
                        <div className="mine-scene">

                          <Canvas
                            camera={{
                              position: [
                                0,
                                1.5,
                                5
                              ],
                              fov: 42
                            }}
                          >

                            <ambientLight
                              intensity={1.4}
                            />

                            <directionalLight
                              position={[
                                3,
                                5,
                                4
                              ]}
                              intensity={3}
                            />

                            <pointLight
                              position={[
                                0,
                                2,
                                1
                              ]}
                              intensity={5}
                              distance={5}
                            />

                            <Miner3D
                              working={working}
                              pickaxeLevel={
                                pickaxeLevel[index]
                              }
                            />

                            <OrbitControls
                              enableZoom={false}
                              enablePan={false}
                              enableRotate={false}
                            />

                          </Canvas>

                          {/* LUZ DE MINA */}
                          <div className="mine-lamp">
                            <span />
                          </div>

                          {/* VAGON */}
                          <div
                            className={`mine-wagon ${
                              working
                                ? "wagon-active"
                                : ""
                            }`}
                          >
                            <div className="wagon-body">
                              <div className="wagon-ore">
                                {mine.mineral}
                              </div>
                            </div>

                            <div className="wagon-wheel" />
                            <div className="wagon-wheel second" />
                          </div>

                          {/* ENCARGADO */}
                          <div className="worker-label">
                            MINERO
                          </div>

                        </div>

                        {/* RIELES */}
                        <div className="mine-rails">
                          <span />
                          <span />
                        </div>

                        {/* INFORMACIÓN */}
                        <div className="mine-bottom">

                          <div>
                            <small>
                              PRODUCCIÓN
                            </small>

                            <strong>
                              +{currentIncome}
                            </strong>
                          </div>

                          <div>
                            <small>
                              MINERALES
                            </small>

                            <strong>
                              {minerals[index]}
                            </strong>
                          </div>

                          <div>
                            <small>
                              PICO
                            </small>

                            <strong>
                              NIVEL {
                                pickaxeLevel[index]
                              }
                            </strong>
                          </div>

                          <div>
                            <small>
                              JEFE
                            </small>

                            <strong>
                              {managerOwned[index]
                                ? "ACTIVO"
                                : "—"}
                            </strong>
                          </div>

                        </div>

                        {/* MENSAJE AL TOCAR */}
                        {selectedMine === index &&
                          !managerOwned[index] && (
                            <div className="tap-hint">
                              👆 MINA SELECCIONADA
                            </div>
                          )}

                      </>
                    ) : (
                      /* MINA BLOQUEADA */
                      <div
                        className="locked-mine-content"
                        onClick={(event) =>
                          event.stopPropagation()
                        }
                      >

                        <div className="big-lock">
                          🔒
                        </div>

                        <strong>
                          MINA DE {mine.name}
                        </strong>

                        <span>
                          Desbloquea este nivel
                        </span>

                        <button
                          className="unlock-mine-button"
                          onClick={() =>
                            unlockMine(index)
                          }
                        >
                          <span>
                            🔓 DESBLOQUEAR
                          </span>

                          <b>
                            {mine.unlockPrice}
                            {" "}🪙
                          </b>
                        </button>

                      </div>
                    )}

                  </div>
                );
              }
            )}

          </div>

        </div>

      </section>

      {/* PANEL DE LA MINA */}
      <section className="mine-control-panel">

        <div className="selected-mine-title">

          <div>
            <small>
              MINA SELECCIONADA
            </small>

            <h2>
              ⛏️ {selected.name}
            </h2>
          </div>

          <div className="mine-level-number">
            NIVEL {selectedMineLevel}
          </div>

        </div>

        <div className="control-grid">

          {/* UP MINA */}
          <button
            className="upgrade-card"
            onClick={upgradeMine}
          >

            <span className="upgrade-icon">
              ⬆️
            </span>

            <div>
              <strong>
                UP MINA
              </strong>

              <small>
                Nivel {selectedMineLevel}
                {" "}→{" "}
                {selectedMineLevel + 1}
              </small>
            </div>

            <b>
              {mineUpgradePrice} 🪙
            </b>

          </button>

          {/* UP PICO */}
          <button
            className="upgrade-card"
            onClick={upgradePickaxe}
          >

            <span className="upgrade-icon">
              ⛏️
            </span>

            <div>
              <strong>
                UP PICO
              </strong>

              <small>
                Nivel {selectedPickaxe}
                {" "}→{" "}
                {selectedPickaxe + 1}
              </small>
            </div>

            <b>
              {pickaxeUpgradePrice} 🪙
            </b>

          </button>

        </div>

        {/* JEFE */}
        <button
          className={`manager-card ${
            selectedManager
              ? "manager-owned"
              : ""
          }`}
          onClick={buyManager}
        >

          <div className="manager-card-icon">
            👑
          </div>

          <div className="manager-card-text">

            <strong>
              {managerStatus}
            </strong>

            <small>
              {selectedManager
                ? "Esta mina trabaja automáticamente"
                : "Contrata al jefe para automatizar la mina"}
            </small>

          </div>

          <div className="manager-card-price">

            {selectedManager
              ? "✓"
              : `${managerPrice} 🪙`}

          </div>

        </button>

      </section>

            {/* MENÚ INFERIOR */}
      <nav className="bottom-nav">

        <button
          className="nav-selected"
          onClick={() =>
            router.push("/game")
          }
        >
          <span>⛏</span>
          <small>MINAS</small>
        </button>

        <button
          onClick={() =>
            router.push("/shop")
          }
        >
          <span>🛒</span>
          <small>TIENDA</small>
        </button>

        <button
          onClick={() =>
            router.push("/friends")
          }
        >
          <span>👥</span>
          <small>REFERIDOS</small>
        </button>

        <button
          onClick={() =>
            router.push("/bank")
          }
        >
          <span>🏦</span>
          <small>BANCO</small>
        </button>

        <button
          onClick={() =>
            router.push("/missions")
          }
        >
          <span>🎯</span>
          <small>MISIONES</small>
        </button>

        <button
          onClick={() =>
            router.push("/mapa")
          }
        >
          <span>🌍</span>
          <small>MAPA</small>
        </button>

      </nav>

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .game-page {
          min-height: 100vh;
          background: #090d11;
          color: #fff;
          padding-bottom: 88px;
          font-family:
            Arial,
            Helvetica,
            sans-serif;
          overflow-x: hidden;
        }

        /* HEADER */

        .top-header {
          height: 68px;
          padding: 9px 12px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #0d151c;
          border-bottom:
            1px solid #293640;
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .profile-top {
          border: 0;
          background: transparent;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0;
          cursor: pointer;
        }

        .avatar {
          width: 43px;
          height: 43px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              145deg,
              #ffc94f,
              #9d5b13
            );
          border:
            2px solid #ffe08a;
          color: #17100a;
          font-size: 16px;
          font-weight: 900;
        }

        .user-info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 3px;
        }

        .user-info strong {
          font-size: 13px;
        }

        .user-info span {
          color: #82919c;
          font-size: 8px;
        }

        .coin-box {
          display: flex;
          align-items: center;
          gap: 5px;
          background: #18232c;
          border:
            1px solid #34444f;
          padding: 9px 12px;
          border-radius: 13px;
        }

        .coin-box strong {
          color: #ffd052;
          font-size: 13px;
        }

        /* MENSAJE */

        .game-message {
          position: fixed;
          left: 50%;
          top: 78px;
          transform: translateX(-50%);
          z-index: 300;
          background: #17232c;
          border:
            1px solid #566a78;
          border-radius: 12px;
          padding: 10px 14px;
          font-size: 11px;
          white-space: nowrap;
          box-shadow:
            0 10px 30px
            rgba(0,0,0,.55);
        }

        /* MUNDO */

        .mine-world-3d {
          width: 100%;
          overflow: hidden;
        }

        .surface-3d {
          position: relative;
          height: 280px;
        }

        .surface-sky {
          height: 135px;
          background:
            linear-gradient(
              180deg,
              #10243a,
              #27435a
            );
          position: relative;
        }

        .moon-3d {
          position: absolute;
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #fff1bd;
          right: 32px;
          top: 20px;
          box-shadow:
            0 0 20px
            rgba(255,238,165,.5);
        }

        .mountains-3d {
          height: 45px;
          position: relative;
          background: #17242d;
          overflow: hidden;
        }

        .mountains-3d div {
          position: absolute;
          bottom: -35px;
          width: 130px;
          height: 90px;
          background: #101a20;
          transform: rotate(45deg);
        }

        .mountains-3d div:nth-child(1) {
          left: -20px;
        }

        .mountains-3d div:nth-child(2) {
          left: 105px;
        }

        .mountains-3d div:nth-child(3) {
          right: -30px;
        }

        .surface-ground {
          position: relative;
          height: 100px;
          background:
            repeating-linear-gradient(
              0deg,
              #3b2818 0,
              #3b2818 9px,
              #49301d 10px,
              #49301d 19px
            );
          border-bottom:
            5px solid #21150c;
        }

        .mine-sign {
          position: absolute;
          left: 10px;
          bottom: 23px;
          padding: 6px 8px;
          border-radius: 7px;
          background: #151515;
          border:
            1px solid #d89a30;
          color: #ffd267;
          font-size: 8px;
          font-weight: 900;
        }

        /* ASCENSOR */

        .surface-elevator {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          width: 45px;
          height: 83px;
          background: #1a2024;
          border:
            2px solid #73787b;
          z-index: 4;
        }

        .elevator-roof {
          height: 8px;
          background: #a0a4a5;
        }

        .elevator-door {
          height: 72px;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              90deg,
              #292f32,
              #454a4d,
              #292f32
            );
        }

        .elevator-door span {
          font-size: 21px;
        }

        /* ALMACÉN */

        .warehouse-3d {
          position: absolute;
          right: 9px;
          bottom: 9px;
          width: 91px;
          height: 82px;
        }

        .warehouse-roof {
          height: 15px;
          background: #722e1d;
          clip-path:
            polygon(
              0 100%,
              50% 0,
              100% 100%
            );
        }

        .warehouse-front {
          height: 67px;
          background: #56321f;
          border:
            1px solid #9a6438;
          text-align: center;
          padding-top: 5px;
        }

        .warehouse-front strong {
          font-size: 8px;
          color: #f1c06b;
        }

        .warehouse-door {
          width: 27px;
          height: 35px;
          margin: 5px auto 2px;
          background: #191513;
          border:
            1px solid #775035;
        }

        .warehouse-front span {
          font-size: 7px;
          color: #b6aaa0;
        }

        /* SUPERVISOR */

        .surface-manager {
          position: absolute;
          left: 50%;
          bottom: 3px;
          width: 75px;
          height: 102px;
          transform: translateX(-50%);
          text-align: center;
          z-index: 5;
        }

        .surface-manager canvas {
          width: 75px !important;
          height: 78px !important;
          display: block;
        }

        .manager-badge {
          position: absolute;
          z-index: 5;
          left: 50%;
          transform: translateX(-50%);
          top: -4px;
          background: #1c1a12;
          border:
            1px solid #e0aa39;
          color: #ffd25d;
          border-radius: 6px;
          padding: 3px 6px;
          font-size: 6px;
          font-weight: 900;
        }

        .surface-manager small {
          color: #918b84;
          font-size: 6px;
        }

        /* SUBTERRÁNEO */

        .underground-3d {
          position: relative;
          background:
            linear-gradient(
              180deg,
              #17120f,
              #0b0908
            );
          padding: 10px 8px 30px;
        }

        .rock-ceiling-3d {
          height: 18px;
          display: flex;
          justify-content: space-around;
          overflow: hidden;
          opacity: .35;
        }

        .rock-ceiling-3d span {
          width: 28px;
          height: 28px;
          background: #4b3b2d;
          transform: rotate(45deg);
          margin-top: -14px;
        }

        /* ELEVADOR VERTICAL */

        .vertical-elevator {
          position: absolute;
          top: 28px;
          left: 50%;
          transform: translateX(-50%);
          width: 45px;
          z-index: 2;
          pointer-events: none;
        }

        .elevator-track {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 4px;
          background:
            linear-gradient(
              180deg,
              #777b7c,
              #34383a
            );
        }

        .elevator-track.left {
          left: 4px;
        }

        .elevator-track.right {
          right: 4px;
        }

        .elevator-cabin-3d {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          width: 38px;
          height: 42px;
          border:
            2px solid #777;
          background: #292f32;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          transition:
            top 1s ease;
        }

        /* LISTA */

        .mine-list {
          position: relative;
          z-index: 5;
        }

        .mine-room {
          position: relative;
          min-height: 235px;
          margin: 10px 0;
          border-radius: 14px;
          overflow: hidden;
          transition:
            transform .15s ease;
        }

        .mine-room:active {
          transform: scale(.985);
        }

        .mine-room-open {
          background:
            linear-gradient(
              135deg,
              #302218,
              #1a1511
            );
          border:
            1px solid #604a34;
        }

        .mine-room-selected {
          border:
            2px solid #d79b32;
          box-shadow:
            0 0 18px
            rgba(216,155,50,.13);
        }

        .mine-room-locked {
          min-height: 180px;
          background:
            linear-gradient(
              135deg,
              #181818,
              #101010
            );
          border:
            1px solid #373737;
        }

        .mine-room-header {
          height: 49px;
          padding: 7px 10px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom:
            1px solid #493a2c;
          background:
            rgba(0,0,0,.2);
        }

        .mine-room-header small {
          display: block;
          color: #81766d;
          font-size: 7px;
        }

        .mine-room-header h2 {
          margin: 2px 0 0;
          font-size: 15px;
          color: #f2bf51;
        }

        .mine-header-right {
          font-size: 7px;
          font-weight: 900;
        }

        .active-status {
          color: #62d878;
        }

        .locked-status {
          color: #777;
        }

        /* ESCENA */

        .mine-scene {
          height: 130px;
          position: relative;
          background:
            radial-gradient(
              circle at 50% 35%,
              #4a3420,
              #211811 70%
            );
        }

        .mine-scene canvas {
          width: 100% !important;
          height: 130px !important;
          display: block;
        }

        .mine-lamp {
          position: absolute;
          left: 12%;
          top: 8px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #fff0a0;
          box-shadow:
            0 0 22px 8px
            rgba(255,219,98,.3);
        }

        /* VAGÓN */

        .mine-wagon {
          position: absolute;
          right: 10%;
          bottom: 20px;
          width: 45px;
          height: 31px;
          transition:
            transform 1s ease;
        }

        .wagon-active {
          transform:
            translateX(-18px);
        }

        .wagon-body {
          width: 45px;
          height: 22px;
          background:
            linear-gradient(
              180deg,
              #7a4a27,
              #4b2c18
            );
          border:
            2px solid #9b6636;
          border-radius: 3px 3px 7px 7px;
          position: relative;
        }

        .wagon-ore {
          position: absolute;
          left: 5px;
          top: -9px;
          color: #8c8b87;
          font-size: 11px;
        }

        .wagon-wheel {
          position: absolute;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #202020;
          border:
            2px solid #777;
          bottom: -6px;
          left: 5px;
        }

        .wagon-wheel.second {
          left: 30px;
        }

        .worker-label {
          position: absolute;
          left: 29%;
          bottom: 7px;
          color: #b0a49a;
          font-size: 6px;
        }

        .mine-rails {
          height: 14px;
          position: relative;
          background: #17120e;
        }

        .mine-rails span {
          position: absolute;
          left: 8%;
          right: 8%;
          height: 3px;
          background: #76706b;
        }

        .mine-rails span:first-child {
          top: 2px;
        }

        .mine-rails span:last-child {
          top: 9px;
        }

        /* INFORMACIÓN */

        .mine-bottom {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          border-top:
            1px solid #40342a;
        }

        .mine-bottom div {
          min-width: 0;
          padding: 7px 4px;
          text-align: center;
          border-right:
            1px solid #352b24;
        }

        .mine-bottom div:last-child {
          border-right: 0;
        }

        .mine-bottom small {
          display: block;
          color: #776e66;
          font-size: 6px;
        }

        .mine-bottom strong {
          display: block;
          color: #e6b84e;
          font-size: 9px;
          margin-top: 3px;
        }

        .tap-hint {
          text-align: center;
          color: #d7a33d;
          background: #211a12;
          padding: 5px;
          font-size: 7px;
          border-top:
            1px solid #443625;
        }

        /* BLOQUEADA */

        .locked-mine-content {
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 5px;
          text-align: center;
        }

        .big-lock {
          font-size: 27px;
          opacity: .65;
        }

        .locked-mine-content strong {
          color: #999;
          font-size: 12px;
        }

        .locked-mine-content span {
          color: #666;
          font-size: 8px;
        }

        .unlock-mine-button {
          margin-top: 4px;
          border:
            1px solid #8e6425;
          background: #2c2114;
          color: #ffd15c;
          border-radius: 8px;
          padding: 8px 13px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 8px;
          font-weight: 900;
        }

        .unlock-mine-button b {
          color: #fff;
        }

        /* CONTROL */

        .mine-control-panel {
          margin: 12px;
          padding: 13px;
          border:
            1px solid #30414c;
          border-radius: 15px;
          background:
            linear-gradient(
              145deg,
              #14212a,
              #0d151b
            );
        }

        .selected-mine-title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .selected-mine-title small {
          color: #71818d;
          font-size: 7px;
        }

        .selected-mine-title h2 {
          margin: 3px 0 0;
          font-size: 15px;
          color: #f0bc4d;
        }

        .mine-level-number {
          padding: 7px 9px;
          background: #1b2b34;
          border-radius: 8px;
          color: #b9c4ca;
          font-size: 8px;
          font-weight: 900;
        }

        .control-grid {
          display: grid;
          grid-template-columns:
            repeat(2, 1fr);
          gap: 7px;
        }

        .upgrade-card {
          border:
            1px solid #344852;
          background: #17242c;
          color: #fff;
          border-radius: 11px;
          min-height: 66px;
          padding: 8px;
          display: flex;
          align-items: center;
          gap: 7px;
          text-align: left;
        }

        .upgrade-icon {
          width: 31px;
          height: 31px;
          border-radius: 9px;
          background: #253640;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 15px;
        }

        .upgrade-card div {
          flex: 1;
          min-width: 0;
        }

        .upgrade-card strong {
          display: block;
          font-size: 9px;
        }

        .upgrade-card small {
          display: block;
          color: #71818c;
          font-size: 7px;
          margin-top: 3px;
        }

        .upgrade-card b {
          color: #f1bd4b;
          font-size: 8px;
        }

        /* JEFE */

        .manager-card {
          width: 100%;
          margin-top: 8px;
          min-height: 65px;
          border:
            1px solid #65502b;
          background:
            linear-gradient(
              135deg,
              #2b2114,
              #1b1711
            );
          border-radius: 11px;
          color: #fff;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px;
          text-align: left;
        }

        .manager-owned {
          border-color: #3d8d54;
          background:
            linear-gradient(
              135deg,
              #162b20,
              #102019
            );
        }

        .manager-card-icon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #352817;
          font-size: 18px;
        }

        .manager-card-text {
          flex: 1;
          min-width: 0;
        }

        .manager-card-text strong {
          display: block;
          color: #f4c550;
          font-size: 10px;
        }

        .manager-card-text small {
          display: block;
          color: #858f95;
          font-size: 7px;
          margin-top: 3px;
        }

        .manager-card-price {
          color: #fff;
          font-size: 8px;
          font-weight: 900;
        }

        /* MENÚ */

        .bottom-nav {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          height: 72px;
          z-index: 150;
          background: #091219;
          border-top:
            1px solid #293943;
          display: grid;
          grid-template-columns:
            repeat(6, 1fr);
          padding-bottom: 3px;
        }

        .bottom-nav button {
          border: 0;
          background: transparent;
          color: #687984;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 3px;
        }

        .bottom-nav button span {
          font-size: 18px;
        }

        .bottom-nav button small {
          font-size: 6px;
          font-weight: 900;
        }

        .bottom-nav .nav-selected {
          color: #f3bd4b;
        }

        /* MÓVIL */

        @media (
          max-width: 360px
        ) {

          .bottom-nav button span {
            font-size: 16px;
          }

          .bottom-nav button small {
            font-size: 5px;
          }

          .mine-bottom strong {
            font-size: 8px;
          }

        }

      `}</style>

    </main>
  );
}
