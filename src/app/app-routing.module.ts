import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio', //validar-usuario
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  
  {
    path: 'login',
    // component : () => import('./pages/login/login.module').then( m => m.LoginPageModule)
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  
  // {
  //   path: 'cuestionario-respuestas/:item',
  //   loadChildren: () => import('./pages/cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
  // },
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
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  // {
  //   path: 'menu',
  //   loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  // },

  // {
  //   path: 'usuario',
  //   loadChildren: () => import('./pages/usuario/usuario.module').then( m => m.UsuarioPageModule)
  // },

  // {
  //   path: 'home',
  //   loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  // },
  // {
  //   path: 'cuestionarios-asignados',
  //   loadChildren: () => import('./pages/cuestionarios-asignados/cuestionarios-asignados.module').then( m => m.CuestionariosAsignadosPageModule)
  // },
  // {
  //   path: 'cuestionario-respuestas',
  //   loadChildren: () => import('./pages/cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
  // },
  


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
