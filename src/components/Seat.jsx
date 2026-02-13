export default function Seat({ seatId, occupied, selected, onToggle }) {
    const className = `seat ${selected ? "selected" : ""} ${occupied ? "occupied" : ""}`;

    function handleClick() {
        if(!occupied) {
            onToggle(seatId);
        }
    }

    return <div className={className} onClick={handleClick} />
}