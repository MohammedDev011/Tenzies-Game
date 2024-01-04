
export default function Die(props) {
    return (
        <div 
            className={props.held ? "dies held" : "dies"}
            onClick={props.dieHeld}
        >
            <h2>{props.value}</h2>
        </div>
    )
}