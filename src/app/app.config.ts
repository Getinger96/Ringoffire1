import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"ringoffire1-9a613","appId":"1:1084947463623:web:a2d3ff9166038686396de2","storageBucket":"ringoffire1-9a613.firebasestorage.app","apiKey":"AIzaSyBP6k6XoEgXu6ip_WpWk00xoqYCH08DboM","authDomain":"ringoffire1-9a613.firebaseapp.com","messagingSenderId":"1084947463623"}))), importProvidersFrom(provideFirestore(() => getFirestore()))]
};
