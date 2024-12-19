import { IonAlert, IonBadge, IonButton, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonText, IonTitle, IonToggle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {

  const[toggle, setToggle] = useState<boolean>(false)
  const[name, setName] = useState<string>("")

  const colorChange = (toggle: boolean) => {
    if (toggle == true){
      localStorage.setItem("color", "primary")
      setToggle(false)
    
    }else{
      localStorage.setItem("color", "medium")
      setToggle(true)
  
    }
    
  }

  const nameChange = (x: string) => {
    localStorage.setItem("name", x)
    
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={localStorage.getItem("color")}>
          <IonTitle className="ion-text-center">Preferences</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonText className="ion-padding">Registered to: </IonText>
        
        <IonItem>
          <IonInput value={localStorage.getItem("name")} onIonInput={(e) => nameChange(e.target.value)}></IonInput>
        </IonItem>
        <IonToggle checked={!toggle} className="ion-padding" onIonChange={(event) => colorChange(toggle)}>Color theme</IonToggle>
          
      </IonContent>
    </IonPage>
  );
};

export default Home;
