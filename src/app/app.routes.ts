import { Routes } from '@angular/router';
import { LedControl } from './componentes/led-control/led-control';

export const routes: Routes = [
    {
        path: "",
        component: LedControl
    },
    {
        path: "led-control",
        component: LedControl
    }
];
