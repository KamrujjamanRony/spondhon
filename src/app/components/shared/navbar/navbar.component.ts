import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  menu = [
    {
      title: "Home",
      link: "/"
    },
    {
      title: "Sports",
      link: "/news/sports"
    },
    {
      title: "Education",
      link: "/news/education"
    },
    {
      title: "Social",
      link: "/news/social"
    },
    {
      title: "Entertainment",
      link: "/news/entertainment"
    },
    {
      title: "Videos",
      link: "/news/videos"
    },
  ];

}
