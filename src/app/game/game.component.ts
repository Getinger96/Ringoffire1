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
import { Firestore, collection, collectionData, doc, onSnapshot, updateDoc, query, where, limit, orderBy, getDoc } from '@angular/fire/firestore';
import { addDoc, deleteDoc } from '@angular/fire/firestore';
import { AsyncPipe } from '@angular/common';
import { elementAt, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';








@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, PlayerComponent, MatButtonModule, MatIconModule, MatDialogModule, GameInfoComponent, MatCardModule, AsyncPipe,],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  firestore: Firestore = inject(Firestore);
  pickCardanimation: boolean = false;
  currentCard: any;
  game: Game
  unsubGames: any;
  unssubSingleGame: any;



  constructor(private route: ActivatedRoute, public dialog: MatDialog,) {
    this.game = new Game();


  }

  ngOnInit(): void {
    this.newGame()
   
    this.route.params.subscribe((params) => {
      console.log(params['id']);


      this.unssubSingleGame = onSnapshot(this.getsinglegameRef('games', params['id']), (game: any) => {
        console.log(game.data())
debugger
        this.game.currentPlayer = game.currentPlayer;
        this.game.playedCards = game.playedCards;
        this.game.players = game.player;
        this.game.stack = game.stack;

      });







    });






  }

  ngOnDestroy() {
    this.unsubGames();
    this.unssubSingleGame();


  }



  async newGame() {
    this.game = new Game();
    console.log(this.game);
    //this.addGame(this.game)


  }

  async addGame(newGame: Game) {
    await addDoc(this.getGameRef(), newGame.toJson()).catch(
      (err) => { console.error(err) }

    ).then(
      (docRef) => { console.log("Documnetn written wir ID:", docRef) }
    );
  }





  takeCard() {
    if (!this.pickCardanimation) {
      this.currentCard = this.game.stack.pop();
      console.log(this.currentCard);
      this.pickCardanimation = true;
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;



      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.pickCardanimation = false;
        console.log('Card pushed to playedCards:', this.currentCard);
      }
        , 1000)





    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(DialogAddPlayerComponent,);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name && name.length > 0) {
        this.game.players.push(name);
      }


    });
  }

  getGameRef() {
    return collection(this.firestore, 'games')
  }

  getsinglegameRef(colId: string, docId: any) {
    return doc(collection(this.firestore, colId), docId)
  }


}