import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-template',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, MatMenuModule, MatListModule, MatDividerModule],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css'
})
export class TemplateComponent implements OnInit {
  menus = [
    { link: '/accueil/invitations', icon: 'view_quilt', title: 'Liste des invitations', label: "Liste des invitations", active: true },
  ];
  isDrawerOpen = true;
  selectedTitle = "";

  constructor(private router: Router, private route: ActivatedRoute, private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const titre = params['titre'];
      this.selectedTitle = titre || this.menus[0]?.title || '';
    });
    this.breakpointObserver.observe([Breakpoints.Handset]).subscribe(result => {
      this.isDrawerOpen = !result.matches; // Ferme le drawer si on est en mode mobile
    });
  }
  onItemClick(clickedItem: any) {
    this.selectedTitle = clickedItem.title;
    this.menus.forEach(item => {
      item.active = (item === clickedItem);
    });
  }
  deconnexion() {
    this.router.navigateByUrl("login");
  }
  goToProfile() {
    this.router.navigateByUrl("/accueil_Enseignant/profile");
  }

}
