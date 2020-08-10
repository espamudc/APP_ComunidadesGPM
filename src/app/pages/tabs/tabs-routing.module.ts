import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
import { LoginGuard } from '../../guards/login.guard';


const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        canActivate: [LoginGuard],
        children: [
          {
            path:'',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'menu',
        canActivate: [LoginGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
          }
        ]
        
      },
      {
        path: 'roles',
        canActivate: [LoginGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../roles/roles.module').then( m => m.RolesPageModule)
          }
        ]
        
      },
      {
        path: 'cuestionarios-asignados',
        canActivate: [LoginGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../cuestionarios-asignados/cuestionarios-asignados.module').then( m => m.CuestionariosAsignadosPageModule)
          },
          {
            path:'cuestionario-respuestas',
            canActivate: [LoginGuard],
            loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
          },
          { 
            path: '**', 
            redirectTo: '',
            pathMatch: 'full' 
          }
        ],
      },
      {
        path: 'usuario',
        canActivate: [LoginGuard],
        children:[
          {
            path:'',
            loadChildren: () => import('../usuario/usuario.module').then( m => m.UsuarioPageModule)
          }
        ]
      },
      {
        path: '',
        canActivate: [LoginGuard],
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    canActivate: [LoginGuard],
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/tabs/home',
    pathMatch: 'full' 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
