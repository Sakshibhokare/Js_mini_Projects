import './ItemDate.css';


function ItemDate(props) {
    const day=props.day;
    const year= props.year;
    return (
        <>
            <div className='itemDate'>
                <div>{day}</div>
                <div>June</div>
                <div>{year}</div>
            </div>
        </>
    )
}

export default ItemDate;