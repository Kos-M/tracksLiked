
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



<a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/step1.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/step1.png">
    </p>
    <p align = "center">
        Login page
    </p>
</a>

<a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/create_project.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/create_project.png">
    </p>
    <p align = "center">
        Create Porject
    </p>
</a>


 <a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/api_enabled.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/api_enabled.png">
    </p>
    <p align = "center">
        Api Enabled
    </p>
</a>

 <a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/go_to_credentials.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/go_to_credentials.png">
    </p>
    <p align = "center">
         Go to Credentials Page
    </p>
</a>

 <a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/scope_selected.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/scope_selected.png">
    </p>
    <p align = "center">
         Select Scopes
    </p>
</a>

 <a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/create_consent_screen.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/create_consent_screen.png">
    </p>
    <p align = "center">
         Create Consent Screen
    </p>
</a>

 <a href="https://github.com/Kos-M/tracksLiked/blob/a7362bd545790fcf99547f669f3bab65df0add29/img/save_credentials.png" target="_blank" >
    <p align="center">
        <img  width="800px" src = "img/save_credentials.png">
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
