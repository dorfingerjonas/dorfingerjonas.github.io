import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {

  title = 'Skills';
  items = [
    {
      icon: 'fas fa-comments',
      title: 'Communication',
      content: 'My self-confidence level is very good. I have no problem with talking in front of many people. This is a big advantage for me when it comes to presenting projects or work that I have done.'
    },
    {
      icon: 'fas fa-code',
      title: 'Programming',
      content: 'I have been programming for nearly three years from now. In this time I tried a few languages, for example, Java, JavaScript and Powershell. The best language for me is JavaScript combined with HTML and CSS.'
    },
    {
      icon: 'fas fa-handshake',
      title: 'Social',
      content: 'Social competence helps me to interact in positive ways with others and manage my own emotions. These skills are varied and include among others self-confidence, self-possession and self-awareness.'
    },
    {
      icon: 'fas fa-palette',
      title: 'Creativity',
      content: 'Being creative helps me become a better problem solver in all areas of my life and work. Creativity helps me to see things differently and better deal with uncertainty. Through creativity, I can try new things out, realize some ideas.'
    },
    {
      icon: 'fas fa-users',
      title: 'Leadership',
      content: 'According to some classmates and teachers, I have very good human characteristics for a project manager or a leading person. I think of myself, one of my strengths is to organize events/projects and motivating people I work with.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Commitment',
      content: 'My commitment, a big strength of myself, when working on projects is very high. For me, commitment means, that I try harder, look for solutions when faced with obstacles, don\'t consider quitting as an option and I don\'t look back.'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
