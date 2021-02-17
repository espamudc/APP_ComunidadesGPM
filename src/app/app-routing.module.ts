import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { LoginGuard } from './guards/login.guard';
//import { ValidarUserGuard } from './guards/validar-user.guard';
//import { LogoutGuard } from './guards/logout.guard';

const routes: Routes = [
  {
    path: '',

    redirectTo: 'inicio', 
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'validar-usuario',
    loadChildren: () => import('./pages/validar-usuario/validar-usuario.module').then( m => m.ValidarUsuarioPageModule)
  },
  
  {
    path: 'inicio',

    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'tabs',
  //  canActivate: [LoginGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'roles',
   // canActivate: [LoginGuard],
    loadChildren: () => import('./pages/roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'mapa',
  //  canActivate: [LoginGuard],
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },
  {
    path:'cuestionario-respuestas',
   // canActivate: [LoginGuard],
    loadChildren: () => import('./pages/cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
  },
  {
    path: 'preguntas-restantes',
  // canActivate: [LoginGuard],
    loadChildren: () => import('./pages/preguntas-restantes/preguntas-restantes.module').then( m => m.PreguntasRestantesPageModule)
  },
  {
    path: 'screen-messenger',
  //  canActivate: [LoginGuard],
    loadChildren: () => import('./pages/screen-messenger/screen-messenger.module').then( m => m.ScreenMessengerPageModule)
  },
  {
    path: 'reporte-ejecutivo',
  //  canActivate: [LoginGuard],
    loadChildren: () => import('./pages/reporte-ejecutivo/reporte-ejecutivo.module').then( m => m.ReporteEjecutivoPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
