import { Link}   from "react-router-dom";
import Btn from "../componentForm/button";
import Text from "../componentForm/inputText";
import Lab from "../componentForm/label";
export default function TableFiche() {
    return (
        <div className="tableProduit">
            <div className="recherche"><h2>recherche dans la table de fiche</h2>
            <Lab lab="Nom de produit :" />
            <Text placeholder="Entre le nom de produit" /></div>
            <div className="btnRecherche"><Btn name="recherche" className='btn' />
            <Link to="/home">
                <Btn name="retour" className='btn' />
            </Link></div>

            <table>
                <tr>
                    <th>code de produit</th>
                    <th>Nom de produit</th>
                    <th>Quantité</th>
                    <th>date de production</th>
                    <th>date d'expiration</th>
                    <th>Nom de fournisseur</th>
                    <th>Modifier</th> 
                    <th>Supprimer</th>
                </tr>
                <tr>
                    <td><Text placeholder="" /></td>
                    <td><Text placeholder="" /></td>                    
                    <td><Text placeholder="" /></td>
                    <td><Text placeholder="" /></td>
                    <td><Text placeholder="" /></td>
                    <td><Text placeholder="" /></td>
                    <td><Btn name="Modifier" className='btn9' /></td>
                    <td><Btn name="Supprimer" className='btn9' /></td>
                </tr>
            </table>
        </div>
    );
}  