
# 
    
## Quick Start
Steps in tracksLiked:
* `git clone https://github.com/Kos-M/tracksLiked`
* `cd  tracksLiked ; npm i`
* `cp env.sample .env`
* Change .env default download location , to match your needs.

Steps in Google : 
You need to create your own app in google Cloud console.

* Start from this wizard:  https://console.developers.google.com/start/api?id=youtube
* Login page
* Create Porject -> Choose name , and(or organization) -> Next -> Enable api
* Go to Credentials Page -> CREATE CREDENTIALS -> Oauth client ID -> configure consent screen
* Fill App information -> choose your email also in dev email enter yours.
* Add Or Remove Scopes -> select only ( YouTube Data API v3	.../auth/youtube.readonly	View your YouTube account ) -> Update 
Here you can add more test users/emails  if you wish
* Save and continue

After setup of  OAuth consent screen
Now we can create actual credentials
* click on Credentials tab above OAuth consent screen.
* CREATE CREDENTIALS -> Oauth client ID -> Web Application -> Create
* In Next Pop up click download json in project root dir as `client_secret.json`
* Done > Run by  ` node index.js` or `npm start`



<a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/step1.png?token=GHSAT0AAAAAABRI33PTSPDNND2N5XVUXDTUYWJ3ZRQ" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/step1.png?token=GHSAT0AAAAAABRI33PTSPDNND2N5XVUXDTUYWJ3ZRQ">
    </p>
    <p align = "center">
        Login page
    </p>
</a>

<a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/create_project.png?token=GHSAT0AAAAAABRI33PSJZAAUHW7UIHZLOFCYWJ3Z6A" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/create_project.png?token=GHSAT0AAAAAABRI33PSJZAAUHW7UIHZLOFCYWJ3Z6A">
    </p>
    <p align = "center">
        Create Porject
    </p>
</a>


 <a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/api_enabled.png?token=GHSAT0AAAAAABRI33PSUFRHUQXNWO7AQ55GYWJ323Q" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/api_enabled.png?token=GHSAT0AAAAAABRI33PSUFRHUQXNWO7AQ55GYWJ323Q">
    </p>
    <p align = "center">
        Api Enabled
    </p>
</a>

 <a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/go_to_credentials.png?token=GHSAT0AAAAAABRI33PTITAWOJNARAOAU424YWJ32LA" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/go_to_credentials.png?token=GHSAT0AAAAAABRI33PTITAWOJNARAOAU424YWJ32LA">
    </p>
    <p align = "center">
         Go to Credentials Page
    </p>
</a>

 <a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/scope_selected.png?token=GHSAT0AAAAAABRI33PSG6PICP364VZ72TDWYWJ33UQ" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/scope_selected.png?token=GHSAT0AAAAAABRI33PSG6PICP364VZ72TDWYWJ33UQ">
    </p>
    <p align = "center">
         Select Scopes
    </p>
</a>

 <a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/create_consent_screen.png?token=GHSAT0AAAAAABRI33PSVYUIKAK577R6ISGSYWJ33HQ" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/create_consent_screen.png?token=GHSAT0AAAAAABRI33PSVYUIKAK577R6ISGSYWJ33HQ">
    </p>
    <p align = "center">
         Create Consent Screen
    </p>
</a>

 <a href="https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/save_credentials.png?token=GHSAT0AAAAAABRI33PSEYU7KHRVP22ACTWYYWJ336A" target="_blank" >
    <p align="center">
        <img  width="800px" src = "https://raw.githubusercontent.com/Kos-M/tracksLiked/6f412633011e335f947b3295116b12743646f284/img/save_credentials.png?token=GHSAT0AAAAAABRI33PSEYU7KHRVP22ACTWYYWJ336A">
    </p>
    <p align = "center">
         Save Credentials as client_secret.json
    </p>
</a>

<p  align="center">
    <a href="https://www.buymeacoffee.com/kosm" target="_blank">
    <img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174" >
    </a>
</p>    
