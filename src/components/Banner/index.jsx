import Hero from "../Hero/index"
import "./index.css"

export default function Banner(){
    return(
        <div className="banner">
           <Hero title1={"No fees."} title2={"No minimum deposit."} title3={"High interest rates."} text={"Open a savings account with ArgentBank today !"}/> 
        </div>
    )
}