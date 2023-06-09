import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hacker } from 'src/app/models/Hacker';
import { IHacker } from 'src/app/models/IHacker';
import { LookupIpService } from 'src/app/service/lookup-ip.service';
import { ManagerHackerService } from 'src/app/service/manager-hacker.service';
import { Ipapi } from 'src/app/models/Ipapi';


@Component({
  selector: 'app-hacker-form',
  templateUrl: './hacker-form.component.html',
  styleUrls: ['./hacker-form.component.css']
})
export class HackerFormComponent implements OnInit {


  hackerForm = new FormGroup({
    ip: new FormControl(''),
    countryName: new FormControl(''),
    countryFlag: new FormControl(''),
    regionName: new FormControl(''),
    city: new FormControl(''),
    id: new FormControl('')
  })

  constructor(
    private managerHackerService: ManagerHackerService,
    private lookupIpService: LookupIpService) {
  }

  ngOnInit(): void {
    this.managerHackerService.editHackerEvent
      .subscribe((hacker: IHacker) => {
        console.log('Event message editEvent')
        this.hacker_to_hackerForm(hacker)
      })
  }

  onSubmit() {
    // console.log("Data form : ")
    // console.log(this.hackerForm.value)
    // debugger
    let hacker = this.hackerForm_to_hacker();

    // console.log("Hacker object : ")
    // console.log(JSON.stringify(hacker))
    this.managerHackerService.saveHacker(hacker)

  }
  ipAlreadyExists(): any {
    return this.managerHackerService.isIpExistsInLS(this.hackerForm.controls.ip.value)
  }

  clear() {
    this.hackerForm.controls.ip.setValue("")
    this.hackerForm.controls.countryName.setValue("")
    this.hackerForm.controls.countryFlag.setValue("")
    this.hackerForm.controls.regionName.setValue("")
    this.hackerForm.controls.city.setValue("")
    this.hackerForm.controls.id.setValue(null)
    console.log("cancel")
    console.log(this.hackerForm.value)
  }

  lookup() {
    let ip = this.hackerForm.controls.ip.value + ''
    // console.log("ip " + ip)
    this.lookupIpService.getGeoLocationIp(ip).subscribe((res:Ipapi) => {
      // console.log("Reçu du service distant :: ")
      // console.log(res)
      this.hackerForm.controls.countryName.setValue(res.country_name)
      this.hackerForm.controls.regionName.setValue(res.region)
      this.hackerForm.controls.city.setValue(res.city)
      this.hackerForm.controls.countryFlag.setValue(res.country_code.toLowerCase())
      // console.log("hackerform : " + JSON.stringify(this.hackerForm.value))
    })

  }

  /**
   * Create instance of Hacker from hackerForm data 
   * @returns a ref to Hacker object
   */
  private hackerForm_to_hacker(): IHacker {
    return new Hacker(
      this.hackerForm.controls.ip.value ?? '',
      this.hackerForm.controls.countryName.value ?? '',
      this.hackerForm.controls.countryFlag.value ?? '',
      this.hackerForm.controls.regionName.value ?? '',
      this.hackerForm.controls.city.value ?? '',
      this.hackerForm.controls.id.value ?? undefined)
  }

  /**
   * Initializes this.hackerForm from parameter hacker instance (object)
   */
  private hacker_to_hackerForm(hacker: IHacker): void {
    this.hackerForm.patchValue({
      ip: hacker.ip,
      countryName: hacker.countryName,
      countryFlag: hacker.countryFlag,
      regionName: hacker.regionName,
      city: hacker.city,
      id: hacker.id ?? ''
    })
  }

}
