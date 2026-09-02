export default function StartButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      className="startBtn"
      onClick={onClick}
    >
      START MINING
    </button>
  );
}
