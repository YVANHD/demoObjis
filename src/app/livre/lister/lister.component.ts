import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Livre } from '../model-livre';
import { LivreService } from 'src/app/services/livre.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-lister',
  templateUrl: './lister.component.html',
  styleUrls: ['./lister.component.css']
})
export class ListerComponent implements OnInit {
  // importation des objets Livre et LIVRES
  // creation dune propriete tableau de personne initialisé avec LIVRES via la methode ngOnInit()
  public livres: any;
  public size = 3;
  public currentPage = 0;
  public totalPages;
  public pages: Array<number>;

  constructor(
    private router: Router,
    private livreService: LivreService ) { }

    // initialisation de la methode listeLivres
  ngOnInit(): void {
  this.listeLivres();
  }


  listeLivres() {
    this.livreService.getAllLivres(this.currentPage, this.size)
    .subscribe(data => {
      // tslint:disable-next-line:no-string-literal
      this.totalPages = data['page'].totalPages;
      this.pages = new Array<number> (this.totalPages);
      this.livres = data;
    }, error => {
      console.log(error);
    });
  }

    onPageLivres(i) {
      this.currentPage = i;
      this.listeLivres();

    }

  // on cree une action de click sur le livre selectionné. ceci est la
  // methode pour intercepter le click
 /* selectLivr(livre: Livre): void {
    // au click sur un element, ecrire les infos dans la console
      console.log(livre);
      // au click sur un element, afficher les infos dans une boite de dialogue
      // alert('Le Titre ' + livre.name + ' écrit par ' + livre.auteur);
      this.router.navigate(['livre', livre.id]);
  }

  deleteLivre(livre: Livre): void {
    if (window.confirm('etes-vous sur de vouloir supprimer ?')) {
      this.livreService.deleteLivre(livre);
      this.livres = this.livreService.getAllLivres();
    }
  }*/

}
