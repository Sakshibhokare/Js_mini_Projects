import Item from './components/item';
import './App.css'
import ItemDate from './components/ItemDate';
import Card from './components/Card';
function App() {
  //array form data
  const response = [{
    itemName: "Joy",
    itemDate: "04",
    itemYear: "2003"
  },
  {
    itemName: "Nirma2",
    itemDate: "20",
    itemYear: "1998"
  },
  {
    itemName: "Nirma3",
    itemDate: "20",
    itemYear: "1998"
  }]

  return (
    <>
    <Card>
      <Item name="Nirma" ></Item>
      <ItemDate day="20"></ItemDate>

      <Item name="SurfExcel" ></Item>
      <ItemDate day="22"></ItemDate>

      <Item name="555"></Item>
      <ItemDate day="28"></ItemDate>


      {/* when we have array of values  */}
      <Item name={response[0].itemName}></Item>
      <ItemDate day={response[0].itemDate} year={response[0].itemYear}></ItemDate>

      <Item name={response[1].itemName}></Item>
      <ItemDate day={response[1].itemDate} year={response[1].itemYear}></ItemDate>

    {/* we want custome data visible the go to that component and write props.children  */}
    <Item>I am an Item</Item>

    </Card>
    </>
  )
}

export default App
