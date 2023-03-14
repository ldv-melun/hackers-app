import { Component } from '@angular/core';
import { Hacker } from 'src/app/models/Hacker';
import { IHacker } from 'src/app/models/IHacker';
import { ManagerHackerService } from 'src/app/service/manager-hacker.service';

@Component({
  selector: 'app-hacker-list',
  templateUrl: './hacker-list.component.html',
  styleUrls: ['./hacker-list.component.css']
})
export class HackerListComponent {


  hackers: Hacker[]
  
  constructor(private managerHackerService: ManagerHackerService) {
    this.hackers = managerHackerService.getAllHackers()
    managerHackerService.updateHackersListEvent.subscribe( (hackers: IHacker[]) => {
      console.log('Event message updateHackerListEvent')
      this.hackers = hackers
    })  
  }

  editHacker(hacker: Hacker) {
    this.managerHackerService.editHacker(hacker)  
  }
      
  deleteHacker(hacker: Hacker) {
    this.managerHackerService.deleteHacker(hacker)
  }

}
