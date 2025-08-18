import { CircleSmall } from 'lucide-react'

class AppRoutes {
  ADMIN_SIDEBAR_ROUTES = [
    {
      name: 'Dashboard',
      href: '/admin/dashboard',
      icon: CircleSmall,
    },
    {
      name: 'Gestión de usuarios',
      icon: CircleSmall,
      children: [
        { name: 'Clientes', href: '/admin/users/clients' },
        {
          name: 'Organizadores',
          href: '/admin/users/organizers',
        },
        {
          name: 'Administradores',
          href: '/admin/users/administrators',
        },
      ],
    },
    {
      name: 'Gestión de eventos',
      icon: CircleSmall,
      children: [
        { name: 'Eventos activos', href: '/admin/events/active' },
        {
          name: 'Eventos pendientes',
          href: '/admin/events/pending',
        },
        { name: 'Eventos pasados', href: '/admin/events/past' },
        {
          name: 'Eventos destacados',
          href: '/admin/events/featured',
        },
      ],
    },
    {
      name: 'Métricas y reportes',
      icon: CircleSmall,
      children: [
        { name: 'Visitas', href: '/admin/metrics/visits' },
        { name: 'Eventos creados', href: '/admin/metrics/created-events' },
        { name: 'Usuarios activos', href: '/admin/metrics/active-users' },
      ],
    },
    {
      name: 'Soporte y moderación',
      icon: CircleSmall,
      children: [
        { name: 'Tickets de soporte', href: '/admin/support/tickets' },
        { name: 'Reportes', href: '/admin/support/reports' },
      ],
    },
    {
      name: 'Configuración',
      icon: CircleSmall,
      children: [
        { name: 'Configuración general', href: '/admin/settings/general' },
        { name: 'Permisos y roles', href: '/admin/settings/permissions' },
        { name: 'Integraciones', href: '/admin/settings/integrations' },
      ],
    },
  ]

  ADMIN_NAVBAR_ROUTES = [
    { name: 'Your profile', href: '#' },
    { name: 'Sign out', href: '#' },
  ]

  ADMIN_SETTINGS_ROUTE = '/admin/profile/settings'
}

export default AppRoutes
