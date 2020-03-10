import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'validar-usuario',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'cuestionarios-asignados',
    loadChildren: () => import('./pages/cuestionarios-asignados/cuestionarios-asignados.module').then( m => m.CuestionariosAsignadosPageModule)
  },
  {
    path: 'login',
    // component : () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cuestionario-respuestas',
    loadChildren: () => import('./pages/cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
  },
  {
    path: 'cuestionario-respuestas/:item',
    loadChildren: () => import('./pages/cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
  },
  {
    path: 'validar-usuario',
    loadChildren: () => import('./pages/validar-usuario/validar-usuario.module').then( m => m.ValidarUsuarioPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
