import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-invitation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './invitation.component.html',
  styleUrl: './invitation.component.css'
})
export class InvitationComponent implements OnInit{
  invitations : [any] =  [
    { id: '00000000-0000-0000-0000-000000000001', objet: 'Invitation 1', corps: 'Description 2' },
  ];
  errorMessage: string | null = null;

  constructor(private apiService: ApiService)  {}

  ngOnInit(): void {
    this.getInvitations();
  }

  getInvitations (){
    this.apiService.getInvitations().subscribe(data => {
      if (data) {
        this.invitations = data; 
      } else {
        console.error('No data received');
      }
    });
  }


  onRefuse(recordId: string) {
    this.apiService.refusedInvitation(recordId).subscribe({
      next: (response) => {
        if (response) {
          this.getInvitations();
        } else {
          this.errorMessage = 'Erreur lors du refus de l\'invitation';
        }
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du refus de l\'invitation' + err.message;
        console.error('Erreur lors du refus de l\'invitation', err);
      }
    });
  }
  
}
