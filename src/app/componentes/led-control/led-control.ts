import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-led-control',
  imports: [],
  templateUrl: './led-control.html',
  styleUrl: './led-control.css',
})
export class LedControl {

  estadoLed = signal(false);

    arduinoUrl = "http://172.16.100.20";

  encender() {
    this.estadoLed.set(true);
    fetch("http://192.168.4.1/on"); // Arduino WiFi AP
  }

  apagar() {
    this.estadoLed.set(false);
    fetch("http://192.168.4.1/off");
  }

}
