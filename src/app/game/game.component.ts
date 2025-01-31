import { Component, Input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Game } from './../../models/game';
import { PlayerComponent } from '../player/player.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule, MatDialogRef, } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { GameInfoComponent } from "../game-info/game-info.component";
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, collectionData, doc, onSnapshot, updateDoc, query, where, limit, orderBy, getDoc, setDoc } from '@angular/fire/firestore';
import { addDoc, deleteDoc } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { elementAt, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StartScreenComponent } from '../start-screen/start-screen.component';
import { GameService } from '../game.service';
import { PlayerMobileComponent } from '../player-mobile/player-mobile.component';








@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, MatCardModule, AsyncPipe, StartScreenComponent,PlayerMobileComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  gameservice = inject(GameService)
  firestore: Firestore = inject(Firestore);
  unsubList;
  game: Game = new Game
  gameID: string = '';
  unsubGames: any;
  unssubSingleGame: any;



  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

    this.unsubList = onSnapshot(this.getGameRef(), (list) => {
      list.forEach(element => {
        if (element.id == this.gameID) {


          console.log('Game Update', element.data());
          let data = element.data();
          this.game.currentPlayer = data['currentPlayer'];
          this.game.playedCards = data['playedCards'];
          this.game.players = data['player'];
          this.game.stack = data['stack'];
          this.game.pickCardanimation = data['pickCardanimation'];
          this.game.currentCard = data['currentCard'];
        }

      });
    });

  }


  ngOnInit(): void {


    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.gameID = params['id'];
      console.log('ID', this.gameID);


      // this.unsubList = onSnapshot(collection(this.firestore, `${this.gameID}`), (list) => {
      //   list.forEach(element => {


      //   });
      // });

    })
  }


  ngOnDestroy() {
    this.unsubGames();
    this.unssubSingleGame();


  }




  getGameRef() {
    return collection(this.firestore, 'games')
  }

  getsinglegameRef(colId: string, docId: any) {
    return doc(collection(this.firestore, colId), docId)
  }

  takeCard() {
    if (!this.game.pickCardanimation) {
      
      this.game.currentCard = this.game.stack.pop();
     
      console.log(this.game.currentCard);
      this.game.pickCardanimation = true;
      
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.saveGame();

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.pickCardanimation = false;
        console.log('Card pushed to playedCards:', this.game.currentCard);
        this.saveGame();
      }
        , 1000)
    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddPlayerComponent,);
debugger
    dialogRef.afterClosed().subscribe((name: string) => {
     
      if (name && name.length > 0) {
        this.game.players.push(name);
      }
      this.saveGame();


    });
  }


  async saveGame() {
    const documentRef = doc(this.firestore, `games/${this.gameID}`);
    try {
      await setDoc(documentRef, this.game.toJson());
    } catch (error) {
      console.error('Error replacing document: ', error)
    }

  }
}