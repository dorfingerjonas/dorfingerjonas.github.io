import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  title = 'About';
  portraitPath = '/assets/img/portrait.jpg';
  items = [
    'I am a web designer and photographer with three years of coding & design experience. My knowledge in project management, design, coding, and strengths in social communication shape me and my personality.',
    'To get new ideas and support my creativity, I spend a lot of time in the mountains skiing. Sometimes, my best ideas grow while running in the morning around my hometown. The most effective time to work for me is in the morning. Although it is early, I am focused on completing tasks to achieve my daily goals.',
    'I take my motivation from satisfied customers or colleagues with which I worked. A motivating impulse is to see the completed product, especially the moment you get a smile or just a simple "Thank you" from other people.',
    'I believe learning by doing is the most effective way to get into new stuff. This mentality helped me to enhance my skill and always keep improving. I am currently a student who is interested in new challenges. Do not hesitate, contact me using the contact form on this page.',
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}
