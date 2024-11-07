import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, importProvidersFrom, OnInit } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule, HttpClientModule, MatCardModule, MatListModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {
  notifications: any[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    const fetchXmlQuery = `
      <fetch>
        <entity name="task">
          <attribute name="subject" />
          <attribute name="scheduledend" />
          <filter>
            <condition attribute="statuscode" operator="eq" value="1" />
          </filter>
        </entity>
      </fetch>`;

    this.notificationService.getNotifications(fetchXmlQuery).subscribe((data) => {
      this.notifications = data.value;
    });
  }
}
