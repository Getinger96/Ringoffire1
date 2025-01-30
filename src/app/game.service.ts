import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot, updateDoc, query, where, limit, orderBy, getDoc } from '@angular/fire/firestore';
import { Component, Input, OnInit, inject } from '@angular/core';
import { Game } from './../models/game';
import { addDoc, deleteDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  firestore: Firestore = inject(Firestore);

  constructor(private router: Router) { }

  
    
  
    
  
  
  
}
