import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {

  searchFilter: string;
  dateFilter = false;
  startDate: string;
  endDate: string;
  events = new Array();

  constructor(private modalCtrl: ModalController, private apiService: ApiService) { }

  onCancel(){
    this.modalCtrl.dismiss();
  }

  ngOnInit() {
    this.apiService.titleChanged.subscribe(data=>{
      if(data){
        this.searchFilter = 'Events Title';
        this.apiService.searchBy.next('Events Title');
        this.apiService.startDateSub.subscribe(data1 =>{
          if(data1){
            this.searchFilter = 'Date';
            this.apiService.searchBy.next('Date');
            this.dateFilter = true;
            this.startDate = data1.toDateString();
          }
        });
        this.apiService.endDateSub.subscribe(data1 =>{
          if(data1){
            this.searchFilter = 'Date';
            this.apiService.searchBy.next('Date');
            this.dateFilter = true;
            this.endDate = data1.toDateString();
          }
        });
      }
      else{
        this.searchFilter = 'Speakers';
        this.apiService.searchBy.next('Speakers');
      }
    });
  }

  titleCheckedChange(event){
    if(event.detail.value === 'Events Title'){
      this.apiService.startDateSub.next(null);
      this.apiService.endDateSub.next(null);
      this.apiService.searchFilter(true);
      this.dateFilter = false;
      this.apiService.findEvents().subscribe(data => {
        this.apiService.events.next(data);
      });
    }
    else if(event.detail.value === 'Speakers'){
      this.apiService.searchFilter(false);
      this.dateFilter = false;
    }
    else{
      this.apiService.searchFilter(true);
      this.dateFilter = true;
    }
  }

  onchangeStartDate(event){
    if(this.dateFilter === true){
      const startDate = new Date(event.detail.value);
      this.apiService.startDateSub.next(startDate);
    }
  }
  onchangeEndDate(event){
    if(this.dateFilter === true){
      const endDate = new Date(event.detail.value);
      this.apiService.endDateSub.next(endDate);
    }
  }
}
