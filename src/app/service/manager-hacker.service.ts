import { EventEmitter, Injectable, Output } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { Hacker } from '../models/Hacker';
import { IHacker } from '../models/IHacker';

@Injectable({
  providedIn: 'root'
})
export class ManagerHackerService {

  deleteHacker(hacker: Hacker) {
    let hackers = this.getAllHackers()

    // ne retient pas le hacker reçu en argument
    let newHackers = hackers.filter(h => h.ip !== hacker.ip)

    if (hackers.length > newHackers.length) {
      localStorage.setItem("badguys", JSON.stringify(newHackers))
      this.updateHackersListEvent.emit(newHackers)
    }
  }

  isIpExistsInLS(ip: string | null): any {
    let hackers = this.getAllHackers()
    return hackers.find(badguy => badguy.ip == ip)
  }

  constructor() {

  }

  @Output() editHackerEvent = new EventEmitter<IHacker>();
  @Output() updateHackersListEvent = new EventEmitter<IHacker[]>();


  editHacker(hacker: IHacker) {
    this.editHackerEvent.emit(hacker);
  }

  /**
   * Get hackers stored locally on client side (localStorage)
   * @returns list of Hackers
   */
  getAllHackers(): Hacker[] {
    return JSON.parse(localStorage.getItem('badguys') || '[]');
  }

  saveHacker(hacker: IHacker) {
    let hackers = this.getAllHackers()
    let h = hackers.find(badguy => badguy.ip == hacker.ip)
    if (!h) {
      hacker.id = uuidv4()
      hackers.push(hacker)
    } else {
      h.city = hacker.city
      h.countryName = hacker.countryName
      h.regionName = hacker.regionName
    }
    localStorage.setItem("badguys", JSON.stringify(hackers))
    this.updateHackersListEvent.emit(hackers)
  }

}
