/* 
PRODUCTSTORE

NgRx Signalstore-kirjaston avulla luotu funktionaalinen store, joka 
säilyttää sovelluksen tuotteiden tilaa. Tuotteet haetaan valetietokannasta
storeen, kun sovellus käynnistyy.

Store on siis eräänlainen tiedon välivarasto, jonka ansiosta ei tarvitse jatkuvasti 
päivittää tietokantaa. Saman tiedon välittäminen useisiin komponentteihin on 
helpompaa, koska ei tarvitse siirtää tietoa komponenttien välillä. Tieto
kulkee aina pelkästään storesta komponentteihin tai komponenteista storeen.
*/

import { inject } from '@angular/core';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { Instruments } from './.models/instrument';
import { ContentService } from './content.service';
import { tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const initialState: Instruments = { instruments: [] };
/*
ProductStore on funktionaalinen store, eli funktio,
jonka argumentteina on funktioita ja olioita
*/
export const ProductStore = signalStore(
  { providedIn: 'root' },
  // storen alkutila, jonka päälle tulee heti uusi tila kannasta
  withState(initialState),
  // storen elinkaarimetodit eli hookit
  withHooks({
    /* onInit-hookissa voidaan suorittaa tapahtumat jotka tapahtuvat
       kun store ladataan muistiin. */
    onInit(store, pservice = inject(ContentService)) {
      // haetaan tuotteet kannasta storeen reaktiivisesti
      pservice
        .GetContents()
        .pipe(
          takeUntilDestroyed(),
          // patchState päivittää storen tilaa
          tap((prods) => patchState(store, { instruments: prods })),
        )
        .subscribe();
    },
    /* onDestroy-hookissa voidaan suorittaa tapahtumat jotka tapahtuvat
       kun store poistuu muistista. Esim. tuotteiden tilan tallennus
       kantaan kun sovelluksen käyttö lopetetaan.
    */
    onDestroy(store) {
      // tuotteiden tilan tallennus kantaan voisi olla tässä
      console.log('ShopStore poistettu muistista', store);
    },
  }),
  /* Storen varsinaiset tietoa käsittelevät metodit ovat
     withMethods-funktiossa. withMethods-funktio sisältää anonyymin funktion, joka sisältää 
     storen tietoa käsittelevät metodit. products ja store tulevat argumentteina
     sisään. 
  */
  // withMethods(({ instruments, ...store }) => ({
  //   reduceAmount(id: number) {
  //     const updated = instruments().map((i) => (i.id_Instrument === id ? { ...i, amount: i.amount - 1 } : i));
  //     patchState(store, { instruments: updated });
  //   },
  //   addAmount(id: number) {
  //     const updated = instruments().map((i) => (i.id === id ? { ...i, amount: i.amount + 1 } : i));
  //     patchState(store, { instruments: updated });
  //   },
  // })),
);
