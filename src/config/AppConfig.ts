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
}

const AppConfig: AppConfigType = {
  APP_NAME: 'EventHub',
  APP_DESCRIPTION:
    'EventHub es una plataforma moderna para descubrir, organizar y gestionar eventos. Explora una amplia variedad de experiencias, desde conferencias hasta encuentros locales, y conéctate con comunidades a tu alrededor.',
  API_BASE_URL: 'https://event-hub-nextjs.vercel.app',
  DEFAULT_LANGUAGE: 'es',
  ICON_PATH: '/svgs/icon.svg',
  LOGO_PATH: '/svgs/logo.svg',
  SUPPORT_EMAIL: 'soporte@eventhub.com',
  AUTHOR_NAME: 'Polarsh',
  AUTHOR_GITHUB_URL: 'https://github.com/Polarsh?tab=repositories',
}

export default AppConfig
