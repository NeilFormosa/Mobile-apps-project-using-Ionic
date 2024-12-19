import { IonAlert, IonBadge, IonButton, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {

  const[newItem, setNewItem] = useState("")
  const[expenseItems, setExpenseItems] = useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() =>{ 
    const storedItems = localStorage.getItem("items")
    if(storedItems){
      setExpenseItems(JSON.parse(storedItems))
    }
  }, [])
  
  const handleNewItemChange = (event:any)=>{
    setNewItem(event.target.value)
  }

  const handleAddItem = () => {
    if(newItem.trim() != ""){
      const updatedList = [...expenseItems, newItem]
      setExpenseItems(updatedList)
      localStorage.setItem("items", JSON.stringify(updatedList))
      setNewItem("")
    }else{
      setIsOpen(true)
    }
  }

  const removeItem = (index: number) => {
    const updatedList = [...expenseItems];
    updatedList.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(updatedList))
    setExpenseItems(updatedList);
  }

  const slider = (event:any, index:number) => {
    if(event.detail.ratio > 1){
      removeItem(index)
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={localStorage.getItem("color")}>
          <IonTitle className="ion-text-center">Expense Tracker<IonBadge color="danger" style={{ marginLeft: '5px', borderRadius: '50%', padding: '5px', minWidth: '25px', textAlign: 'center' }}>{expenseItems.length}</IonBadge></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonList>
            {expenseItems.map((item, index)=>(
              <IonItemSliding key={item + index} onIonDrag={(event) => slider(event, index)}>
                <IonItem>
                  <IonLabel>{item}</IonLabel>
                  <IonButton color="danger" onClick={ () => removeItem(index)}>Delete</IonButton>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="none"><IonLabel color="danger">Swipe to delete</IonLabel></IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))}
          </IonList>
          
      </IonContent>
      <IonFooter>
        <IonItem>
          <IonInput placeholder='Add new expense' value={newItem} onIonInput={handleNewItemChange}></IonInput>
        </IonItem>
        <IonItem>
          <IonButton onClick={handleAddItem} id='add' color={localStorage.getItem("color")}>Add</IonButton>
        </IonItem>
        <IonAlert
          isOpen={isOpen}
          header="Error"
          message="You must enter an expense"
          buttons={['OK']}
          onDidDismiss={() => setIsOpen(false)}
        ></IonAlert>
       <div className="ion-text-center">
          <IonLabel>Registered to: </IonLabel><IonLabel color={localStorage.getItem("color")}>{localStorage.getItem("name")}</IonLabel>
       </div>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
