type AppConfigType = {
  APP_NAME: string
  APP_DESCRIPTION: string
  API_BASE_URL: string
  DEFAULT_LANGUAGE: string
  ICON_PATH: string
  LOGO_PATH: string
  SUPPORT_EMAIL: string
  AUTHOR_NAME: string
  AUTHOR_GITHUB_URL: string
  AUTHOR_LINKEDIN_URL: string
}

const AppConfig: AppConfigType = {
  APP_NAME: 'EventHub',
  APP_DESCRIPTION:
    'EventHub es una plataforma moderna para descubrir, organizar y gestionar eventos. Deyvidyorch Sanchez — GitHub: https://github.com/Polarsh',
  API_BASE_URL: 'https://event-hub-nextjs.vercel.app',
  DEFAULT_LANGUAGE: 'es',
  ICON_PATH: '/svgs/icon.svg',
  LOGO_PATH: '/svgs/logo.svg',
  SUPPORT_EMAIL: 'soporte@eventhub.com',
  AUTHOR_NAME: 'Deyvidyorch Sanchez',
  AUTHOR_GITHUB_URL: 'https://github.com/Polarsh?tab=repositories',
  AUTHOR_LINKEDIN_URL: 'https://github.com/Polarsh?tab=repositories',
}

export default AppConfig
