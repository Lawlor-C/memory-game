import { cardsArray } from "../data/cardData";
import Card from "./Card";
import "../styles/Gameboard.css"

export default function Gameboard(){ 
    return (
        <div className="gameboard">
        <Card></Card>
        <Card></Card>
        <Card></Card>
        <Card></Card>
        </div>
    )

}