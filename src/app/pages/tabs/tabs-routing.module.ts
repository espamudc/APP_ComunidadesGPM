import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabsPage } from './tabs.page';
const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'home',
        children: [
          {
            path:'',
            loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
          }
        ]
      },
      {
        path: 'menu',
        children:[
          {
            path:'',
            loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
          }
        ]
        
      },
      {
        path: 'roles',
        children:[
          {
            path:'',
            loadChildren: () => import('../roles/roles.module').then( m => m.RolesPageModule)
          }
        ]
        
      },
      {
        path: 'cuestionarios-asignados',
        children:[
          {
            path:'',
            loadChildren: () => import('../cuestionarios-asignados/cuestionarios-asignados.module').then( m => m.CuestionariosAsignadosPageModule)
          },
          {
            path:'cuestionario-respuestas',
            loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
          },
          { 
            path: '**', 
            redirectTo: '',
            pathMatch: 'full' 
          }
        ],
      },
      // {
      //   path: 'cuestionario-respuestas',
      //   children: [
      //     {
      //       path:'',
      //       loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
      //     }
      //   ]
      // },
      {
        path: 'usuario',
        children:[
          {
            path:'',
            loadChildren: () => import('../usuario/usuario.module').then( m => m.UsuarioPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  },
  { 
    path: '**', 
    redirectTo: '/tabs/home',
    pathMatch: 'full' 
  }
];

// const routes: Routes = [
//   {
//     path: '',
//     // redirectTo : 'home',
//     component: TabsPage,
//     children:[
//       {
//         path: 'home',
//         loadChildren: () => import('../home/home.module').then( m => m.HomePageModule)
//       },
//       {
//         path: 'menu',
//         loadChildren: () => import('../menu/menu.module').then( m => m.MenuPageModule)
//       },
//       {
//         path: 'cuestionarios-asignados',
//         loadChildren: () => import('../cuestionarios-asignados/cuestionarios-asignados.module').then( m => m.CuestionariosAsignadosPageModule)
//       },
//       // {
//       //   path: 'cuestionario-respuestas',
//       //   loadChildren: () => import('../cuestionario-respuestas/cuestionario-respuestas.module').then( m => m.CuestionarioRespuestasPageModule)
//       // },
//       {
//         path: 'usuario',
//         loadChildren: () => import('../usuario/usuario.module').then( m => m.UsuarioPageModule)
//       },
//       {
//         path: '',
//         redirectTo: '/tabs/home',
//         pathMatch: 'full'
//       }
//     ]
//   },
//   {
//     path: '',
//     redirectTo: '/tabs/home',
//     pathMatch: 'full'
//   }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
