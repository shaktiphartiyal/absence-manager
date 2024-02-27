import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_core';

@Component({
  selector: 'app-available-leaves',
  templateUrl: './available-leaves.component.html',
  styleUrls: ['./available-leaves.component.scss']
})
export class AvailableLeavesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private api: ApiService
    )
  {

  }

  async ngOnInit(): Promise<void> {

  }

}
