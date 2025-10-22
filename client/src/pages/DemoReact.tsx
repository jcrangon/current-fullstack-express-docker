import ClickCounter from "@/components/ClickCounterBtn";
import CombinedComponent from "@/components/CombinedComponent";
import Header from "@/components/Header";
import ParentCountDisplay from "@/components/ParentCountDisplay";
import { useEffect, useState } from "react";

export default function DemoReact() {
    const [count, setCount] = useState(0);

    useEffect(()  => {
        // on mount
        console.log("Composant monté");
        console.log("Compteur incrémenté et affiché qu'une fois:", count);
        return () => {
        // before unmount
        console.log("Composant démonté");
        }
    }, []);

    useEffect(()  => {
        // on mount
        // on count change
        console.log("Compteur incrémenté et affiché à chaque changement d'état de count: ", count);
    }, [count]);


    const handleIncrement = () => {
        setCount(count + 1);
    };
    return(
        <div>
            <Header />
            <h3>Flow d'exécution normal de react</h3>
            <p>utilisation du hook useEffect</p>
            <p>Valeur du compteur: {count} </p>
            <button onClick={() => {
            handleIncrement();
            }}>Incrémenter</button>

            <hr style={{ width: "50%", marginTop: "40px", marginLeft: "0" }} />

            <h3>Communication parent enfant</h3>
            <p>composants:  Parent: ClickCounterDisplay & enfant: CountDisplay</p>
            <ClickCounter />

            <hr style={{ width: "50%", marginTop: "40px", marginLeft: "0" }} />

            <h3>Communication enfant parent</h3>
            <p>composants:  ParentCountDisplay & ChildCounterBtn</p>
            <ParentCountDisplay />

            <hr style={{ width: "50%", marginTop: "40px", marginLeft: "0" }} />
            <h3>Communication unidirectionnelle et bidirectionnelle entre JS et HTML au sein d'une meme composant</h3>
            Les variables simples sont recalculées à chaque rendu du composant (comme une fonction normale).

            <p>Si tu veux qu’une variable reste en mémoire entre les rendus, tu dois utiliser un hook React :<br />

            useState → pour stocker une valeur dynamique modifiable.
            <br />
            useRef → pour conserver une valeur sans déclencher de re-render.
            <br />
            useMemo → pour éviter un recalcul coûteux à chaque rendu.</p>

            <p>La liaison bidirectionnelle relie une valeur d’état React (useState) à un élément du DOM, comme un input.</p>

            <p>
            L’état alimente la valeur affichée (JS → HTML) via <code>{'value={state}'}</code>
            </p>
            <p>Et chaque changement de l’utilisateur met à jour cet état (HTML → JS) via onChange.</p>
            <p>Ainsi, interface et logique restent toujours synchronisées.</p>
            <p>C’est le principe des inputs contrôlés en React.</p>

            <p>Composant CombinedComponent</p>
            <CombinedComponent />

        </div>
    )
}