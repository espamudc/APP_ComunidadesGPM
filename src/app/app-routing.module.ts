import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { ValidarUserGuard } from './guards/validar-user.guard';
import { LogoutGuard } from './guards/logout.guard';

const routes: Routes = [
  {
    path: '',

    redirectTo: 'inicio', 
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    canActivate: [LoginGuard],
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
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
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'roles',
    canActivate: [LoginGuard],
    loadChildren: () => import('./pages/roles/roles.module').then( m => m.RolesPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then( m => m.MapaPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
