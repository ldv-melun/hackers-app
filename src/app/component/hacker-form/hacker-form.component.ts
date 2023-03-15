import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hacker } from 'src/app/models/Hacker';
import { IHacker } from 'src/app/models/IHacker';
import { LookupIpService } from 'src/app/service/lookup-ip.service';
import { ManagerHackerService } from 'src/app/service/manager-hacker.service';

interface IpStackLocation {
  ip: string
  type: string
  continent_code: string
  continent_name: string
  country_code: string
  country_name: string
  region_code: string
  region_name: string
  city: string
  zip: string
  latitude: number
  longitude: number
  location: {
    geoname_id: number
    capital: string
    languages: [
      {
        code: string
        name: string
        native: string
      }
    ],
    country_flag: string
    country_flag_emoji: string
    country_flag_emoji_unicode: string
    calling_code: string
    is_eu: boolean
  }
}

interface Ipapi {
    ip: string
    network: string
    version: string
    city: string
    region: string
    region_code: string
    country: string
    country_name: string
    country_code: string
    country_code_iso3: string
    country_capital: string
    country_tld: string
    continent_code: string
    in_eu: boolean
    postal: string
    latitude: number
    longitude: number
    timezone: string
    utc_offset: string
    country_calling_code: string
    currency: string
    currency_name: string
    languages: string
    country_area: number
    country_population: number
    asn: string
    org: string
}


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
    console.log("Data form : ")
    console.log(this.hackerForm.value)
    // debugger
    let hacker = this.hackerForm_to_hacker();

    console.log("Hacker object : ")
    console.log(JSON.stringify(hacker))
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
    console.log("ip " + ip)
    this.lookupIpService.getGeoLocationIp(ip).subscribe((res:Ipapi) => {
      console.log("Reçu du service distant :: ")
      console.log(res)
      this.hackerForm.controls.countryName.setValue(res.country_name)
      this.hackerForm.controls.regionName.setValue(res.region)
      this.hackerForm.controls.city.setValue(res.city)
      this.hackerForm.controls.countryFlag.setValue(res.country_code.toLowerCase())
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
