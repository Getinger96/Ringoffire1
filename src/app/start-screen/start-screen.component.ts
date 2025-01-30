import { Component,Input,inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, collectionData, doc, onSnapshot, updateDoc, query, where, limit, orderBy, getDoc } from '@angular/fire/firestore';
import { Game } from '../../models/game';
import { GameComponent } from '../game/game.component';
import { GameService } from '../game.service';
import { addDoc, deleteDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-start-screen',
  standalone: true,
  imports: [CommonModule,GameComponent],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})
export class StartScreenComponent {
  gameservie=inject(GameService)
firestore: Firestore = inject(Firestore);
  constructor(private route: ActivatedRoute,private router: Router) { }


 async newGame() {
  debugger
    let game = new Game();
    await addDoc(collection(this.firestore, 'games'), game.toJson()).catch(
      (err) => { console.error(err) }
    ).then(
      (gameInfo: any) => {
        console.log(gameInfo);
        this.router.navigateByUrl('/game/' + gameInfo.id)
      }
    )
  }
   
  }




