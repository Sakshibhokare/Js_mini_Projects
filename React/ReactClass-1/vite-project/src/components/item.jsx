import './item.css'

function Item(props){
    const itemName=props.name;
    return(<>
    <p className="nirma">{itemName}
    {props.children}
    </p>
    </>)
}

export default Item;