# WikiRaces2021
This is the repository for the interalliance WikiRaces 2021 competition

Run `npm install` to get started.
Run `node app.js` to host the site.

---

The main issue right now is that I am unable to detect when a link is clicked.

Limitations:
 - due to xss, I cannot tell what url an iframe is on without hosting it.

 - Design I know will work: Shortest time wins
 - Design I want: get shortest time, and shortest number of links.

Other aspects:
 - I want a leaderboard -> need to host a website
 - I want to tell who won immediately -> I need to host a website
 - I want a timer to count down to event start

To do: 
 - Look into port forwarding with NGINX -> Was I doing something wrong? 
 - Create homepage
 - Create game client
 - Create backend (optional??)
