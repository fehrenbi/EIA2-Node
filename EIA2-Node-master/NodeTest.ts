/*
Aufgabe: 10  
Name: Luise Fehrenbach
Datum: 23.06.2017
Matrikel: 254667
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/

console.log("Server starting");

import Http = require("http");
import Url = require("url");

interface AssocStringString {
    [key: string]: string;
}

let port: number = process.env.PORT;
if (port == undefined)
    port = 8100;

let server: Http.Server = Http.createServer();
server.addListener("listening", handleListen);
server.addListener("request", handleRequest);
server.listen(port);

function handleListen(): void {
    console.log("Listening on port: " + port);
}

function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("Request received");

    console.log(_request.url);
    let query: AssocStringString = Url.parse(_request.url, true).query;
    console.log(query);
    _response.setHeader("Access-Control-Allow-Origin", "*");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    let key: string;
    for (key in query) {
        console.log(key + ":" + query[key]);
    }
    
    //Ausgabe auf Heroku
    _response.write("Sie haben bestellt: " + "Vanille: " + query["Vanille"] + ", " + "Schokolade: " + query["Schokolade"] + ", "  + "Erdbeere: " + query["Erdbeere"] + ", "  + "Kaffee: " + query["Kaffee"] + ", "  + "Haselnuss: " + query["Haselnuss"] + "<br>");
    _response.write("Darreichungsform: " + query["in der Waffel"] + " " + query["im Becher"] + "<br>");
    _response.write("Ihre Bestellung wird an folgende Adresse geliefert: " + query["Sex"] + " " + query["Vorname"] + " " + query["Nachname"] + ", " + query["Straße"] + " " + query["Hausnummer"] + ", " + query["PLZ"] + " " + query["Ort"] + "<br>");
    _response.write("Sie bezahlen: " + query["Zahlungsart"] + "<br>");
    _response.end();
}